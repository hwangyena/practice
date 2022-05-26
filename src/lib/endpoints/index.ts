import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import queryString from 'query-string';
import { Middleware, mutate, SWRHook } from 'swr';

export const SWR_KEY = {
  popup: '/local/popup',
  userInfo: '/local/userinfo',
};
const pendingRequest = new Map();

axios.defaults.baseURL = '/rest-api/';
axios.defaults.headers.post['Content-Type'] = 'application/json';

/** SWR middleware */
export const swrLogger: Middleware = (useSWRNext: SWRHook) => {
  return (key, fetcher, config) => {
    console.log('SWR Request:', key);

    return useSWRNext(key, fetcher, config);
  };
};

const handleError = (err: FetchError | AxiosError | unknown): FetchError => {
  let errRes: FetchError = {
    status: -1,
    statusText: 'Something went wrong!',
    data: { code: 'Unknown', message: 'Error message', timeStamp: new Date().toISOString() },
    isFetchError: true,
  };

  if (axios.isAxiosError(err)) {
    const response = (err as AxiosError<ErrorResponse>).response;
    errRes = {
      status: response?.status || -1,
      statusText: response?.statusText || 'No Status text',
      data: {
        code: response?.data.code || 'Unknown',
        message: response?.data.message || 'No Error mesage',
        timeStamp: response?.data.timeStamp || new Date().toISOString(),
      },
      isFetchError: true,
    };
  } else if ((err as FetchError).isFetchError) {
    errRes = err as FetchError;
  } else {
    return errRes;
  }

  switch (errRes.data.code) {
    case 'SECURITY001':
    case 'SECURITY002':
      break;
    case 'code for unauthorized':
      mutate(SWR_KEY.userInfo, null, false);
      break;
    default:
      alert(`status: ${errRes.status}\nstatusText: ${errRes.statusText}\ncode: ${errRes.data.code}`);
  }

  console.log('errorRes', errRes);

  return errRes;
};

const makeKey = (config: AxiosRequestConfig) => {
  const { params, data, method, url } = config;
  return [method, url, JSON.stringify(params), JSON.stringify(data)].join('&');
};

const addPendingRequest = (config: AxiosRequestConfig) => {
  const requestKey = makeKey(config);

  config.cancelToken =
    config.cancelToken ||
    new axios.CancelToken((cancel) => {
      if (!pendingRequest.has(requestKey)) {
        pendingRequest.set(requestKey, cancel);
      }
    });
};

const removePendingRequest = (config: AxiosRequestConfig) => {
  const requestKey = makeKey(config);

  if (pendingRequest.has(requestKey)) {
    const cancelToken = pendingRequest.get(requestKey);
    cancelToken(requestKey);

    pendingRequest.delete(requestKey);
  }
};

export const sendRequest = async <T>(request: RequestForm): Promise<{ data: T | null; error: FetchError | null }> => {
  const axiosConfig: AxiosRequestConfig = {
    method: request.method,
    url: request.path,
    ...request.config,
  };

  if (request.params) {
    if (request.method === 'GET') {
      axiosConfig.params = request.params;
      axiosConfig.paramsSerializer = (params: Record<string, unknown>) => {
        return queryString.stringify(params);
      };
    }

    if (request.method !== 'GET') {
      axiosConfig.data = request.params;
    }
  }

  const requestKey = makeKey(axiosConfig);
  const cancelToken = new axios.CancelToken((cancel) => {
    if (!pendingRequest.has(requestKey)) {
      pendingRequest.set(requestKey, cancel);
    } else {
      cancel();
    }
  });

  axiosConfig.cancelToken = cancelToken;
  if (axiosConfig.cancelToken.reason) {
    removePendingRequest(axiosConfig);
  }

  axios.interceptors.request.use(
    (config) => {
      removePendingRequest(config);
      addPendingRequest(config);
      return config;
    },
    (error) => Promise.reject(error)
  );

  try {
    const res = await axios(axiosConfig);

    // TODO: Success conditions for each project policy
    if (Math.floor(res.status / 100) === 2) {
      return { data: res.data.data, error: null };
    } else {
      throw res;
    }
  } catch (err) {
    const errRes = handleError(err);
    return { data: null, error: errRes };
  }
};

// Only for GET request
export const fetcher = async <T>(url: string): Promise<T> => {
  try {
    const res = await axios.get(url);

    // TODO: Success conditions for each project policy
    if (Math.floor(res.status / 100) === 2) {
      return res.data;
    } else {
      const { status, statusText, data } = res;
      throw {
        status,
        statusText,
        // TODO: code as each project's policy
        data,
        isFetchError: true,
      } as FetchError;
    }
  } catch (err) {
    const errRes = handleError(err);
    throw errRes;
  }
};

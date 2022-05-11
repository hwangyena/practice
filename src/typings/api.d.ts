interface IPassengerData {
  totalPages: number;
  totalPasseners: number;
  data: PassengerType[];
}

interface IApiRes<T> {
  data: T;
  status: number;
  statusText: string;
  isValidating?: boolean; // loading
}

interface IApiParams {
  page: number;
  size: number;
}

type MaskingType = {
  show: boolean;
  xpos: number;
  ypos: number;
  maskingText: string;
  maskingStart: number;
  maskingEnd: number;
};

type FetchError = {
  status: number;
  statusText: string;
  data: ErrorResponse;
  isFetchError: boolean;
};

type ErrorResponse = {
  code: string;
  message: string;
  timeStamp: string;
};

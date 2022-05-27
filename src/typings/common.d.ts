type RequestForm = {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path: string;
  params?: Record<string, unknown> | FormData;
  config?: {
    timeout?: number;
    headers?: Record<string, string>;
  };
};

type FetchErrorType = {
  status: number;
  statusText: string;
  code: string;
  isFetchError: boolean;
};

type GenderType = 'male' | 'female';

type UserType = {
  id: number;
  name: string;
  gender: GenderType;
  email: string;
  status: string;
};

type AirlineType = {
  id: number;
  country: string;
  established: string;
  head_quaters: string;
  logo: string;
  name: string;
  slogan: string;
  website: string;
  _id?: string;
};

type PassengerType = {
  _id: string;
  airline: AirlineType[];
  name: string;
  trips: number;
};

type ProfileType = {
  name: string;
  height: number;
  location: string;
  hobby: string[];
  description: string;
};

type SelectOption = {
  label: string;
  value: string;
};

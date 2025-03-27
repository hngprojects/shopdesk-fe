import axios, {
  type AxiosError,
  type AxiosInstance,
  type RawAxiosRequestHeaders,
} from 'axios';
import Cookies from 'js-cookie';

const axiosRequest: AxiosInstance = axios.create({
  baseURL: 'https://api.timbu.cloud/',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  } as RawAxiosRequestHeaders,
});

// Interceptor for request
axiosRequest.interceptors.request.use(
  (config: any) => {
    const accessToken = Cookies.get('refresh_token');
    if (accessToken) {
      config.headers.Authorization = `${accessToken}`;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Interceptor for response
axiosRequest.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

export default axiosRequest;

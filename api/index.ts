// axiosConfig.ts
import axios, {AxiosError, AxiosResponse} from 'axios';
import getAuthorization from '@/lib/utils/cookieUtils';
const baseURL = process.env.NEXT_PUBLIC_API_ENDPOINT;

const Axios = axios.create({baseURL});

Axios.interceptors.request.use(
  function SetConfig(parameter) {
    const config = parameter;

    const token = getAuthorization();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  function GetError(error: AxiosError) {
    return Promise.reject(error);
  }
);

Axios.interceptors.response.use(
  function Success(response: AxiosResponse) {
    return response;
  },
  function Fail(error: AxiosError) {
    return Promise.reject(error);
  }
);

export default Axios;

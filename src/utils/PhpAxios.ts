import axios from 'axios';
import { getAccessToken, haveAccessToken } from '../service/TokenService';

// @ts-ignore
const phpAxios = axios.create({
  withCredentials: true,
  baseURL: process.env.NEXT_PUBLIC_PHP_WEB_HOST + '/index.php/',
  timeout: 90000,
});

phpAxios.defaults.withCredentials = true;

if (haveAccessToken()) {
  phpAxios.defaults.headers.common['Authorization'] = 'Bearer ' + getAccessToken();
}

phpAxios.interceptors.request.use(
  function (config) {
    const token = getAccessToken();
    if (token) config.headers.Authorization = 'Bearer ' + token;
    return Promise.resolve(config);
  },
  error => Promise.reject(error),
);

export default phpAxios;

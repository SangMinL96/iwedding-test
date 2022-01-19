import axios from 'axios';
import { getAccessToken, haveAccessToken, setAccessToken, setToken } from '../service/TokenService';
import isWebview from 'is-ua-webview';

// @ts-ignore
const myAxios = axios.create({
  withCredentials: true,
  baseURL: process.env.NEXT_PUBLIC_API_HOST + '/api/v1',
  timeout: 90000,
});

myAxios.defaults.withCredentials = true;

if (haveAccessToken()) {
  myAxios.defaults.headers.common['Authorization'] = 'Bearer ' + getAccessToken();
}

myAxios.interceptors.request.use(
  function (config) {
    const token = getAccessToken();
    if (token) config.headers.Authorization = 'Bearer ' + token;
    return Promise.resolve(config);
  },
  error => Promise.reject(error),
);

myAxios.interceptors.response.use(
  response => {
    return response;
  },
  function (error) {
    console.log(error.response.headers);
    const originalRequest = error.config;
    if (error.response) {
      if (error.response.status === 401 && originalRequest.url.includes('https://www.iwedding.co.kr/member/get_token?jwt_refresh=1')) {
        console.log('재발급 중 오류');
        // window.location.href = '/login';
        // console.log(originalRequest);
        return Promise.reject(error);
      }

      if (error.response.status === 401 && !originalRequest._retry) {
        if (!haveAccessToken()) return Promise.reject(`비로그인 토근 재발급 시도함 && token=${getAccessToken()}`);
        console.log('[axios]start refresh token');
        originalRequest._retry = true;
        if (process.env.REACT_APP_STAGING || process.env.NODE_ENV == 'development') {
          return myAxios.get('/test/token').then(r => {
            setToken(r.data.access_token, r.data.refresh_token);
            originalRequest.headers['Authorization'] = 'Bearer ' + r.data.access_token;
            return myAxios(originalRequest);
          });
        }

        return axios
          .get('https://www.iwedding.co.kr/member/get_token?jwt_refresh=1')
          .then(res => {
            if (res.data && res.data.data.jwt_access) {
              const access_token = res.data.data.jwt_access;
              console.log('[axios]success new token receive : ' + access_token);
              setAccessToken(access_token);

              originalRequest.headers['Authorization'] = 'Bearer ' + access_token;
              return myAxios(originalRequest);
            } else {
              return Promise.reject('재발급에러');
            }
          })
          .catch(err => {
            console.log('토큰 재발급 중 에러가 발생했습니다.');
            console.log(err);
            // console.log('refresh token error');
            // window.location.href = '/login';
            return Promise.reject(error);
          });
      } else {
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  },
);

export default myAxios;

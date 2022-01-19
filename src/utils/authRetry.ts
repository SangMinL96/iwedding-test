import { haveAccessToken, havePHPToken, setAccessToken } from '@service/TokenService';
import axios from 'axios';
import isWebview from 'is-ua-webview';
import myAxios from './MyAxios';
import phpAxios from './PhpAxios';

export const phpAuthRetry = async (url: any, body?: any) => {
  try {
    if (haveAccessToken()) {
      if (process.env.REACT_APP_STAGING || process.env.NODE_ENV == 'development') {
        const token = myAxios.get('/test/token').then(r => r.data.access_token);
        return phpAxios.post(url, body, { withCredentials: false, headers: { ['Authorization']: 'Bearer ' + token } });
      } else {
        const result = await axios.get('https://www.iwedding.co.kr/member/get_token?jwt_refresh=1');
        if (result.data && result.data.data.jwt_access) {
          const access_token = result.data.data.jwt_access;
          setAccessToken(access_token);
          return phpAxios.post(url, body, { withCredentials: false, headers: { ['Authorization']: 'Bearer ' + access_token } });
        } else {
          throw new Error('재발급 에러');
        }
      }
    } else {
      if (typeof window !== 'undefined') {
        if (window.top === window.self) {
          window.location.href = 'https://www.iwedding.co.kr/member/logout';
        } else {
          window.parent.location.href = 'https://www.iwedding.co.kr/member/logout';
        }
      }
    }
  } catch (err) {
    throw new Error('토큰 갱신 에러');
  }
};

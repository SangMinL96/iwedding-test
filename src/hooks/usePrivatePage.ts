import { appIsLogin } from '@modules/user/user.api';
import { clearToken, haveAccessToken, havePHPToken, renewAccessToken, setToken } from '@service/TokenService';
import myAxios from '@utils/MyAxios';
import { useEffect } from 'react';
import { confirmAlert } from 'react-confirm-alert';

export const usePrivatePage = () => {
  const isLoggedIn = haveAccessToken() && havePHPToken();

  if (isLoggedIn) {
    return true;
  }
  //
  if (process.env.REACT_APP_STAGING || process.env.NODE_ENV == 'development') {
    return myAxios.get('/test/token').then(r => {
      setToken(r.data.access_token, r.data.refresh_token);
    });
  }

  if (typeof window !== 'undefined') {
    if (/request\/form/.test(window.location.href)) {
      renewAccessToken(window.location.href);
    } else {
      clearToken();
      confirmAlert({
        title: '로그인을 하시면, 더욱 많은 콘텐츠와 서비스를 이용하실 수 있습니다.',
        buttons: [
          {
            label: '확인',
            onClick: () => {
              window.location.replace(`https://www.iwedding.co.kr/member/login?ret_url=${encodeURIComponent(window.location.href)}`);
            },
          },
        ],
      });
    }
  }
};

export const useWebIdPrivatePage = () => {
  useEffect(() => {
    appIsLogin();
  }, []);
  return true;
};

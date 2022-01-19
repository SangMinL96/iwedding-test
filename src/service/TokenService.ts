import { isWebview } from '@utils/isWebview';
import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
export const setAccessToken = (accessToken: string) => {
  cookies.set('access_token', accessToken, {
    path: '/',
  });
};

export const setStagingAccessToken = (accessToken: string) => {
  cookies.set('staging_access_token', accessToken, {
    path: '/',
  });
};

export const setRefreshToken = (refreshToken: string) => {
  cookies.set('refresh_token', refreshToken, { path: '/', domain: 'com.ifamily.co.kr', httpOnly: true, maxAge: 60 * 60 * 1000 });
};

export const setToken = (accessToken: string, refreshToken?: string) => {
  cookies.set('access_token', accessToken, {
    path: '/',
  });

  if (refreshToken != null) {
    setRefreshToken(refreshToken);
  }
  cookies.get('refresh_token');
};

export const haveAccessToken = (): boolean => {
  return !!cookies.get('access_token');
};

export const getAccessToken = (): string => {
  return cookies.get('access_token');
};

export const renewAccessToken = async (retURL: string) => {
  const result = await axios.get('https://www.iwedding.co.kr/member/get_token?jwt_refresh=1');
  if (result.data && result.data.data.jwt_access) {
    const access_token = result.data.data.jwt_access;
    setAccessToken(access_token);
    window.location.href = retURL;
  }
};

export const havePHPToken = (): boolean => !!cookies.get('ibrand_info[token_kv]');

export const getStagingAccessToken = (): string => {
  return cookies.get('staging_access_token');
};

export const isInitWebview = (): string => {
  return cookies.get('isInitWebview');
};

export const getRefreshToken = (): string => {
  return cookies.get('refresh_token');
};

export const clearToken = (): void => {
  cookies.remove('ibrand_info[token_kv]');
  cookies.remove('refresh_token');
  cookies.remove('access_token');
};

export const getRecentView = (): void => {
  return cookies.get('recent_view');
};

export const removeRecentView = (): void => {
  return cookies.remove('recent_view');
};

export const setRecentView = (data): void => {
  return cookies.set('recent_view', data, {
    path: '/',
  });
};

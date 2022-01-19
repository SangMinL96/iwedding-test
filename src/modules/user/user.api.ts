import { clearToken, haveAccessToken, havePHPToken, setToken } from '@service/TokenService';
import { fetcher, fetchFromIBrand, postFetcher } from '@utils/fetcher';
import myAxios from '@utils/MyAxios';
import phpAxios from '@utils/PhpAxios';
import router, { useRouter } from 'next/router';
import { useEffect } from 'react';
import useSWR from 'swr';
import { UserInfoItf } from './user.interface';

const DOMAIN = '/user';
export const UserApi = {
  getCash: async () => {
    const { data } = await myAxios.get<{ data: { cash: string } }>(DOMAIN + '/icash');
    return data;
  },
};
export const appIsLogin = async () => {
  // if (process.env.REACT_APP_STAGING || process.env.NODE_ENV == 'development') {
  //   return myAxios.get('/test/token').then(r => {
  //     setToken(r.data.access_token, r.data.refresh_token);
  //   });
  // }
  const isLoggedIn = haveAccessToken() && havePHPToken();
  if (isLoggedIn) {
    return true;
  }
  const url = 'js_data/main_user_info';
  const { data } = await phpAxios.post(url, {});
  if (!data?.web_id) {
    clearToken();
    return router.replace(`https://www.iwedding.co.kr/member/login?ret_url=${encodeURIComponent(window.location.href)}`);
  }
};

export const useUserAlarmList = (isNotiOpen: boolean) => {
  const isLoggedIn = haveAccessToken();
  const url = 'js_data/alarm_center_list';
  const fetcherApi = async urlParams => {
    const data = await fetchFromIBrand<any>(urlParams);
    return data;
  };
  const { data, mutate, isValidating, error } = useSWR<any>(url, () => null);
  useEffect(() => {
    if (isNotiOpen && isLoggedIn) {
      mutate(fetcherApi(url), false);
    }
  }, [isNotiOpen]);

  const listMutate = () => {
    mutate(fetcherApi(url), false);
  };

  return { data, listMutate, isValidating, error };
};

export const useAlarmCount = () => {
  const isLogin = haveAccessToken();
  const url =
    process.env.NODE_ENV === 'development' ? `${process.env.NEXT_PUBLIC_LOCAL_API_HOST}/api/v1/user/alarmCount` : `user/alarmCount`;
  const fetcherApi = async urlParams => {
    return await fetcher<{ count: number }>(urlParams);
  };
  const { data, isValidating, error } = useSWR(url, isLogin ? fetcherApi : null);

  return { data, isValidating, error };
};

export const onReadAlarm = async ({ no }: any) => {
  const isLogin = haveAccessToken();
  try {
    if (isLogin) {
      const data = await postFetcher(`${process.env.NEXT_PUBLIC_LOCAL_API_HOST}/api/v1/user/readAlarm`, { no });
      if (data === 0) {
        return 'OK';
      }
    }
  } catch (err) {
    console.error(err);
  }
};

export const useTalkCount = () => {
  const isLogin = haveAccessToken();
  const router = useRouter();
  const QnAForm = router.route.includes('/request/replace') || router.route.includes('/request/form');

  const url = process.env.NODE_ENV === 'development' ? `${process.env.NEXT_PUBLIC_LOCAL_API_HOST}/api/v1/user/talkCount` : `user/talkCount`;
  const fetcherApi = async urlParams => {
    return await fetcher<{ count: number }>(urlParams);
  };
  const { data, isValidating, error } = useSWR(url, !QnAForm && isLogin ? fetcherApi : null);

  return { data, isValidating, error };
};

export const useUserInfo = () => {
  const isLogin = haveAccessToken();
  const getUser = async () => {
    try {
      const url = 'js_data/main_user_info';
      const { data } = await fetchFromIBrand(url, {});
      return data;
    } catch (err) {
      console.log(err);
    }
  };
  const { data, mutate } = useSWR<UserInfoItf | undefined>('/main/user_info', isLogin ? getUser : null);
  useEffect(() => {
    if (data?.user_name === '') {
      mutate();
    }
  }, [data]);
  return { data };
};

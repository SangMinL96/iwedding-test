import { HONEYMOON_JOIN } from '@modules/log/honeymoon/honeymoonLogType';
import { haveAccessToken } from '@service/TokenService';
import { fetchFromIBrand } from '@utils/fetcher';
import { getLoggerDeviceType } from '../logUtils';

// 허니문 열람시 로그
export const honeymoonLogAPI = async (category: string) => {
  const isLogin = haveAccessToken();
  try {
    const url = 'js_data/web_log_user2';
    const logData = {
      log_type_no: HONEYMOON_JOIN[getLoggerDeviceType()],
      log_text1: `테마형페이지열람`,
      log_text2: `${category}`,
      log_int: 0,
    };
    const { result } = isLogin ? await fetchFromIBrand(url, logData) : null;
    if (result) {
      return 'OK';
    } else {
      window.alert('요청 실패하였습니다. 관리자에게 문의해주세요.');
    }
  } catch (err) {
    console.error(err);
  }
};

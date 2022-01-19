import { getLoggerDeviceType } from '@modules/log/logUtils';
import { haveAccessToken } from '@service/TokenService';
import { fetchFromIBrand } from '@utils/fetcher';
import { COUPON_EVENT_JOIN, COUPON_PAYMENT_JOIN } from './conponLogType';

//쿠폰함 열람 로그 api
export const couponJoinAPI = async (category: string) => {
  const isLogin = haveAccessToken();
  try {
    const url = 'js_data/web_log_user2';
    const onLogType = () => {
      switch (category) {
        case '이벤트':
          return COUPON_EVENT_JOIN[getLoggerDeviceType()];
        case '결제':
          return COUPON_PAYMENT_JOIN[getLoggerDeviceType()];
        default:
          return '';
      }
    };
    const logData = {
      log_type_no: onLogType(),
      log_text1: `마이페이지에서 내 ${category} 쿠폰 조회`,
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

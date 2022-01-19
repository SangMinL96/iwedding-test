import { haveAccessToken } from '@service/TokenService';
import { fetchFromIBrand } from '@utils/fetcher';
import { getLoggerDeviceType } from '../logUtils';
import { NOTICE_DETAIL_CLICK, NOTICE_OPEN_CLICK, NOTICE_QA_CLICK } from './noticeLogType';

// 키워드,필터 검색 로그
export const noticeQaLog = async ({ directLink }: any) => {
  const isLogin = haveAccessToken();
  try {
    const url = 'js_data/web_log_user2';
    const linkUrl = `<a href="${directLink}" target="_blank">::알림센터 문의 신청::</a>`;
    const logData = {
      log_type_no: NOTICE_QA_CLICK[getLoggerDeviceType()],
      log_text1: linkUrl,
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

export const noticeDetailLog = async ({ directLink }: any) => {
  const isLogin = haveAccessToken();
  try {
    const url = 'js_data/web_log_user2';
    const linkUrl = `<a href="${directLink}" target="_blank">::알림센터 상세 보기::</a>`;
    const logData = {
      log_type_no: NOTICE_DETAIL_CLICK[getLoggerDeviceType()],
      log_text1: linkUrl,
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

export const noticeOpenLog = async () => {
  const isLogin = haveAccessToken();
  try {
    const url = 'js_data/web_log_user2';
    const text1 = `::알림센터 열람::`;
    const logData = {
      log_type_no: NOTICE_OPEN_CLICK[getLoggerDeviceType()],
      log_text1: text1,
    };
    const { result } = isLogin ? await fetchFromIBrand(url, logData) : null;
    if (isLogin) {
      if (result) {
        return 'OK';
      }
    } else {
      return 'OK';
    }
  } catch (err) {
    console.error(err);
  }
};

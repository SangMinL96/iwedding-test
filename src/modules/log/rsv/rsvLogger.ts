import {
  RSV_CENTER_GIFT_BREND_COMPLETE,
  RSV_CENTER_GIFT_BTN_INQUIRY,
  RSV_CENTER_GIFT_COMPLETE,
  RSV_CENTER_GIFT_INQUIRY,
  RSV_CENTER_GIFT_JOIN,
  RSV_CENTER_GIFT_PRODUCT_COMPLETE,
  RSV_CENTER_GIFT_VISIT_BTN_INQUIRY,
  RSV_CENTER_HANBOK_BREND_COMPLETE,
  RSV_CENTER_HANBOK_BTN_INQUIRY,
  RSV_CENTER_HANBOK_COMPLETE,
  RSV_CENTER_HANBOK_INQUIRY,
  RSV_CENTER_HANBOK_JOIN,
  RSV_CENTER_HANBOK_PRODUCT_COMPLETE,
  RSV_CENTER_HANBOK_VISIT_BTN_INQUIRY,
  RSV_CENTER_ROBES_BREND_COMPLETE,
  RSV_CENTER_ROBES_BTN_INQUIRY,
  RSV_CENTER_ROBES_COMPLETE,
  RSV_CENTER_ROBES_INQUIRY,
  RSV_CENTER_ROBES_JOIN,
  RSV_CENTER_ROBES_PRODUCT_COMPLETE,
  RSV_CENTER_ROBES_VISIT_BTN_INQUIRY,
} from '@modules/log/rsv/rsvLogType';
import { haveAccessToken } from '@service/TokenService';
import { fetchFromIBrand } from '@utils/fetcher';
import phpAxios from '@utils/PhpAxios';
import { getLoggerDeviceType } from '../logUtils';

// 예약센터 열람시 로그
export const rsvcenterLogAPI = async (siteUrl: string, category: string, code?: string) => {
  const isLogin = haveAccessToken();
  try {
    const url = 'js_data/web_log_user2';
    const onLogType = () => {
      switch (category) {
        case '한복':
          return RSV_CENTER_HANBOK_JOIN[getLoggerDeviceType()];
        case '예복':
          return RSV_CENTER_ROBES_JOIN[getLoggerDeviceType()];
        case '예물':
          return RSV_CENTER_GIFT_JOIN[getLoggerDeviceType()];
        default:
          return '';
      }
    };
    const logData = {
      log_type_no: onLogType(),
      log_text1: `<a href="${siteUrl}" target="_blank">::${category} 예약센터::</a>`,
      log_text2: code ? `${category} :::: ${code}` : category,
    };
    if (isLogin) {
      await phpAxios.post(url, logData);
    }
  } catch (err) {
    console.error(err);
  }
};

// 예약센터 예약 완료시 로그
export const rsvcenterCompleteLogAPI = async (logProps: any) => {
  const isLogin = haveAccessToken();
  try {
    const { siteUrl, category, code, product_name, from, product_no, entCodes } = logProps;

    const url = 'js_data/web_log_user2';
    const onLogType = () => {
      switch (category) {
        case '한복':
          if (from === '브랜드') return RSV_CENTER_HANBOK_BREND_COMPLETE[getLoggerDeviceType()];
          if (from === '상품') return RSV_CENTER_HANBOK_PRODUCT_COMPLETE[getLoggerDeviceType()];
          if (!from) return RSV_CENTER_HANBOK_COMPLETE[getLoggerDeviceType()];
          break;
        case '예복':
          if (from === '브랜드') return RSV_CENTER_ROBES_BREND_COMPLETE[getLoggerDeviceType()];
          if (from === '상품') return RSV_CENTER_ROBES_PRODUCT_COMPLETE[getLoggerDeviceType()];
          if (!from) return RSV_CENTER_ROBES_COMPLETE[getLoggerDeviceType()];
          break;
        case '예물':
          if (from === '브랜드') return RSV_CENTER_GIFT_BREND_COMPLETE[getLoggerDeviceType()];
          if (from === '상품') return RSV_CENTER_GIFT_PRODUCT_COMPLETE[getLoggerDeviceType()];
          if (!from) return RSV_CENTER_GIFT_COMPLETE[getLoggerDeviceType()];
          break;
        default:
          return '';
      }
    };
    const filterLogText2 = () => {
      if (from === '브랜드') return `${category} :::: ${code}`;
      if (from === '상품') return `${category} :::: ${code}`;
      if (!from) return `${entCodes || category}`;
    };
    const logData = {
      log_type_no: onLogType(),
      log_text1: product_name
        ? `<a href="${siteUrl}" target="_blank">::${product_name} ${category} 예약센터 신청완료::</a>`
        : `<a href="${siteUrl}" target="_blank">::${category} 예약센터 신청완료::</a>`,
      log_text2: filterLogText2(),
      log_int1: product_no,
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

// 예약센터 답변자세히 보기 로그
export const rsvcenterInquiryLogAPI = async (siteUrl: string, category: string | undefined, text2: string | undefined) => {
  const isLogin = haveAccessToken();
  try {
    const url = 'js_data/web_log_user2';
    const onLogType = () => {
      switch (category) {
        case '한복':
          return RSV_CENTER_HANBOK_INQUIRY[getLoggerDeviceType()];
        case '예복':
          return RSV_CENTER_ROBES_INQUIRY[getLoggerDeviceType()];
        case '예물':
          return RSV_CENTER_GIFT_INQUIRY[getLoggerDeviceType()];
        default:
          return '';
      }
    };
    const logData = {
      log_type_no: onLogType(),
      log_text1: `<a href="${siteUrl}" target="_blank">::${category} 예약 문의 내역 자세히 보기::</a>`,
      log_text2: text2,
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

// 예약센터 수정/취소 버튼 로그
export const rsvcenterInquiryBtnLogAPI = async (siteUrl: string, category: string | undefined, text2: string | undefined) => {
  const isLogin = haveAccessToken();
  try {
    const url = 'js_data/web_log_user2';
    const onLogType = () => {
      switch (category) {
        case '한복':
          return RSV_CENTER_HANBOK_BTN_INQUIRY[getLoggerDeviceType()];
        case '예복':
          return RSV_CENTER_ROBES_BTN_INQUIRY[getLoggerDeviceType()];
        case '예물':
          return RSV_CENTER_GIFT_BTN_INQUIRY[getLoggerDeviceType()];
        default:
          return '';
      }
    };
    const logData = {
      log_type_no: onLogType(),
      log_text1: `<a href="${siteUrl}" target="_blank">::${category} 답변페이지에서 변경/취소 버튼 누름::</a>`,
      log_text2: text2,
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

// 예약센터 예약 버튼 로그
export const rsvcenterInquiryVisitBtnLogAPI = async (siteUrl: string, category: string | undefined, text2: string | undefined) => {
  const isLogin = haveAccessToken();
  try {
    const url = 'js_data/web_log_user2';

    const onLogType = () => {
      switch (category) {
        case '한복':
          return RSV_CENTER_HANBOK_VISIT_BTN_INQUIRY[getLoggerDeviceType()];
        case '예복':
          return RSV_CENTER_ROBES_VISIT_BTN_INQUIRY[getLoggerDeviceType()];
        case '예물':
          return RSV_CENTER_GIFT_VISIT_BTN_INQUIRY[getLoggerDeviceType()];
        default:
          return '';
      }
    };
    const logData = {
      log_type_no: onLogType(),
      log_text1: `<a href="${siteUrl}" target="_blank">::${category} 답변페이지에서 예약하기 버튼 누름::</a>`,
      log_text2: text2,
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

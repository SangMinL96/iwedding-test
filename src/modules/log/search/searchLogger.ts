import { getLoggerDeviceType } from '@modules/log/logUtils';
import { haveAccessToken } from '@service/TokenService';
import { fetchFromIBrand } from '@utils/fetcher';
import router from 'next/router';
import {
  SEARCH_BRAND_OPEN,
  SEARCH_CONTENT_OPEN,
  SEARCH_EVENT_OPEN,
  SEARCH_FILTER_SEARCH,
  SEARCH_KEYWORD_SEARCH,
  SEARCH_ORDER_BY,
  SEARCH_PRODUCT_OPEN,
  SEARCH_ZZIM,
} from './searchLogType';
// import { fetchFromIBrand } from '@utils/fetcher';
// import { COUPON_EVENT_JOIN, COUPON_PAYMENT_JOIN } from './conponLogType';

// 키워드,필터 검색 로그
export const searchKeywordLog = async (keyword: string) => {
  const isLogin = haveAccessToken();
  try {
    const url = 'js_data/web_log_user2';
    const logData = {
      log_type_no: SEARCH_KEYWORD_SEARCH[getLoggerDeviceType()],
      log_text1: `::${keyword}::`,
    };
    const { result } = isLogin ? await fetchFromIBrand(url, logData) : null;
    if (result) {
      return 'OK';
    }
  } catch (err) {
    console.error(err);
  }
};

// 키워드,필터 검색 로그
export const searchFilterLog = async (searchKeyword: string, keyword: string, isKeyword: boolean = false) => {
  const isLogin = haveAccessToken();
  try {
    const linkUrl = `<a href="www.iwedding.co.kr${encodeURIComponent(
      router.asPath,
    )}" target="_blank">::${searchKeyword} 검색결과에서 "${keyword}" ${isKeyword ? '검색' : '필터적용'}::</a>`;
    const url = 'js_data/web_log_user2';
    const logData = {
      log_type_no: SEARCH_FILTER_SEARCH[getLoggerDeviceType()],
      log_text1: linkUrl,
    };
    const { result } = isLogin ? await fetchFromIBrand(url, logData) : null;
    if (result) {
      return 'OK';
    }
  } catch (err) {
    console.error(err);
  }
};

// 키워드 검색 로그
export const searchOrderByLog = async (mainCategory: string, orderBy: string) => {
  const isLogin = haveAccessToken();
  try {
    const linkUrl = `<a href="www.iwedding.co.kr${encodeURIComponent(
      router.asPath,
    )}" target="_blank">::${mainCategory}페이지에서 "${orderBy}" 정렬::</a>`;
    const url = 'js_data/web_log_user2';
    const logData = {
      log_type_no: SEARCH_ORDER_BY[getLoggerDeviceType()],
      log_text1: linkUrl,
    };
    const { result } = isLogin ? await fetchFromIBrand(url, logData) : null;
    if (result) {
      return 'OK';
    }
  } catch (err) {
    console.error(err);
  }
};

type PostDataType = {
  bbsNo?: string;
  entCode?: string;
  category?: string;
  prdNo?: string;
  title?: string;
  entName?: string;
};
// 키워드 검색 로그
export const searchZzimLog = async (contentCategory: string, title: string, post_data: PostDataType) => {
  const isLogin = haveAccessToken();
  const entNames = post_data.entName?.split(',');
  const entCodes = post_data.entCode?.split(',');
  const doneText2 = entCodes
    ? entCodes
        ?.map(
          (item, index) =>
            `${contentCategory === '3' || contentCategory === '4' ? entNames[index] || post_data.category : post_data.category} :::: ${
              item || post_data.bbsNo
            }`,
        )
        .join(' ##### ')
    : `${post_data.category} :::: ${post_data.bbsNo}`;
  try {
    const url = 'js_data/web_log_user2';
    const logData = {
      log_type_no: SEARCH_ZZIM[getLoggerDeviceType()],
      log_text1: `검색 결과 내 ::${title}:: 좋아요`,
      log_text2: doneText2,
      log_int1: `${post_data.bbsNo !== '' ? post_data.bbsNo : post_data.prdNo}`,
    };
    const { result } = isLogin ? await fetchFromIBrand(url, logData) : null;
    if (result) {
      return 'OK';
    }
  } catch (err) {
    console.error(err);
  }
};

export const searchDetail = async (contentCategory: string, post_data: PostDataType) => {
  const isLogin = haveAccessToken();
  try {
    const entNames = post_data.entName?.split(',');
    const entCodes = post_data.entCode?.split(',');
    const doneText2 = entCodes
      ? entCodes
          ?.map(
            (item, index) =>
              `${contentCategory === '3' || contentCategory === '4' ? entNames[index] || post_data.category : post_data.category} :::: ${
                item || post_data.bbsNo
              }`,
          )
          .join(' ##### ')
      : `${post_data.category} :::: ${post_data.bbsNo}`;
    const linkUrl = `<a href="www.iwedding.co.kr${encodeURIComponent(router.asPath)}" target="_blank">::${post_data.title}::</a>`;
    const onLogType = () => {
      switch (contentCategory) {
        case '1':
          return SEARCH_BRAND_OPEN[getLoggerDeviceType()];
        case 'product':
          return SEARCH_PRODUCT_OPEN[getLoggerDeviceType()];
        case '3':
          return SEARCH_EVENT_OPEN[getLoggerDeviceType()];
        case '4':
          return SEARCH_CONTENT_OPEN[getLoggerDeviceType()];
        default:
          return '';
      }
    };
    const url = 'js_data/web_log_user2';
    const logData = {
      log_type_no: onLogType(),
      log_text1: linkUrl,
      log_text2: doneText2,
      log_int1: contentCategory === 'product' ? post_data.prdNo : post_data.bbsNo,
    };
    const { result } = isLogin ? await fetchFromIBrand(url, logData) : null;
    if (result) {
      return 'OK';
    }
  } catch (err) {
    console.error(err);
  }
};

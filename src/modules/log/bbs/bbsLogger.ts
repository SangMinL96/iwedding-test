import { getLoggerDeviceType } from '@modules/log/logUtils';
import { haveAccessToken } from '@service/TokenService';
import { fetchFromIBrand } from '@utils/fetcher';
import router from 'next/router';
import { SEARCH_FILTER_RESET, SEARCH_ORDER_BY } from '../search/searchLogType';
import {
  BBS_BRAND_OPEN,
  BBS_CONTENT_OPEN,
  BBS_EVENT_OPEN,
  BBS_FILTER_RESET,
  BBS_FILTER_SEARCH,
  BBS_ORDER_BY,
  BBS_PRODUCT_OPEN,
  BBS_ZZIM,
} from './bbsLogType';
// import { fetchFromIBrand } from '@utils/fetcher';
// import { COUPON_EVENT_JOIN, COUPON_PAYMENT_JOIN } from './conponLogType';

// 키워드,필터 검색 로그
export const bbsFliterLog = async (mainCategory: string, keyword: string, isKeyword: boolean = false) => {
  const isLogin = haveAccessToken();
  console.log(isLogin);
  try {
    const linkUrl = `<a href="www.iwedding.co.kr${encodeURIComponent(
      router.asPath,
    )}" target="_blank">::${mainCategory}페이지에서 "${keyword}" ${isKeyword ? '검색' : '필터적용'}::</a>`;
    const url = 'js_data/web_log_user2';
    const logData = {
      log_type_no: BBS_FILTER_SEARCH[getLoggerDeviceType()],
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

export const bbsOrderByLog = async (mainCategory: string, orderBy: string, isSearch: boolean) => {
  const isLogin = haveAccessToken();
  try {
    const linkUrl = `<a href="www.iwedding.co.kr${encodeURIComponent(
      router.asPath,
    )}" target="_blank">::${mainCategory}페이지에서 "${orderBy}" 정렬::</a>`;
    const url = 'js_data/web_log_user2';
    const logData = {
      log_type_no: isSearch ? SEARCH_ORDER_BY[getLoggerDeviceType()] : BBS_ORDER_BY[getLoggerDeviceType()],
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

export const bbsFilterReset = async (isSearch?: boolean) => {
  const isLogin = haveAccessToken();
  try {
    const url = 'js_data/web_log_user2';
    const logData = {
      log_type_no: isSearch ? SEARCH_FILTER_RESET[getLoggerDeviceType()] : BBS_FILTER_RESET[getLoggerDeviceType()],
      log_text1: '',
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

export const bbsZzimLog = async (contentCategory: string, title: string, post_data: PostDataType) => {
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
    const url = 'js_data/web_log_user2';
    const logData = {
      log_type_no: BBS_ZZIM[getLoggerDeviceType()],
      log_text1: `카테고리 검색 결과에서 ::${title}:: 좋아요`,
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

export const bbsDetail = async (contentCategory: string, post_data: PostDataType) => {
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
          return BBS_BRAND_OPEN[getLoggerDeviceType()];
        case 'product':
          return BBS_PRODUCT_OPEN[getLoggerDeviceType()];
        case '3':
          return BBS_EVENT_OPEN[getLoggerDeviceType()];
        case '4':
          return BBS_CONTENT_OPEN[getLoggerDeviceType()];
        default:
          return '';
      }
    };
    const url = 'js_data/web_log_user2';
    const logData = {
      log_type_no: onLogType(),
      log_text1: linkUrl,
      log_text2: doneText2,
      log_int1: `${contentCategory === 'product' ? post_data.prdNo : post_data.bbsNo}`,
    };
    const { result } = isLogin ? await fetchFromIBrand(url, logData) : null;
    if (result) {
      return 'OK';
    } 
  } catch (err) {
    console.error(err);
  }
};

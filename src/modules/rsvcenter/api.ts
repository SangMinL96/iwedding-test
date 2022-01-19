import { fetchFromIBrand } from '@utils/fetcher';
import myAxios from '@utils/MyAxios';

export const rsvCenterKeys = {
  procResult: 'rsvCenter/proc',
  procSearch: 'rsvCenter/search',
  inquiryAlldata: 'rsvCenter/inquiryAlldata',
  inquiryHanbokDetailData: 'rsvCenter/inquiryHanbokDeatilData',
  inquiryRobesDetailData: 'rsvCenter/inquiryRobesDeatilData',
  inquiryGiftDetailData: 'rsvCenter/inquiryGiftDeatilData',
  inquiryCategory: 'rsvCenter/inquiryCategory',
  hallSearch: 'rsvCenter/hall/search',
  hallTypeSearch: 'rsvCenter/hallType/search',
};
export const easyBookProcAPI = async (data: any) => {
  try {
    const url = 'js_data/easy_book_proc';
    const { result } = await fetchFromIBrand(url, data);
    if (result) {
      return 'OK';
    } else {
      window.alert('등록 실패하였습니다. 관리자에게 문의해주세요.');
    }
  } catch (err) {
    console.error(err);
  }
};

export const easyBookProcSearchAPI = async (category: string, search: string) => {
  try {
    const url = 'js_data/get_ent';
    const { data } = await fetchFromIBrand(url, { category, search });
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const getInquiryDetailAPI = async (no: string) => {
  try {
    const url = 'js_data/get_easy_book_response_hanbok';
    const { data } = await fetchFromIBrand(url, { no });
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const hallSearchAPI = async (term: string) => {
  try {
    const url = 'js_data/hall_find_result';
    const { data } = await fetchFromIBrand(url, { term });
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const hallTypeSearchAPI = async (banquet_code: string) => {
  try {
    const url = 'js_data/halltype_find_result';
    const { data } = await fetchFromIBrand(url, { banquet_code });
    return data;
  } catch (err) {
    console.error(err);
  }
};

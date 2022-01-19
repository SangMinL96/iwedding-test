import { getAccessToken } from '@service/TokenService';
import myAxios from '@utils/MyAxios';
import axios from 'axios';
import { MainDataType } from './interface';

export const mainKeys = {
  mainData: 'main/index',
  templateData: 'main/page',
  mainRecentData: 'main/resent',
  mainRecentLeftData: 'main/left/resent',
};

export const getMainData = async () => {
  try {
    const result = await axios.get<MainDataType[]>('https://www.ibrandplus.co.kr/index.php/js_data/main_js_data');
    return result.data;
  } catch (err) {
    console.error(err);
  }
};

export const getMainPageData = async (pageNum: number) => {
  try {
    if (pageNum) {
      const result = await myAxios.get<MainDataType[]>(`https://www.ibrandplus.co.kr/index.php/js_data/main_js_data/${pageNum}`, {
        withCredentials: false,
      });
      if (result.data.length === 0) {
        const result = await axios.get<MainDataType[]>('https://www.ibrandplus.co.kr/index.php/js_data/main_js_data');
        return result.data;
      } else {
        return result.data;
      }
    } else {
      const result = await axios.get<MainDataType[]>('https://www.ibrandplus.co.kr/index.php/js_data/main_js_data');
      return result.data;
    }
    // return result.data;
  } catch (err) {
    console.error(err);
  }
};

export const getTemplateDate = async (pageNum: number) => {
  try {
    if (pageNum) {
      const result = await axios.get(`https://www.ibrandplus.co.kr/index.php/js_data/prd_cate_manage_data/${pageNum}`);
      return result.data.data;
    }
  } catch (err) {
    console.error(err);
  }
};

export const getTmpAllData = async (pageNum: number) => {
  try {
    if (process.env.NODE_ENV === 'development') {
      axios.defaults.baseURL = process.env.NEXT_PUBLIC_PHP_WEB_HOST;
    } else {
      axios.defaults.baseURL = process.env.NEXT_PUBLIC_WEB_HOST;
    }
    const result = await axios.get(`/index.php/js_data/prd_cate_manage_data/${pageNum ? pageNum : ''}`);
    return result?.data?.data;
  } catch (err) {
    console.dir(err);
  }
};

export const mainRecentAPI = async () => {
  try {
    axios.defaults.baseURL = process.env.NEXT_PUBLIC_PHP_WEB_HOST;
    const url = 'brandplus/get_recent_view';
    const result = await axios.post(url, {});
    if (result.status === 200) {
      return result.data;
    } else {
      window.alert('날개배너 정보를 불러오는데 실패하였습니다. 관리자에게 문의해주세요.');
    }
  } catch (err) {
    console.error(err);
  }
};

export const mainLeftRecentAPI = async () => {
  try {
    axios.defaults.baseURL = process.env.NEXT_PUBLIC_PHP_WEB_HOST;
    const url = 'index.php/js_data/site_benner';
    const { data } = await axios.post(
      url,
      { set_type: 'left' },
      { withCredentials: false, headers: { ['Authorization']: 'Bearer ' + getAccessToken() } },
    );
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const bannerZzimAPI = async (data: any) => {
  try {
    axios.defaults.baseURL = process.env.NEXT_PUBLIC_PHP_WEB_HOST;
    const url = 'index.php/js_data/brandplus_like_ajax';
    await axios.post(url, data, { withCredentials: false, headers: { ['Authorization']: 'Bearer ' + getAccessToken() } });
    return 'OK';
  } catch (err) {
    console.error(err);
  }
};

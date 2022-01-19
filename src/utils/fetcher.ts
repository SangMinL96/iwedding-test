import { sendErrorToSynology } from '@service/synologyAlarmService';
import { getAccessToken } from '@service/TokenService';
import myAxios from '@utils/MyAxios';
import { AxiosRequestConfig } from 'axios';
import { phpAuthRetry } from './authRetry';
import { getDeviceType } from './getDeviceType';
import phpAxios from './PhpAxios';

const synologyErrorBaseMsg = (url: string) => {
  if (/main_user|main_js|benner/.test(url)) return `\n@홍승용\n`;
  if (/coupon|easy_book|get_ent/.test(url)) return `\n@이상민\n`;
  return `\n@이상민 @홍승용 @이규리\n`;
};

const skippableErrors = /400|401|403|404|토큰|Network|undefined|TypeError|timeout|abort/;

export const fetcher = async <T>(url: string, config?: AxiosRequestConfig): Promise<T | null> => {
  try {
    if (process.env.NEXT_PUBLIC_STAGING) {
      myAxios.defaults.baseURL = process.env.NEXT_PUBLIC_STAGING_API_HOST + '/api/v1/';
    } else {
      myAxios.defaults.baseURL = process.env.NEXT_PUBLIC_API_HOST + '/api/v1/';
    }

    const { data, status } = await myAxios.get<T>(url, config);
    return data;
  } catch (error) {
    if (skippableErrors.test(String(error))) return;
    else
      sendErrorToSynology({
        message: `${synologyErrorBaseMsg(url)}GET\n${error}\nURL: ${url}\ntoken: ${getAccessToken()}`,
      });
  }

  return null;
};
export const postFetcher = async <T>(url: string, params: any, config?: AxiosRequestConfig): Promise<T | null> => {
  try {
    if (process.env.NEXT_PUBLIC_STAGING) {
      myAxios.defaults.baseURL = process.env.NEXT_PUBLIC_STAGING_API_HOST + '/api/v1/';
    } else {
      myAxios.defaults.baseURL = process.env.NEXT_PUBLIC_API_HOST + '/api/v1/';
    }

    const { data, status } = await myAxios.post<T>(url, params, config);
    return data;
  } catch (error) {
    if (skippableErrors.test(String(error))) return;
    else
      sendErrorToSynology({
        message: `${synologyErrorBaseMsg(url)}GET\n${error}\nURL: ${url}\nparams: ${JSON.stringify(params)}\ntoken: ${getAccessToken()}`,
      });
  }

  return null;
};

export const fetchFromIBrand = async <T>(url: string, params?: any): Promise<T | null> => {
  try {
    const { data, status } = await phpAxios.post<T>(url, { ...params, device: getDeviceType() }, { withCredentials: false });
    if (status === 205) {
      const response = await phpAuthRetry(url, params);
      console.log(`after authRetry response`, response?.data);
      return response?.data;
    }
    return data;
  } catch (error) {
    if (skippableErrors.test(JSON.stringify(error))) return;
    sendErrorToSynology({
      message: `${synologyErrorBaseMsg(url)}POST\n${error}\nURL: ${url}\nData: ${JSON.stringify(params)}\ntoken: ${getAccessToken()}`,
    });
  }

  return null;
};

export const postFormDataToIBrand = async <T>(url: string, formData: FormData): Promise<T> => {
  try {
    const { data, status } = await phpAxios.post(url, formData, { withCredentials: false });

    if (status === 205) {
      const response = await phpAuthRetry(url, formData);
      return response?.data;
    }

    return data;
  } catch (error) {
    if (skippableErrors.test(JSON.stringify(error))) return;
    sendErrorToSynology({
      message: `${synologyErrorBaseMsg(url)}POST\n${error}\nURL: ${url}\nformData: ${JSON.stringify([...formData])}`,
    });
  }

  return null;
};

const setDefaultPHPURL = () => {
  if (process.env.NODE_ENV === 'development') {
    myAxios.defaults.baseURL = process.env.NEXT_PUBLIC_PHP_WEB_HOST + '/index.php';
  } else {
    myAxios.defaults.baseURL = process.env.NEXT_PUBLIC_WEB_HOST + '/index.php';
  }
};

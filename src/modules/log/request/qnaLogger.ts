import { haveAccessToken } from '@service/TokenService';
import { fetchFromIBrand } from '@utils/fetcher';
import { CalcLogProps } from '../calculator/calcLogType';
import { getLoggerDeviceType, loggerDeviceCategory, WEB_LOG_USER2_URL } from './../logUtils';
import { QUOTE_MY_QNA_OPEN_LOG_TYPES, QUOTE_QNA_COMPLETE_LOG_TYPES, QUOTE_RT_QNA_OPEN_LOG_TYPES } from './qnaLogType';

const QUOTE_QNA_LOG_COMPLETE = '견적함에서 문의 신청';
const QUOTE_QNA_LOG_OPEN = '견적함에서 문의 열람';

interface LogProps {
  logType: number[];
  logDesc: string;
  logCat2?: string;
  logText1: string;
  logText2?: string;
}

const logQnA = async ({ logType, logCat2, logText1, logText2 }: LogProps) => {
  const isLogin = haveAccessToken();
  const device = getLoggerDeviceType();

  const logData: CalcLogProps = {
    log_type_no: logType[device],
    log_category1: loggerDeviceCategory[device],
    log_category2: logCat2,
    log_description: logCat2,
    log_text1: logText1,
    log_text2: logText2 ?? '-',
  };
  if (isLogin) {
    await fetchFromIBrand(WEB_LOG_USER2_URL, logData);
  }
};

export const logQnAComplete = async (quoteID: number, mainCategory: string, title: string) => {
  await logQnA({
    logType: QUOTE_QNA_COMPLETE_LOG_TYPES,
    logCat2: QUOTE_QNA_LOG_COMPLETE,
    logDesc: QUOTE_QNA_LOG_COMPLETE,
    logText1: `<a href="https://www.iwedding.co.kr/quotation/${quoteID}" target="_blank">${title}</a>`,
    logText2: `:: ${mainCategory} ::::`,
  });
};

export const logQnAOpen = async (quoteID: number, isRealtime?: boolean) => {
  await logQnA({
    logType: isRealtime ? QUOTE_RT_QNA_OPEN_LOG_TYPES : QUOTE_MY_QNA_OPEN_LOG_TYPES,
    logCat2: QUOTE_QNA_LOG_OPEN,
    logDesc: QUOTE_QNA_LOG_OPEN,
    logText1: `<a href="https://www.iwedding.co.kr/quotation/${quoteID}" taget="_blank">견적함에서 문의하기 열람</a>`,
  });
};

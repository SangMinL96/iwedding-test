import { WmProductEntity } from '@modules/product/product.interface';
import { haveAccessToken } from '@service/TokenService';
import { fetchFromIBrand } from '@utils/fetcher';
import { getLoggerDeviceType, loggerDeviceCategory, WEB_LOG_USER2_URL } from './../logUtils';
import { CalcLogProps, CALC_COMPLETE_LOG_TYPES, CALC_OPEN_LOG_TYPES } from './calcLogType';

const CALC_LOG_CATEGORY = '스드메계산기';
const CALC_COMPLETE_DESC = '셀프 계산 완료';
const CALC_OPEN_DESC = '페이지 열람';

interface LogCalcProps {
  logType: number[];
  logDesc: string;
  logText1: string;
  logText2?: string;
}

const logCalc = async ({ logType, logDesc, logText1, logText2 = '패키지' }: LogCalcProps) => {
  const isLogin = haveAccessToken();
  const device = getLoggerDeviceType();

  const logData: CalcLogProps = {
    log_type_no: logType[device],
    log_category1: loggerDeviceCategory[device],
    log_category2: CALC_LOG_CATEGORY,
    log_description: logDesc,
    log_text1: logText1,
    log_text2: logText2,
  };
  if (isLogin) {
    await fetchFromIBrand(WEB_LOG_USER2_URL, logData);
  }
};

export const logCalcComplete = async (products: WmProductEntity[]) => {
  let logText1 = `스드메 계산기로 셀프 견적 확인<br />`;

  products.forEach(p => {
    logText1 += `
    <br />
    <a href="${process.env.NEXT_PUBLIC_WEB_HOST}/enterprise/prd/${p?.enterprise_code}/${p?.no}" target="_blank">${p?.category} - ${p?.ent_name} - ${p?.name}</a>`;
  });

  await logCalc({
    logType: CALC_COMPLETE_LOG_TYPES,
    logDesc: CALC_COMPLETE_DESC,
    logText1: logText1,
    logText2: `패키지 ::::`,
  });
};

export const logCalcOpen = async () => {
  await logCalc({
    logType: CALC_OPEN_LOG_TYPES,
    logDesc: CALC_OPEN_DESC,
    logText1: `<a href="https://www.iwedding.co.kr/calculator" taget="_blank">스드메 계산기 페이지 열람</a>`,
  });
};

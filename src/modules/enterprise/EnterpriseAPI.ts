import { EnterpriseDto } from './enterprise.interface';
import myAxios from '@utils/MyAxios';

/**
 * 업체검색
 */
export const fetchEnterpriseByName = (entName: string, category = '') => {
  return myAxios.get<EnterpriseDto[]>(`/enterprise?ent_name=${entName}&category=${category}`);
};

/**
 * 웨딩홀 검색
 * @param entName
 */
export const fetchWeddingHallByName = (entName: string) => {
  return myAxios.get<EnterpriseDto[]>(`/enterprise/wedding_hall?ent_name=${entName}`);
};

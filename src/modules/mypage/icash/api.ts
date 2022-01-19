import { MissionCategory } from './IcashInterface';
import { fetcher, fetchFromIBrand } from '@utils/fetcher';

export const icashKeys = {
  getMissionCategoryList: 'icashKeys/getMissionCategoryList',
  getMissionCategory: 'icashKeys/getMissionCategory',
};
export const getMissionCategoryListAPI = async () => {
  try {
    const url = '/icash/mission-category';
    const data = await fetcher<MissionCategory[]>(url);

    return data;
  } catch (err) {
    console.error(err);
  }
};

export const getMissionCategoryAPI = async (id: string) => {
  try {
    const url = '/icash/mission-category/' + id;
    const data = await fetcher<MissionCategory>(url);
    const missions = data.missions.map(item => ({ ...item, listOpen: false }));
    return { ...data, missions };
  } catch (err) {
    console.error(err);
  }
};

import myAxios from '@utils/MyAxios';
import {
  IcashMissionInquire,
  IcashMissionPt,
  IcashUseStatus,
  MissionCategory,
  MissionType1,
  MissionType2,
  UserICash,
} from './IcashInterface';
import useRequest from '../../../hooks/useRequest';
import { ICashMissionStatus } from '../../../feature/icash/participation_list/participation_list.index';
const DOMAIN = '/icash';
export const IcashAPI = {
  getMissionCategoryList: () => {
    return myAxios.get<MissionCategory[]>(DOMAIN + '/mission-category');
  },

  getMissionCategory: (id: string) => {
    return myAxios.get<MissionCategory>(DOMAIN + '/mission-category/' + id);
  },

  getFaq: () => {
    return useRequest<IcashMissionInquire[]>('ICASH_FAQ', { url: '/icash/faq' });
  },

  getType1: (id: string) => {
    return myAxios.get<MissionType1>(DOMAIN + '/type1/' + id);
  },
  getType2: (id: string) => {
    return myAxios.get<MissionType2>(DOMAIN + '/type2/' + id);
  },

  applyMission: (mission: IcashMissionPt) => {
    return myAxios.post(DOMAIN + '/mission', mission);
  },

  missionList: (sort?: ICashMissionStatus) => {
    let url = DOMAIN + '/missions';
    if (sort != undefined) {
      url += `?sort=${sort}`;
    }
    return myAxios.get<IcashMissionPt[]>(url);
  },

  getCashList: (sort?: IcashUseStatus) => {
    let url = DOMAIN + '/cash';
    if (sort != undefined) {
      url += `?sort=${sort}`;
    }
    return myAxios.get<UserICash[]>(url);
  },

  banner: () => {
    const url = DOMAIN + '/banner';
    return myAxios.get<{ url: string; img_url: string }>(url);
  },
};

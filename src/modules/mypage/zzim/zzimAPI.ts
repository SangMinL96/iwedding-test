import { Desktop } from '@hooks/useDevice';
import { PaginationInterface } from '@modules/CommonInterface';
import { fetcher } from '@utils/fetcher';
import myAxios from '@utils/MyAxios';
import useSWR from 'swr';
import { IbrandCountEntity, ZzimListType } from './zzimInterface';

// export const ZzimApi = {
//   async listAll(isDeskTop: boolean) {
//     const device = isDeskTop ? 'desktop' : 'mobile';
//     const brand = await myAxios.get<PaginationInterface<IbrandCountEntity>>(`/zzim?type=brand&device=${device}`);
//     const content = await myAxios.get<PaginationInterface<IbrandCountEntity>>(`/zzim?type=content&device=${device}`);
//     const product = await myAxios.get<PaginationInterface<IbrandCountEntity>>(`/zzim?type=product&device=${device}`);
//     const event = await myAxios.get<PaginationInterface<IbrandCountEntity>>(`/zzim?type=event&device=${device}`);
//     return { brand: brand?.data, content: content?.data, product: product?.data, event: event?.data };
//   },

//   async zzimList(type: ZzimListType, page = 1) {
//     switch (type) {
//       case ZzimListType.BRAND:
//         return myAxios.get<PaginationInterface<IbrandCountEntity>>(`/zzim?type=brand&page=${page}&device=desktop`);
//       case ZzimListType.CONTENT:
//         return myAxios.get<PaginationInterface<IbrandCountEntity>>(`/zzim?type=content&page=${page}&device=desktop`);
//       case ZzimListType.PRODUCT:
//         return myAxios.get<PaginationInterface<IbrandCountEntity>>(`/zzim?type=product&page=${page}&device=desktop`);
//       case ZzimListType.EVENT:
//         return myAxios.get<PaginationInterface<IbrandCountEntity>>(`/zzim?type=event&page=${page}&device=desktop`);
//     }
//   },

//   async zzimDelete(zzim_id: number) {
//     return myAxios.delete('/zzim/cancel/' + zzim_id);
//   },

//   async zzimDeleteAll(type: ZzimListType) {
//     return myAxios.delete('/zzim/cancel_all?type=' + type);
//   },
// };

const ZZIM_LIST_API = '/zzim';

export const useAllZzimList = (isDesktop: boolean) => {};
export const useZzimList = (type: ZzimListType, page = 1) => {
  const device = Desktop() ? 'desktop' : 'mobile';
  return useSWR<PaginationInterface<IbrandCountEntity>>(`${ZZIM_LIST_API}?type=${type}&page=${page}&device=${device}`, fetcher);
};
export const deleteZzim = async (zzim_id: number) => {
  return myAxios.delete('/zzim/cancel/' + zzim_id);
};
export const deleteAllZzim = async (type: ZzimListType) => {
  return myAxios.delete('/zzim/cancel_all?type=' + type);
};

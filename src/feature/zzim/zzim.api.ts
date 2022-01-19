import { PaginationInterface } from '@modules/CommonInterface';
import myAxios from '@utils/MyAxios';
import { IbrandCountEntity, ZzimListType } from './zzim.interface';

export const ZzimApi = {
  async listAll(isDeskTop: boolean, sort: string = 'latest_zzim') {
    const device = isDeskTop ? 'mobile' : 'mobile';
    const brand = await myAxios.get<PaginationInterface<IbrandCountEntity>>(
      `${process.env.NEXT_PUBLIC_LOCAL_API_HOST}/api/v1/zzim?type=brand&device=${device}&sort=${sort}`,
    );
    const content = await myAxios.get<PaginationInterface<IbrandCountEntity>>(
      `${process.env.NEXT_PUBLIC_LOCAL_API_HOST}/api/v1/zzim?type=content&device=${device}&sort=${sort}`,
    );
    const product = await myAxios.get<PaginationInterface<IbrandCountEntity>>(
      `${process.env.NEXT_PUBLIC_LOCAL_API_HOST}/api/v1/zzim?type=product&device=${device}&sort=${sort}`,
    );
    const event = await myAxios.get<PaginationInterface<IbrandCountEntity>>(
      `${process.env.NEXT_PUBLIC_LOCAL_API_HOST}/api/v1/zzim?type=event&device=${device}&sort=${sort}`,
    );
    return { brand: brand?.data, content: content?.data, product: product?.data, event: event?.data };
  },
  // 수정라인

  async zzimList(isDeskTop: boolean, type: ZzimListType, page = 1) {
    const device = isDeskTop ? 'mobile' : 'mobile';
    switch (type) {
      case ZzimListType.BRAND:
        return myAxios.get<PaginationInterface<IbrandCountEntity>>(
          `${process.env.NEXT_PUBLIC_LOCAL_API_HOST}/api/v1/zzim?type=brand&page=${page}&device=${device}`,
        );
      case ZzimListType.CONTENT:
        return myAxios.get<PaginationInterface<IbrandCountEntity>>(
          `${process.env.NEXT_PUBLIC_LOCAL_API_HOST}/api/v1/zzim?type=content&page=${page}&device=${device}`,
        );
      case ZzimListType.PRODUCT:
        return myAxios.get<PaginationInterface<IbrandCountEntity>>(
          `${process.env.NEXT_PUBLIC_LOCAL_API_HOST}/api/v1/zzim?type=product&page=${page}&device=${device}`,
        );
      case ZzimListType.EVENT:
        return myAxios.get<PaginationInterface<IbrandCountEntity>>(
          `${process.env.NEXT_PUBLIC_LOCAL_API_HOST}/api/v1/zzim?type=event&page=${page}&device=${device}`,
        );
    }
  },
};

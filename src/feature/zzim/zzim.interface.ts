import { PaginationInterface } from '@modules/CommonInterface';
import { WmEnterpriseEntity, WmProductEntity } from '@modules/product/product.interface';

export enum ZzimListType {
  BRAND = 'brand',
  PRODUCT = 'product',
  CONTENT = 'content',
  EVENT = 'event',
}

export class IbrandCountEntity {
  no: number;

  bbsNo: number;

  type: number;

  shareSite: string;
  folderNo: number;

  regDate: Date;

  entId: string;

  entCode: string;

  prdNo: number;

  ent: WmEnterpriseEntity;
  tciv: any;
  // relate_ent?: IbrandplusRelateEnt;

  bbs: IbrandplusBbs;

  product?: WmProductEntity;

  liked = true;
}

export class IbrandplusRelateEnt {
  no: number;

  ibrandplusNo: number;

  entCode: string;

  entName: string;

  svcType: string;

  category: string;

  gubun: string;

  regDate: Date;
}

export class IbrandplusBbs {
  no: number;
  brandCode: string;
  thumbnail: string;
  fbThumbnail: string | null;
  title: string;
  contents: string;
  always: string;
  contentsText: string | null;
  date: Date;
  viewCnt: number;
  startdate: string | null;
  enddate: string | null;
  event: number | null;
  idx: number | null;
  hashtag: string | null;
  directLink: string;
  entKeyword: string | null;
}

export interface ZzimTabsProps {
  active: boolean;
  content: any;
  refetch: any;
  category?: string;
  page?: number;
}

import { PaginationMeta } from '@modules/CommonInterface';

export interface BBSResponse {
  list: BBSItem[];
  meta: PaginationMeta;
}
export interface BBSItem {
  no: number;
  contentsCategory: number;
  title: string;
  enterpriseCode: string;
  enterpriseName: string;
  thumbnail: string;
  enterprise: { bpchk: number; logo: string; createdAt: string };
  startdate: string;
  enddate: string;
  // trackingUrl: string;
  weddingHall: { logo: string; banquetCode: number; bpchk: string };
  couponAvailable?: boolean;
  isNew?: boolean;
  bbsViewCntDisp: number;
  tciv: Typical[];
}

export interface TagResponse {
  group_name: string;
  group_item_name: string;
  typical: string;
}

export interface SubCategoryResponse {
  no: string;
  sub_category?: string;
  main_category?: string;
}
export interface BBSTag {
  groupName: string;
  groupItemName: string;
  typical: string;
}

export interface Typical {
  no: number;
  bbsNo: number;
  groupItemNo: number;
  groupNo: number;
  itemValueNo: number;
  typicalCode: string;
  typicalValue: string;
  typicalType: string;
}

export type TagProps = Omit<BBSTag, 'groupItemName'>;
export type ProcessedTags = { [key: string]: TagProps[] };

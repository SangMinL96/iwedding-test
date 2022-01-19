import { WeddingOrder, WeddingOrderGoods } from '@modules/mypage/order/order.interface';

export interface WeddingUser {
  orders: WeddingOrder[];
  no: number;
  id: string;
  email?: string;
  password: string;
  name: string;
  userSns?: WeddingSns[];

  /**
   * 핸드폰 번호
   * - 기호 반드시 포함
   */
  hp: string;
  snsType?: SnsType;
  snsId?: string;
  /**
   * 모바일에서 가입했는지 여부
   * 0 = PC
   * 7 = (현재)아이웨딩 App Android
   * 8 = (현재)아이웨딩 App iOS\n9 = iWeddingOnline Mobile
   * 10 = (개발)iWeddingOnline App Android
   * 11 = (개발)iWeddingOnline App iOS
   */
  isMobile: number;
  serviceType: string;

  isDistribution: boolean;

  date: Date;

  lastLoginTime?: Date;
}

export interface WeddingSns {
  snsNo: number;
  snsType: SnsType;
  snsId: string;
  snsEmail: string;
  lastLoginDate: Date;
  joinType: string;
  weddingUser: WeddingUser;
}

export enum SnsType {
  GOOGLE = 1,
  FACEBOOK = 2,
  NAVER = 3,
  KAKAO = 4,
  APPLE = 5,
}

export class QuotationLogDTO {
  groupNo?: any;
  enterprise_name?: string;
  product_name?: string;
  target_quotation_no?: string | number;
  target_quotation_name?: string;
}

export class QuotationDetailLogDTO extends QuotationLogDTO {
  is_realtime: boolean;
}
export class QuotationCopyLogDTO extends QuotationLogDTO {
  is_realtime: boolean;
}

export class QuotationSearchLogDTO extends QuotationLogDTO {
  keyword: string;
}

export class QuotationChatLogDTO extends QuotationLogDTO {
  is_realtime: boolean;
  add_product: boolean;
  product_no?: number;
}

export class QuotationDetailSortLogDTO extends QuotationLogDTO {
  price_range?: string;
  category?: string;
  ent_code?: string;
  product_no?: string;
  updatedRange?: string;
}

export class OrderLogDto {
  order?: WeddingOrder;
  order_no?: number;
  goods_no?: number;
  is_free?: boolean;
}

export class OrderQuestionLogDto {
  questionStr: string;
  selectedGoods: WeddingOrderGoods[];
}

export class OrderCancelRequestLogDto {
  cancelStr: string;
  selectedGoods: WeddingOrderGoods[];
}

export interface UserInfoItf {
  cart_cnt: string;
  like_cnt: string;
  my_cart_cnt: string;
  user_name: string;
  web_id: string;
}

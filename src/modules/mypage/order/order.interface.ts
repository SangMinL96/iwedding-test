import { IbrandMyCouponLogEntity, WmCouponEntity } from '@modules/mypage/coupon/interface';
import { WmProductEntity } from '@modules/product/product.interface';
import { WeddingUser } from '@modules/user/user.interface';

export interface WeddingOrder {
  order_no: number;
  user: WeddingUser;
  kcp: KcpPaymentEntity;
  goods: WeddingOrderGoods[];
  couponLogs: IbrandMyCouponLogEntity[];
  web_id: string;
  with_id: string;
  total_price: number;
  icash_price: number;
  coupon_price: number;
  payment_price: number;
  pay_type: boolean;
  pay_method: PayMethod;
  order_status: number;
  reg_date: Date;
  enc_key: string;
  pay_data: string;
  order_status_title: string;
  is_cancel: boolean;
  is_free_order: boolean;
  free_order?: FreeOrder;
  iwedding_free_kcp: UserPaymentHist[];
  direct_free_kcp: UserPaymentHist;
  freeOrderPayments: FreeOrderPayments;
  list_code: string;
}

export class FreeOrder {
  //계약금
  c_price: number;

  c_date: string;

  c_place: string;

  //자유계약 금액 결제완료
  payment_complete: boolean;

  //잔금
  m_price: number;

  m_date: string;

  m_place: string;

  m_payment_complete: boolean;

  //잔금2
  f_price: number;

  f_date: string;

  f_place: string;

  //자유계약 잔금 금액 결제완료
  f_payment_complete: boolean;

  payment: UserPaymentHist;

  needToBalance: boolean;

  needToBalanceType: BalanceType;

  needToBalancePrice: number;

  freeOrderPayments: FreeOrderPayments;
}

export interface FreeOrderPayments {
  complete: { iwedding: IweddingFreeOrderPayment[]; direct: DirectFreeOrderPayment[] };
  balance: AbstractFreeOrderPayment;
}

export enum FreeOrderType {
  c = 'C',
  m = 'M',
  f = 'F',
}

export class AbstractFreeOrderPayment {
  price: number;
  place: string;
  type: FreeOrderType;

  constructor(price: string, place: string, type: FreeOrderType, payment: UserPaymentHist) {
    this.price = Number(price) || 0;
    this.place = place;
    this.type = type;
  }
}

export class IweddingFreeOrderPayment extends AbstractFreeOrderPayment {}

export class DirectFreeOrderPayment extends AbstractFreeOrderPayment {}
export enum BalanceType {
  m = 'm',
  f = 'f',
}

export interface UserPaymentHist {
  no: number;

  id: string;

  listCode: string;

  payType: string;

  payPrice: number;

  payMethod: string;

  payDate: Date;

  timeCreated: Date;

  place: string;
}
export enum OrderStatus {
  PAYMENT_WAIT,
  PAYMENT_COMPLETE,
  PAYMENT_EXPIRED,
}

export enum PayMethod {
  CARD = 1,
  BANK = 2,
}

export enum BookingStatus {
  PAYMENT_WAIT,
  PAYMENT_COMPLETE,
  BOOKING_PREPARE,
  BOOKING_COMPLETE,
  PAYMENT_EXPIRED,
  CANCEL,
}

export enum DeliveryStatus {
  PAYMENT_WAIT,
  PAYMENT_COMPLETE,
  DELIVERY_PREPARE,
  DELIVERY_COMPLETE,
  PAYMENT_EXPIRED,
  CANCEL,
}

export interface WeddingOrderGoods {
  goods_no: number;
  order: WeddingOrder;
  order_no: number;
  product: WmProductEntity;
  product_no: number;
  main_category: GoodMainCategory;
  main_product: WmProductEntity;
  main_product_no: number;
  decodedProduct: DecodedProduct;
  product_cnt: number;
  product_price: number;
  coupon: WmCouponEntity;
  coupon_no: number;
  coupon_price: number;
  ext_info: string | null;
  selectedOptions: WeddingOrderGoods[];
  selectedCoupons: IbrandMyCouponLogEntity[];
  metadata: GoodsRawMetadata[];
  goods_type: GoodsType;
  option_price: number;
  real_coupon_price: number;
  goods_price: number;
  enterprise_rule?: EnterpriseRule;
  ent_code: string;
  order_status_title: string;
  is_cancel: boolean;
}

export interface EnterpriseRule {
  ent_code: string;
  ent_name: string;
  title: string;
  content: string;
}

export interface GoodsRawMetadata {
  template_code: string;
  meta_group_code: string;
  title: string;
  value: string;
  raw_data: any;
}

export interface DecodedProduct {
  ent_code: string;
  product_no: number;
  main_category: number;
  main_product_no: number;
  product_cnt: number;
  no: number;
  price: number;
  name: string;
  enterprise_code: string;
  category: string;
  option1_etc1: string;
  option1: string;
  thumb: string;
  ent_name: string;
  cate_option: boolean;
  price_text: string;
  product_price: number;
}

export enum GoodsType {
  BOOKING,
  DELIVERY,
}
export enum GoodMainCategory {
  NONE,
  MAIN,
  OPTION,
}

export interface KcpPaymentEntity {
  kp_no: number;

  id: string;

  kp_type: string;

  kp_account: number;

  kp_instrument: string;

  kp_settle_date: string;

  kp_bank_num: string;

  kp_receipt_chk: 'Y' | 'N';

  kp_recogn1: 'Y' | 'N';

  kp_recogn2: 'Y' | 'N';

  kp_date: string;

  kp_memo: string;

  list_code: string;

  cm_date: Date;

  cm_check: 'Y' | 'N';

  is_mobile: string;

  web_id: string;

  order_idx: string | null;

  tno: string | null;

  app_no: string | null;

  kp_goods_type: number;

  estimate_no: number;

  estimate_index: number;

  order_no: number;

  order: WeddingOrder;

  icash: number;

  tmp_icash: number | null;

  site_code: string | null;

  va_date?: Date;

  cash_hp: string | null;

  cash_a_no: string | null;

  bankname: string | null;

  depositor: string | null;

  raw_data: any | null;
}

export interface OrderIdPathProps {
  no: string;
}

export interface PayUserInfo {
  with_id: string;
  ordr_idxx: string;
  user_name: string;
  user_email: string;
  user_hp: string;
}

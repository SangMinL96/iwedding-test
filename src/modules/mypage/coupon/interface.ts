// import { WeddingOrder } from '../orders/order.interface';
// import { WmProductEntity, WmProductOptionEntity } from '../product/product.interface';

export interface EventCouponType {
  icard_no: string;
  icard_title: string;
  category: string;
  img_icard_no: string;
  enterprise_name: string;
  valid_date: string;
  startdate: string;
  enddate: string;
}

export interface PaymentCouponType {
  app_type1: string;
  app_type2: string;
  app_type3: string;
  b_cprice: string;
  b_dis_rate: string;
  b_dprice: string;
  b_etc: string;
  b_price: string;
  b_type: string;
  b_upgrade: string;
  c_name: string;
  c_name2: string;
  c_standard: string;
  category: string;
  cmt: string;
  cond_type: string;
  coupon_no: string;
  coupon_type: string;
  cprice: string;
  del_ok: string;
  detail: string;
  e_date: string;
  enterprise_name: string;
  info: string;
  mc_coupon_no: string;
  mc_no: string;
  thumbnail: string;
  no: string;
  order_no: string;
  package_only: string;
  pic_nostring;
  pic_no_txt: string;
  price: string;
  product_name: string;
  product_no: string;
  product_price: string;
  reg_date: string;
  s_date: string;
  s_type: string;
  u_id: string;
  u_time: string;
  update_date: string;
  use_date: string;
  use_icart: string;
  use_list: string;
  use_site: string;
  use_standard: string;
  w_id: string;
  w_time: string;
}

export interface CouponDetail {
  list: [
    {
      b_cprice: string;
      b_dis_rate: string;
      b_dprice: string;
      b_etc: string;
      b_price: string;
      b_type: string;
      b_upgrade: string;
      c_name: string;
      c_name2: string;
      c_standard: string;
      category: string;
      coll: string;
      cond_type: string;
      coupon_type: string;
      del_ok: string;
      e_date: string;
      ent_id: string;
      enterprise_code: string;
      enterprise_name: string;
      event_price: string;
      main_category: string;
      my_coupon_no: string;
      name: string;
      no: string;
      option1: string;
      option1_edate: string;
      option1_etc1: string;
      option1_etc2: string;
      option1_etc3: string;
      option1_etc4: string;
      option1_sdate: string;
      option_count: string;
      package_only: string;
      pic_no: string;
      pic_no_txt: string;
      price: string;
      product_no: string;
      product_price: string;
      s_date: string;
      s_type: string;
      sub_category: string;
      thumb: string;
      u_id: string;
      u_time: string;
      use_icart: string;
      w_id: string;
      w_time: string;
    },
  ];
}

export class CouponDetailDto {
  no: number;
  c_name2: string;
  s_date: string;
  e_date: string;
  b_type: number;
  b_price: number;
  b_upgrade: string;
  b_etc: string;
}

export interface WmCouponEntity {
  no: number;
  /**
   * 1. 상품쿠폰, 2. 고객쿠폰
   */
  coupon_type: number;

  c_name: string;

  c_name2: string;

  /**
   * 쿠폰 규격
   */
  c_standard: string;

  /**
   * 상시 유무 : 1일때 상시
   */
  s_type: number;

  /**
   * 1.행사기준, 2.발주기준, 3.견적기준
   */
  cond_type: number;

  s_date: Date;

  e_date: Date;

  /**
   *상세혜택 1:할인,2:업그레이드,3:추가해택 / 4:할인가 , 5:할인율, 6: 할인이외'
   */
  b_type: number;

  b_dis_rate: number;

  b_dprice: number;

  b_price: number;

  b_cprice: number;

  b_upgrade: string;

  b_etc: string;

  use_icart: number;

  w_id: string;

  u_id: string;

  w_time: Date;

  u_tim: Date;

  del_ok: number;

  sub: WmCouponSubEntity[];

  // product_options: WmProductOptionEntity[];

  option_count: number;
}

export interface WmCouponSubEntity {
  no: number;

  coupon: WmCouponEntity;

  // product: WmProductEntity;

  product_no: number;

  r_type: number;

  ent_id: string;

  category: string;
}

export interface IbrandMyCouponEntity {
  no: number;
  WEB_ID: string;
  coupon_no: number;
  coupon: WmCouponEntity;
  issue_date: Date;
  expired_date: Date;
  use_date: Date;
  order_no: number;
  // order: WeddingOrder;
}

export interface IbrandMyCouponLogEntity {
  no: number;
  WEB_ID: string;
  coupon_no: number;
  my_coupon: IbrandMyCouponEntity;
  product_no: number;
  cart_no: number;
  // order: WeddingOrder;
  decodedCoupon: WmCouponEntity;
  log_date: Date;
  log_type: CouponLogType;
}

export enum CouponLogType {
  SAVE = 1,
  USE = 2,
  DELETE = 3,
  TEMP = 4,
}

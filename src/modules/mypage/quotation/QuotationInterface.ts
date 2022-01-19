import { CouponDetailDto } from '@modules/mypage/coupon/interface';
import { ProductCategoryValue } from '../../product/product.interface';

export class QuotationListItemDto {
  group_no: number;
  group_name: string;
  group_from?: string;
  group_total_price: number;
  group_total_coupon_price: number;
  carts: CartItem[];
  cart_cnt: number;
  group_modified_at: Date;
  user_name?: string;
}

export class CartItem {
  cart_no: number;
  thumbnail: string;
  product_category: string;
  product_no: number;
  product_name: string;
}

export class QuotationRecommend {
  no: string;
  m_img: string;
  m_img_size: string;
  main_title: string;
  sub_title: string;
  view_img: boolean;
  always: boolean;
  sdate: Date;
  edate: Date;
  url_option: boolean;
  pc_url: string;
  mobile_url: string;
  app_url: string;
  view_count: number;
  write_time: Date;
  update_time: Date;
  update_id: string;
  index_order: number;
  view_ok: number;
  app_link_type: number;
  card_number: number;
}

export class QuotationNameKeyword {
  title: string;
  value: string[];
}

export class QuotationDetail {
  group_no: number;
  group_name: string;
  group_from: boolean;
  group_add_cart: boolean;
  is_yours: boolean;
  group_total_price: number;
  group_total_coupon_price: number;
  carts: CartDto[];
  group_created_at: Date;
  group_modified_at: Date;

  cartsWithCategory: CartWithCategory[];
}

export interface CartWithCategory {
  category: string;
  carts: CartDto[];
}

export class CartDto {
  cart_no: number;
  ent_name: string;
  ent_code: string;
  cart_reg_date: Date;
  appliedCoupons: CouponDetailDto[];
  product: GroupProductDto;
  product_cnt: number;
  options: OptionDto[];
  metadata: GroupMetadataDto[];
  available_coupon_cnt: number;
  available_option_cnt: number;
}

export class OptionDto {
  cart_no?: number;
  product_cnt: number;
  product: GroupProductDto;
}
export class GroupMetadataTemplateDto {
  id: number;
  code: string;
  name: string;
  metadata_template: string;
  modal_title: string;
}
export class GroupMetadataDto {
  id: number;
  template_code: string;
  template_name: string;
  metadata: any;
  template: GroupMetadataTemplateDto;
}

export class Metadata {
  value: any;
  selected_answer_value: string;
}
export class GroupCouponLogDto {
  no: number;
  log_date: Date;
  coupon: CouponDetailDto;
}

export class GroupProductDto {
  no: number;
  category: string;
  name: string;
  thumb: string;
  cmt: string;
  price_txt: string;
  product_price: number;
  price: number;
  option1: string;
  option1_etc1: string;
  limited_sales: boolean;
  limited_sales_cnt: number;
}

export class GroupListAllResponse {
  group_no: number;
  group_name: string;
  group_total_price: number;
  group_total_coupon_price: number;
  group_modified_at: Date;
  cart_cnt: number;
}

// export interface IbrandCartEntity {
//   cart_no: number;
//   ent_code: string;
//   ent_name: string;
//   product: WmProductEntity;
//   main_category: number;
//   main_product_no: number;
//   product_data: string;
//   product_cnt: number;
//   cart_reg_date: Date;
//   main_cart_no: number;
//   is_option_product: boolean;
//
//   options: IbrandCartEntity[];
//   couponLogs: IbrandMyCouponLogEntity[];
//   metadata: CartMetadataEntity[];
//   totalCouponPrice: number;
// }

export interface CartMetadataEntity {
  id: number;
  selected_template_value: string;
  selected_template_name: string;
  metadata: string;
}

export class GroupOptionSelectDto {
  group_no: number;
  cart_no: number;
  options: OptionSelectDto[];
}

export class OptionSelectDto {
  product_cnt: number;
  product_no: number;
}

export class Consulting {
  no: number;
  rehearsal_date: string;
  rehearsal_time: string;
  rehearsal_status: string;
  wedding_date: string;
  wedding_time: string;
  wedding_status: string;
}

export enum ConsultingStatus {
  none = '미정',
  complete = '확정',
  expect = '예정',
}

export interface MetadataValue {
  value: any;
  selected_answer_value: any;
}

export const getModalType = (code: string) => {
  switch (code) {
    case QuotationModalType.META_EVENT:
      return 'event';
    case QuotationModalType.META_TARGET_USER:
    case QuotationModalType.META_TARGET_USER2:
      return 'target_user';
    case QuotationModalType.META_WANTED_EVENT_DATE:
    case QuotationModalType.META_WANTED_VISIT_DATE:
    case QuotationModalType.META_EVENT_DATE:
      return 'date_time';
    case QuotationModalType.META_DELIVERY_ADDRESS:
    case QuotationModalType.META_DELIVERY_ADDRESS2:
    case QuotationModalType.META_DELIVERY_ADDRESS3:
    case QuotationModalType.META_CAR_ADDRESS:
    case QuotationModalType.META_EVENT_ADDRESS:
    case QuotationModalType.META_EVENT_ADDRESS2:
    case QuotationModalType.META_EVENT_ADDRESS3:
      return 'address';
  }
};

export enum QuotationModalType {
  META_EVENT = 'a',
  META_EVENT_DATE = 'b',
  META_WANTED_VISIT_DATE = 'c',
  META_WANTED_EVENT_DATE = 'd',
  META_DELIVERY_ADDRESS = 'e',
  META_DELIVERY_ADDRESS2 = 'f',
  META_DELIVERY_ADDRESS3 = 'g',
  META_EVENT_ADDRESS = 'h',
  META_EVENT_ADDRESS2 = 'i',
  META_EVENT_ADDRESS3 = 'j',
  META_CAR_ADDRESS = 'k',
  META_TARGET_USER = 'l',
  META_TARGET_USER2 = 'm',
}

export function showMetaValueByType(code: string, metadata: MetadataValue, isShoes = false) {
  if (metadata) {
    if (!metadata.selected_answer_value && !metadata.value) return null;
    const modalType = getModalType(code);
    if (modalType === 'event') {
      return metadata.value ? metadata.value : metadata.selected_answer_value;
    } else if (modalType === 'target_user') {
      let str = '';
      str += metadata.selected_answer_value ? metadata.selected_answer_value : '';
      str += metadata.value ? ',' : '';
      str += metadata.value ? metadata.value : '';
      return str;
    } else if (modalType === 'date_time') {
      if (!metadata.value.date && !metadata.value.time) return null;
      return metadata.value.date + ' / ' + metadata.value.time;
    } else if (modalType === 'address') {
      if (!metadata.value.ent_name && !metadata.value.ent_address) return null;
      // const [defaultAddress, detailAddress] = metadata.value.ent_address.split('|');
      // return `${metadata.value.ent_name ? `[${metadata.value.ent_name}]` : ''}${defaultAddress} ${detailAddress || ''}`;
      return `${
        metadata.value.ent_name
          ? metadata.value.ent_name
          : isShoes
          ? metadata.value.ent_address.replace('|', ' ')
          : metadata.value.template_title
      }`;
    }
  }
}

export class UpdateMetadataDto {
  metadata_id: number;
  metadata: any;
}

export class SelectUpdateMetadataDto {
  metadata_list: UpdateMetadataDto[];
}

export interface AddressMetadata {
  template_title: string;
  ent_no: number;
  ent_code: string;
  ent_name: string;
  ent_address: string;
}

export function deleteT(str: string) {
  return str.replace('[t]', '');
}

export function isT(str: string) {
  return str.includes('[t]');
}

export const template_input_title = '직접입력';

export class GroupAddProductDto {
  group_nos: number[];
  selectedProducts: SelectedProduct[];
}
export class GroupItemCntByCategory {
  /**
   * 카테고리 이름
   */
  category: ProductCategoryValue;
  /**
   * 카테고리에 해당하는 상품 개수
   */
  count: number;
}

export class SelectedProduct {
  product_no: number;
  options?: SelectedOption[];
}

export class SelectedOption {
  option_no: number;
  option_cnt: number;
}

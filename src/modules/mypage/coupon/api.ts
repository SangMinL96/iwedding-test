import { fetchFromIBrand } from '@utils/fetcher';
import myAxios from '@utils/MyAxios';

export const mypageCouponKeys = {
  getEventCoupon: 'mypage/event_coupon',
  getPaymentCoupon: 'mypage/payment_coupon',
  delEventCoupon: 'mypage/event_coupon_del',
  delPaymentCoupon: 'mypage/payment_coupon_del',
  getCouponDetail: 'mypage/coupon_detail',
};

export const getEventCoupon = async () => {
  try {
    const url = 'js_data/my_event_coupon';
    const { data } = await fetchFromIBrand(url, {});
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const getPaymentCoupon = async () => {
  try {
    const url = 'js_data/my_payment_coupon';
    const { data } = await fetchFromIBrand(url, {});
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const getCouponDetail = async (coupon_no: string) => {
  try {
    const url = 'js_data/coupon_detail';
    const { data } = await fetchFromIBrand(url, { coupon_no });
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const delEventCoupon = async (couponIds: [number]) => {
  try {
    const url = 'js_data/delete_event_coupon';
    const { data } = await fetchFromIBrand(url, { coupon_arr: couponIds });
    if (data[0]?.result) {
      return 'OK';
    }
  } catch (err) {
    console.error(err);
  }
};

export const delPaymentCoupon = async (couponIds: [number]) => {
  try {
    const url = 'js_data/delete_coupon';
    const { data } = await fetchFromIBrand(url, { coupon_arr: couponIds });
    if (data[0]?.result) {
      return 'OK';
    }
  } catch (err) {
    console.error(err);
  }
};
const domain = '/coupon';

export const getAvailableCoupons = (cart_no: number | string) => {
  return myAxios.get(domain + '?cart_no=' + cart_no);
};

export const appliedSelectCoupons = (cart_no: number, coupon_nos: number[]) => {
  return myAxios.post(domain + '/select', { coupon_nos, cart_no });
};

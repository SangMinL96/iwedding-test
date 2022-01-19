import { CartDto } from '@modules/mypage/quotation/QuotationInterface';

export const getTotalPrice = (cart: CartDto) => {
  const productPrice = cart.product.price * cart.product_cnt;
  const couponPrice = cart.appliedCoupons.length
    ? cart.appliedCoupons.reduce((acc, coupon) => (acc += coupon.b_price * cart.product_cnt), 0)
    : 0;
  const optionPrice = cart.options.length ? cart.options.reduce((acc, option) => (acc += option.product_cnt * option.product.price), 0) : 0;
  return productPrice + optionPrice - couponPrice;
};

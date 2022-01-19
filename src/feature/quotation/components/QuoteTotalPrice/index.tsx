import CommonPrice from '@components/Price/CommonPrice';
import { PriceContainer } from '@components/Price/PriceContainer';
import React from 'react';
import { CouponNotice } from './CouponNotice';

interface Props {
  total: number;
  coupon: number;
  fontSize: number;
}

const QuoteTotalPrice = ({ total, coupon, fontSize }: Props) => {
  return (
    <PriceContainer>
      <CommonPrice fontSize={fontSize} title='총 금액' price={total} />
      {coupon > 0 && <CommonPrice title='할인 쿠폰 적용' fontSize={fontSize} price={-coupon} coupon />}
      <CommonPrice title='최종 혜택 금액' final price={total - coupon} fontSize={fontSize} />
      <CouponNotice />
    </PriceContainer>
  );
};

export default React.memo(QuoteTotalPrice);

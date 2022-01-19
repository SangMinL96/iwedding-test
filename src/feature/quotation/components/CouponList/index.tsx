import React from 'react';
import { CouponDetailDto } from '@modules/mypage/coupon/interface';
import styled from 'styled-components';

import { CouponItem } from './CouponItem';

interface Props {
  appliedCoupons: CouponDetailDto[];
}

const index = ({ appliedCoupons }: Props) => {
  return (
    <List>
      {appliedCoupons.map(appliedCoupon => (
        <CouponItem key={'coupon_' + appliedCoupon.no} appliedCoupon={appliedCoupon} />
      ))}
    </List>
  );
};

const List = styled.ul`
  width: 100%;
  margin-bottom: 20px;
`;

export default index;

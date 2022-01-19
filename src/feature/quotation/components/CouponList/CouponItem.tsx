import React from 'react';
import theme from '@styles/theme';
import { CouponDetailDto } from '@modules/mypage/coupon/interface';
import styled from 'styled-components';

interface Props {
  appliedCoupon: CouponDetailDto;
}

export const CouponItem = ({ appliedCoupon }: Props) => {
  return (
    <Item>
      <span>~{appliedCoupon.e_date}</span>
      <span>{appliedCoupon.c_name2}</span>
    </Item>
  );
};

const Item = styled.li`
  width: 100%;
  position: relative;
  margin-bottom: 10px;
  &:last-child {
    margin-bottom: 0;
  }
  > span {
    display: block;
    font-size: 14px;
    color: #8c8c8c;
    line-height: 20px;
    @media all and (min-width: ${theme.pc}px) {
      font-size: 15px;
    }
  }
`;

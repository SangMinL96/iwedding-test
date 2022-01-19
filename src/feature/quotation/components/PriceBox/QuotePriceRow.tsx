import React from 'react';
import { showPrice } from '@utils/util';
import styled, { css } from 'styled-components';

interface Props {
  price: number;
  coupon?: boolean;
  singleLine?: boolean;
}

export const PriceRow = ({ price, coupon, singleLine }: Props) => {
  return (
    <Row coupon={coupon} singleLine={singleLine}>
      {coupon ? `쿠폰 적용가` : `합계 금액`} {showPrice(price)}원
    </Row>
  );
};

const Row = styled.span<Partial<Props>>`
  display: block;
  color: #262626;

  ${({ singleLine }) =>
    singleLine &&
    css`
      margin-top: 13px;
    `};

  ${({ coupon }) =>
    coupon &&
    css`
      margin-top: 6px;
      color: #ff3535;
    `}
`;

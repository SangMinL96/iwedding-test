import React from 'react';
import { isNumber } from 'lodash';
import { showPrice } from '@utils/util';
import styled, { css } from 'styled-components';

interface Props {
  price: number | string;
  final?: boolean;
  coupon?: boolean;
  lineThrough?: boolean;
}

export const PriceNum = ({ price, final, coupon, lineThrough }: Props) => {
  return (
    <Price final={final} coupon={coupon} lineThrough={lineThrough}>
      {isNumber(price) ? `${showPrice(price)}원` : `${price}`}
    </Price>
  );
};

const Price = styled.p<Partial<Props>>`
  display: inline-block;
  position: absolute;
  top: 0;
  right: 0;
  white-space: nowrap;

  ${({ final }) =>
    final &&
    css`
      font-weight: 700;
      vertical-align: top;
    `}

  ${({ coupon }) =>
    coupon &&
    css`
      color: #ff3535;
    `}

  ${({ lineThrough }) =>
    lineThrough &&
    css`
      text-decoration: line-through;
      color: #8c8c8c;
    `}
`;

import React from 'react';
import styled, { css } from 'styled-components';

interface Props {
  title: string;
  coupon?: boolean;
  regularPrice?: boolean;
}

export const PriceTitle = ({ title, coupon, regularPrice }: Props) => {
  return (
    <Title coupon={coupon} regularPrice={regularPrice}>
      {title}
    </Title>
  );
};

const Title = styled.p<Partial<Props>>`
  display: inline-block;
  ${({ coupon }) =>
    coupon &&
    css`
      color: #ff3535;
    `}
  ${({ regularPrice }) =>
    regularPrice &&
    css`
      color: #8c8c8c;
    `}
`;

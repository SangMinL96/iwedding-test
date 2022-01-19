import React from 'react';
import theme from '@styles/theme';
import styled from 'styled-components';
import { PriceRow } from './QuotePriceRow';

interface Props {
  total: number;
  coupon?: number;
}

const index = ({ total, coupon }: Props) => {
  return (
    <Container>
      <PriceRow singleLine={!coupon} price={total} />
      {!!coupon && <PriceRow coupon={true} price={total - coupon} />}
    </Container>
  );
};

export default index;

const Container = styled.div`
  display: block;
  position: absolute;
  top: 0;
  right: 0;
  text-align: right;
  font-weight: 700;
  font-size: 15px;
  @media all and (max-width: ${theme.pc}px) {
    font-size: 14px;
  }
`;

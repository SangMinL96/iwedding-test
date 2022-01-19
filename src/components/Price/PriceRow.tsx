import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface Props {
  children: ReactNode;
  fontSize?: number;
  bold?: boolean;
  coupon?: boolean;
  regularPrice?: boolean;
}

export const PriceRow = ({ children, fontSize, bold, coupon, regularPrice }: Props) => {
  return (
    <Row fontSize={fontSize} bold={bold} coupon={coupon} regularPrice={regularPrice}>
      {children}
    </Row>
  );
};

const Row = styled.div<Partial<Props>>`
  width: 100%;
  margin-bottom: 10px;
  position: relative;
  font-size: ${({ fontSize }) => (fontSize ? `${fontSize}px` : '14px')};
  font-weight: ${({ bold }) => bold && 600};
  color: ${({ coupon, regularPrice }) => (coupon ? '#ff3535' : regularPrice ? '#8c8c8c' : '')};
`;

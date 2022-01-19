import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface Props {
  children: ReactNode;
}

export const PriceContainer = ({ children }: Props) => {
  return <Container>{children}</Container>;
};

const Container = styled.div`
  width: 100%;
  border: 1px solid #dddddd;
  background-color: #f5f5f5;
  padding: 32px 15px 39px 15px;
  border-left: 0;
  border-right: 0;
`;

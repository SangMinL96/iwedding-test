import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface Props {
  children: ReactNode;
}

export const QuoteListContainer = ({ children }: Props) => {
  return <QuoteUL>{children}</QuoteUL>;
};

const QuoteUL = styled.ul`
  width: 100%;
  position: relative;
  margin-top: 15px;
  padding-bottom: var(--ios-bottom);
  > li {
    margin-right: 29px;

    &:nth-child(2n) {
      margin-right: 0;
    }
  }
`;

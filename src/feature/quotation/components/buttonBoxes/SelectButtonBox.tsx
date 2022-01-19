import React, { ReactNode } from 'react';
import theme from '@styles/theme';
import styled from 'styled-components';

interface Props {
  children: ReactNode;
}

export const SelectButtonBox = ({ children }: Props) => {
  return <Container>{children}</Container>;
};

const Container = styled.div`
  display: inline-block;
  position: absolute;
  right: 15px;
  top: 10px;
  @media all and (min-width: ${theme.pc}px) {
    top: 20px;
    right: 0;
  }
`;

import React, { ReactNode } from 'react';
import theme from '@styles/theme';
import styled from 'styled-components';

interface Props {
  children: ReactNode;
}

export const ContentButtonBox = ({ children, ...props }: Props) => {
  return <Container {...props}>{children}</Container>;
};

const Container = styled.div`
  width: 100%;
  padding: 22px 15px;
  margin: 0 auto;
  @media all and (min-width: ${theme.pc}px) {
    max-width: 345px;
    padding: 22px 0;
    margin: 0 auto;
  }
`;

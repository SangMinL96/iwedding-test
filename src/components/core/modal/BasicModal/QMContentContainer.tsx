import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface Props {
  children: ReactNode;
  isMobile?: boolean;
}

export const QMContentContainer = ({ children, isMobile, ...props }: Props) => {
  return (
    <Content isMobile={isMobile} {...props}>
      {children}
    </Content>
  );
};

const Content = styled.div<Props>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;

  * {
    font-size: 16px;
    line-height: 24px;
  }

  /* * {
    font-size: ${({ isMobile }) => (isMobile ? '16px' : '20px')};
    line-height: ${({ isMobile }) => (isMobile ? '24px' : '32px')};
  } */

  > p {
    font-weight: 500;
  }
`;

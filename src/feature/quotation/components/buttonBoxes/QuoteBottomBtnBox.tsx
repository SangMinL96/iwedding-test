import theme from '@styles/theme';
import React, { ReactNode } from 'react';
import styled, { css } from 'styled-components';

interface Props {
  children: ReactNode;
  isMobile: boolean;
  isRealtime?: boolean;
  disableFixed?: boolean;
  fromTalk?: boolean;
}

//
export const QuoteBottomBtnBox = ({ children, isMobile, isRealtime, fromTalk, disableFixed }: Props) => {
  return (
    <Container isMobile={isMobile} fromTalk={fromTalk} isRealtime={isRealtime} disableFixed={disableFixed}>
      {children}
    </Container>
  );
};

const Container = styled.div<Partial<Props>>`
  display: flex;
  width: 100%;
  height: 80px;
  @media all and (max-width: ${theme.pc}px) {
    width: 100%;
    position: fixed;
    bottom: 0;
    ${({ fromTalk }) =>
      !fromTalk &&
      css`
        bottom: var(--ios-bottom);
      `}
  }

  ${({ isMobile }) =>
    !isMobile &&
    css`
      margin-top: 16px;
    `}

  ${({ isRealtime }) =>
    isRealtime &&
    css`
      width: 100%;
      /* padding: 20px 15px; */
      background-color: #fff;
      display: flex;
      justify-content: space-between;
      align-items: center;
    `}

  ${({ disableFixed }) =>
    disableFixed &&
    css`
      position: relative;
      bottom: 0;
    `}
`;

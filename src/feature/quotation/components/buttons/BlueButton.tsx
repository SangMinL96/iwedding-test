import React from 'react';
import Button, { ButtonProps } from '@components/core/buttons/CommonButton';
import styled, { css } from 'styled-components';

interface Props extends ButtonProps {
  disabled?: boolean;
  fullWidth?: boolean;
  isMobile?: boolean;
}

export const BlueButton = ({ children, onClick, disabled, fullWidth, isMobile, fontSize, ...props }: Props) => {
  return (
    <PayBtn disabled={disabled} fullWidth={fullWidth} onClick={onClick} {...props} fontSize={fontSize} isMobile={isMobile}>
      {children}
    </PayBtn>
  );
};

const PayBtn = styled(Button)<Props>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: ${props => props.theme.blue};
  color: #f5f5f5;
  line-height: 22px;
  border: none;

  > span {
    font-size: 16px;
    @media all and (max-width: 1280px) {
      font-size: 15px;
    }
    &:first-child {
      margin-bottom: 3px;
      font-weight: 700;
    }
  }

  ${({ disabled, theme }) =>
    disabled &&
    css`
      background-color: ${theme.gray};
    `}
  ${({ fullWidth }) =>
    fullWidth &&
    css`
      width: 100%;
    `}

  ${({ isMobile }) =>
    isMobile &&
    css`
      > span {
        display: block;
        &:first-child {
          margin-bottom: 2px;
        }
        &:last-child {
          font-weight: 400;
        }
      }
    `}
`;

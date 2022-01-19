import React from 'react';
import Button, { ButtonProps } from '@components/core/buttons/CommonButton';
import styled, { css } from 'styled-components';

interface WhiteButtonProps extends ButtonProps {
  smallBtn?: boolean;
  fontSize?: number;
  disabled?: boolean;
}

export const WhiteButton = ({ children, onClick, smallBtn, ...props }: WhiteButtonProps) => {
  return (
    <Btn onClick={onClick} {...props} smallBtn={smallBtn}>
      {children}
    </Btn>
  );
};

const Btn = styled(Button)<WhiteButtonProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 50px;
  height: 100%;
  border: 1px solid ${props => props.theme.blue};
  color: ${props => props.theme.blue};
  font-weight: 700;
  line-height: 22px;
  font-size: ${({ fontSize }) => (fontSize ? `${fontSize}px` : '14px')};
  font-size: 15px;
  @media all and (max-width: 1280px) {
    font-size: 14px;
  }

  ${({ smallBtn }) =>
    smallBtn &&
    css`
      height: 100%;
      width: 50%;
    `};

  > span {
    &:first-child {
      margin-bottom: 3px;
    }
  }

  ${({ disabled }) =>
    disabled &&
    css`
      border-color: #dfdfdf;
      color: #dfdfdf;
    `}
`;

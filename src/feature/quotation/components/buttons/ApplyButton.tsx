import React from 'react';
import theme from '@styles/theme';
import Button, { ButtonProps } from '@components/core/buttons/CommonButton';
import styled from 'styled-components';

export const ApplyButton = ({ children, onClick, ...props }: ButtonProps) => {
  return (
    <Btn onClick={onClick} {...props}>
      {children}
    </Btn>
  );
};

const Btn = styled(Button)`
  width: 100px;
  height: 34px;
  background-color: ${props => props.theme.blue};
  color: #fff;
  position: absolute;
  right: 0;
  top: 0;
  border: none;

  @media all and (min-width: ${theme.pc}px) {
    width: 140px;
  }
`;

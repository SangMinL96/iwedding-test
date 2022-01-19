import theme from '@styles/theme';
import React, { ReactNode, SyntheticEvent } from 'react';
import styled from 'styled-components';

export interface ButtonProps {
  children: ReactNode;
  onClick?: (e: SyntheticEvent) => void;
  fontSize?: number;
  disabled?: boolean;
}

const CommonButton = ({ children, onClick, fontSize, disabled, ...props }: ButtonProps) => {
  return (
    <StyledButton onClick={onClick} fontSize={fontSize} {...props} disabled={!!disabled}>
      {children}
    </StyledButton>
  );
};

const StyledButton = styled.button<ButtonProps>`
  width: 170px;
  height: 50px;
  text-align: center;
  border: 1px solid #dfdfdf;
  color: ${theme.black};
  font-size: ${({ fontSize }) => (fontSize ? `${fontSize}px` : '14px')};
`;

export default React.memo(CommonButton);

import React from 'react';
import Button, { ButtonProps } from '@components/core/buttons/CommonButton';
import styled from 'styled-components';

export const CopyButton = ({ children, onClick, ...props }: ButtonProps) => {
  return (
    <Btn onClick={onClick} {...props}>
      {children}
    </Btn>
  );
};

const Btn = styled(Button)`
  margin-right: 5px;
`;

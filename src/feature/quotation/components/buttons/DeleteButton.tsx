import React from 'react';
import Button, { ButtonProps } from '@components/core/buttons/CommonButton';

export const DeleteButton = ({ children, onClick, ...props }: ButtonProps) => {
  return (
    <Button onClick={onClick} {...props}>
      {children}
    </Button>
  );
};

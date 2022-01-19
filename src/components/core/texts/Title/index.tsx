import React from 'react';
import styled from 'styled-components';
import Text, { TextProps } from '../Text';

const index = ({ children, ...props }: TextProps) => {
  return <Title {...props}>{children}</Title>;
};

export default index;

const Title = styled(Text)`
  font-size: ${({ fontSize }) => (fontSize ? `${fontSize}px` : '16px')};
  font-weight: 500;
`;

import React, { ReactNode } from 'react';
import styled from 'styled-components';

export interface TextProps {
  children: ReactNode;
  fontSize?: number;
  center?: boolean;
}

const index = ({ children, fontSize, center }: TextProps) => {
  return (
    <Container fontSize={fontSize} center={center}>
      {children}
    </Container>
  );
};

export default index;

const Container = styled.p<TextProps>`
  text-align: ${({ center }) => center && `center`};
  font-size: ${({ fontSize }) => (fontSize ? `${fontSize}px` : '14px')};
`;

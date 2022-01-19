import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface Props {
  children: ReactNode;
  fontSize?: number;
}

const index = ({ children, fontSize, ...props }: Props) => {
  return (
    <Container fontSize={fontSize} {...props}>
      {children}
    </Container>
  );
};

export default index;

const Container = styled.p<Props>`
  text-align: center;
  font-size: ${({ fontSize }) => (fontSize ? `${fontSize}px` : '14px')};
`;

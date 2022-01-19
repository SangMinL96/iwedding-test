import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface Props {
  title: string;
  pb?: boolean;
  children: ReactNode;
}

const index = ({ title, children, pb }: Props) => {
  return (
    <Container pb={pb}>
      <Title>{title}</Title>
      {children}
    </Container>
  );
};

export default index;

const Container = styled.div<{ pb: boolean }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: fit-content;
  font-size: 14px;
  padding-top: 25px;
  position: relative;
`;

const Title = styled.p`
  margin-bottom: 15px;
`;

import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface Props {
  title: string;
  children?: ReactNode;
}

const HalfModalHeader = ({ title, children }: Props) => {
  return (
    <Header>
      <Title>{title}</Title>
      {children}
    </Header>
  );
};

export default HalfModalHeader;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 85px;
  border-bottom: 1px solid #d8d8d8;
  padding: 0 15px;
`;

const Title = styled.p`
  display: block;
  font-size: 16px;
  font-weight: 700;
`;

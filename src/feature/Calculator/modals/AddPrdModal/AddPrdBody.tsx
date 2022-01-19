import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface Props {
  children: ReactNode;
}

export const AddPrdBody = ({ children }: Props) => {
  return <Container>{children}</Container>;
};

const Container = styled.div`
  width: 100%;
`;

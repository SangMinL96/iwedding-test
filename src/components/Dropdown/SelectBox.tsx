import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface Props {
  children: ReactNode;
}

const SelectBox = ({ children }: Props) => {
  return <Container>{children}</Container>;
};

export default React.memo(SelectBox);
const Container = styled.div`
  position: relative;
  display: inline-block;
  z-index: 10;
  margin-left: 10px;
`;

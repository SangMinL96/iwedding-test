import React from 'react';
import styled from 'styled-components';

interface Props {
  summary: string;
}

const ProductSummary = ({ summary }: Props) => {
  return (
    <Container>
      <Summary>{summary}</Summary>
    </Container>
  );
};

export default React.memo(ProductSummary);

const Container = styled.div`
  width: 100%;
  position: relative;
  margin-bottom: 10px;
  font-size: 11px;
  color: #8c8c8c;
`;

const Summary = styled.p`
  display: block;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

import React from 'react';
import styled from 'styled-components';

interface Props {
  total: number;
}

export const SortDesc = ({ total }: Props) => {
  return <Desc>{total} 개의 견적</Desc>;
};

const Desc = styled.span`
  display: inline-block;
  font-size: 15px;
  color: ${props => props.theme.blue};
`;

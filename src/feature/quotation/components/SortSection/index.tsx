import React from 'react';
import { ISort } from '@utils/sortOptions';
import styled from 'styled-components';
import { SortDesc } from './SortDesc';
import Dropdown from '@components/Dropdown';

interface Props {
  swrKey: string;
  options: ISort[];
  totalItems: number | undefined;
}

const index = ({ swrKey, options, totalItems }: Props) => {
  return (
    <Container>
      <SortDesc total={totalItems ?? 0} />
      <Dropdown options={options} swrKey={swrKey} />
    </Container>
  );
};

export default index;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  position: relative;
  z-index: 10;
`;

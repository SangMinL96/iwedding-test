import Dropdown from '@components/Dropdown';
import { locationFilter } from '@utils/dropdownOptions';
import { FILTER_BY_LOCATION, INFI_PRODUCT_KEY } from '@utils/localSwrKeys';
import { productSortOptions } from '@utils/sortOptions';
import React from 'react';
import styled from 'styled-components';
import { SearchProduct } from './SearchProduct';

const SortSection = () => {
  return (
    <Container>
      <SearchProduct />
      <DropdownDiv>
        <Dropdown swrKey={FILTER_BY_LOCATION} options={locationFilter} />
        <Dropdown swrKey={INFI_PRODUCT_KEY} options={productSortOptions} />
      </DropdownDiv>
    </Container>
  );
};

export default SortSection;

const Container = styled.div`
  width: 100%;
  min-height: 55px;
  border-bottom: 1px solid #dddddd;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
`;

const DropdownDiv = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 5px;
`;

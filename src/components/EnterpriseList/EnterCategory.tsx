import { getProductCategoryName, ProductCategoryValue } from '@modules/product/product.interface';
import React from 'react';
import styled from 'styled-components';

const EnterCategory = ({ category }: { category: ProductCategoryValue }) => {
  return <Category>{getProductCategoryName(category)}</Category>;
};

export default EnterCategory;

const Category = styled.div`
  margin-bottom: 9px;
  font-size: 11px;
  color: #8c8c8c;
`;

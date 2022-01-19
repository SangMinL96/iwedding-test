import { getProductCategoryName, ProductCategoryValue } from '@modules/product/product.interface';
import theme from '@styles/theme';
import React from 'react';
import styled from 'styled-components';

interface Props {
  category: ProductCategoryValue;
}

const Category = ({ category }: Props) => {
  return <Cat>{getProductCategoryName(category)}</Cat>;
};

export default React.memo(Category);

const Cat = styled.span`
  display: inline-block;
  width: 100%;
  height: 67px;
  border-bottom: 2px solid #262626;
  font-size: 16px;
  font-weight: 700;
  line-height: 67px;
  vertical-align: middle;
  margin-bottom: 20px;
  @media all and (min-width: ${theme.pc}px) {
    font-size: 20px;
  }
`;

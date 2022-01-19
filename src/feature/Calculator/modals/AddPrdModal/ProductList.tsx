import { useDeepEffect } from '@hooks/useDeepEffect';
import { useInfinityScroll } from '@hooks/useInifinityScroll';
import { WmProductEntity } from '@modules/product/product.interface';
import theme from '@styles/theme';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useInfiniteProductList } from '../../hooks';

const ProductItem = dynamic(() => import('./ProductItem'));
const Loading = dynamic(() => import('@components/Loading'));
const NoList = dynamic(() => import('@components/core/texts/NoList'));
interface Props {
  onAddProduct: (product: WmProductEntity) => () => void; // 견적함/계산기의 상품 추가 로직이 다르기 때문에 받아옴
  selectedList?: WmProductEntity[]; // 견적함에서 사용할 시 선택된 상품의 버튼을 바꾸기 위해 사용 됨
}

// 견적함 쪽 상품 추가 모달에도 사용됨
const ProductList = ({ onAddProduct, selectedList }: Props) => {
  const { productPage, metadata, size, setSize, isValidating } = useInfiniteProductList();

  useInfinityScroll({
    isMobile: true,
    isFetching: isValidating,
    canNext: size < metadata?.totalPages,
    onNextPage: () => {
      setSize(size + 1);
    },
  });

  return metadata?.totalItems > 0 ? (
    <List id='scrollable-modal-inner'>
      {productPage?.map(page =>
        page?.items.map(product => (
          <ProductItem
            product={product}
            key={`infinite_${product.no}`}
            onClickAdd={product => onAddProduct(product)}
            disabled={(selectedList || []).includes(product)}
          />
        )),
      )}
    </List>
  ) : isValidating ? (
    <Loading body='상품을 불러오는 중 입니다.' />
  ) : (
    <NoList text='해당조건에 만족하는 상품이 없습니다.' noBorder />
  );
};

export default ProductList;

const List = styled.ul`
  width: 100%;
  height: 100%;
  overflow: hidden;
  overflow-y: scroll;
  ${theme.hideScroll}
  padding-bottom: calc(var(--ios-bottom) + 60px);
`;

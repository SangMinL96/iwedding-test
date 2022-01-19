import AbstractModal from '@components/core/modal/AbstractModal/AbstractModal';
import { useCategory } from '@feature/Calculator/hooks';
import { useModalVisible } from '@hooks/useModalVisible';
import { ProductCategoryValue } from '@modules/product/product.interface';
import React, { useCallback } from 'react';
import styled from 'styled-components';
import { SearchBar } from './SearchBar';
import { SearchBody } from './SearchBody';

export const SEARCH_MODAL = 'SEARCH_MODAL';
const SearchModal = () => {
  const { modalVisible, setModalVisible } = useModalVisible(SEARCH_MODAL);
  const { category } = useCategory();

  const onModalClose = useCallback(() => {
    setModalVisible(false);
  }, [setModalVisible]);

  return (
    <AbstractModal
      visible={modalVisible}
      onClose={onModalClose}
      isFullSize
      title={`${category === ProductCategoryValue.STUDIO ? '스튜디오' : category} 상품 찾기`}
      noFooter
      noPadding
      isDuplicated
    >
      <Container>
        <SearchBar />
        <SearchBody />
      </Container>
    </AbstractModal>
  );
};

export default SearchModal;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

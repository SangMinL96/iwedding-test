import { useCategory } from '@feature/Calculator/hooks';
import { useCalculatorState } from '@feature/Calculator/store/calcStore';
import { useModalVisible } from '@hooks/useModalVisible';
import { ProductCategoryValue, WmProductEntity } from '@modules/product/product.interface';
import { ADD_PRODUCT_MODAL } from '@utils/modalKeys';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';
import DefaultItem from './DefaultItem';
import SelectedItem from './SelectedItem';

export interface CategoryItemProps {
  category: ProductCategoryValue;
  item?: WmProductEntity;
  onClick?: () => void;
}

export const CategoryItem = ({ category, item }: CategoryItemProps) => {
  const showEstimation = useCalculatorState(state => state.showEstimation);
  const { setCategory } = useCategory();
  const router = useRouter();

  const { setModalVisible } = useModalVisible(ADD_PRODUCT_MODAL);
  const openPrdModal = () => {
    if (!showEstimation) {
      router.push(router.asPath + '#ModalAddProduct');
      setCategory(category);
      setModalVisible(true);
    }
  };

  return (
    <Container selected={!!item?.no}>
      {item?.no ? (
        <SelectedItem category={category} item={item} onClick={openPrdModal} />
      ) : (
        <DefaultItem category={category} onClick={openPrdModal} />
      )}
    </Container>
  );
};

const Container = styled.div<{ selected: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: ${({ selected }) => (selected ? '110px' : '80px')};
  padding: 0 20px;
  margin-bottom: 10px;
  border-radius: 15px;
  background: white;
  filter: drop-shadow(2px 6px 9px rgba(0, 0, 0, 0.04));
`;

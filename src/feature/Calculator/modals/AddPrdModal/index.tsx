import AbstractModal from '@components/core/modal/AbstractModal/AbstractModal';
import Loading from '@components/Loading';
import { useCategory, useSearchKeyword } from '@feature/Calculator/hooks';
import { useCalculatorState } from '@feature/Calculator/store/calcStore';
import { useModalVisible } from '@hooks/useModalVisible';
import { ProductCategoryValue, WmProductEntity } from '@modules/product/product.interface';
import { ADD_PRODUCT_MODAL } from '@utils/modalKeys';
import dynamic from 'next/dynamic';
import router from 'next/router';
import React, { useCallback } from 'react';
import { SEARCH_MODAL } from '../SearchModal';
import { AddPrdBody } from './AddPrdBody';
import SortSection from './SortSection';

const ProductList = dynamic(() => import('./ProductList'));
const SearchResult = dynamic(() => import('./SearchResult'));
const SearchModal = dynamic(() => import('../SearchModal'));

const AddPrdModal = () => {
  const { category } = useCategory();
  const { modalVisible: prdModalVisible, setModalVisible: setPrdModalVisible } = useModalVisible(ADD_PRODUCT_MODAL);
  const { modalVisible: searchModalVisible } = useModalVisible(SEARCH_MODAL);
  const { searchKeyword, setSearchKeyword } = useSearchKeyword();
  const [calcItems, setCalcItems] = useCalculatorState(state => [state.calcItems, state.setCalcItems]);

  const handleModalClose = useCallback(() => {
    setPrdModalVisible(false);
    setSearchKeyword('');
  }, [setPrdModalVisible, setSearchKeyword]);

  const handleAddProduct = useCallback(
    (product: WmProductEntity) => () => {
      const newSet = calcItems.map(item => (item.category === category ? { category, item: product } : item));
      setCalcItems(newSet);
      handleModalClose();
      router.back();
    },
    [calcItems, setCalcItems, handleModalClose, category],
  );

  if (!category) return <Loading />;

  return (
    <AbstractModal
      visible={!!prdModalVisible}
      onClose={handleModalClose}
      isFullSize
      title={`${category === ProductCategoryValue.STUDIO ? '스튜디오' : category} 상품 선택하기`}
      noFooter
      noPadding
    >
      <AddPrdBody>
        <SortSection />
        {searchKeyword && searchKeyword.length > 0 && <SearchResult />}
        <ProductList onAddProduct={handleAddProduct} />
      </AddPrdBody>
      {searchModalVisible && <SearchModal />}
    </AbstractModal>
  );
};

export default AddPrdModal;

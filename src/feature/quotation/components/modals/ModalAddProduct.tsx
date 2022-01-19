import AbstractModal from '@components/core/modal/AbstractModal/AbstractModal';
import { useCategory, useSearchKeyword } from '@feature/Calculator/hooks';
import SortSection from '@feature/Calculator/modals/AddPrdModal/SortSection';
import { SEARCH_MODAL } from '@feature/Calculator/modals/SearchModal';
import { Desktop } from '@hooks/useDevice';
import { useModalVisible } from '@hooks/useModalVisible';
import { CommonModalProps } from '@modules/CommonInterface';
import { getProductCategoryName, ProductCategoryValue, WmProductEntity } from '@modules/product/product.interface';
import theme from '@styles/theme';
import { FLOATING_BUTTON, QNA_FORM_MODAL } from '@utils/modalKeys';
import dynamic from 'next/dynamic';
import router from 'next/router';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const QnAFormModal = dynamic(() => import('@feature/QnA/QnAFormModal'));
const SearchModal = dynamic(() => import('@feature/Calculator/modals/SearchModal'));
const FloatingSection = dynamic(() => import('@components/core/modal/FloatingSection'));
const ProductList = dynamic(() => import('@feature/Calculator/modals/AddPrdModal/ProductList'));
const SearchResult = dynamic(() => import('@feature/Calculator/modals/AddPrdModal/SearchResult'));

interface ModalProps extends CommonModalProps {
  is_real?: boolean;
  selectedProduct?: WmProductEntity[];
  isDupe?: boolean;
}

const categories = Object.values(ProductCategoryValue).map(v => v as ProductCategoryValue);
const ModalAddProduct = ({ visible, onClose, onConfirm, selectedProduct, isDupe = false }: ModalProps) => {
  const { category, setCategory } = useCategory();

  useEffect(() => {
    setCategory(categories[0]);
  }, [setCategory]);

  //카테고리 선택
  const onClickCategory = useCallback(
    (categoryInDb: ProductCategoryValue) => () => {
      setCategory(categoryInDb);
    },
    [setCategory],
  );
  //상품 리스트
  const { searchKeyword } = useSearchKeyword();
  //상품 검색 모달
  const { modalVisible: searchModalVisible } = useModalVisible(SEARCH_MODAL);
  const { modalVisible: floaterVisible, setModalVisible: setFloaterVisible } = useModalVisible(FLOATING_BUTTON);
  const { modalVisible: requestFormVisible } = useModalVisible(QNA_FORM_MODAL);
  //유저가 선택한 상품
  const [tmpSelectedProduct, setTmpSelectedProduct] = useState<WmProductEntity[]>([]);

  useEffect(() => {
    if (selectedProduct) {
      setTmpSelectedProduct(selectedProduct);
    }
  }, [selectedProduct]);

  // 상품선택
  const selectProduct = useCallback(
    (product: WmProductEntity) => () => {
      // 이미 있는 상품일 경우 아무 것도 안함
      const isIncluded = tmpSelectedProduct.filter(sp => sp.no == product.no).length > 0;
      if (isIncluded) return;
      setTmpSelectedProduct(tmpSelectedProduct.concat(product));
      setFloaterVisible(true);
    },
    [tmpSelectedProduct, setTmpSelectedProduct, setFloaterVisible],
  );

  useEffect(() => {
    if (tmpSelectedProduct.length == 0 && floaterVisible) {
      setFloaterVisible(false);
    }
  }, [tmpSelectedProduct, floaterVisible, setFloaterVisible]);

  //선택한 상품 제거
  const undoSelectProduct = useCallback(
    (product: WmProductEntity) => () => {
      setTmpSelectedProduct(tmpSelectedProduct.filter(sp => sp.no !== product.no));
    },
    [setTmpSelectedProduct, tmpSelectedProduct],
  );
  const closeModal = useCallback(() => {
    setFloaterVisible(false);
    setTmpSelectedProduct([]);
    onClose();
  }, [setFloaterVisible, setTmpSelectedProduct, onClose]);
  //상품 최종선택
  const mOnConfirm = useCallback(() => {
    onConfirm(tmpSelectedProduct);
    setFloaterVisible(false);
    setTmpSelectedProduct([]);
    router.back();
  }, [onConfirm, setFloaterVisible, setTmpSelectedProduct, tmpSelectedProduct]);

  const isDesktop = Desktop();
  return (
    <>
      <AbstractModal
        title='상품 추가하기'
        onClose={closeModal}
        isDuplicated={isDupe}
        onConfirm={mOnConfirm}
        visible={visible}
        isFullSize
        noFooter
        noPadding
      >
        <Inner>
          <div className='left_side'>
            <SortSection />
            {searchKeyword.length > 0 && <SearchResult />}
            <ProductList onAddProduct={selectProduct} selectedList={tmpSelectedProduct} />
          </div>
          <div className='right_side'>
            <ul className={`category_menu ${isDesktop ? '' : 'mobile'}`}>
              {categories.map((c, index) => (
                <li className={`category_item ${c == category ? 'on' : ''} pointer`} key={index} onClick={onClickCategory(c)}>
                  {getProductCategoryName(c)}
                </li>
              ))}
            </ul>
          </div>
        </Inner>
        <FloatingSection list={tmpSelectedProduct} onDeleteProduct={undoSelectProduct} onConfirm={mOnConfirm} />
      </AbstractModal>
      {searchModalVisible && <SearchModal />}
      {requestFormVisible && <QnAFormModal isDuplicated />}
    </>
  );
};

export default React.memo(ModalAddProduct);

const Inner = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  overflow: hidden;

  .left_side {
    height: 100%;
    width: calc(100% - 79px);
    overflow: hidden;
    overflow-y: scroll;
    ${theme.hideScroll};
  }

  .right_side {
    width: 80px;
    height: 100%;
    overflow: hidden;
    overflow-y: scroll;
    ${theme.hideScroll};
    .category_menu {
      width: 100%;
      height: 100%;
      position: relative;
      margin-bottom: calc(260px + var(--ios-bottom));

      .category_item {
        position: relative;
        width: 100%;
        height: 46px;
        border-left: 1px solid #dddddd;
        border-bottom: 1px solid #dddddd;
        font-size: 11px;
        padding-left: 10px;
        background-color: #f6f7f8;
        line-height: 46px;
        vertical-align: middle;

        > .noti_circle {
          display: inline-block;
          position: absolute;
          top: 50%;
          right: 10px;
          transform: translateY(-50%);
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background-color: #262626;
          color: #fff;
          font-size: 10px;
          line-height: 12px;
          vertical-align: middle;
          text-align: center;
          z-index: 1;
        }
      }

      .category_item.on {
        color: #fff;
        background-color: #262626;

        > .noti_circle {
          background-color: #4c4c4c;
        }
      }
    }
  }
`;

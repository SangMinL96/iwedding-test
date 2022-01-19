import AbstractModal from '@components/core/modal/AbstractModal/AbstractModal';
import { TypeButton } from '@feature/QnA/components/TalkTypeSection/TypeButton';
import { CommonModalProps } from '@modules/CommonInterface';
import { getProductCategoryName, ProductCategoryValue } from '@modules/product/product.interface';
import router from 'next/router';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const CategoryContainer = styled.div`
  width: 100%;
  height: fit-content;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 8px;
`;

interface RealCategoryProps extends CommonModalProps {
  onConfirmCategory: (selectedCategory: ProductCategoryValue[]) => void;
  selectedCategory: string[];
}

const categories = Object.values(ProductCategoryValue).map(v => v as ProductCategoryValue);
const ModalRealCategory = ({ onClose, onConfirmCategory, selectedCategory }: RealCategoryProps) => {
  const [tmpSelectedCategory, setTmpCategory] = useState<ProductCategoryValue[]>([]);
  const tmpSelectCategory = (cate: ProductCategoryValue) => () => {
    //제거
    if (tmpSelectedCategory.includes(cate)) {
      setTmpCategory(tmpSelectedCategory.filter(scate => scate != cate));
    } else {
      //추가
      setTmpCategory(tmpSelectedCategory.concat(cate));
    }
  };
  useEffect(() => {
    if (selectedCategory && selectedCategory.length) {
      setTmpCategory(selectedCategory as ProductCategoryValue[]);
    } else {
      setTmpCategory([]);
    }
  }, [selectedCategory]);

  const mOnClose = () => {
    onClose();
  };
  const mOnConfirmCategory = () => {
    onConfirmCategory(tmpSelectedCategory);
    router.back();
  };

  return (
    <AbstractModal
      title='포함 업종 선택'
      onClose={mOnClose}
      isDuplicated
      confirmText='선택 완료'
      canConfirm={tmpSelectedCategory.length > 0}
      onConfirm={mOnConfirmCategory}
      stepFooter
      isFullSize
    >
      <CategoryContainer>
        {categories.map((cate, index) => (
          <TypeButton
            key={cate + index}
            active={tmpSelectedCategory.includes(cate)}
            onClick={tmpSelectCategory(cate)}
            title={getProductCategoryName(cate)}
          />
        ))}
      </CategoryContainer>
    </AbstractModal>
  );
};

export default ModalRealCategory;

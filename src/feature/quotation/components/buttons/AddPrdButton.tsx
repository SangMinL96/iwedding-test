import { useSelectedQuotation } from '@feature/quotation/hooks/useSelectedQuotation';
import { useModalVisible } from '@hooks/useModalVisible';
import { addProductClick } from '@modules/user/UserLogAPI';
import { ADD_PRODUCT_MODAL } from '@utils/modalKeys';
import { overFlowHidden } from '@utils/util';
import { useRouter } from 'next/router';
import React, { useCallback } from 'react';
import { WhiteButton } from './WhiteButton';

interface Props {
  smallBtn?: boolean;
  fontSize?: number;
}

const AddPrdButton = ({ smallBtn, fontSize }: Props) => {
  const { selectedQuotation } = useSelectedQuotation();
  const { setModalVisible } = useModalVisible(ADD_PRODUCT_MODAL);
  const router = useRouter();

  const onClickAddProduct = useCallback(() => {
    if (selectedQuotation) {
      overFlowHidden();
      setModalVisible(true);
      router.push(router.asPath + '#ModalAddPrd');
      addProductClick({ target_quotation_name: selectedQuotation.group_name });
    }
  }, [selectedQuotation, setModalVisible, router]);

  return (
    <WhiteButton onClick={onClickAddProduct} fontSize={fontSize} smallBtn={smallBtn}>
      + 상품 추가하기
    </WhiteButton>
  );
};

export default AddPrdButton;

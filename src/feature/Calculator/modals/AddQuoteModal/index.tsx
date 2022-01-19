import Button from '@components/core/buttons/CommonButton';
import BasicModal from '@components/core/modal/BasicModal';
import { ModalButtonBox } from '@components/core/modal/BasicModal/ModalButtonBox';
import TextArea from '@components/core/texts/TextArea';
import { useCopiedQuote } from '@feature/Calculator/hooks';
import { useModalVisible } from '@hooks/useModalVisible';
import { useOverflowModal } from '@hooks/useOverflowHidden';
import { CommonModalProps } from '@modules/CommonInterface';
import { ADD_QUOTE_MODAL } from '@utils/modalKeys';
import React, { useCallback } from 'react';

const AddQuoteModal = ({ onClose }: Omit<CommonModalProps, 'visible'>) => {
  const { lastCopiedQuote } = useCopiedQuote();
  const { modalVisible } = useModalVisible(ADD_QUOTE_MODAL);
  useOverflowModal(modalVisible);

  const handleConfirm = useCallback(() => {
    onClose();
    location.href = `/quotation/${lastCopiedQuote}`;
  }, [onClose, lastCopiedQuote]);

  return (
    <BasicModal visible={modalVisible} onClose={onClose}>
      <TextArea>
        선택하신 상품이 <br />
        견적함에 담겼습니다.
      </TextArea>
      <ModalButtonBox>
        <Button onClick={handleConfirm}>견적함 바로가기</Button>
        <Button onClick={onClose}>계속하기</Button>
      </ModalButtonBox>
    </BasicModal>
  );
};

export default React.memo(AddQuoteModal);

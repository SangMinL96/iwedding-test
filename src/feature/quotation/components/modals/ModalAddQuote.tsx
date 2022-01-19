import React from 'react';
import Button from '@components/core/buttons/CommonButton';
import { CommonModalProps } from '@modules/CommonInterface';
import { useOverflowModal } from '@hooks/useOverflowHidden';
import BasicModal from '@components/core/modal/BasicModal';
import { ModalButtonBox } from '@components/core/modal/BasicModal/ModalButtonBox';
import TextArea from '@components/core/texts/TextArea';

// 견적함에 상품 추가 시 나오는 기본 모달
const ModalAddQuote = ({ visible, onClose }: CommonModalProps) => {
  useOverflowModal(visible);

  return (
    <BasicModal visible={visible} onClose={onClose}>
      <TextArea>내 견적함에 추가하였습니다.</TextArea>
      <ModalButtonBox>
        <Button onClick={onClose}>닫기</Button>
      </ModalButtonBox>
    </BasicModal>
  );
};

export default ModalAddQuote;

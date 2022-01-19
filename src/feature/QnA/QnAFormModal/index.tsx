import AbstractModal from '@components/core/modal/AbstractModal/AbstractModal';
import { useModalVisible } from '@hooks/useModalVisible';
import { CommonModalProps } from '@modules/CommonInterface';
import { QNA_FORM_MODAL } from '@utils/modalKeys';
import React, { useCallback } from 'react';
import QnAForm from './QnAForm';

const QnAFormModal = ({ isDuplicated }: Partial<CommonModalProps>) => {
  const { setModalVisible } = useModalVisible(QNA_FORM_MODAL);
  const handleClose = useCallback(() => {
    setModalVisible(false);
  }, [setModalVisible]);

  return (
    <AbstractModal title='문의하기' onClose={handleClose} isDuplicated={isDuplicated} isFullSize noFooter noPadding>
      <QnAForm handleClose={handleClose} />
    </AbstractModal>
  );
};

export default QnAFormModal;

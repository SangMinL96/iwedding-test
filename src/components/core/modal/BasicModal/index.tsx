import React from 'react';
import { CommonModalProps } from '@modules/CommonInterface';
import { ModalPortal } from '@components/core/modal/modal.portal';
import ModalOverlay from '@components/core/modal/ModalOverlay';
import { Desktop } from '@hooks/useDevice';
import { useOverflowModal } from '@hooks/useOverflowHidden';
import { QMContentContainer } from './QMContentContainer';
import { QuoteModalWrapper } from './QuoteModalWrapper';

const BasicModal = ({ visible, onClose, isDuplicated = false, children }: CommonModalProps) => {
  useOverflowModal(visible);
  const isDesktop = Desktop();

  return (
    <ModalPortal>
      {visible && (
        <>
          <ModalOverlay isDuplicated={isDuplicated} onClose={onClose} />
          <QuoteModalWrapper>
            <QMContentContainer isMobile={!isDesktop}>{children}</QMContentContainer>
          </QuoteModalWrapper>
        </>
      )}
    </ModalPortal>
  );
};

export default BasicModal;

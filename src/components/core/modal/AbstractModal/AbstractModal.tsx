import ModalOverlay from '@components/core/modal/ModalOverlay';
import { useDeepEffect } from '@hooks/useDeepEffect';
import { Desktop } from '@hooks/useDevice';
import { useOverflowModal } from '@hooks/useOverflowHidden';
import { CommonModalProps } from '@modules/CommonInterface';
import theme from '@styles/theme';
import { useRouter } from 'next/router';
import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { ModalPortal } from '../modal.portal';
import AbsModalFooter, { FooterProps } from './AbsModalFooter';
import HalfModalClose from './HalfModalClose';
import MobileModalHeader from './MobileModalHeader';
import PCModalHeader from './PCModalHeader';

const AbstractModal: React.FunctionComponent<CommonModalProps> = ({
  visible = true,
  children,
  onClose,
  onBack,
  title,
  isFullSize,
  isDuplicated = false,
  disableMaskClick = false,
  noFooter,
  isWrap = false,
  noPadding = false,
  noPaddingTop = false,
  confirmText = '확인',
  cancelText = '취소',
  onConfirm,
  canConfirm,
  oneButtonFooter,
  stepFooter,
  isReturnButton,
  rsvcenter,
  isIcash,
}) => {
  useOverflowModal(visible, isDuplicated);
  const router = useRouter();
  const [open, setOpen] = useState(visible);

  if (router.isReady) {
    router.beforePopState(() => {
      onClose();
      return true;
    });
  }

  const interceptClose = useCallback(() => {
    router.back();
  }, [router]);

  const isDesktop = Desktop();

  useDeepEffect(() => {
    if (router.asPath.includes('order')) {
      setOpen(visible);
    }
  }, [visible]);

  const onRender = () => {
    return (
      <ModalPortal>
        <ModalOverlay onClose={interceptClose} isDuplicated={isDuplicated} disableMaskClick={disableMaskClick} />
        <ModalWrapper isFullSize={isFullSize} isWrap={isWrap} noFooter={noFooter} noPadding={noPadding} noPaddingTop={noPaddingTop}>
          {isDesktop ? (
            <PCModalHeader title={title} onClose={interceptClose} headerNoBottom />
          ) : isFullSize ? (
            <MobileModalHeader onBack={onBack || interceptClose} onClose={interceptClose} title={title} />
          ) : (
            <HalfModalClose onClose={interceptClose} />
          )}
          <div className='inner-wrapper'>{children}</div>
          {noFooter ? null : (
            <AbsModalFooter
              confirmText={confirmText}
              cancelText={cancelText}
              onConfirm={onConfirm}
              canConfirm={canConfirm}
              onClose={interceptClose}
              onBack={onBack || interceptClose}
              oneButtonFooter={oneButtonFooter}
              stepFooter={stepFooter}
              isReturnButton={isReturnButton}
              rsvcenter={rsvcenter}
              isIcash={isIcash}
            />
          )}
        </ModalWrapper>
      </ModalPortal>
    );
  };
  return router.asPath.includes('order') ? open && onRender() : visible && onRender();
};

export default AbstractModal;

const ModalWrapper = styled.div<FooterProps>`
  ${props => props.theme.modalLayoutCSS};
  height: 668px;
  z-index: 200001;
  overflow-y: scroll;
  visibility: ${({ hidden }) => (hidden ? 'hidden' : 'visibility')};
  ${theme.hideScroll};
  @media all and (max-width: ${theme.pc}px) {
    top: unset;
    transform: unset;
    bottom: 0;
    left: 0;
    height: ${props => (props.isFullSize ? '100%' : '531px')};
    background-color: transparent;
    box-shadow: 0;
  }

  .inner-wrapper {
    position: relative;
    display: flex;
    justify-content: center;
    width: 100%;
    height: ${props => (props.isWrap ? 'auto' : props.noFooter ? 'calc(100% - 100px)' : 'calc(100% - 190px)')};
    padding: 0 31px;
    overflow: hidden;
    overflow-y: scroll;
    ${theme.hideScroll};
    ${({ noPadding }) => noPadding && 'padding: 0;'}
    ${({ noPaddingTop }) => noPaddingTop && 'padding-top: 0;'}
    padding-bottom: var(--ios-bottom);

    @media all and (max-width: ${theme.pc}px) {
      background: white;
      padding: 0;
      height: ${props =>
        props.noFooter && props.isFullSize ? 'calc(100% - 44px)' : props.isFullSize ? 'calc(100% - 135px)' : 'calc(100% - 143px)'};
      padding: ${({ isFullSize }) => (isFullSize ? `27px 15px 0 15px;` : '0')};
      ${({ noPadding }) => noPadding && 'padding: 0;'};
      ${({ noPaddingTop }) => noPaddingTop && 'padding-top: 0;'}
    }
  }
`;

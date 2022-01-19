import { CommonModalProps } from '@modules/CommonInterface';
import theme from '@styles/theme';
import React from 'react';
import styled, { css } from 'styled-components';
export interface FooterProps {
  oneButtonFooter?: boolean;
  isFullSize?: boolean;
  stepFooter?: boolean;
  isReturnButton?: boolean;
  noFooter?: boolean;
  rsvcenter?: boolean;
  isIcash?: boolean;
  isWrap?: boolean;
  noPadding?: boolean;
  noPaddingTop?: boolean;
}
const AbsModalFooter = ({
  oneButtonFooter,
  stepFooter,
  isReturnButton,
  isIcash,
  onClose,
  onBack,
  onConfirm,
  canConfirm,
  cancelText,
  confirmText,
  rsvcenter,
}: Partial<CommonModalProps>) => {
  return oneButtonFooter ? (
    <Footer oneButtonFooter isReturnButton={isReturnButton} isIcash={isIcash}>
      <button className='confirm_btn one_btn_footer' onClick={onClose}>
        {confirmText}
      </button>
    </Footer>
  ) : stepFooter ? (
    <Footer stepFooter isIcash={isIcash}>
      <button className='cancel_btn step_btn' onClick={onBack}>
        {cancelText}
      </button>
      <button className={`confirm_btn step_btn ${canConfirm ? 'on' : ''}`} onClick={onConfirm}>
        {confirmText}
      </button>
    </Footer>
  ) : rsvcenter ? (
    <Footer rsvcenter stepFooter isIcash={isIcash}>
      <button style={{ width: '29%' }} className='cancel_btn' onClick={onClose}>
        {cancelText}
      </button>
      <button style={{ width: '69%' }} className={`confirm_btn ${canConfirm ? 'on' : ''}`} onClick={onConfirm}>
        {confirmText}
      </button>
    </Footer>
  ) : (
    <Footer oneButtonFooter stepFooter isIcash={isIcash}>
      <button className='cancel_btn' onClick={onClose}>
        {cancelText}
      </button>
      <button className={`confirm_btn ${canConfirm ? 'on' : ''}`} onClick={onConfirm}>
        {confirmText}
      </button>
    </Footer>
  );
};

export default React.memo(AbsModalFooter);

const Footer = styled.div<FooterProps>`
  width: 100%;
  height: 91px;
  background-color: ${props => (props.oneButtonFooter ? '#fff' : props.stepFooter ? '#fff' : '#fbfbfb')};
  border-top: ${props => (props.oneButtonFooter ? '0' : props.stepFooter ? '0' : '1px solid #d8d8d8')};
  padding: 20px 30px;
  position: fixed;
  display: flex;
  justify-content: space-between;
  bottom: var(--ios-bottom);
  left: 0;

  @media all and (max-width: ${theme.pc}px) {
    padding: 20px 15px;
  }
  > button {
    width: 170px;
    height: 50px;
    font-size: 16px;
    @media all and (max-width: ${theme.pc}px) {
      width: 49.2%;
    }
  }
  .cancel_btn {
    border: 1px solid #d8d8d8;
    background-color: #fff;
    margin-right: 5px;
    color: ${theme.black};
  }
  .cancel_btn.step_btn {
    width: 30.434%;
  }
  .confirm_btn {
    background-color: #8c8c8c;
    color: #fff;
  }
  .confirm_btn.on {
    background-color: #262626;
    color: #fff;
  }
  .confirm_btn.one_btn_footer {
    width: 100%;
    background-color: ${props => (props.oneButtonFooter && props.isReturnButton ? '#fff' : '#4866E4')};
    color: ${props => (props.oneButtonFooter && props.isReturnButton ? '#262626' : '#fff')};
    border: ${props => (props.oneButtonFooter && props.isReturnButton ? '1px solid #dfdfdf' : '0')};
  }
  .confirm_btn.step_btn {
    width: 68.115%;
    background-color: #f9f9f9;
    color: #8c8c8c;
    border: 1px solid #dfdfdf;
  }
  .confirm_btn.step_btn.on {
    background-color: ${props => props.theme.blue};
    color: #fff;
  }
`;

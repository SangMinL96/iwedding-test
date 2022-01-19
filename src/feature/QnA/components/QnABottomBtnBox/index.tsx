import { useIsFormValid } from '@feature/QnA/hooks/useFormStore';
import theme from '@styles/theme';
import React from 'react';
import styled from 'styled-components';

interface Props {
  handleClose: () => void;
  handleConfirm: () => void;
  confirmTitle: string;
}

const QnABottomBtnBox = ({ handleClose, handleConfirm, confirmTitle }: Props) => {
  const isFormValid = useIsFormValid();
  return (
    <BtnBox>
      <BottomBtn onClick={handleClose}>취소</BottomBtn>
      <ConfirmBtn onClick={handleConfirm} disabled={!isFormValid} isFormValid={isFormValid}>
        {confirmTitle}
      </ConfirmBtn>
    </BtnBox>
  );
};

export default QnABottomBtnBox;

const BtnBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 20px 30px;
  position: sticky;
  background-color: #fbfbfb;
  border-top: 1px solid #dfdfdf;
  z-index: 3;
  bottom: 0;
`;

const BottomBtn = styled.button`
  display: grid;
  place-items: center;
  width: 50%;
  height: 50px;
  background-color: #fff;
  border: 1px solid #dfdfdf;
  color: ${theme.black};
  font-size: 16px;
`;

const ConfirmBtn = styled(BottomBtn)<{ isFormValid: boolean }>`
  background-color: ${theme.gray};
  color: #dfdfdf;
  background: grey;
  margin-left: 5px;
  border: none;
  ${({ isFormValid }) =>
    isFormValid &&
    `
      background-color: ${theme.black};
      color: #ffffff;
      cursor:
    `}
`;

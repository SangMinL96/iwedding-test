import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 24vw;
  border-top: 1px solid #dfdfdf;
  background-color: #fbfbfb;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 4vw;
  .bottom-btn {
    outline: none;
    border: none;
    background-color: #fff;
    width: 45vw;
    height: 13vw;
    font-size: 4.2vw;
  }
  .bottom-btn.cancel-btn {
    border: 1px solid #dfdfdf;
  }
  .bottom-btn.confirm-btn {
    background-color: #8c8c8c;
    color: #fff;
  }
`;

interface BottomBtnBoxPros {
  onConfirm: () => void;
  onClose: () => void;
  btnText: string;
}

// 같은 크기 선택완료 버튼
export const BottomBtnBox = ({ onConfirm, btnText, onClose }: BottomBtnBoxPros) => {
  return (
    <Container>
      <button className='bottom-btn cancel-btn' onClick={onClose}>
        취소
      </button>
      <button className='bottom-btn confirm-btn' onClick={onConfirm}>
        {btnText}
      </button>
    </Container>
  );
};

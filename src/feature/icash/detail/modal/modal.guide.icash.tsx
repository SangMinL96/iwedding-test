import { CommonModalProps } from '@modules/CommonInterface';
import React from 'react';
import styled from 'styled-components';

// 아이캐시 헤더 옆에 물음표 버튼 누르면 나오는 아이캐시 설명

const ModalGuideIcash = (props: CommonModalProps) => {
  return (
    <>
      <Overlay visible={props.visible} />
      <Container visible={props.visible}>
        <p className='guide_title'>아이캐시란?</p>
        <p>
          아이웨딩에서 결제하는
          <br />
          모든 상품에서 현금처럼 사용 가능한
          <br />
          적립금 형태의 포인트입니다.
        </p>
        <button className='close_button' onClick={props.onClose}>
          닫기
        </button>
      </Container>
    </>
  );
};
export default ModalGuideIcash;
const Overlay = styled.div<{ visible: boolean }>`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: ${({ visible }) => (visible ? 'block' : 'none')};
  z-index: 11; // z-index 아이웨딩 홈페이지 맞춰서 수정할것!!!
`;

const Container = styled.div<{ visible: boolean }>`
  display: ${({ visible }) => (visible ? 'block' : 'none')};
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow: hidden;
  z-index: 12;
  width: 280px;
  height: 255px;
  background-color: #fff;
  text-align: center;
  padding-top: 46px;
  font-size: 14px;
  line-height: 20px;
  .guide_title {
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 10px;
  }
  .close_button {
    width: 170px;
    height: 50px;
    border: 1px solid #dfdfdf;
    margin-top: 22px;
  }
`;

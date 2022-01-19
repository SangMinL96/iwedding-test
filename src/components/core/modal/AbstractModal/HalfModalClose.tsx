import React from 'react';
import Image from 'next/image';
import closeBtnWhite from '@images/common/close_btn_white.png';
import theme from '@styles/theme';
import styled from 'styled-components';

interface Props {
  onClose: () => void;
}

const HalfModalClose = ({ onClose }: Props) => {
  return (
    <MobileClose onClick={onClose}>
      <span>
        <Image unoptimized src={closeBtnWhite} alt='close-btn' />
      </span>
    </MobileClose>
  );
};

export default React.memo(HalfModalClose);

const MobileClose = styled.div`
  display: none;
  cursor: pointer;
  @media all and (max-width: ${theme.pc}px) {
    display: flex;
    width: 52px;
    height: 52px;
    z-index: 10;
    position: relative;
    justify-content: center;
    align-items: center;
    span {
      display: flex;
      width: 18px;
      height: 18px;
      > img {
        width: 18px;
        height: 18px;
      }
    }
  }
`;

import { Desktop } from '@hooks/useDevice';
import backBtn from '@images/common/back_btn.png';
import homeBtn from '@images/common/home_icon_x3.png';
import Image from 'next/image';
import router from 'next/router';
import React from 'react';
import styled from 'styled-components';

interface Props {
  title: string;
  onBack?: () => void;
  onClose?: () => void;
}

const MobileModalHeader = ({ title, onBack, onClose }: Props) => {
  const isDeskTop = Desktop();
  return (
    <Container>
      <button className='back-btn' onClick={onClose ?? onBack}>
        <Image unoptimized width={9} height={18} src={backBtn} alt='뒤로가기' />
      </button>
      <p className='header-title'>{title}</p>
      {!isDeskTop && (
        <button className='home-btn' onClick={() => router.push('/main/index')}>
          <Image src={homeBtn} alt='메인' /> {/* 임시 */}
        </button>
      )}
    </Container>
  );
};

export default React.memo(MobileModalHeader);

const Container = styled.div`
  display: flex;
  background-color: #fff;
  justify-content: center;
  align-items: center;
  width: 100%;
  position: relative;
  height: 44px;
  border-bottom: 1px solid #d8d8d8;
  padding: 0 15px;
  text-align: center;
  .header-title {
    display: block;
    font-size: 15px;
  }
  .back-btn {
    ${props => props.theme.resetBtnStyle}
    width: 20px;
    height: 100%;
    position: absolute;
    top: 0;
    left: 1.6vw;
    > div {
      width: 9px;
      height: 18px;
    }
  }
  .home-btn {
    ${props => props.theme.resetBtnStyle}
    width: 24px;
    height: 24px;
    background: transparent;
    top: 10px;
    right: 2vw;
    position: absolute;
  }
`;

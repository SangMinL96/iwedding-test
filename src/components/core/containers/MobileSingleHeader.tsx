import React from 'react';
import styled from 'styled-components';
import homeBtn from '@images/common/home_icon_x3.png';
import Image from 'next/image';
import theme from '@styles/theme';
import { BackButton } from '../buttons/BackButton';
import { isWebview } from '@utils/isWebview';
import router from 'next/router';
import { Desktop } from '@hooks/useDevice';

const Container = styled.div`
  width: 100%;
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  height: 44px;
  border-bottom: 1px solid #dddddd;
  background-color: #fff;
  justify-content: center;
  align-items: center;
  z-index: 11;
  @media all and (max-width: ${theme.pc}px) {
    display: flex;
  }

  > span {
    font-size: 15px;
  }

  .back-btn {
    ${props => props.theme.resetBtnStyle};
    width: 21px;
    height: 43px;
    ${props => props.theme.flexCenter};
    position: absolute;
    top: 0;
    left: 6px;

    > img {
      width: 9px;
      height: 18px;
    }
  }
  .home-btn {
    ${props => props.theme.resetBtnStyle}
    background: transparent;
    top: 8px;
    right: 1.6vw;
    position: absolute;
  }
`;

class Props {
  title: string;
  disable?: boolean;
  goMain?: boolean;
  onClickBack?: () => void;
}

const MobileSingleHeader = ({ title, disable, goMain = false, onClickBack }: Props) => {
  const isDeskTop = Desktop();
  return (
    <Container>
      {!disable && <BackButton onClickBack={onClickBack} />}
      <span>{title}</span>
      {!isDeskTop && (
        <button className='home-btn' onClick={() => router.push('/main/index')}>
          <Image width={24} height={24} src={homeBtn} alt='메인' /> {/* 임시 */}
        </button>
      )}
    </Container>
  );
};

export default MobileSingleHeader;

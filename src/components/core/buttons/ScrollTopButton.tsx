import theme from '@styles/theme';
import Image from 'next/image';
import { Desktop, Mobile } from '@hooks/useDevice';
import React, { useCallback, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import arrow from '@images/common/arrow_up.png';

interface Props {
  bottom?: number;
  showButton?: boolean;
  footerTop?: number;
  isOverFooter?: boolean;
}

const ScrollTopButton = ({ bottom = 0, footerTop }: Props) => {
  const [showButton, setShowButton] = useState(false);
  const [isOverFooter, setOverFooter] = useState(false);
  const isDesktop = Desktop();
  const footerHeight = 376.38;
  const onScroll = useCallback(() => {
    if (isDesktop && window.scrollY > document.documentElement.scrollHeight - (window.innerHeight + footerHeight)) {
      setOverFooter(true);
    } else {
      setOverFooter(false);
    }
    // 스크롤 사이즈가 320px보다 클 경우
    if (window.scrollY > theme.mobileSM) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', onScroll);
      return () => {
        window.removeEventListener('scroll', onScroll);
      };
    }
  }, [onScroll]);

  const onClickScrollTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <ScrollTop onClick={onClickScrollTop} showButton={showButton} isOverFooter={isOverFooter}>
      <div className='scroll_top_btn'>
        <Image src={arrow} alt='위로가기' width={16} height={16} />
      </div>
    </ScrollTop>
  );
};

export default ScrollTopButton;

const ScrollTop = styled.button<{ showButton: boolean; isOverFooter: boolean }>`
  ${theme.flexCenter};
  position: ${props => (props.isOverFooter ? 'relative' : 'fixed')};
  left: 50%;
  transform: translateX(-50%);
  bottom: ${props => (props.isOverFooter ? '455px' : '65px')};
  display: ${props => (props.showButton ? 'flex' : 'none')};
  width: 1280px;
  height: 0;
  z-index: 20;
  @media all and (max-width: 1280px) {
    width: 100%;
    left: unset;
    transform: unset;
    right: 15px;
    bottom: 120px;
  }
  .scroll_top_btn {
    position: absolute;
    top: 0;
    right: -68px;
    ${theme.flexCenter}
    width: 48px;
    height: 48px;
    border: 1px solid #d6d6d6;
    border-radius: 50%;
    background-color: #fff;
    @media all and (max-width: 1280px) {
      right: 0;
    }
  }
`;

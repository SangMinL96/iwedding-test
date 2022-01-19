import theme from '@styles/theme';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import HamburgerMenu from './HamburgerMenu/HamburgerMenu';
import { useRouter } from 'next/router';
import Image from 'next/image';
import hamburgerIcon from '@images/common/hamburger_icon_x3.png';
import closeIcon from '@images/common/close_icon_x3.png';
import searchIcon from '@images/common/search_icon_x3.png';
import homeIcon from '@images/common/home_icon_x3.png';
import cartIcon from '@images/common/cart_icon_x3.png';
import userIcon from '@images/common/user_icon_x3.png';
import { useTalkCount } from '@modules/user/user.api';
import { useMyQuotationList } from '@modules/mypage/quotation/QuotationAPI';
import { isWebview } from '@utils/isWebview';
import { Desktop } from '@hooks/useDevice';
import { haveAccessToken } from '@service/TokenService';

// To Do : 톡 갯수 가져오기(마이페이지 뱃지)

const BottomNavigation = () => {
  const [isOpen, setOpen] = useState(false);
  const isDeskTop = Desktop();
  const router = useRouter();
  const [isFocus, setIsFocus] = useState<string>('');
  const { data: talk } = useTalkCount();
  const { metadata } = useMyQuotationList();
  const toggleMenu = () => {
    if (isDeskTop) {
      setOpen(prev => !prev);
    } else {
      if (isOpen) {
        router.back();
      } else {
        setOpen(true);
        router.push(`${router.asPath}#openMenu`);
      }
    }
  };

  if (router.isReady) {
    router.events.on('routeChangeStart', () => setOpen(false));
    if (!isDeskTop && router.asPath.includes('#openMenu')) {
      router.beforePopState(() => {
        setOpen(false);
        return true;
      });
    }
  }
  useEffect(() => {
    if (global.window) {
      setIsFocus(router.asPath);
    }
  }, [router]);

  const onTokenNav = (link: string) => () => {
    const isLogin = haveAccessToken();
    if (isLogin) {
      router.push(link);
    } else {
      if ('https://www.iwedding.co.kr/mobile/mypage') {
        router.push(`https://www.iwedding.co.kr/member/login?ret_url=${encodeURIComponent(`https://www.iwedding.co.kr/mobile/mypage`)}`);
      } else {
        router.push(`https://www.iwedding.co.kr/member/login?ret_url=${encodeURIComponent(`${process.env.NEXT_PUBLIC_WEB_HOST}${link}`)}`);
      }
    }
  };

  const homeIconList = ['search', 'quotation', 'mobile/mypage'];
  if (router.pathname.includes('/request/form')) return null;
  if (router.pathname.includes('/request/replace')) return null;
  if (router.pathname.includes('/coupon/rsv')) return null;
  if (router.pathname.includes('/alarm') && !isDeskTop) return null;
  return (
    <>
      <Container>
        <div className='link_inner' onClick={toggleMenu}>
          <span className='inner_img'>
            <Image src={!isOpen ? hamburgerIcon : closeIcon} alt='전체 메뉴' />
          </span>
          <BtnTitle isFocus={isOpen} className='inner_text'>
            전체 메뉴
          </BtnTitle>
        </div>
        <Link href='/search' passHref>
          <div className='link_inner'>
            <span className='inner_img'>
              <Image src={searchIcon} alt='검색' />
            </span>
            <BtnTitle isFocus={isFocus.includes('search')} className='inner_text'>
              검색
            </BtnTitle>
          </div>
        </Link>
        <Link href='/main/index' passHref>
          <div className='link_inner'>
            <span className='inner_img'>
              <Image src={homeIcon} alt='홈' />
            </span>
            <BtnTitle isFocus={homeIconList.find(item => isFocus.includes(item)) ? false : true} className='inner_text'>
              홈
            </BtnTitle>
          </div>
        </Link>

        <div onClick={onTokenNav('/quotation')} className='link_inner'>
          <span className='inner_img'>
            <Image src={cartIcon} alt='견적함' />
            {metadata?.totalItems > 0 ? (
              metadata?.totalItems > 99 ? (
                <span className='badge'>99</span>
              ) : (
                <span className='badge'>{metadata?.totalItems}</span>
              )
            ) : null}
          </span>
          <BtnTitle isFocus={isFocus.includes('quotation')} className='inner_text'>
            견적
          </BtnTitle>
        </div>

        <div onClick={onTokenNav('https://www.iwedding.co.kr/mobile/mypage')} className='link_inner'>
          <span className='inner_img'>
            <Image src={userIcon} alt='마이' />
            {talk?.count > 0 ? talk?.count > 99 ? <span className='badge'>99</span> : <span className='badge'>{talk?.count}</span> : null}
          </span>
          <BtnTitle isFocus={isFocus.includes('mobile/mypage')} className='inner_text'>
            마이페이지
          </BtnTitle>
        </div>
      </Container>
      <HamburgerMenu isOpen={isOpen} />
    </>
  );
};

export default React.memo(BottomNavigation);

const Container = styled.div`
  position: fixed;
  bottom: 0;
  display: flex;
  align-items: center;
  height: 56px;
  width: 100%;
  background: #fff;
  color: ${theme.black};
  z-index: 1002;
  overflow: hidden;
  .link_inner {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    padding: 9px 0 7px 0;
    width: 20%;
    height: 100%;
    .inner_img {
      ${theme.flexCenter};
      position: relative;
      width: 24px;
      height: 24px;
      .badge {
        ${theme.flexCenter};
        position: absolute;
        top: -4px;
        right: -10px;
        width: 20px;
        height: 15px;
        background-color: #fd4381;
        font-size: 10px;
        font-weight: 500;
        font-family: 'Poppins', sans-serif;
        color: #fff;
        border-radius: 10px;
        padding-left: 0.5px;
      }
    }
  }
`;

const BtnTitle = styled.span<{ isFocus: boolean }>`
  display: block;
  font-size: ${props => (props.isFocus ? '10px' : '10px')};
  font-weight: ${props => (props.isFocus ? 'bold' : 'bold')};
  color: #111111;
  margin-top: 4px;
`;

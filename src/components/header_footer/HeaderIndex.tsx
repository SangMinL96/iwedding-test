import FloatingMenu from '@feature/main/type_common/floating.menu';
import { useScrollDir } from '@hooks/useScrollDir';
import { noticeOpenLog } from '@modules/log/notice/noticeLogger';
import { haveAccessToken } from '@service/TokenService';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Desktop } from '../../hooks/useDevice';
import DepthPageHeader from './DepthPageHeader';
import HamburgerMenu from './HamburgerMenu/HamburgerMenu';
import LoginMenu from './LoginMenu';
import MobileNewHeader from './mobileNewHeader';
import MobileNewMenu from './mobileNewMenu';
import NotificationCenter from './NotificationCenter';
import { isDesktop } from 'react-device-detect';
const HeaderIndex = () => {
  const mediaDeskTop = Desktop();
  // 모바일 사이드 메뉴
  // const [sideVisible, setSideVisible] = useState(false);
  const router = useRouter();
  const {
    query: { alramFlag },
  } = useRouter();
  // 전체메뉴
  const [isOpen, setOpen] = useState(false);
  const toggleMenu = () => {
    setOpen(isOpen => !isOpen);
  };
  const closeMenu = () => setOpen(false);
  // 알림센터
  const [isNotiOpen, setNotiOpen] = useState(false);
  const toggleNoti = async () => {
    if (haveAccessToken()) {
      if (mediaDeskTop) {
        if (!isNotiOpen) {
          await noticeOpenLog();
        }
        setNotiOpen(prev => !prev);
      } else {
        if (isNotiOpen) {
          router.back();
        } else {
          const result = await noticeOpenLog();
          if (result === 'OK') router.push(`/alarm`);
        }
      }
    } else {
      router.push(`https://www.iwedding.co.kr/member/login?ret_url=${global.window && encodeURIComponent(window.location.href)}`);
    }
  };

  const queryToggleNoti = async () => {
    if (haveAccessToken()) {
      if (mediaDeskTop) {
        const result = await noticeOpenLog();
        if (result === 'OK') setNotiOpen(true);
      } else {
        if (isNotiOpen) {
          router.back();
        } else {
          const result = await noticeOpenLog();
          if (result === 'OK') setTimeout(() => router.replace(`/alarm`), 100);
        }
      }
    } else {
      router.push(`https://www.iwedding.co.kr/member/login?ret_url=${global.window && encodeURIComponent(window.location.href)}`);
    }
  };

  useEffect(() => {
    if (alramFlag === '1') {
      queryToggleNoti();
    }
  }, [alramFlag]);

  const closeNoti = () => {
    setNotiOpen(false);
    if (!mediaDeskTop) {
      if (!isDesktop) router.back();
    }
  };

  const { scrollDir, isScrollTop, isFixed } = useScrollDir();
  if (router.pathname.includes('/request/form')) return null;
  if (router.pathname.includes('/request/replace')) return null;
  if (router.pathname.includes('/alarm')) return null;
  return (
    <>
      <StickyWrapper mediaDeskTop={mediaDeskTop} isDepthHeader={router.asPath.includes('/main/page')}>
        {mediaDeskTop && <LoginMenu isScrollTop={isScrollTop} />}
        {!mediaDeskTop && router.asPath.includes('/main/page') ? (
          <DepthPageHeader />
        ) : (
          <>
            <MobileNewHeader
              isScrollTop={isScrollTop}
              isFixed={isFixed}
              scrollDir={scrollDir}
              toggleNoti={toggleNoti}
              toggleMenu={toggleMenu}
            />
            {<MobileNewMenu isScrollTop={isScrollTop} scrollDir={scrollDir} toggleMenu={toggleMenu} />}
          </>
        )}
        {mediaDeskTop && !router.asPath.includes('/main/page') && <FloatingMenu />}
      </StickyWrapper>
      <HamburgerMenu isOpen={isOpen} closeMenu={closeMenu} />
      <NotificationCenter isNotiOpen={isNotiOpen} closeNoti={closeNoti} />
      <BgFilter
        isOpen={isOpen}
        isNotiOpen={isNotiOpen}
        onClick={() => {
          closeMenu();
          closeNoti();
        }}
      />
    </>
  );
};

export default HeaderIndex;

const StickyWrapper = styled.div<{ mediaDeskTop?: boolean; isDepthHeader?: boolean }>`
  position: sticky;
  top: ${props => (props.mediaDeskTop ? '0' : '0')};
  width: 100%;
  z-index: 11;
  background-color: #fff;
  box-shadow: ${props => (props.isDepthHeader ? 'none' : 'rgba(149, 157, 165, 0.1) 0px 3px 6px;')};
  @media all and (min-width: 1280px) {
    position: relative;
    height: 177px;
    border-bottom: 1px solid #ebebeb;
    box-shadow: none;
  }
  .login_menu.hide {
    display: none;
  }
  .fixed_header.active {
    @media all and (min-width: 1280px) {
      width: 100%;
      background-color: #fff;
      position: fixed;
      top: 0;
      border-bottom: 1px solid #ebebeb;
      box-shadow: rgba(149, 157, 165, 0.1) 0px 3px 6px;
      z-index: 12;
    }
  }
`;

const BgFilter = styled.div<{ isOpen: boolean; isNotiOpen: boolean }>`
  position: fixed;
  display: ${props => (props.isOpen || props.isNotiOpen ? 'block' : 'none')};
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1000;
`;

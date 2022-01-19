import React, { useRef, ReactNode, useState, useEffect } from 'react';
import ScrollTopButton from '@components/core/buttons/ScrollTopButton';
import BottomNavigation from '@components/header_footer/BottomNavigation';
import NewFooter from '@components/header_footer/new.footer';
import { Desktop } from '@hooks/useDevice';
import { useRouter } from 'next/router';
import { isDesktop } from 'react-device-detect';
import styled from 'styled-components';
import HeaderIndex from '../header_footer/HeaderIndex';
import dynamic from 'next/dynamic';
import { usePushScrollTop } from '@feature/search/hooks/usePushScrollTop';

interface Props {
  children: ReactNode;
}

const DynamicHeaderIndexWithNoSSR = dynamic(() => import('../header_footer/HeaderIndex'), { ssr: false });

const Layout = ({ children }: Props) => {
  // const footerRef = useRef<HTMLDivElement>(null);
  // const [footerTop, setFooterTop] = useState(0);

  //IOS일때만 스크롤 위치 기억하고 그위치로 (리액트로 다 전환되면 삭제해야함.)
  // usePushScrollTop();
  const router = useRouter();
  const isDeskTop = Desktop();
  const noHeaderRoute = [
    !isDeskTop && '/search',
    !isDeskTop && '/search/result',
    !isDeskTop && '/mypage',
    !isDeskTop && '/mobile/mypage',
    !isDeskTop && '/quotation',
    !isDeskTop && '/coupon',
    !isDeskTop && '/calculator',
    !isDeskTop && '/icash',
    !isDeskTop && '/zzim',
    !isDeskTop && '/order',
    !isDeskTop && '/request',
    !isDeskTop && '/request/form',
    !isDeskTop && '/rsvcenter',
    'chat',
  ];
  const noBottomNav = [!isDeskTop && '/quotation/', !isDeskTop && '/rsvcenter'];

  return (
    <section>
      {!noHeaderRoute.find(route => router?.asPath.includes(route)) ? (
        <>
          <DynamicHeaderIndexWithNoSSR />
          <Container>{children}</Container>
          {isDesktop && <NewFooter />}
        </>
      ) : (
        <Container>{children}</Container>
      )}
      {!noBottomNav.find(route => router?.asPath.includes(route)) && !isDeskTop && <BottomNavigation />}

      <ScrollTopButton />
    </section>
  );
};

export default Layout;

const Container = styled.main`
  width: 100%;
  height: 100%;
  margin: auto;
  padding-bottom: var(--ios-bottom);
`;

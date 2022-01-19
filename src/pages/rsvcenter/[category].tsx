const MobileHeader = dynamic(() => import('@components/core/containers/MobileSingleHeader'));
const GiftIndex = dynamic(() => import('@feature/rsvcenter/gift/GiftIndex'));
const HanbokIndex = dynamic(() => import('@feature/rsvcenter/hanbok/HanbokIndex'));
const InquiryIndex = dynamic(() => import('@feature/rsvcenter/inquiry/InquiryIndex'));
const RobesIndex = dynamic(() => import('@feature/rsvcenter/robes/RobesIndex'));
const HallIndex = dynamic(() => import('@feature/rsvcenter/hall/HallIndex'));
import { Desktop } from '@hooks/useDevice';
import { useIsIOS } from '@hooks/useIsIOS';
import { useSwrLocal } from '@hooks/useSwrLocal';
import { rsvcenterLogAPI } from '@modules/log/rsv/rsvLogger';
import { rsvCenterKeys } from '@modules/rsvcenter/api';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect } from 'react';

import styled from 'styled-components';
import dynamic from 'next/dynamic';
import SiteTitle from '@components/layout/SiteTitle';
import { useWebIdPrivatePage } from '@hooks/usePrivatePage';
import Loading from '@components/Loading';
import TmpPageHeader from '@feature/main/type_common/tmp.page.header';
import DepthPageHeader from '@components/header_footer/DepthPageHeader';

type ParamsType = {
  category: 'hanbok' | 'robes' | 'gift' | 'hall' | 'find_hall' | 'inquiry';
};

function RsvCenterIndex() {
  const authenticated = useWebIdPrivatePage();
  const {
    query: { code, category },
  } = useRouter();
  const ios = useIsIOS();
  const isDeskTop = Desktop();

  const { data } = useSwrLocal<string>(rsvCenterKeys.inquiryCategory);
  const onHangle = useCallback(() => {
    switch (category) {
      case 'hanbok':
        return '한복';
      case 'robes':
        return '예복';
      case 'gift':
        return '예물';
      case 'inquiry':
        return data || '';
      default:
        return '';
    }
  }, [category, data]);

  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') {
      if (category === 'hanbok' || category === 'gift' || category === 'robes')
        rsvcenterLogAPI(global.window && window.location.href, onHangle(), code as string);
    }
  }, [category, code, onHangle]);
  const onMobileHeader = () => {
    if (!isDeskTop) {
      return (
        <>
          <DepthPageHeader title={`${onHangle()} 예약 센터`} />
          <TmpPageHeader isHeader tmpTitle={`예약부터 구매까지 ${onHangle()} 간편 예약센터`} />
        </>
      );
    }
    return null;
  };
  return authenticated ? (
    <>
      <SiteTitle title={`${onHangle()} 예약 센터`} />
      {isDeskTop && (
        <Title>
          <h1>{onHangle()} 예약 센터</h1>
        </Title>
      )}
      {onMobileHeader()}

      <Container isDeskTop={isDeskTop} isIos={ios}>
        {category === 'hanbok' && <HanbokIndex />}
        {category === 'robes' && <RobesIndex />}
        {category === 'gift' && <GiftIndex />}
        {category === 'hall' && <HallIndex category={category} />}
        {category === 'find_hall' && <HallIndex category={category} />}
        {category === 'inquiry' && <InquiryIndex />}
      </Container>
    </>
  ) : (
    <Loading />
  );
}
export default RsvCenterIndex;
type StyledProps = {
  isDeskTop?: boolean;
  isIos?: boolean;
};

const Title = styled.div`
  width: 100%;
  margin: 70px 0px 53px;
  ${props => props.theme.flexCenter};
  @media all and (max-width: 1280px) {
    display: none;
  }
  h1 {
    font-size: 32px;
    font-weight: 700;
    width: 1280px;
    ${props => props.theme.flexCenter};
    justify-content: flex-start;
  }
`;

const Container = styled.section<StyledProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: ${props => (props.isDeskTop ? '' : '100%')};
  margin-bottom: 100px;
  @media all and (max-width: 1280px) {
    margin-top: 44px;
    padding: ${props => props.isDeskTop && '45px 0'};
    margin-bottom: 0;
  }
`;

import { useDeepEffect } from '@hooks/useDeepEffect';
import theme from '@styles/theme';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

const Loading = dynamic(() => import('@components/Loading'));
const MyPageLayout = dynamic(() => import('@components/layout/MyPageLayout'));
const MyQuotation = dynamic(() => import('feature/quotation/MyQuotation'));
const RealtimeQuote = dynamic(() => import('feature/quotation/RealtimeQuote'));
const RecommendQuotation = dynamic(() => import('feature/quotation/recommend_quotation/recommend_quotation.index'));

interface TabActiveProps {
  tabActive: boolean;
}

export const TabHash = {
  Me: 'ME',
  Recommend: 'RECOMMEND',
  Realtime: 'REALTIME',
};

const Quotation = () => {
  const router = useRouter();
  const [quotationTab, setQuotationTab] = useState(TabHash.Me);

  useDeepEffect(() => {
    if (router.query?.t === '2') {
      setQuotationTab(TabHash.Realtime);
      router.replace('/quotation');
    }
  }, [router.query]);

  const handleClick = useCallback(
    (tab: string) => () => {
      if (tab !== quotationTab) {
        setQuotationTab(tab);
      }
    },
    [quotationTab, setQuotationTab],
  );

  return (
    <MyPageLayout title='견적함'>
      {!quotationTab ? (
        <Loading />
      ) : (
        <>
          <TabButton onClick={handleClick(TabHash.Me)} tabActive={quotationTab === TabHash.Me}>
            나의 견적
          </TabButton>
          <TabButton onClick={handleClick(TabHash.Recommend)} tabActive={quotationTab === TabHash.Recommend}>
            추천 견적
          </TabButton>
          <TabButton onClick={handleClick(TabHash.Realtime)} tabActive={quotationTab === TabHash.Realtime}>
            실시간 견적
          </TabButton>
          <QuotationBody>
            {quotationTab === TabHash.Me ? (
              <MyQuotation />
            ) : quotationTab === TabHash.Recommend ? (
              <RecommendQuotation />
            ) : (
              <RealtimeQuote />
            )}
          </QuotationBody>
        </>
      )}
    </MyPageLayout>
  );
};

export default Quotation;

const QuotationBody = styled.div`
  width: 100%;
  position: relative;
  min-height: 70vh;
  @media all and (max-width: ${theme.pc}px) {
    width: 100%;
    padding: 15px;
  }
  padding-bottom: var(--ios-bottom);
`;

const TabButton = styled.button<TabActiveProps>`
  ${props => props.theme.resetBtnStyle};
  box-sizing: border-box;
  width: 33.33%;
  height: 52px;
  font-size: 15px;
  display: inline-block;
  border: 1px solid #dddddd;
  color: ${({ tabActive }) => (tabActive ? '#fd4381' : '#262626')};
  font-weight: ${({ tabActive }) => (tabActive ? '700' : '400')};
  background-color: ${({ tabActive }) => (tabActive ? '#FFFFFF' : '#FAFAFA')};
  border-bottom: ${({ tabActive }) => (tabActive ? 'none' : '1px solid #dddddd')};

  &:nth-child(2) {
    border-left: none;
    border-right: none;
  }

  @media all and (max-width: ${theme.pc}px) {
    width: 33%;
    height: 50px;
    border-top: none;

    &:first-child {
      border-left: 0;
    }

    &:nth-child(2) {
      width: 34%;
    }

    &:last-child {
      border-right: 0;
    }
  }
`;

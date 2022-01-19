import Loading from '@components/Loading';
import { Desktop } from '@hooks/useDevice';
import { recommendQuotationCount, useGetRecommendQuotation } from '@modules/mypage/quotation/QuotationAPI';
import { QuotationRecommend } from '@modules/mypage/quotation/QuotationInterface';
import theme from '@styles/theme';
import { isWebview } from '@utils/isWebview';
import { openNewTab } from '@utils/util';
import Image from 'next/image';
import router from 'next/router';
import React from 'react';
import styled from 'styled-components';

const RecommendQuotation = () => {
  const isDesktop = Desktop();
  const { data: recommendQuoPage, isValidating } = useGetRecommendQuotation(1, isDesktop ? 4 : 100);

  return isValidating ? (
    <Loading />
  ) : (
    <Container>
      {recommendQuoPage?.items?.map(item => (
        <RecommendQuotationItem key={item.no} quotation={item} />
      ))}
    </Container>
  );
};

interface RecommendQuotationItemProps {
  quotation: QuotationRecommend;
}

const RecommendQuotationItem = ({
  quotation: { m_img, main_title, sub_title, mobile_url, pc_url, no, view_img, app_url, app_link_type, card_number },
}: RecommendQuotationItemProps) => {
  const isDesktop = Desktop();
  const onClick = async () => {
    await recommendQuotationCount(no);
    if (isDesktop) {
      openNewTab(pc_url);
    } else {
      router.replace(mobile_url);
    }
  };

  return (
    <Item onClick={onClick}>
      <Image
        unoptimized
        src={m_img}
        layout={isDesktop ? 'fill' : 'responsive'}
        width={isDesktop ? null : '1100'}
        height={isDesktop ? null : '1100'}
        alt='img'
      />
      {!view_img && (
        <>
          <div className='text-box'>
            <span className='sub-title'>{sub_title}</span>
            <p className='title'>{main_title}</p>
          </div>
          <div className='bottom-shadow' />
        </>
      )}
    </Item>
  );
};

export default RecommendQuotation;

const Container = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 30px;
  margin-top: 30px;

  @media all and (max-width: ${theme.pc}px) {
    margin-top: 0;
    grid-template-columns: 1fr;
    grid-gap: 15px;
  }
`;
const Item = styled.li`
  width: 380px;
  height: 380px;
  cursor: pointer;
  position: relative;
  @media all and (max-width: ${theme.pc}px) {
    width: 100%;
    height: auto;
  }
  .text-box {
    width: 67.4%;
    position: absolute;
    bottom: 32px;
    left: 20px;
    color: #fff;
    z-index: 2;
    @media all and (max-width: ${theme.pc}px) {
      width: 80%;
    }

    .sub-title {
      display: block;
      font-size: 14px;
      margin-bottom: 7px;
    }

    .title {
      display: block;
      font-size: 24px;
      font-weight: 500;
      line-height: 31px;
      margin-left: -1px;
      word-break: keep-all;
    }
  }

  .bottom-shadow {
    width: 100%;
    height: 50%;
    position: absolute;
    bottom: 0;
    background: linear-gradient(
      to bottom,
      rgba(20, 20, 20, 0) 10%,
      rgba(20, 20, 20, 0.2) 25%,
      rgba(20, 20, 20, 0.5) 50%,
      rgba(20, 20, 20, 0.75) 75%,
      rgba(20, 20, 20, 1) 100%
    );
  }
`;

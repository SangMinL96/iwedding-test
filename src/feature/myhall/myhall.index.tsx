import MyPageLayout from '@components/layout/MyPageLayout';
import theme from '@styles/theme';
import React from 'react';
import styled from 'styled-components';
import MyhallRecommend from './myhall.recommend';
import MyhallRsvInquiry from './myhall.rsv.inquiry';

const MyhallContainer = styled.div`
  width: 100%;
  position: relative;
  border-top: 2px solid #262626;
  @media all and (max-width: ${theme.pc}px) {
    padding-top: 4px;
    border-top: 0;
  }
`;

const MyhallIndex = () => {
  return (
    <>
      <MyPageLayout title='나의 웨딩홀'>
        <MyhallContainer>
          <MyhallRsvInquiry />
          <MyhallRecommend />
        </MyhallContainer>
      </MyPageLayout>
    </>
  );
};

export default MyhallIndex;

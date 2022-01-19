import useGoBack from '@hooks/useGoBack';
import theme from '@styles/theme';
import React from 'react';
import styled from 'styled-components';
import backBtn from '@images/common/back_btn.png';
import Image from 'next/image';
import IcashDetailContent from './icash.detail.content';
import PCSideMenu from '@components/PCSideMenu';

// detail페이지 모바일버전 (아이캐시 헤더, 탭 메뉴 없는 버전)

const IcashDetailMobile = () => {
  // 드롭다운 콘텐츠 관련
  const goBack = useGoBack();

  return (
    <Container>
      <div className='page-wrapper'>
        <div className='page-contents'>
          <div className='page-header'>
            <p className='title'>마이페이지</p>
            <span className='subtitle'>아이캐시</span>
          </div>
          <div className='m-page-header'>
            <button className='back-btn' onClick={() => goBack()}>
              <Image unoptimized width={9} height={18} src={backBtn} alt='뒤로가기' />
            </button>
            <span>아이캐시</span>
          </div>

          <div className='main-box'>
            <PCSideMenu />
            <div className='icash_main_box'>
              <IcashDetailContent />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};
export default IcashDetailMobile;
const Container = styled.div`
  ${props => props.theme.paymentLayoutCSS};
  .main-box {
    .icash_main_box {
      width: 789.7px;
      display: inline-block;
      vertical-align: top;
      margin-left: 50px;
      @media all and (max-width: ${theme.pc}px) {
        width: 100%;
        margin-left: 0;
        padding-top: 44px;
      }
      .icash_tab_box {
        width: 100%;
        height: 50px;
        background-color: #fff;
        @media all and (max-width: ${theme.pc}px) {
          padding: 0 15px;
        }
      }
    }
  }
`;

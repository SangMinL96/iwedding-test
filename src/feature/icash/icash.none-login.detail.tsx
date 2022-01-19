import React from 'react';
import styled from 'styled-components';
import backBtn from '@images/common/back_btn.png';
import IcashDetailContent from './detail/icash.detail.content';
import Image from 'next/image';

const ActiveContainer = dynamic(() => import('@components/core/containers/ActiveContainer'));
import theme from '@styles/theme';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

const IcashNoneLoginDetail = () => {
  const router = useRouter();
  return (
    <>
      <Container>
        <div className='m-page-header'>
          <button className='back-btn' onClick={() => router.back()}>
            <Image unoptimized width={9} height={18} src={backBtn} alt='뒤로가기' />
          </button>
          <span>아이캐시 충전소</span>
        </div>
        <ActiveContainer active={true}>
          <IcashDetailContent />
        </ActiveContainer>
      </Container>
    </>
  );
};
export default IcashNoneLoginDetail;
const Container = styled.div`
  width: 100%;
  position: relative;
  padding-top: 44px;
  .m-page-header {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
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
      ${props => props.theme.resetBtnStyle}
      width: 21px;
      height: 43px;
      ${props => props.theme.flexCenter}
      position: absolute;
      top: 0;
      left: 6px;
      > img {
        width: 9px;
        height: 18px;
      }
    }
  }
  .logout_list_box {
    display: block;
    width: 1280px;
    min-width: 1280px;
    margin: 0 auto;
    background-color: #fff;
    @media all and (max-width: ${theme.pc}px) {
      width: 100%;
      min-width: 375px;
      padding: 70px 15px 0 15px;
    }
    .header_title {
      display: block;
      font-size: 32px;
      font-weight: 700;
      margin: 70px 0 53px 0;
      @media all and (max-width: ${theme.pc}px) {
        display: none;
      }
    }
    .mission_list_box {
      margin-bottom: 100px;
      .mission_list {
        > li {
          width: 410px;
          margin-right: 25px;
          @media all and (max-width: ${theme.pc}px) {
            width: 100%;
            margin-right: 0;
          }
          &:nth-child(3n) {
            margin-right: 0;
          }
        }
      }
    }
  }
`;

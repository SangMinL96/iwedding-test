import React, { useState } from 'react';
import theme from '@styles/theme';
import styled from 'styled-components';
import headerImg01 from '../../common/style/images/myhall_header_img01.png';
import MyhallItem from './myhall.item';
import Image from 'next/image';

// const rsvData = [
//   {
//     id: 45897,
//     title: '파티오나인',
//     date: '2020.12.20(토) 14시~16시',
//     replyStatus: 'pending',
//   },
//   {
//     id: 23742,
//     title: '루이비스컨벤션 중구점 외 3개홀',
//     date: '2020.12.20(토) 14시~16시',
//     replyStatus: 'done',
//   },
// ];
const rsvData = [
  {
    id: 45897,
    title: '파티오나인',
    date: '2020.12.20(토) 14시~16시',
    replyStatus: 'pending',
  },
  {
    id: 23742,
    title: '루이비스컨벤션 중구점 외 3개홀',
    date: '2020.12.20(토) 14시~16시',
    replyStatus: 'done',
  },
];

const Container = styled.div`
  width: 100%;
  position: relative;
  margin-bottom: 30px;
  @media all and (max-width: ${theme.pc}px) {
    padding: 0 15px;
  }
  .myhall_title {
    width: 100%;
    height: 84px;
    font-size: 18px;
    font-weight: 700;
    color: #262626;
    line-height: 84px;
    vertical-align: middle;
    @media all and (max-width: ${theme.pc}px) {
      font-size: 16px;
    }
  }
  .myhall_header {
    width: 100%;
    height: 90px;
    position: relative;
    background-color: #4f62a8;
    border-radius: 12px;
    padding: 0 30px;
    margin-bottom: 20px;
    @media all and (max-width: ${theme.pc}px) {
      padding: 0 18px;
    }
    .left_side {
      padding: 18px 0;
      .img_box {
        display: inline-block;
        width: 54px;
        height: 54px;
        border-radius: 50%;
        vertical-align: top;
        > img {
          width: 100%;
        }
      }
      .text_box {
        display: inline-block;
        color: #fff;
        margin-left: 20px;
        padding-top: 2px;
        @media all and (max-width: ${theme.pc}px) {
          margin-left: 8px;
        }
        > p {
          font-size: 17px;
          font-weight: 700;
          line-height: 25px;
        }
        > span {
          display: block;
          font-size: 15px;
          font-weight: 300;
          line-height: 22px;
        }
      }
    }
    .right_side {
      position: absolute;
      top: 50%;
      right: 30px;
      transform: translateY(-50%);
      @media all and (max-width: ${theme.pc}px) {
        right: 22px;
      }
      .rsv_link_btn {
        ${props => props.theme.resetBtnStyle};
        width: 50px;
        height: 50px;
        border: 1px solid #415395;
        border-radius: 6px;
        font-size: 13px;
        line-height: 14px;
        color: #fff;
        background-color: #4f62a8;
      }
    }
  }
`;

const NonItemBox = styled.div`
  width: 100%;
  border-radius: 12px;
  border: 1px solid #b7c1d8;
  padding: 56px 0;
  text-align: center;
  font-size: 16px;
  line-height: 24px;
  @media all and (max-width: ${theme.pc}px) {
    font-size: 15px;
    line-height: 22px;
    padding: 100px 0;
  }
`;

const MyhallRsvInquiry = () => {
  const [rsvItem, setRsvItem] = useState(rsvData);
  return (
    <>
      <Container>
        <div className='myhall_title'>
          <p>웨딩홀 예약 문의 내역</p>
        </div>
        <div className='myhall_header'>
          <div className='left_side'>
            <div className='img_box'>
              <Image unoptimized src={headerImg01} alt='header_img' />
            </div>
            <div className='text_box'>
              <p>웨딩홀 방문 예약</p>
              <span>할인 견적 받고 방문 예약하기</span>
            </div>
          </div>

          <div className='right_side'>
            <button className='rsv_link_btn'>
              바로
              <br />
              가기
            </button>
          </div>
        </div>

        <div className='item_container'>
          {/* {rsvItem && (
            <>
              {rsvItem.length === 0 ? (
                <NonItemBox>
                  나의 웨딩홀 예약 문의
                  <br />
                  내역이 없습니다.
                </NonItemBox>
              ) : (
                rsvItem.map(item => <MyhallItem key={item.id} {...item} />)
              )}
            </>
          )} */}
          <NonItemBox>
            나의 웨딩홀 예약 문의
            <br />
            내역이 없습니다.
          </NonItemBox>
        </div>
      </Container>
    </>
  );
};

export default MyhallRsvInquiry;

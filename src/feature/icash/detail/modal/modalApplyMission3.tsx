import React from 'react';
import styled from 'styled-components';
import closeBtn from '@images/close_btn.png';
import backBtn from '@images/back_btn.png';
import coinIcon from '@images/coin_icon.png';
import { RadioboxItem } from '@components/core/checkboxes';
import { CommonModalProps } from '@modules/CommonInterface';
import theme from '@styles/theme';
import Image from 'next/image';
import { InputWithClear } from '@components/core/inputs';

// 미션 신청하기 버튼 클릭 후 나오는 신청하기 모달

interface ApplyModalProps extends CommonModalProps {
  title: string;
}

const ModalApplyMission3 = (props: CommonModalProps) => {
  return (
    <Container visible={props.visible}>
      <div className='modal-header'>
        <span className='title'>미션 신청</span>
        <span className='close-btn' onClick={props.onClose}>
          <Image unoptimized src={closeBtn} alt='close' />
        </span>
      </div>
      <div className='m-page-header'>
        <button className='back-btn' onClick={props.onClose}>
          <Image unoptimized width={9} height={18} src={backBtn} alt='뒤로가기' />
        </button>
        <span>미션 신청</span>
      </div>

      <div className='inner-wrapper'>
        <div className='apply_box'>
          <div className='apply_header'>
            <p>앱스토어 리뷰 등록</p>
            <div className='cash_text'>
              <span className='coin_img'>
                <Image unoptimized src={coinIcon} alt='coin icon' />
              </span>
              <p className='cash_num'>
                30,000 <span>(1회만)</span>
              </p>
            </div>
          </div>

          {/* 각각 미션 유형에 맞는 form_item 추가하면 됨 */}
          <div className='apply_form'>
            <div className='apply_form_header'>
              <p>미션 신청 정보</p>
            </div>
            <div className='apply_form_sub_header'>
              <p>참여 정보 등록하기</p>
            </div>

            <div className='form_item'>
              <p className='item_title'>이름</p>
              <InputWithClear placeHolder='이름을 입력하세요.' onChangeText={() => ''} />
            </div>

            <div className='form_item'>
              <p className='item_title'>연락처</p>
              <InputWithClear placeHolder='-없이 입력해 주세요.' onChangeText={() => ''} />
            </div>

            <div className='form_item'>
              <p className='item_title'>스토어 ID(별명)</p>
              <InputWithClear placeHolder='-없이 입력해 주세요.' onChangeText={() => ''} />
            </div>

            <div className='form_item'>
              <p className='item_title'>참여 URL</p>
              <InputWithClear placeHolder='리뷰를 등록한 URL을 입력해주세요.' onChangeText={() => ''} />
            </div>

            <div className='form_item'>
              <p className='item_title'>유형</p>
              <RadioboxItem title='구글 플레이 스토어(안드로이드)' onSelect={() => ''} id='android' name='platform' />
              <RadioboxItem title='앱스토어(IOS)' onSelect={() => ''} id='ios' name='platform' />
            </div>

            {/* 유형 타입 - 2 */}
            {/* <div className='form_item'>
              <p className='item_title'>유형</p>
              <RadioboxItem title='블로그' onSelect={() => ''} />
              <RadioboxItem title='인스타그램' onSelect={() => ''} />
              <RadioboxItem title='페이스북' onSelect={() => ''} />
              <RadioboxItem title='카페/기타 커뮤니티' onSelect={() => ''} />
            </div> */}

            <div className='form_item attachment_item'>
              <div className='attachment_title'>
                <p>리뷰 이미지 첨부하기</p>
                <button className='attachment_btn'>사진 첨부</button>
              </div>
              <div className='attachment_input_box'>
                {/* 추후 파일 첨부 관련 input 으로 변경 */}
                <input type='text' placeholder='사진을 첨부하면 파일명이 여기 나옴' />
                <button className='attachment_delete_btn'>삭제</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer>
        <div className='footer_guide_text'>
          <span>*주말, 공휴일 제외 3일 이내 확인 후 승인됩니다.</span>
        </div>
        <div className='footer_btn_box'>
          <button className='cancel_btn'>취소</button>
          <button className='apply_btn'>미션 신청하기</button>
        </div>
      </Footer>
    </Container>
  );
};
export default ModalApplyMission3;
const Container = styled.div<{ visible: boolean }>`
  display: ${({ visible }) => (visible ? 'block' : 'none')};
  ${props => props.theme.modalLayoutCSS}
  overflow: hidden;
  z-index: 9999;
  .inner-wrapper {
    width: 100%;
    height: calc(100% - 220px);
    position: relative;
    overflow-x: hidden;
    overflow-y: scroll;
    @media all and (max-width: ${theme.pc}px) {
      height: calc(100% - 165px);
      margin-top: 45px;
    }
    .apply_box {
      width: 100%;
      padding: 0 31px;
      @media all and (max-width: ${theme.pc}px) {
        padding: 0 15px;
      }
      .apply_header {
        width: 100%;
        height: 118px;
        padding: 30px 0;
        border-bottom: 1px solid #dfdfdf;
        font-size: 20px;
        text-align: center;
        margin-bottom: 24px;
        .cash_text {
          height: 22px;
          margin-top: 10px;
          @media all and (max-width: ${theme.pc}px) {
            margin-top: 7px;
          }
          > .coin_img {
            display: inline-block;
            width: 16px;
            height: 16px;
            > img {
              width: 16px;
              height: 16px;
            }
          }
          .cash_num {
            display: inline-block;
            margin-left: 5px;
            font-size: 15px;
            font-weight: 700;
            color: #fd4381;
            vertical-align: text-top;
            padding-top: 2px;
            @media all and (max-width: ${theme.pc}px) {
              font-size: 14px;
            }
            > span {
              font-weight: 400;
            }
          }
        }
      }
      .apply_form {
        width: 100%;
        position: relative;
        .apply_form_header {
          border-bottom: 2px solid #262626;
          padding-bottom: 17px;
          font-size: 16px;
          font-weight: 700;
        }
        .apply_form_sub_header {
          width: 100%;
          height: 50px;
          background-color: #f7f7fa;
          font-size: 13px;
          font-weight: 700;
          padding-left: 15px;
          line-height: 50px;
          vertical-align: middle;
          margin-bottom: 20px;
        }
        .form_item {
          position: relative;
          margin-bottom: 20px;
          .item_title {
            font-size: 14px;
            font-weight: 500;
            margin-bottom: 10px;
          }
          .attachment_title {
            width: 100%;
            height: 32px;
            font-size: 14px;
            font-weight: 500;
            position: relative;
            line-height: 32px;
            vertical-align: middle;
            margin-top: 30px;
            > p {
              display: inline-block;
            }
            > .attachment_btn {
              display: inline-block;
              width: 113px;
              height: 32px;
              border: 1px solid #262626;
              font-size: 13px;
              font-weight: 700;
              position: absolute;
              right: 0;
            }
          }
          .attachment_input_box {
            width: 100%;
            height: 50px;
            border: 1px solid #dfdfdf;
            margin-top: 10px;
            > input {
              appearance: none;
              border: none;
              outline: none;
              width: calc(100% - 81px);
              height: 48px;
              font-size: 15px;
              padding-left: 15px;
              margin-right: 20px;
              &::placeholder {
                font-size: 15px;
                color: #8c8c8c;
              }
            }
            .attachment_delete_btn {
              width: 52px;
              height: 36px;
              background-color: #262626;
              color: #fff;
              font-size: 13px;
              font-weight: 700;
            }
          }
          > div {
            display: block;
            position: relative;
            top: 0;
            width: 100%;
            .input_box {
              width: 100%;
            }
            .radio_container {
              border-bottom: 0;
              padding: 0;
              margin-bottom: 15px;
            }
          }
        }
        .form_item.attachment_item {
          border-bottom: 1px solid #dfdfdf;
          padding-bottom: 30px;
        }
      }
    }
  }
`;
const Footer = styled.div`
  width: 100%;
  height: 120px;
  position: absolute;
  bottom: 0;
  padding: 20px 30px;
  text-align: center;
  background-color: #fff;
  @media all and (max-width: ${theme.pc}px) {
    padding: 20px 15px;
  }
  .footer_guide_text {
    font-size: 13px;
    color: ${props => props.theme.blue};
    margin-bottom: 10px;
  }
  .footer_btn_box {
    width: 100%;
    height: 50px;
    > button {
      height: 50px;
      font-size: 16px;
    }
    .cancel_btn {
      width: 105px;
      border: 1px solid #dfdfdf;
      margin-right: 5px;
      @media all and (max-width: ${theme.pc}px) {
        width: 30.43%;
      }
    }
    .apply_btn {
      width: 235px;
      color: #fff;
      background-color: ${props => props.theme.blue};
      @media all and (max-width: ${theme.pc}px) {
        width: 68.11%;
      }
    }
  }
`;

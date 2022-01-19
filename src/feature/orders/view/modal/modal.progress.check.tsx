import React from 'react';
import styled from 'styled-components';
import sample from '@images/common/img_sample01.jpg';
import IconBoldDownArrow from '@svgs/icon_bold_down_arrow';
import IconCheckedCircle from '@svgs/icon_checked_circle';
import IconUncheckedCircle from '@svgs/icon_unchecked_circle';
import theme from '@styles/theme';
import { CommonModalProps } from '@modules/CommonInterface';
import Image from 'next/image';
import AbstractModal from '@components/core/modal/AbstractModal/AbstractModal';

interface AvailableProps extends CommonModalProps {
  onConfirm: () => void;
}

const ModalProgressCheck = ({ visible, onClose, oneButtonFooter, isFullSize }: AvailableProps) => {
  return (
    <>
      <AbstractModal
        noPadding
        visible={visible}
        onClose={onClose}
        title='진행 단계 확인'
        oneButtonFooter={oneButtonFooter}
        isFullSize={isFullSize}
      >
        <Container>
          <div className='item_area'>
            <div className='info-item-box'>
              <div className='info-box'>
                <a>
                  <div className='top_info_box'>
                    <div className='info-img'>
                      <span>
                        <Image unoptimized src={sample} alt='sample' />
                      </span>
                    </div>

                    <div className='info-text-box'>
                      <span className='category-text'>스튜디오 &gt; 타라스튜디오</span>
                      <p className='title-text'>[리허설] 스테이위드미 20p 타이틀</p>
                      <span className='price-num'>2,500,000원</span>
                    </div>
                  </div>
                  <div className='group_box'>
                    <div className='status_box'>
                      <p className='status_text blue_text'>리허설 가봉 예약</p>
                      {/* 취소일 경우 아래 태그 */}
                      {/* <p className='status_text red_text'>취소</p> */}
                    </div>
                    <div className='more_box'>
                      <span>
                        구매 내역 상세 <IconBoldDownArrow lineColor='#8c8c8c' />
                      </span>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>

          <div className='progress_area'>
            {/* 어떻게 처리할지 */}
            {/* <div className='white_shadow_box'></div> */}
            <div className='progress_item'>
              <div className='icon_check_box'>
                <IconCheckedCircle />
              </div>
              <div className='progress_text_box'>
                <p className='progress_title'>결제 대기</p>
                <span className='progress_content'>결제 대기중인 상태에요.</span>
              </div>
            </div>

            <div className='progress_item'>
              <div className='icon_check_box'>
                <IconCheckedCircle />
              </div>
              <div className='progress_text_box'>
                <p className='progress_title'>결제 완료</p>
                <span className='progress_content'>
                  결제가 완료되었어요. 담당자와의 상담을 통해
                  <br />
                  드레스 상담 및 가봉 일정을 예약하세요.
                </span>
              </div>
            </div>

            <div className='progress_item'>
              <div className='icon_check_box'>
                <IconCheckedCircle />
              </div>
              <div className='progress_text_box'>
                <p className='progress_title'>방문 상담 예약</p>
                <span className='progress_content'>방문 상담 일정이 예약되었어요.</span>
              </div>
            </div>

            <div className='progress_item'>
              <div className='icon_check_box'>
                <IconCheckedCircle />
              </div>
              <div className='progress_text_box'>
                <p className='progress_title'>최종 확정</p>
                <span className='progress_content'>
                  어떤 드레스를 입을지 정해졌어요.
                  <br />
                  예약한 날짜에 리허설 가봉하세요.
                </span>
              </div>
            </div>

            <div className='progress_item'>
              <div className='icon_check_box'>
                <IconCheckedCircle />
              </div>
              <div className='progress_text_box'>
                <p className='progress_title'>리허설 가봉 예약</p>
                <span className='progress_content'>언제 리허설 가봉할지 정하는 단계에요.</span>
              </div>
            </div>

            <div className='progress_item in_progress'>
              <div className='icon_check_box'>
                <IconCheckedCircle />
              </div>
              <div className='progress_text_box'>
                <p className='progress_title'>리허설 가봉</p>
                <span className='progress_content'>언제 리허설 가봉할지 정하는 단계에요.</span>
                <button className='check_schedule_btn'>스케줄 확인하기</button>
              </div>
            </div>

            <div className='progress_item not_yet'>
              <div className='icon_check_box'>
                {/* 예정 스케줄은 IconUncheckedCircle */}
                <IconUncheckedCircle />
              </div>
              <div className='progress_text_box'>
                <p className='progress_title'>리허설 행사</p>
                <span className='progress_content'>축하드려요. 리허설 행사까지 완료되었어요.</span>
              </div>
            </div>

            <div className='progress_item not_yet'>
              <div className='icon_check_box'>
                {/* 예정 스케줄은 IconUncheckedCircle */}
                <IconUncheckedCircle />
              </div>
              <div className='progress_text_box'>
                <p className='progress_title'>예식 가봉 예약</p>
                <span className='progress_content'>예식일에 입을 드레스 가봉 날짜를 예약하세요.</span>
              </div>
            </div>

            <div className='progress_item not_yet'>
              <div className='icon_check_box'>
                {/* 예정 스케줄은 IconUncheckedCircle */}
                <IconUncheckedCircle />
              </div>
              <div className='progress_text_box'>
                <p className='progress_title'>예식 가봉</p>
                <span className='progress_content'>예식 드레스 가봉이 완료되어 기다리고 있어요.</span>
              </div>
            </div>

            <div className='progress_item not_yet'>
              <div className='icon_check_box'>
                {/* 예정 스케줄은 IconUncheckedCircle */}
                <IconUncheckedCircle />
              </div>
              <div className='progress_text_box'>
                <p className='progress_title'>예식 행사</p>
                <span className='progress_content'>고생 많으셨어요! 예식이 끝났습니다.</span>
              </div>
            </div>
          </div>
        </Container>
      </AbstractModal>
    </>
  );
};
export default ModalProgressCheck;
const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  background-color: #fff;
  @media all and (max-width: ${theme.pc}px) {
    padding: 0;
  }
  .item_area {
    width: 100%;
    padding: 15px 30px;
    background-color: #f7f7f7;
    margin-bottom: 15px;
    @media all and (max-width: ${theme.pc}px) {
      padding: 15px;
    }
    .info-item-box {
      width: 100%;
      position: relative;
      border: 1px solid #dfdfdf;
      background-color: #fff;
      .info-box {
        width: 100%;
        position: relative;
        cursor: pointer;
        > a {
          display: block;
          position: relative;
          width: 100%;
          height: 100%;
          @media all and (max-width: ${theme.pc}px) {
            display: flex;
            flex-wrap: wrap;
          }
          .top_info_box {
            width: 100%;
            display: inline-block;
            padding: 15px;
            @media all and (max-width: ${theme.pc}px) {
              display: flex;
              /* border-bottom: 1px solid #dfdfdf; */
            }
            .info-img {
              display: inline-block;
              width: 75px;
              height: 75px;
              > span {
                position: relative;
                display: block;
                width: 100%;
                height: 100%;
                > img {
                  height: 100%;
                  position: absolute;
                  left: 50%;
                  transform: translateX(-50%);
                }
              }
            }
            .info-text-box {
              display: inline-block;
              width: calc(100% - 90px);
              vertical-align: top;
              padding-top: 2px;
              margin-left: 15px;
              @media all and (max-width: ${theme.pc}px) {
                padding-top: 5px;
                margin-bottom: 6px;
                margin-left: 12px;
              }
              .category-text {
                display: block;
                font-size: 14px;
                font-weight: 300;
                color: ${props => props.theme.gray};
                margin-bottom: 8px;
                @media all and (max-width: ${theme.pc}px) {
                  font-size: 13px;
                  margin-bottom: 3px;
                }
              }
              .title-text {
                color: #262626;
                font-size: 15px;
                font-weight: 500;
                line-height: 22px;
                display: block;
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
                margin-bottom: 8px;
              }
              .price-num {
                color: #262626;
                display: block;
                font-size: 14px;
              }
            }
          }
          .group_box {
            position: relative;
            width: 100%;
            height: 100%;
            display: inline-block;
            vertical-align: top;
            border-top: 1px solid #dfdfdf;
            padding: 16px 16px;
            @media all and (max-width: ${theme.pc}px) {
              display: flex;
              justify-content: space-between;
              align-items: center;
            }
            .status_box {
              display: inline-block;
              position: relative;
              vertical-align: top;
              /* margin-left: 45px; */
              width: 100px;
              text-align: center;
              @media all and (max-width: ${theme.pc}px) {
                margin-left: 0;
                text-align: left;
              }
              .status_text {
                font-size: 14px;
                font-weight: 700;
                @media all and (max-width: ${theme.pc}px) {
                  padding-top: 0;
                }
              }
              .blue_text {
                color: ${props => props.theme.blue};
              }
              .red_text {
                color: ${props => props.theme.red};
              }
            }
            .more_box {
              display: block;
              position: absolute;
              right: 15px;
              top: 50%;
              /* padding-top: 30px; */
              transform: translateY(-50%);
              font-size: 14px;
              color: #8c8c8c;
              font-weight: 500;
              > span {
                > svg {
                  transform: rotate(-90deg);
                  margin-bottom: 2px;
                }
              }
              @media all and (max-width: ${theme.pc}px) {
                position: relative;
                right: unset;
                top: unset;
                transform: unset;
                padding: 0;
              }
            }
          }
        }
      }
    }
  }
  .progress_area {
    width: 100%;
    position: relative;
    background-color: #fff;
    padding: 0 30px;
    @media all and (max-width: ${theme.pc}px) {
      padding: 0;
    }
    .white_shadow_box {
      display: block;
      width: 30px;
      height: 100%;
      background-color: #fff;
      position: absolute;
      top: 0;
      right: 0;
      z-index: 1;
      @media all and (max-width: ${theme.pc}px) {
        display: none;
      }
    }
    .progress_item {
      width: 100%;
      position: relative;
      .icon_check_box {
        display: inline-block;
        width: 20px;
        /* padding: 0 20px; */
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
        @media all and (max-width: ${theme.pc}px) {
          width: 60px;
          margin-right: 0px;
          left: 20px;
        }
      }
      .progress_text_box {
        display: inline-block;
        width: calc(100% - 40px);
        margin-left: 40px;
        padding: 16px 0;
        border-bottom: 1px solid #dfdfdf;
        @media all and (max-width: ${theme.pc}px) {
          width: calc(100% - 60px);
          margin-left: 60px;
        }
        .progress_title {
          font-size: 14px;
          font-weight: 700;
          line-height: 20px;
          margin-bottom: 2px;
        }
        .progress_content {
          display: block;
          font-size: 12px;
          line-height: 16px;
          color: #8c8c8c;
        }
        .check_schedule_btn {
          ${props => props.theme.resetBtnStyle};
          display: block;
          width: 100px;
          height: 24px;
          background-color: ${props => props.theme.blue};
          color: #fff;
          font-size: 13px;
          font-weight: 500;
          border-radius: 4px;
          margin-top: 8px;
        }
      }
    }
    .progress_item.in_progress {
      background-color: #f7f8ff;
      border-bottom: 1px solid ${props => props.theme.blue};
      .progress_text_box {
        border-bottom: 0;
        .progress_title {
          color: ${props => props.theme.blue};
        }
        .progress_content {
          color: ${props => props.theme.blue};
        }
      }
    }
    .progress_item.not_yet {
      .progress_text_box {
        .progress_title {
          color: #bebebe;
        }
        .progress_content {
          color: #bebebe;
        }
      }
    }
  }
`;

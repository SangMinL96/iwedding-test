import React from 'react';
import styled from 'styled-components';
import sampleMapImg from '@images/common/detail_map_img.png';
import theme from '@styles/theme';
import { CommonModalProps } from '@modules/CommonInterface';
import Image from 'next/image';
import AbstractModal from '@components/core/modal/AbstractModal/AbstractModal';

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  background-color: #fff;
  .detail_schedule_container {
    width: 100%;
    position: relative;
    background-color: #fff;
    padding: 0 30px 10px 30px;
    @media all and (max-width: ${theme.pc}px) {
      padding: 40px 15px 10px 15px;
    }
    .detail_schedule_header {
      width: 100%;
      position: relative;
      > span {
        display: block;
        font-size: 15px;
        line-height: 22px;
        color: #262626;
      }
      > p {
        font-size: 24px;
        font-weight: 700;
        line-height: 36px;
        color: #262626;
        margin: 4px 0 6px 0;
      }
      > span.detail_progress {
        color: #8c8c8c;
      }
      .detail_status_circle {
        position: absolute;
        width: 64px;
        height: 64px;
        border-radius: 50%;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
        text-align: center;
        color: #fff;
        font-size: 15px;
        font-weight: 700;
        line-height: 64px;
        vertical-align: middle;
      }
      .detail_status_circle.scheduled {
        background-color: #665efc;
      }
      .detail_status_circle.done {
        background-color: #b7c1d8;
      }
      .detail_status_circle.cancel {
        background-color: #262626;
      }
    }

    .detail_schedule_content {
      width: 100%;
      position: relative;
      margin-top: 20px;
      .content_header {
        width: 100%;
        height: 65px;
        line-height: 65px;
        vertical-align: middle;
        border-bottom: 2px solid #262626;
        > p {
          font-size: 16px;
          font-weight: 700;
          color: #262626;
        }
      }
      .map_box {
        width: 100%;
        height: 240px;
        position: relative;
        margin-top: 20px;
        overflow: hidden;
        > img {
          width: 100%;
        }
      }
      .find_way_box {
        width: 100%;
        margin: 20px 0 30px 0;
        .find_way_btn {
          ${props => props.theme.resetBtnStyle};
          width: 48.7%;
          height: 42px;
          font-size: 14px;
          font-weight: 700;
          color: #fff;
        }
        .find_way_btn.naver {
          background-color: #25c95a;
          margin-right: 9px;
        }
        .find_way_btn.kakao {
          background-color: #fecd2f;
        }
      }

      .location_info {
        width: 100%;
        font-size: 14px;
        line-height: 23px;
        margin-bottom: 30px;
      }
      .other_info {
        width: 100%;
        border-top: 1px solid #f5f5f5;
        margin-bottom: 20px;
        > .info_group {
          width: 100%;
          height: 40px;
          border-bottom: 1px solid #f5f5f5;
          line-height: 39px;
          vertical-align: middle;
          > .info_title {
            display: inline-block;
            width: 70px;
            padding-left: 4px;
            margin-right: 15px;
            font-size: 15px;
          }
          > p {
            display: inline-block;
            font-size: 15px;
            font-weight: 700;
          }
        }
      }
      .notice_box {
        width: 100%;
        margin-top: 30px;
        .paragraph {
          width: 100%;
          margin-bottom: 30px;
          > p {
            font-size: 14px;
            line-height: 23px;
          }
        }
      }
    }
  }
`;

interface AvailableProps extends CommonModalProps {
  onConfirm: () => void;
}

const ModalDetailSchedule = ({ visible, onClose, isFullSize, onConfirm }: AvailableProps) => {
  return (
    <AbstractModal
      visible={visible}
      onClose={onClose}
      title='스케줄 상세'
      isFullSize={isFullSize}
      oneButtonFooter={true}
      confirmText='확인'
      onConfirm={onConfirm}
      noFooter={true}
    >
      <Container>
        <div className='detail_schedule_container'>
          <div className='detail_schedule_header'>
            <span>2021.02.16 금 16:00</span>
            <p>클라라웨딩</p>
            <span className='detail_progress'>드레스 가봉</span>
            {/* status_circle은 아이템하고 동일한 형식으로 예정, 완료, 취소 상태로 구분 */}
            <div className='detail_status_circle done'>완료</div>
          </div>

          <div className='detail_schedule_content'>
            <div className='content_header'>
              <p>이렇게 찾아오세요</p>
            </div>

            <div className='map_box'>
              <Image unoptimized src={sampleMapImg} alt='sampleMapImg' />
            </div>
            <div className='find_way_box'>
              <button className='find_way_btn naver'>네이버 지도 길찾기</button>
              <button className='find_way_btn kakao'>카카오 지도 길찾기</button>
            </div>

            <div className='location_info'>
              <p>*주차: 건물 앞 대행주차(대행비: 3,000원)</p>
              <p>*주소: 서울시 강남구 청담동 22-16, 3층</p>
              <p>*새주소: 서울특별시 강남구 선릉로146길 15, 3층(청담동)</p>
            </div>

            <div className='other_info'>
              <div className='info_group'>
                <span className='info_title'>대표번호</span>
                <p>02-511-0901</p>
              </div>
              <div className='info_group'>
                <span className='info_title'>영업시간</span>
                <p>10:00~22:00</p>
              </div>
              <div className='info_group'>
                <span className='info_title'>휴무일</span>
                <p>월요일</p>
              </div>
              <div className='info_group'>
                <span className='info_title'>주차형태</span>
                <p>대행</p>
              </div>
            </div>

            <div className='content_header'>
              <p>주요 참조사항</p>
            </div>

            <div className='notice_box'>
              <div className='paragraph'>
                <p>방문상담 시, 피팅비용 : 50,000원(매장 현장 결제)</p>
                <p>방문상담 시, 피팅비용 세부사항 : - 결제수단: 현금/카드</p>
                <p>- 피팅비용 반환여부: 미반환</p>
                <p>- 이용 확정 전 재방문상담: 비용발생</p>
                <p>- 이용 확정 후 재방문상담: 비용발생</p>
                <p>- 리허설 또는 예식 가봉 재상담: 비용발생</p>
                <p>- 최소 상담시간 50분, 최소 착용벌수 33벌</p>
                <p>- 애프터 진행시: 적용(단, 피팅후 확정시 미적용/별도 진행시 당일결정 여부에 따라 다름</p>
                <p>웨딩촬영, 예식행사 각, 헬퍼비용 : ※ 아래 비용은 헬퍼에게 직접 제공해 주시면 됩니다.</p>
              </div>

              <div className='paragraph'>
                <p>▶ 웨딩촬영</p>
                <p>- 200,000원</p>
                <p>- 22시 이후 촬영 종료 시 or 6시간 이상 촬영 시 50,000원 추가비용 발생</p>
                <p>- 야외촬영 추가 시, 50,000원 추가비용 발생</p>
              </div>

              <div className='paragraph'>
                <p>▶ 예식행사</p>
                <p>- 200,000원(서울지역 외, 출장비, 교통비 별도)</p>
                <p>- 22시 이후 예식 종료 시 50,000원 추가비용 발생</p>
              </div>

              <div className='paragraph'>
                <p>▶ 기타 행사</p>
                <p>- 폐백 수모 이용 시, 50,000원</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </AbstractModal>
  );
};

export default ModalDetailSchedule;

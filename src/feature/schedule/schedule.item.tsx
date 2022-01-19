import React, { useState } from 'react';
import styled from 'styled-components';
import IconKeyboardRightArrowLg from '@svgs/icon_keyboard_right_arrow_lg';
import sampleImg from '@images/common/plan_date_img01.png';
import ModalDetailSchedule from './modal/modal.detail.schedule';
import theme from '@styles/theme';
import Image from 'next/image';

interface ScheduleDate {
  id: number;
  date: string;
  items: ScheduleItem[];
}

interface ScheduleItem {
  id: number;
  status: string;
  time: string;
  progress: string;
  name: string;
  btnTitle?: string;
  isPlanDate: boolean;
  planDateImg?: string;
}

interface ScheduleItemProps {
  item: ScheduleDate;
  isLast: boolean;
}
const Container = styled.div`
  width: 100%;
  position: relative;
  overflow-x: hidden;
  .date_header {
    width: 100%;
    height: 50px;
    border: 1px solid #262626;
    border-radius: 100px;
    font-size: 15px;
    font-weight: 700;
    line-height: 48px;
    vertical-align: middle;
    padding-left: 25px;
    /* box-shadow: 0 2px 6px 0 hsla(0, 0%, 0%, 0.2); */
    box-shadow: rgba(149, 157, 165, 0.2) 0px 4px 4px;
    @media all and (max-width: ${theme.pc}px) {
      width: ${theme.pc}px;
    }
  }
  .white_space_box {
    width: 100%;
    height: 100px;
    padding-left: 45px;
    @media all and (max-width: ${theme.pc}px) {
      padding-left: 25px;
    }
    .inner_white_space {
      width: 100%;
      height: 100%;
      border-left: 1px dashed #bebebe;
    }
  }
`;

const SchduleBox = styled.div`
  width: 100%;
  position: relative;
  padding-left: 45px;
  @media all and (max-width: ${theme.pc}px) {
    padding-left: 25px;
  }
  .status_circle {
    position: absolute;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    top: 25px;
    left: 20px;
    text-align: center;
    color: #fff;
    font-size: 13px;
    font-weight: 700;
    line-height: 50px;
    vertical-align: middle;
    z-index: 1;
    @media all and (max-width: ${theme.pc}px) {
      left: 0;
    }
  }
  .status_circle.scheduled {
    background-color: #665efc;
  }
  .status_circle.done {
    background-color: #b7c1d8;
  }
  .status_circle.cancel {
    background-color: #262626;
  }
  .schedule_content {
    width: 100%;
    position: relative;
    padding: 25px 0 25px 40px;
    border-left: 1px dashed #bebebe;
    border-bottom: 1px dashed #bebebe;
    .schedule_text {
      cursor: pointer;
      padding-top: 2px;
      position: relative;
      > p {
        color: #262626;
        font-size: 15px;
        font-weight: 700;
        line-height: 22px;
        &:first-child {
          margin-bottom: 2px;
        }
        > span {
          color: #8c8c8c;
          font-weight: 400;
        }
      }
      > svg {
        position: absolute;
        top: 20px;
        right: 0;
        @media all and (max-width: ${theme.pc}px) {
          right: 20px;
        }
      }
    }
    .schedule_text.cancel {
      > p {
        color: #8c8c8c;
        &:nth-child(2) {
          color: #8c8c8c;
          text-decoration: line-through;
        }
      }
    }
    .schedule_btn {
      ${props => props.theme.resetBtnStyle};
      display: block;
      height: 33px;
      padding: 0 20px;
      font-size: 14px;
      font-weight: 700;
      color: #262626;
      line-height: 33px;
      vertical-align: middle;
      background-color: #f5f5f5;
      border-radius: 8px;
      margin-top: 27px;
    }
    .plan_date_img {
      width: 250px;
      position: relative;
      cursor: pointer;
      > img {
        width: 100%;
      }
    }
  }
  &:last-child {
    > .schedule_content {
      border-bottom: 0;
    }
  }
  .schedule_content.add_border_bottom {
    border-bottom: 1px dashed #bebebe;
  }
`;

const ScheduleItem = ({ item, isLast }: ScheduleItemProps) => {
  const [visibleDetail, setVisibleDetail] = useState(false);
  return (
    <>
      {/* 스케줄 모달 */}
      {visibleDetail && (
        <ModalDetailSchedule
          visible={visibleDetail}
          onClose={() => setVisibleDetail(false)}
          onConfirm={() => setVisibleDetail(false)}
          isFullSize={true}
        />
      )}
      <Container>
        <div className='date_header'>
          <p>{item.date}</p>
        </div>
        {item.items.map(todos => (
          <SchduleBox key={todos.id}>
            {todos.isPlanDate ? null : (
              <>
                {todos.status === '예정' && <div className='status_circle scheduled'>{todos.status}</div>}
                {todos.status === '완료' && <div className='status_circle done'>{todos.status}</div>}
                {todos.status === '취소' && <div className='status_circle cancel'>{todos.status}</div>}
              </>
            )}
            <div className={isLast ? 'schedule_content add_border_bottom' : 'schedule_content'}>
              {todos.isPlanDate ? (
                <>
                  <div className='plan_date_img'>
                    <Image unoptimized src={sampleImg} alt='img' />
                  </div>
                </>
              ) : (
                <>
                  <div
                    className={todos.status === '취소' ? 'schedule_text cancel' : 'schedule_text'}
                    onClick={() => setVisibleDetail(true)}
                  >
                    <p>
                      {todos.time} <span>{todos.progress}</span>
                    </p>
                    <p>{todos.name}</p>
                    <IconKeyboardRightArrowLg />
                  </div>
                  {todos.btnTitle !== '' && <button className='schedule_btn'>{todos.btnTitle}</button>}
                </>
              )}
            </div>
          </SchduleBox>
        ))}
        {/* 마지막 아이템 밑에는 무조건 여백을 위한 아래 요소가 추가되어야함 */}
        {isLast && (
          <div className='white_space_box'>
            <div className='inner_white_space'>&nbsp;</div>
          </div>
        )}
      </Container>
    </>
  );
};

export default ScheduleItem;

import MyPageLayout from '@components/layout/MyPageLayout';
import theme from '@styles/theme';
import React from 'react';
import styled from 'styled-components';
import ScheduleItem from './schedule.item';

const scheduleData = [
  {
    id: 0,
    date: '2021.11.29 월',
    items: [
      {
        id: 131412,
        status: '예정',
        time: '16:00',
        progress: '웨딩홀 방문상담',
        name: '명동라루체',
        btnTitle: '예약 일정 변경 신청',
        isPlanDate: false,
      },
    ],
  },
  {
    id: 1,
    date: '2021.01.03 화',
    items: [
      {
        id: 131413,
        status: '완료',
        time: '16:00',
        progress: '드레스 가봉',
        name: '리안마리',
        btnTitle: '업체 평점 후기 작성 (아이캐시 적립)',
        isPlanDate: false,
      },
      {
        id: 131414,
        status: '완료',
        time: '16:00',
        progress: '드레스 방문상담',
        name: '리안마리',
        btnTitle: '작성한 업체 평점 후기 보기',
        isPlanDate: false,
      },
    ],
  },
  {
    id: 2,
    date: '2021.01.03 화',
    items: [
      {
        id: 131415,
        status: '',
        time: '',
        progress: '',
        name: '',
        btnTitle: '',
        isPlanDate: true,
        planDateImg: '../../common/style/images/plan_date_img01.png',
      },
      {
        id: 131416,
        status: '완료',
        time: '11:00',
        progress: '스튜디오 방문상담',
        name: '타라스튜디오',
        btnTitle: '',
        isPlanDate: false,
      },
      {
        id: 131417,
        status: '완료',
        time: '12:00',
        progress: '헤어메이크업 방문상담',
        name: '김활란뮤제네프_청담점',
        btnTitle: '',
        isPlanDate: false,
      },
      {
        id: 131418,
        status: '완료',
        time: '16:00',
        progress: '드레스 가봉',
        name: '리안마리',
        btnTitle: '작성한 업체 평점 후기 보기',
        isPlanDate: false,
      },
    ],
  },
  {
    id: 3,
    date: '2021.03.05 화',
    items: [
      {
        id: 131419,
        status: '취소',
        time: '11:00',
        progress: '드레스 가봉',
        name: '브라이드메르시',
        btnTitle: '',
        isPlanDate: false,
      },
      {
        id: 131420,
        status: '취소',
        time: '121:00',
        progress: '드레스 방문상담',
        name: '엔조최재훈',
        btnTitle: '',
        isPlanDate: false,
      },
    ],
  },
];

const ScheduleContainer = styled.div`
  width: 100%;
  position: relative;
  /* margin-bottom: -60px; */
  @media all and (max-width: ${theme.pc}px) {
    padding-top: 4px;
    /* margin-bottom: 0; */
  }
  .schdule_item_container {
    display: inline-block;
    width: calc(100% - 210px);
    vertical-align: top;
    @media all and (max-width: ${theme.pc}px) {
      display: block;
      width: 100%;
      padding-left: 15px;
      overflow-x: hidden;
    }
  }
`;

const SchduleFilter = styled.div`
  display: inline-block;
  position: relative;
  margin-right: 30px;
  @media all and (max-width: ${theme.pc}px) {
    width: 100%;
    display: block;
    margin-right: 0;
    margin-top: 25px;
    margin-bottom: 30px;
    padding: 0 15px;
  }
  .filter_btn {
    ${props => props.theme.resetBtnStyle};
    display: block;
    width: 180px;
    height: 40px;
    font-size: 14px;
    font-weight: 700;
    line-height: 20px;
    border: 1px solid #dfdfdf;
    border-radius: 8px;
    background-color: #f5f5f5;
    margin-bottom: 5px;
    @media all and (max-width: ${theme.pc}px) {
      display: inline-block;
      width: 23.6%;
      margin-bottom: 0;
      margin-right: 7px;
    }
    /* &:last-child {
      @media all and (max-width: ${theme.pc}px) {
        margin-right: 0;
      }
    } */
  }
  .filter_btn.on {
    border: 0;
    background-color: #262626;
    color: #fff;
  }
  .filter_btn.cancel {
    color: #8c8c8c;
    text-decoration: line-through;
    @media all and (max-width: ${theme.pc}px) {
      margin-right: 0;
    }
  }
`;

const ScheduleIndex = () => {
  return (
    <>
      <MyPageLayout title='스케줄' noPaddingBottom={true}>
        <ScheduleContainer>
          <SchduleFilter>
            <button className='filter_btn all on'>전체</button>
            <button className='filter_btn scheduled'>예정</button>
            <button className='filter_btn done'>완료</button>
            <button className='filter_btn cancel'>취소</button>
          </SchduleFilter>
          <div className='schdule_item_container'>
            {scheduleData.map(data => (
              <ScheduleItem key={data.id} item={data} isLast={data.id === scheduleData.length - 1} />
            ))}
          </div>
        </ScheduleContainer>
      </MyPageLayout>
    </>
  );
};

export default ScheduleIndex;

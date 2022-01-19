import React from 'react';
import styled from 'styled-components';

import MyPageLayout from '@components/layout/MyPageLayout';
import { useRouter } from 'next/router';

const MissionApplyDone = () => {
  const router = useRouter();
  return (
    <>
      <MyPageLayout title='아이캐시'>
        <ApplyDoneBox>
          <p className='done_title'>미션 신청이 완료되었어요!</p>
          <span className='done_description'>
            미션 승인 기준과 승인 예정일은
            <br />
            신청한 미션의 상세 규정을 확인하세요.
          </span>
          <div className='done_btn_box'>
            <button className=' done_btn go_to_mission_list' onClick={() => router.push('/icash')}>
              미션 전체 리스트로 돌아가기
            </button>
            <button className=' done_btn check_mission_history' onClick={() => router.push('/icash?tab=apply_missions')}>
              미션 참여 내역 확인하기
            </button>
          </div>
        </ApplyDoneBox>
      </MyPageLayout>
    </>
  );
};

export default MissionApplyDone;
const ApplyDoneBox = styled.div`
  position: relative;
  width: 100%;
  text-align: center;
  padding-top: 30px;
  .done_title {
    font-size: 20px;
    font-weight: 500;
    margin-bottom: 30px;
  }
  .done_description {
    display: block;
    font-size: 16px;
    line-height: 24px;
  }
  .done_btn_box {
    position: relative;
    width: 100%;
    text-align: center;
    margin-top: 65px;
  }
  .done_btn_box .done_btn {
    ${props => props.theme.resetBtnStyle};
    display: block;
    width: 345px;
    height: 50px;
    margin: 0 auto;
    border: 1px solid #dfdfdf;
    font-size: 16px;
  }
  .done_btn_box .go_to_mission_list {
    margin-bottom: 10px;
  }
`;

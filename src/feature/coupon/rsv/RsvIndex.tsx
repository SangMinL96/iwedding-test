import { SelectButton } from '@components/core/buttons/SelectButton';
import { SelectDatePicker } from '@components/core/buttons/SelectDatePicker';
import MobileModalHeader from '@components/core/modal/AbstractModal/MobileModalHeader';
import PCModalHeader from '@components/core/modal/AbstractModal/PCModalHeader';
import { Desktop } from '@hooks/useDevice';
import theme from '@styles/theme';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import styled from 'styled-components';

function RsvIndex() {
  const [success, setSuccess] = useState(false);
  const isDeskTop = Desktop();
  const router = useRouter();
  // 보겸차장님이 만들어준 예약하기 api중 어떤 아이디가 필요할지 모름.
  // 아래 데이터를 받기 위해 이런식으로 창을 열어야함 ex) /coupon/rsv?couponId=123&entId=땡땡떙F
  // const {couponId,entId,entName,bbsNo}= router.query
  const [date, setDate] = useState('');
  const onChange = date => {
    setDate(date);
  };

  const onClose = () => {
    if (isDeskTop) {
      global.window && window.close();
    } else {
      router.back();
    }
  };

  const onSubmit = async () => {
    //예약 api 완료후
    setSuccess(true);
  };
  return (
    <Container>
      {isDeskTop ? <PCModalHeader title={'예약하기F'} onClose={onClose} /> : <MobileModalHeader title={'예약하기F'} onClose={onClose} />}
      {success ? (
        <ContentBox id='visit_when'>
          <h3>예약 완료되었습니다.</h3>
        </ContentBox>
      ) : (
        <ContentBox id='visit_when'>
          <h3>방문 상담 희망 일정을 선택하세요.</h3>
          <p className='pFont'>상품 상담을 위한 방문 일시를 선택하세요.</p>
          <SelectDatePicker type='time' date={date} onChange={onChange} />
          {/* <SelectButton
          id={'1'}
          btnActive={index === 1 && value === '1'}
          onClick={onClick}
          style={
            index === 1
              ? { height: '100%', padding: '20px 15px 20px 15px', lineHeight: '22px' }
              : { height: '100%', padding: '20px 15px 20px 15px', backgroundColor: '#F5F5F5', lineHeight: '22px', border: 'none' }
          }
        >
          ㅇ
        </SelectButton> */}
        </ContentBox>
      )}
      {success ? <SubmitBtn onClick={onClose}>예약완료</SubmitBtn> : <SubmitBtn onClick={onSubmit}>예약신청완료F</SubmitBtn>}
    </Container>
  );
}

export default React.memo(RsvIndex);

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const SubmitBtn = styled.div`
  position: fixed;
  bottom: 0;
  height: 50px;
  background-color: red;
  width: 100%;
  ${theme.flexCenter};
`;
const ContentBox = styled.div`
  width: 100%;

  @media all and (max-width: 1280px) {
    padding-top: 51px;
  }
  h3 {
    font-size: 18px;
    font-weight: bold;
  }
  & > p {
    margin-top: 12px;
    margin-bottom: 22px;
    font-size: 14px;
    color: #8c8c8c;
  }
  h5 {
    margin-top: 2.5em;
    margin-bottom: 1em;
    font-size: 15px;
    font-weight: bold;
    &:nth-last-child(4) {
      margin-top: 1.5em;
    }
  }
`;

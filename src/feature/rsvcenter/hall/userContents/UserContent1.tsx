import React, { useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';
import { useFormContext } from 'react-hook-form';
import { hanbokList } from '../../util';
import { userInfo } from 'os';
import { SelectInput } from '@components/core/buttons/SelectInput';

function UserContent1({ setIsValidate }) {
  const { setValue: setFormValue } = useFormContext();
  const [date, setDate] = useState<string>('');
  const [value, setValue] = useState<string>('');
  const [check, setCheck] = useState<string>('');
  const [userInfo, setUserInfo] = useState<{ name: string; phone: string }>({
    name: '',
    phone: '',
  });

  // 리액트 훅폼 데이터 셋팅
  useEffect(() => {
    setFormValue('easy_book.when_check', value);
    if (value === '1') {
      setFormValue('easy_book.when_date', date);
      setFormValue('easy_book.when_type', check);
    }
    if (value !== '') {
      if (value === '1' && date !== '' && check !== '') {
        setIsValidate(prev => ({ ...prev, 'easy_book.when_check': true }));
      }
      if (value === '0') {
        setIsValidate(prev => ({ ...prev, 'easy_book.when_check': true }));
      }
    }
  }, [value, date, check]);

  return (
    <ContentBox>
      <h3>웨딩홀 예약을 위한 정보를 알려주세요.</h3>
      <p>
        기재하신 정보를 바탕으로 웨딩홀 예약이 완료되며,
        <br />
        방문일 전에 사전 방문 안내 연락을 드립니다.
      </p>
      <h5>나의 정보</h5>
      <InputBox>
        <SelectInput
          value={userInfo.name}
          placeholder='이름(실명)'
          onChange={ev => setUserInfo(prev => ({ ...prev, name: ev.target.value }))}
        />
      </InputBox>
      <InputBox>
        <SelectInput
          value={userInfo.phone}
          placeholder='연락처'
          onChange={ev => setUserInfo(prev => ({ ...prev, phone: ev.target.value }))}
        />
      </InputBox>
      <h5>
        배우자<span>(선택사항)</span>
      </h5>
      <p>
        대부분의 웨딩홀은 예약 시 신부님 정보가 필요해요.
        <br />
        신청자가 신부가 아니라면 신부 정보를 꼭 입력해주세요.
      </p>
      {hanbokList.content3.map((item, index) => (
        <span key={item.value}>
          <InputBox key={item.value}>
            <SelectInput onChange={ev => setFormValue('easy_book.info', ev.target.value)} />
          </InputBox>
        </span>
      ))}
    </ContentBox>
  );
}
export default React.memo(UserContent1);

const ContentBox = styled.div`
  width: 100%;
  padding: 0px 0 35px 0;
  h3 {
    font-size: 18px;
    font-weight: bold;
  }
  & > p {
    margin-top: 12px;
    margin-bottom: 22px;
    font-size: 14px;
    color: #4983ff;
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

const InputBox = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: space-between;
  button {
    background-color: #f5f5f5;
  }
`;
const CheckWapper = styled.div`
  display: flex;
`;

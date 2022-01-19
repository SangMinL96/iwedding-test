import React, { useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';
import { useFormContext } from 'react-hook-form';
import { hallList } from '../../util';
import { SelectButton } from '@components/core/buttons/SelectButton';

function Content5({ setIsValidate }) {
  const { setValue: setFormValue } = useFormContext();
  const [date, setDate] = useState<string>('');
  const [value, setValue] = useState<string>('');
  const [check, setCheck] = useState<string>('');

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

  // 날짜 픽커 온체인지 함수
  const onChange = date => {
    setDate(date);
  };

  //행상 일정 있어요 or 아직 정해지지 않았어요 클릭 이벤트
  const onClick = (ev: React.MouseEvent) => {
    setIsValidate(prev => ({ ...prev, 'easy_book.when_check': false }));
    const { id } = ev.currentTarget;
    if (id === '1') {
      setValue(id);
    }
    if (id === '0') {
      setValue(id);
      setDate('');
      setCheck('');
    }
  };
  // 체크박스 예식, 촬영, 가족행사, 기타 클릭 이벤트
  const onCheck = (ev: React.MouseEvent) => {
    const { id } = ev.currentTarget;
    setCheck(id);
  };

  return (
    <ContentBox>
      <h3>선호하는 예식 형태가 있나요?</h3>
      <p>식사 장소에 따른 예식 형태를 선택하세요.</p>
      {hallList.content5.map((item, index) => (
        <span key={item.value}>
          <InputBox key={item.value}>
            <SelectButton btnActive={item.value === value} id={`${item.value}_${index}`} onClick={onClick} style={{ lineHeight: 1.5 }}>
              {item.name}
            </SelectButton>
          </InputBox>
        </span>
      ))}
    </ContentBox>
  );
}
export default React.memo(Content5);

const ContentBox = styled.div`
  width: 100%;
  padding: 51px 0 35px 0;
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

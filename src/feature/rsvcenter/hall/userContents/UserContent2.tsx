import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import 'react-datepicker/dist/react-datepicker.css';
import { useFormContext } from 'react-hook-form';
import { hanbokList } from '../../util';
import { SelectButton } from '@components/core/buttons/SelectButton';
import { useRouter } from 'next/router';
import { SelectDatePicker } from '@components/core/buttons/SelectDatePicker';

function UserContent2({ setIsValidate }) {
  const { setValue: setFormValue } = useFormContext();
  const {
    query: { from },
  } = useRouter();

  const [date, setDate] = useState('');
  const [value, setValue] = useState<string>('');
  useEffect(() => {
    setFormValue('easy_book.visit_when', date);
    setFormValue('easy_book.visit_when_yet', value);
    if (value !== '') {
      setIsValidate(prev => ({ ...prev, 'easy_book.visit_when_yet': true }));
    }
  }, [value, date]);
  const onChange = date => {
    setDate(date);
    setValue('0');
  };
  const onClick = (ev: React.MouseEvent) => {
    const { id } = ev.currentTarget;
    console.log(id);
    if (id === '1') {
      setDate('');
      setValue(id);
    }
  };
  return (
    <ContentBox from={from as string} id='visit_when'>
      <h3>웨딩홀 방문상담 희망 일시를 선택하세요.</h3>
      <p className='pFont'>요청하신 방문 희망일시 우선으로 예약해드릴게요.</p>
      <SelectButton
        onClick={onClick}
        style={{ height: '100%', padding: '20px 15px 20px 15px', backgroundColor: '#F5F5F5', lineHeight: '22px', border: 'none' }}
      >
        <div style={{ cursor: 'default', color: '#4866E4', fontWeight: 'bold' }}>
          꼭 읽어주세요!
          <p style={{ fontWeight: 'normal', fontSize: '14px', marginTop: '13px', color: '#8C8C8C' }}>
            한 업체당 상담 소요 시간은 30분(대여)~ 1시간(맞춤)이며,
            <br />
            동선과 이동시간을 고려하여 스케줄을 예약해드립니다.
          </p>
        </div>
      </SelectButton>
      <SelectDatePicker type='time' date={date} onChange={onChange} />
    </ContentBox>
  );
}

export default React.memo(UserContent2);

const ContentBox = styled.div<{ from: string }>`
  width: 100%;
  padding: ${props => (!props.from ? '51px 0 0 0' : '0')};
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

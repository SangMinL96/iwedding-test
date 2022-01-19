import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import 'react-datepicker/dist/react-datepicker.css';
import { useFormContext } from 'react-hook-form';
import { SelectInput } from '@components/core/buttons/SelectInput';

function Content7({ setIsValidate }) {
  const { setValue: setFormValue } = useFormContext();

  const [date, setDate] = useState('');
  const [value, setValue] = useState<string>('');
  useEffect(() => {
    setFormValue('easy_book.visit_when', date);
    setFormValue('easy_book.visit_when_yet ', value);
  }, [value, date]);
  const onChange = date => {
    setDate(date);
    setValue('0');
  };
  const onClick = (ev: React.MouseEvent) => {
    const { id } = ev.currentTarget;
    if (id === '1') {
      setDate('');
      setValue(id);
    }
  };
  return (
    <ContentBox>
      <h3>추가 문의 사항이 있나요?</h3>
      <p>웨딩홀 예약에 필요한 정보가 있다면 남겨주세요.</p>
      <SelectInput isArea row={6} onChange={ev => setFormValue('easy_book.info', ev.target.value)} />
    </ContentBox>
  );
}

export default React.memo(Content7);

const ContentBox = styled.div`
  width: 100%;
  margin-top: 4em;
  h3 {
    font-size: 18px;
    font-weight: bold;
  }
  & > p {
    margin-top: 0.5em;
    margin-bottom: 1.1em;
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

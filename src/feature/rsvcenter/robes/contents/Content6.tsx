import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import 'react-datepicker/dist/react-datepicker.css';
import { useFormContext } from 'react-hook-form';
import { robesList } from '../../util';
import { SelectDatePicker } from '@components/core/buttons/SelectDatePicker';
import { SelectButton } from '@components/core/buttons/SelectButton';
import { useRouter } from 'next/router';

function Content6({ setIsValidate }) {
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
      <h3>방문 상담 희망 일정을 선택하세요.</h3>
      <p className='pFont'>상품 상담을 위한 방문 일시를 선택하세요.</p>
      {robesList.content6.map((item, index) => (
        <span key={item.value}>
          {index === 0 && (
            <>
              <SelectDatePicker type='time' date={date} onChange={onChange} />
            </>
          )}
          <SelectButton
            id={item.value}
            btnActive={index === 1 && value === '1'}
            onClick={onClick}
            style={
              index === 1
                ? { height: '100%', padding: '20px 15px 20px 15px', lineHeight: '22px' }
                : { height: '100%', padding: '20px 15px 20px 15px', backgroundColor: '#F5F5F5', lineHeight: '22px', border: 'none' }
            }
          >
            {item.name}
          </SelectButton>
        </span>
      ))}
    </ContentBox>
  );
}

export default React.memo(Content6);

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

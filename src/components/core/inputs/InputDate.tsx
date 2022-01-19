import React, { forwardRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import selectDateGray from '@images/common/icon_select_date_gray.png';
import selectDateBlack from '@images/common/icon_select_date_black.png';
import Datepicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ko from 'date-fns/locale/ko';
import { getDate } from '@utils/util';
import Image from 'next/image';

registerLocale('ko', ko);
interface InputDateProps {
  selected: boolean;
}

const Container = styled.div<InputDateProps>`
  display: inline-block;
  width: 200px;
  height: 50px;
  border: ${props => `1px solid ${props.selected ? '#262626' : '#dfdfdf'}`};

  .picker_box {
    display: inline-block;
    width: calc(100% - 34px);
    height: 48px;

    .react-datepicker-popper {
      z-index: 9999 !important;
    }

    .react-datepicker-wrapper {
      width: 100%;
    }

    .react-datepicker__input-container {
      .custom_input {
        width: 100%;
        height: 48px;
        line-height: 48px;
        vertical-align: middle;
        font-size: 15px;
        padding-left: 10px;
        /* 날짜 선택시에는 아래 텍스트컬러로 변경 */
        color: ${props => `${props.selected ? '#262626' : '#8c8c8c'}`};
      }
    }
  }

  .select_date_btn {
    display: inline-block;
    width: 30px;
    height: 100%;
    vertical-align: top;
    background: transparent;
    > div {
      width: 16px;
      height: 16px;
    }
  }
`;

interface Props {
  onSelectDate: (date: Date) => void;
  selected?: Date | undefined;
  onInstance?: (instance: Datepicker) => void;
}

const InputDate = forwardRef<any, Props>(({ onSelectDate, selected, onInstance }, ref) => {
  const [date, setDate] = useState<any>(selected ? selected : null);

  useEffect(() => {
    setDate(selected);
  }, [selected]);

  useEffect(() => {
    console.log(date);
  }, [date]);

  return (
    <Container selected={date != null}>
      <div className='picker_box'>
        <Datepicker
          ref={instance => {
            if (onInstance && instance) onInstance(instance);
          }}
          // placeholderText='0000-00-00'
          selected={selected ?? null}
          locale='ko'
          popperModifiers={{ preventOverflow: { enabled: true } }}
          popperPlacement='auto'
          customInput={<div className='custom_input'>{date ? getDate(date, false) : ''}</div>}
          onChange={date => {
            if (date) {
              setDate(date);
              onSelectDate(date as Date);
            }
          }}
          dateFormat='MMMM dd'
        />
      </div>
      <button className='select_date_btn'>
        {/* on 상태일 경우 이미지가 selectDateBlack으로 */}
        <Image unoptimized src={date != null ? selectDateBlack : selectDateGray} alt='date' />
      </button>
    </Container>
  );
});

InputDate.displayName = 'InputDate';

export default InputDate;

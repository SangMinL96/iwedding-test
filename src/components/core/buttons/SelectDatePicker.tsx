import React, { useEffect, useRef } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';
import ko from 'date-fns/locale/ko';
import IconDatePicker from '@svgs/icon_date_picker';
import ReactDatePicker from 'react-datepicker';

registerLocale('ko', ko);
type PropsType = {
  onChange: any;
  date: Date | string;
  onClick?: any;
  type?: 'time' | 'month' | undefined;
  placeholder?: string;
};

export const SelectDatePicker = ({ onChange, type, onClick, date, placeholder = '날짜를 선택해주세요' }: PropsType) => {
  const dateRef = useRef<ReactDatePicker>(null);
  const onChangeRaw = ev => {
    ev.preventDefault();
  };
  const onClickIcon = () => {
    if (dateRef && dateRef.current) {
      return dateRef.current.setFocus();
    }
  };

  const onTypeFormat = () => {
    switch (type) {
      case 'time':
        return 'yyyy년 MM월 dd일 HH시 mm분';
      case 'month':
        return 'yyyy년 MM월';
      default:
        return 'yyyy년 MM월 dd일';
    }
  };
  useEffect(() => {
    const disabledTime = global.window && (document.querySelector('react-datepicker__time-list-item--disabled') as HTMLInputElement);
    if (disabledTime) {
      disabledTime.style.display = 'none';
    }
    const datepicker = global.window && document.querySelector('pickerContainer');
    global.window && datepicker?.addEventListener('touchstart', ev => ev.preventDefault());
  }, []);
  return (
    <Container className='pickerContainer' type={type}>
      <DatePicker
        ref={dateRef}
        showTimeSelect={type === 'time'}
        showMonthYearPicker={type === 'month'}
        timeFormat={type === 'time' ? 'HH:mm' : ''}
        placeholderText={placeholder}
        timeCaption='시간 / 분'
        minTime={new Date(0, 0, 0, 8, 0)}
        maxTime={new Date(0, 0, 0, 19, 30)}
        selected={date as Date}
        dateFormat={onTypeFormat()}
        locale='ko'
        onKeyDown={ev => ev.stopPropagation()}
        disabledKeyboardNavigation
        onFocus={e => (e.currentTarget.readOnly = true)}
        minDate={new Date()}
        onChangeRaw={onChangeRaw}
        onChange={onChange}
        onInputClick={onClick}
      />
      <div className='icon' onClick={onClickIcon}>
        <IconDatePicker />
      </div>
    </Container>
  );
};

type StyleType = {
  type?: string;
};

const Container = styled.div<StyleType>`
  position: relative;
  cursor: pointer;
  width: 100%;
  height: 100%;
  .react-datepicker-wrapper {
    width: 100%;
    text-align: left;
    display: inline-block;
    width: 100%;
    height: 48px;
    border-radius: 8px;
    border: 1px solid #dfdfdf;
    margin-bottom: 9px;
    margin-right: 5px;
    &:active {
      background-color: #dfdfdf;
    }
    p {
      font-size: 13px;
    }
  }
  .react-datepicker__header {
    padding-bottom: ${props => props.type === 'month' && '10px'};
  }
  .react-datepicker__navigation--next {
    border-left-color: #525252;
  }
  .react-datepicker__navigation--previous {
    border-right-color: #525252;
  }
  .react-datepicker__header {
    background-color: white;
  }

  .react-datepicker__input-container {
    padding-left: 1em;
    width: 100%;
    height: 100%;
    input {
      width: 100%;
      height: 100%;
      border: none;
      border-radius: 8px;
      font-size: 15px;
    }
  }
  .icon {
    ${props => props.theme.flexCenter};
    background-color: #4866e4;
    position: absolute;
    width: 50px;
    height: 48px;
    top: 0;
    right: 0;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
  }
  .react-datepicker__time-container
    .react-datepicker__time
    .react-datepicker__time-box
    ul.react-datepicker__time-list
    li.react-datepicker__time-list-item--disabled {
    display: none;
  }
`;

import { InputDate, InputTime, InputWithClear } from '@components/core/inputs';
import React from 'react';
import styled from 'styled-components';

interface ItemProps {
  title: string;
  sub_title?: string;
  onSelect: (selected: any) => void;
  is_input?: boolean;
  onChangeText?: (text: string) => void;
  invisible_select?: boolean;
  datetime?: boolean;
  date?: boolean;
  time?: boolean;
  address_btn_txt?: string;
  onClickSearchAddressBtn?: () => void;
}
const Container = styled.div``;
const SelectboxItem = ({
  title,
  sub_title,
  is_input,
  onChangeText,
  onSelect,
  invisible_select,
  date,
  datetime,
  time,
  address_btn_txt,
  onClickSearchAddressBtn,
}: ItemProps) => {
  return (
    title && (
      <Container>
        {/*select box*/}
        {!invisible_select && <input type='select' onChange={onSelect} />}
        <div className='content_container'>
          {/*title*/}
          <div className='title'>{title}</div>
          {sub_title && <div className='sub_title on'>{sub_title}</div>}
          {/*input box */}
          {is_input && onChangeText && <InputWithClear onChangeText={onChangeText} />}
          {address_btn_txt && (
            <button className='address_btn_txt' onClick={() => onClickSearchAddressBtn}>
              {address_btn_txt}
            </button>
          )}
          {/*날짜 피커*/}
          {datetime && (
            <div className='datetime_container'>
              <InputDate onSelectDate={onSelect} />
              <InputTime onSelectTime={onSelect} />
            </div>
          )}
          {date && (
            <div className='date_container'>
              <InputDate onSelectDate={onSelect} />
            </div>
          )}
          {time && (
            <div className='time_container'>
              <InputTime onSelectTime={onSelect} />
            </div>
          )}
        </div>
      </Container>
    )
  );
};

export default SelectboxItem;

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import selectTimeGray from '@images/common/icon_select_time_gray.png';
import Datepicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getTime } from '@utils/util';
import ko from 'date-fns/locale/ko';
import Image from 'next/image';

registerLocale('ko', ko);

const Container = styled.div`
  display: inline-block;
  width: 200px;
  height: 50px;
  .date_box {
    width: 200px;
    height: 50px;
    border: 1px solid #dfdfdf;
    margin-right: 4px;
    .picker_box {
      display: inline-block;
      width: calc(100% - 32px);
      height: 48px;
      padding-left: 10px;
      .react-datepicker__input-container {
        width: 100%;
        height: 100%;
        .custom_input {
          width: 168px;
          line-height: 48px;
          vertical-align: middle;
          font-size: 15px;
          color: #8c8c8c;
          /* 날짜 선택시에는 아래 텍스트컬러로 변경 */
          /* color: #262626; */
        }
      }
    }
    .select_date_btn {
      width: 30px;
      height: 100%;
      vertical-align: top;
      > img {
        width: 16px;
        height: 16px;
      }
    }
  }
  .date_box.on {
    border: 1px solid #262626;
  }
  .date_box.visit {
    width: 200px;
    margin-right: 0;
  }
`;

interface Props {
  onSelectTime: (date: Date) => void;
  isVisit?: boolean;
  selected?: Date;
}

const InputTime = ({ onSelectTime, isVisit, selected }: Props) => {
  const [date, setDate] = useState<any>();

  useEffect(() => {
    setDate(selected);
  }, [selected]);

  useEffect(() => {
    console.log('time', date);
  }, [date]);
  return (
    <Container>
      <div className={isVisit ? 'date_box visit' : 'date_box'}>
        <div className='picker_box'>
          <Datepicker
            selected={selected ? selected : null}
            locale='ko'
            popperModifiers={{ preventOverflow: { enabled: true } }}
            popperPlacement='auto'
            customInput={<div className='custom_input'>{date ? getTime(date) : ''}</div>}
            onChange={date => {
              if (date) {
                setDate(date);
                onSelectTime(date as Date);
              }
            }}
            showTimeSelect
            showTimeSelectOnly
            timeFormat='HH:mm'
            timeIntervals={15}
            timeCaption='시간'
            dateFormat='MMMM d, yyyy h:mm'
          />
        </div>
        <button className='select_date_btn'>
          {/* on 상태일 경우 이미지가 selectDateBlack으로 */}
          <Image unoptimized src={selectTimeGray} alt='date' />
        </button>
      </div>
    </Container>
  );
};

export default InputTime;

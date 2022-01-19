import ko from 'date-fns/locale/ko';
import moment from 'moment';
import React, { useMemo, useState } from 'react';
import Datepicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import selectDateBlack from '@images/common/icon_select_date_black.png';
import selectDateGray from '@images/common/icon_select_date_gray.png';
import selectTimeBlack from '@images/common/icon_select_time_black.png';
import selectTimeGray from '@images/common/icon_select_time_gray.png';
import theme from '@styles/theme';
import { getDate, getTime } from '@utils/util';
import styled from 'styled-components';
import { GroupMetadataDto, MetadataValue } from '@modules/mypage/quotation/QuotationInterface';
import Image from 'next/image';

registerLocale('ko', ko);

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  .item {
    width: 100%;
    width: 345px;
    height: 75px;
    border-bottom: 1px solid #dfdfdf;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media all and (max-width: ${theme.pc}px) {
      width: 100%;
      padding: 0 15px;
    }
    > span {
      display: inline-block;
      height: 100%;
      padding-top: 27px;
      font-size: 15px;
      font-weight: 500;
    }
    .react-datepicker__input-container {
      width: 241px;
      height: 50px;
      position: absolute;
      right: 0;
      top: 12px;
      @media all and (max-width: ${theme.pc}px) {
        right: 15px;
      }
    }
    .custom_input {
      display: inline-flex;
      justify-content: space-between;
      align-items: center;
      width: 241px;
      height: 50px;
      border: 1px solid #dfdfdf;
      padding-left: 11px;
      padding-right: 6px;
      .current_datetime {
        display: inline-block;
        line-height: 48px;
        vertical-align: middle;
        font-size: 15px;
        color: #8c8c8c;
        /* 날짜 선택시에는 아래 텍스트컬러로 변경 */
        /* color: #262626; */
      }
      .select_date_btn {
        width: 30px;
        height: 100%;
        vertical-align: top;
        background: transparent;
        > div {
          width: 16px;
          height: 16px;
        }
      }
    }
    .custom_input.on {
      border: 1px solid #262626;
      .current_datetime {
        color: #262626;
      }
    }
    .react-datepicker-popper {
      top: 24px !important;
      left: 40px !important;
    }
  }
`;

interface ModalProps {
  onChangedMetadata: (metadata: MetadataValue) => void;
  selectedMetadata: GroupMetadataDto;
}

/**
 * 시간 모달
 * @param onSelectedMetadata
 */
const ModalMetaDatetime = ({ onChangedMetadata, selectedMetadata }: ModalProps) => {
  const [tmpDateTimeMetadata, setTmpDateTimeMetadata] = useState<MetadataValue>({
    value: { date: '', time: '' },
    selected_answer_value: '',
  });

  const selectedDate = useMemo(() => {
    if (selectedMetadata) {
      const date = selectedMetadata.metadata.value.date;
      const time = selectedMetadata.metadata.value.time;
      setTmpDateTimeMetadata({ value: { date, time }, selected_answer_value: '' });
      if (date && time) {
        const selectedDate = `${date} ${time}`;
        return moment(selectedDate).toDate();
      } else {
        return undefined;
      }
    }
  }, [selectedMetadata]);

  return (
    <Container>
      <div className='item'>
        <span>날짜</span>
        <Datepicker
          selected={selectedDate}
          onChange={date => {
            const newState = {
              ...tmpDateTimeMetadata,
              value: { ...tmpDateTimeMetadata.value, date: getDate(date as Date, false) },
            };
            console.log(newState);
            setTmpDateTimeMetadata(newState);
            onChangedMetadata(newState);
          }}
          locale='ko'
          popperModifiers={{ preventOverflow: { enabled: true } }}
          popperPlacement='auto'
          customInput={
            <div className={tmpDateTimeMetadata.value.date ? 'custom_input on' : 'custom_input'}>
              <span className='current_datetime'>{tmpDateTimeMetadata ? tmpDateTimeMetadata.value.date : ''}</span>
              <button className='select_date_btn'>
                {/* on 상태일 경우 이미지가 selectDateBlack으로 */}
                <Image
                  unoptimized
                  width={18}
                  height={18}
                  src={tmpDateTimeMetadata.value.date ? selectDateBlack : selectDateGray}
                  alt='date'
                />
              </button>
            </div>
          }
        />
      </div>

      <div className='item'>
        <span>시간</span>
        <Datepicker
          selected={selectedDate}
          onChange={date => {
            const newState = {
              ...tmpDateTimeMetadata,
              value: { ...tmpDateTimeMetadata.value, time: getTime(date as Date, false) },
            };
            setTmpDateTimeMetadata(newState);
            onChangedMetadata(newState);
          }}
          locale='ko'
          popperModifiers={{ preventOverflow: { enabled: true } }}
          popperPlacement='auto'
          timeIntervals={30}
          customInput={
            <div className={tmpDateTimeMetadata.value.time ? 'custom_input on' : 'custom_input'}>
              <span className='current_datetime'>{tmpDateTimeMetadata ? tmpDateTimeMetadata.value.time : ''}</span>
              <button className='select_date_btn'>
                {/* on 상태일 경우 이미지가 selectDateBlack으로 */}
                <Image
                  width={18}
                  height={18}
                  unoptimized
                  src={tmpDateTimeMetadata.value.time ? selectTimeBlack : selectTimeGray}
                  alt='date'
                />
              </button>
            </div>
          }
          showTimeSelect
          showTimeSelectOnly
        />
      </div>
    </Container>
  );
};

export default React.memo(ModalMetaDatetime);

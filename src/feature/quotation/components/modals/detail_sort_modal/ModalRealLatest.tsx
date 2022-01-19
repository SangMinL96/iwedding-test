import { RadioboxItem } from '@components/core/checkboxes';
import { InputDate } from '@components/core/inputs';
import AbstractModal from '@components/core/modal/AbstractModal/AbstractModal';
import { Desktop } from '@hooks/useDevice';
import { CommonModalProps } from '@modules/CommonInterface';
import theme from '@styles/theme';
import { calDay, getDate, getDateWithTimeZone } from '@utils/util';
import router from 'next/router';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Datepicker from 'react-datepicker';
import styled from 'styled-components';

export interface Latest {
  start?: string;
  end?: string;
  title?: string;
}

interface LatestProps extends CommonModalProps {
  onConfirm: (date: Latest | undefined) => void;
  selectedLatest?: Latest;
}

const CUSTOM_STRING = '맞춤입력';
const days = [
  { title: '7일', value: 7 },
  { title: '30일', value: 30 },
  { title: '180일', value: 180 },
  { title: CUSTOM_STRING, value: CUSTOM_STRING },
];

const ModalRealLatest = ({ onClose, onConfirm, selectedLatest }: LatestProps) => {
  // ISOString으로 안하면 Safari에서 터짐.
  const defaultDates = useMemo(() => ({ start: getDate(calDay(-7).toISOString()), end: getDate(calDay(0).toISOString()) }), []);
  const [tmpSelectedLatest, setTmpSelectedLatest] = useState<Latest>({
    ...defaultDates,
    title: days[0].title,
  });

  const firstDateRef = useRef<Datepicker>();

  useEffect(() => {
    if (selectedLatest) {
      setTmpSelectedLatest(selectedLatest);
    }
  }, [selectedLatest]);

  const mOnConfirm = useCallback(() => {
    if (tmpSelectedLatest.start <= tmpSelectedLatest.end) {
      onConfirm(tmpSelectedLatest);
      router.back();
    } else {
      return alert('날짜를 다시 설정해주세요');
    }
  }, [tmpSelectedLatest, onConfirm]);

  const clear = useCallback(() => {
    setTmpSelectedLatest({ ...defaultDates, title: days[0].title });
  }, [setTmpSelectedLatest, days, defaultDates]);

  const onSelectPicker = useCallback((latest: number | string, title: string) => {
    if (typeof latest == 'string') {
      if (firstDateRef?.current) {
        firstDateRef.current.setOpen(true);
      }
    } else {
      setTmpSelectedLatest({ start: getDate(calDay(-latest).toISOString()), end: getDate(calDay(0).toISOString()), title });
    }
  }, []);

  const onSelectDate = useCallback(
    (date: Date, type: string) => {
      clear();
      const el = global.document && (document.getElementById(CUSTOM_STRING) as HTMLInputElement);
      if (el) el.checked = true;
      setTmpSelectedLatest({ ...tmpSelectedLatest, [type]: getDateWithTimeZone(date).toString(), title: CUSTOM_STRING });
    },
    [clear, setTmpSelectedLatest, tmpSelectedLatest],
  );

  const isDesktop = Desktop();
  return (
    <AbstractModal
      title='최종 수정일'
      onClose={onClose}
      stepFooter
      canConfirm
      isDuplicated
      onConfirm={mOnConfirm}
      isFullSize
      noPaddingTop={!isDesktop}
    >
      <Inner>
        {days.map(day => (
          <DayItem key={day.title}>
            <RadioboxItem
              title={day.title}
              onSelect={() => onSelectPicker(day.value, day.title)}
              id={day.title}
              name='updated'
              defaultCheck={day.title == tmpSelectedLatest.title}
            />
          </DayItem>
        ))}
        <SelectDayBox>
          {/*start_date*/}
          <InputDate
            selected={new Date(getDate(tmpSelectedLatest.start))}
            onSelectDate={date => onSelectDate(date, 'start')}
            onInstance={instance => {
              firstDateRef.current = instance;
            }}
          />
          {/*end_date*/}
          <InputDate onSelectDate={date => onSelectDate(date, 'end')} selected={new Date(getDate(tmpSelectedLatest.end))} />
        </SelectDayBox>
      </Inner>
    </AbstractModal>
  );
};

export default ModalRealLatest;
const Inner = styled.div`
  width: 100%;
`;
const SelectDayBox = styled.div`
  width: 100%;
  margin: 20px 0;
  position: relative;
  > div {
    width: 47.82%;
    &:first-child {
      margin-right: 15px;
      float: left;
    }
    .date_box {
      width: 100%;
    }
  }
  &::after {
    display: block;
    content: '';
    clear: both;
  }
`;
const DayItem = styled.div`
  > div {
    .radio_container {
      @media all and (max-width: ${theme.pc}px) {
        padding-left: 0;
      }
    }
  }
  &:last-child {
    > div {
      .radio_container {
        border-bottom: none;
      }
    }
  }
`;

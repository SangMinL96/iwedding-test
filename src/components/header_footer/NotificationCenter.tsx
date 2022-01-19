import { CommonCheckBox } from '@components/core/checkboxes';
import checkOn from '@images/common/checkbox_square_checked.png';
import checkOff from '@images/common/checkbox_square_unchecked.png';
import { Desktop } from '@hooks/useDevice';
import { useOverflowModal } from '@hooks/useOverflowHidden';
import closeIcon from '@images/common/close_icon_x3.png';
import { onReadAlarm, useUserAlarmList } from '@modules/user/user.api';
import { openPopup } from '@utils/util';
import Image from 'next/image';
import router from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import styled, { css } from 'styled-components';
import NotificationItem from './NotificationItem';
import { getStore, setStore } from '@service/LocalStorageService';

interface NotiProps {
  isNotiOpen: boolean;
  closeNoti?: () => void;
  fullSize?: boolean;
}

const NotificationCenter = ({ isNotiOpen = false, closeNoti, fullSize = false }: NotiProps) => {
  useOverflowModal(isNotiOpen);
  const isDeskTop = Desktop();
  const checkBoxRef = useRef<HTMLInputElement>(null);
  const { data, listMutate } = useUserAlarmList(isNotiOpen);

  const onQaModal = (list_no: string, no: string) => async () => {
    const result = await onReadAlarm({ no: no });

    if (result === 'OK') {
      listMutate();
      setTimeout(() => global.window && openPopup(`/request/replace?list_no=${list_no}&category=알림센터&device=pc`, 'form_web'), 300);
    }
  };

  const [noRead, setNoRead] = useState<boolean>(false);
  const onChange = ev => {
    setStore('notiReadFlag', !noRead);
    setNoRead(prev => !prev);
  };

  useEffect(() => {
    setNoRead(getStore('notiReadFlag') || false);
  }, [getStore('notiReadFlag')]);

  useEffect(() => {
    if (!data?.list) {
      listMutate();
    }
  }, [data, listMutate]);
  return (
    <Wrapper isNotiOpen={isNotiOpen} fullSize={fullSize}>
      <Container>
        <div className='noti_center_header'>
          <p>알림센터</p>
          <Image src={closeIcon} width={24} height={24} onClick={closeNoti} alt='close_btn' />
        </div>

        <SimpleBar>
          <div className='noti_contents'>
            <form className='noti_form'>
              <div className='chk_item'>
                <div className='chk_btn'>
                  <CheckBox>
                    <div className='chk-btn'>
                      <input ref={checkBoxRef} type='checkbox' checked={noRead} name={'noreadBox'} onChange={onChange} />
                      <label onClick={onChange} />
                    </div>
                  </CheckBox>
                </div>
                <div onClick={onChange} className='label_box'>
                  <label htmlFor='unread'>안 읽은 알림만</label>
                </div>
              </div>
            </form>

            <div className='noti-list-box'>
              {noRead &&
                data?.list
                  ?.filter(item => item?.read_check === '0')
                  .map((notice, index) => (
                    <NotificationItem listMutate={listMutate} onQaModal={onQaModal} key={`${notice.no}_${index}`} data={notice} />
                  ))}
              {!noRead &&
                data?.list?.map((item, index) => (
                  <NotificationItem listMutate={listMutate} onQaModal={onQaModal} key={`${item.no}_${index}`} data={item} />
                ))}
              {/* 아이템 text-two-btns 등의 클래스는 의미구분을 위한 클래스 */}
            </div>
          </div>
        </SimpleBar>
      </Container>
    </Wrapper>
  );
};

export default React.memo(NotificationCenter);

const Wrapper = styled.div<{ isNotiOpen: boolean; fullSize: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
  transform: ${props => (props.isNotiOpen ? 'translateX(0)' : 'translateX(100%)')};
  /* transform: translateX(0); */
  opacity: ${props => (props.isNotiOpen ? 1 : 0)};
  /* opacity: 1; */
  background-color: #fafafa;
  overflow-x: hidden;
  overflow-y: scroll;
  transition: ${props => props.isNotiOpen && '0.35s ease-in-out'};
  padding-bottom: 55px;
  z-index: 1001;

  ${props =>
    !props.fullSize &&
    css`
      @media all and (min-width: 1024px) {
        width: 375px;
        height: 100vh;
        padding-bottom: 0;
      }
    `}
`;

const Container = styled.div`
  position: relative;
  width: 100%;
  .noti_center_header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 70px;
    position: relative;
    padding: 20px 15px 13px 17px;
    background-color: #fff;
    > p {
      font-size: 16px;
      font-weight: 700;
      color: #111111;
    }
    > div {
      cursor: pointer;
    }
  }
  .noti_contents {
    position: relative;
    width: 100%;
    height: 100%;
    padding: 20px 15px;
    background-color: #fafafa;
    .noti_form {
      position: relative;
      display: flex;
      justify-content: flex-end;
      width: 100%;
      height: 20px;
      margin-bottom: 20px;
      > .chk_item {
        display: flex;
        align-items: center;
        > .label_box {
          margin-left: 6px;
          > label {
            font-size: 14px;
          }
        }
      }
    }
  }
`;
const CheckBox = styled.div`
  display: flex;
  align-items: center;
  /* width: 100%; */
  .chk-btn {
    width: 20px;
    height: 20px;
    display: inline-flex;
    input[type='checkbox'] {
      display: none;
    }
    input[type='checkbox'] + label {
      display: inline-flex;
      width: 20px;
      height: 20px;
      background: url(${checkOff.src}) no-repeat;
      background-size: 20px;
    }
    input[type='checkbox']:checked + label {
      display: inline-flex;
      width: 20px;
      height: 20px;
      background: url(${checkOn.src}) no-repeat;
      background-size: 20px;
    }
  }
`;

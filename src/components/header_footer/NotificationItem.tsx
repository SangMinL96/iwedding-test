import { Desktop } from '@hooks/useDevice';
import { noticeDetailLog } from '@modules/log/notice/noticeLogger';
import { onReadAlarm } from '@modules/user/user.api';
import theme from '@styles/theme';
import { getDateTodayORdate } from '@utils/util';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';
interface NotiProps {
  data?: any;
  onQaModal?: any;
  listMutate?: any;
}

const NotificationItem = ({ data, onQaModal, listMutate }: NotiProps) => {
  const isDesktop = Desktop();

  // 알림 체크, 미체크 여부
  const router = useRouter();

  const onDetail = async () => {
    await noticeDetailLog({ directLink: data?.pc_landing_url });
    const result = await onReadAlarm({ no: data?.no });
    if (result === 'OK') {
      listMutate();
      if (isDesktop) {
        setTimeout(() => global.window && window.open(data?.pc_landing_url, 'chat_win'), 400);
      } else {
        router.replace(data?.pc_landing_url);
      }
    }
  };

  const contentText = `<p>${data?.contents_descr}</p>`.replace(/\r\n/g, '<br/>') || '';
  return (
    <>
      <Container isChecked={data?.read_check !== '0' ? true : false}>
        <div className='noti_item_title'>
          <div className='text_box'>
            <span>{data?.sub_class}</span>
            {/* <Image src={newIcon} width={36} height={17} alt='new' /> */}
          </div>
          <div className='time_box'>
            <span>{getDateTodayORdate(data?.stime)}</span>
          </div>
        </div>
        <div className='noti_item_text' dangerouslySetInnerHTML={{ __html: contentText }}></div>
        {/* 이미지 */}
        {data?.main_img !== '' && (
          <div className='noti_item_img'>
            <img src={`${process.env.NEXT_PUBLIC_WEB_HOST}/center/alarmcenter/main/${data?.main_img}`} alt='img' />
          </div>
        )}
        {/* 버튼 두개 */}
        {data?.button_name !== '' && (
          <div className='noti_btn_box'>
            <div className='inquiry_btn short' onClick={onQaModal(data?.list_no, data?.no)}>
              문의하기
            </div>
            <div className='event_btn' onClick={onDetail}>
              {data?.button_name}
            </div>
          </div>
        )}
        {/* 버튼 한개 */}
        {data?.button_name === '' && (
          <div className='noti_btn_box'>
            <div className='inquiry_btn full' onClick={onQaModal(data?.list_no, data?.no)}>
              문의하기
            </div>
          </div>
        )}
      </Container>
    </>
  );
};

export default NotificationItem;

const Container = styled.div<{ isChecked: boolean }>`
  position: relative;
  width: 100%;
  height: auto;
  padding: 21px 16px;
  border: ${props => (props.isChecked ? '1px solid #d8d8d8' : '2px solid #4866e4')};
  background-color: #fff;
  border-radius: 8px;
  margin-bottom: 14px;
  -webkit-box-shadow: 0px 3px 5px 0px rgba(50, 50, 50, 0.14);
  -moz-box-shadow: 0px 3px 5px 0px rgba(50, 50, 50, 0.14);
  box-shadow: 0px 3px 5px 0px rgba(50, 50, 50, 0.14);
  .noti_item_title {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 12px;
    .text_box {
      display: flex;
      > span {
        display: inline-block;
        box-sizing: border-box;
        height: 17px;
        font-size: 16px;
        font-weight: 700;
        border-bottom: 10px solid #fffd37;
        margin-right: 6px;
      }
      > div {
        width: 36px;
        vertical-align: bottom;
      }
    }
    .time_box {
      > span {
        font-size: 12px;
        color: #8c8c8c;
      }
    }
  }
  .noti_item_text {
    width: 100%;
    font-size: 14px;
    line-height: 19px;
    margin-bottom: 15px;
    padding-right: 2px;
  }
  .noti_item_img {
    position: relative;
    width: 100%;
    height: auto;
    border-radius: 6px;
    margin-bottom: 16px;
    > div {
      width: 100%;
      overflow: hidden;
      border-radius: 6px;
    }
    > img {
      width: 100%;
      border-radius: 6px;
    }
  }
  .noti_btn_box {
    width: 100%;
    display: flex;
    align-items: center;
    .inquiry_btn {
      ${theme.flexCenter};
      border: 1px solid #4866e4;
      color: #4866e4;
      height: 40px;
      font-size: 14px;
      border-radius: 6px;
      cursor: pointer;
    }
    .inquiry_btn.short {
      width: 30%;
      margin-right: 6px;
    }
    .inquiry_btn.full {
      width: 100%;
    }
    .event_btn {
      ${theme.flexCenter};
      width: 66.6%;
      height: 40px;
      background-color: #4866e4;
      color: #fff;
      font-size: 14px;
      border-radius: 6px;
      cursor: pointer;
    }
  }
`;

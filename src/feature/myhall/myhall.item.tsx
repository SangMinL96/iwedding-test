import React from 'react';
import theme from '@styles/theme';
import styled from 'styled-components';

interface myhallProps {
  id: number;
  title?: string;
  date?: string;
  replyStatus: string;
}

const Container = styled.div`
  display: inline-block;
  width: 385px;
  border: 1px solid #b7c1d8;
  border-radius: 12px;
  padding: 20px 17px;
  margin-right: 15px;
  margin-bottom: 20px;
  &:nth-child(2n) {
    margin-right: 0;
  }
  @media all and (max-width: ${theme.pc}px) {
    width: 100%;
    margin-right: 0;
  }
  .item_text_box {
    width: 100%;
    margin-bottom: 12px;
    > p {
      font-size: 17px;
      font-weight: 700;
      line-height: 25px;
    }
    > span {
      font-size: 14px;
      line-height: 20px;
    }
  }
  .item_status_box {
    width: 100%;
    position: relative;
    > div {
      display: inline-block;
      height: 33px;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 700;
      line-height: 33px;
      vertical-align: middle;
      text-align: center;
    }
    .inquiry_status {
      color: #fff;
      width: 70%;
      margin-right: 5px;
      @media all and (max-width: ${theme.pc}px) {
        margin-right: 4px;
      }
    }
    .inquiry_status.inquiry_checked {
      background-color: #b7c1d8;
    }
    .inquiry_status.reply_checked {
      background-color: #262626;
    }
    .reply_status {
      width: 28.57%;
      background-color: #f5f5f5;
    }
    .reply_status.pending {
      color: #b7c1d8;
    }
    .reply_status.done {
      color: #262626;
    }
  }
`;

const MyhallItem = ({ title, date, replyStatus }: myhallProps) => {
  return (
    <>
      <Container>
        <div className='item_text_box'>
          <p>{title}</p>
          <span>{date}</span>
        </div>
        <div className='item_status_box'>
          <div className={replyStatus === 'pending' ? 'inquiry_status inquiry_checked' : 'inquiry_status reply_checked'}>
            {replyStatus === 'pending' ? '문의 내역 확인' : '답변 확인'}
          </div>
          <div className={replyStatus === 'pending' ? 'reply_status pending' : 'reply_status done'}>
            {replyStatus === 'pending' ? '답변 대기' : '답변 완료'}
          </div>
        </div>
      </Container>
    </>
  );
};

export default MyhallItem;

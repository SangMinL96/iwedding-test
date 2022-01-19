import IconXSquare from '@svgs/icon_x_square';
import theme from '@styles/theme';
import moment from 'moment';
import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';
import { webViewReplace } from '@utils/util';

interface EventCouponProps {
  icard_no: string;
  icard_title: string;
  category: string;
  img_icard_no: string;
  enterprise_name: string;
  valid_date: string;
  onDelete?: any;
  enddate: string;
  startdate: string;
}

const EventTabItem = ({ icard_no, enddate, startdate, icard_title, category, enterprise_name, onDelete }: EventCouponProps) => {
  const on9dayCheck = () => {
    const eDateMoment = moment(enddate);
    const todayDeff = eDateMoment.diff(moment(new Date()), 'days') + 1;
    if (todayDeff > 0 && todayDeff <= 9) return <div className='day9'>{`${todayDeff}일 남음`}</div>;
  };
  const onDateCheck = () => {
    const sDateMoment = moment(startdate);
    const eDateMoment = moment(enddate);
    const todayDeff = eDateMoment.diff(moment(new Date()), 'days');
    const result = eDateMoment.diff(sDateMoment, 'days');
    if (todayDeff < 0) return <div className='coupon_status end'>기간 종료</div>;
    if (result >= 0) return <div className='coupon_status available'>사용 가능</div>;
    if (result < 0) return <div className='coupon_status end'>기간 종료</div>;
  };
  return (
    <Container>
      <div onClick={() => webViewReplace(`https://www.ifamily.co.kr/icard/main/card_view/${icard_no}`)} className='coupon_img_box'>
        <Image
          unoptimized
          layout='fill'
          src={`${process.env.NEXT_PUBLIC_WEB_HOST}/image/icard/${icard_no}/icard_sm_${icard_no}`}
          alt='coupon img'
        />
        {on9dayCheck()}
      </div>
      {/* <a href={`https://www.ifamily.co.kr/icard/main/card_view/${icard_no}`} rel='noreferrer' target='_blank' className='text_group'> */}
      <a onClick={() => webViewReplace(`https://www.ifamily.co.kr/icard/main/card_view/${icard_no}`)} className='text_group'>
        <div className='coupon_text_box'>
          <div className='category_text'>
            <span>{category}</span>
            <span></span>
            <span>{enterprise_name}</span>
          </div>
          <div className='coupon_name'>
            <p>{icard_title}</p>
          </div>
        </div>
        <div className='bottom_text_box'>
          {enddate !== '0000-00-00' && (
            <>
              <span className='date_text'>
                {startdate} ~ {enddate}
              </span>
              {onDateCheck()}
            </>
          )}
        </div>
      </a>
      <div className='coupon_delete_btn'>
        <button onClick={onDelete(icard_no)}>
          <IconXSquare />
        </button>
      </div>
    </Container>
  );
};

export default EventTabItem;
const Container = styled.div`
  display: inline-block;
  position: relative;
  width: 385px;
  height: 110px;
  border-radius: 12px;
  border: 1px solid #dfdfdf;
  padding: 15px;
  margin-right: 19px;
  margin-bottom: 20px;
  background-color: #fff;
  &:nth-child(2n) {
    margin-right: 0;
  }
  @media all and (max-width: ${theme.pc}px) {
    width: 100%;
    margin-right: 0;
    border: 0;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  }
  .coupon_img_box {
    display: inline-block;
    width: 80px;
    height: 80px;
    position: relative;
    vertical-align: top;
    margin-right: 15px;
    cursor: pointer;
    > img {
      width: 100%;
    }
    .day9 {
      position: absolute;
      background-color: #ff0000;
      bottom: 0;
      ${props => props.theme.flexCenter};
      width: 100%;
      height: 19px;
      font-size: 12px;
      font-weight: bold;
      color: #ffffff;
    }
  }
  .text_group {
    display: inline-block;
    position: relative;
    width: calc(100% - 95px);
    cursor: pointer;
    .coupon_text_box {
      position: relative;
      width: calc(100% - 44px);
      .category_text {
        line-height: 23px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: middle;
        > span {
          font-size: 13px;
          color: #8c8c8c;
          line-height: 19px;
          &:nth-child(2) {
            display: inline-block;
            width: 1px;
            height: 11px;
            background-color: #e6e6ea;
            margin: 0 5px;
          }
        }
      }
      .coupon_name {
        width: 100%;
        height: 38px;
        margin-bottom: 3px;
        > p {
          font-size: 14px;
          font-weight: 700;
          color: #262626;
          line-height: 19px;
        }
      }
    }
    .bottom_text_box {
      display: inline-block;
      position: relative;
      width: 100%;
      .date_text {
        font-size: 12px;
        line-height: 18px;
        color: #bebebe;
      }
      .coupon_status {
        position: absolute;
        top: 0;
        right: 0;
        width: 60px;
        height: 19px;
        border-radius: 4px;
        font-size: 12px;
        line-height: 19px;
        vertical-align: middle;
        text-align: center;
      }
      .coupon_status.available {
        background-color: #f5f5f5;
        color: #8c8c8c;
      }
      .coupon_status.end {
        background-color: #bebebe;
        color: #fff;
      }
    }
  }
  .coupon_delete_btn {
    width: 44px;
    height: 60px;
    position: absolute;
    top: 15px;
    right: 15px;
    z-index: 2;
    > button {
      ${props => props.theme.resetBtnStyle};
      width: 100%;
      height: 100%;
      position: relative;
      > svg {
        position: absolute;
        right: 0;
        top: 0;
      }
    }
  }
`;

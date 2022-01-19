import { PaymentCouponType } from '@modules/mypage/coupon/interface';
import theme from '@styles/theme';
import IconXSquare from '@svgs/icon_x_square';
import moment from 'moment';
import Image from 'next/image';
import router from 'next/router';
import React, { MouseEvent, ReactEventHandler, useState } from 'react';
import styled from 'styled-components';
import ModalDetailCoupon from '../modal/modal.detail.coupon';

interface PaymentCouponProps {
  data: PaymentCouponType;
  onDelete?: ReactEventHandler;
}

const PaymentTabItem = ({ data, onDelete }: PaymentCouponProps) => {
  const [visibleDetail, setVisibleDetail] = useState(false);
  const handleModalClick = (e: MouseEvent) => {
    router.push(router.asPath + '#couponmodal');
    if (visibleDetail === true) {
      e.preventDefault();
    } else {
      setVisibleDetail(true);
    }
  };

  const onTypeCheck = (type: string) => {
    if (type === '1') return '할인';
    if (type === '2') return '업그레이드';
    if (type === '3') return '추가 혜택';
  };
  const onDateCheck = (sDate: string, eDate: string) => {
    const sDateMoment = moment(sDate);
    const eDateMoment = moment(eDate);
    const todayDeff = eDateMoment.diff(moment(new Date()), 'days');

    const result = eDateMoment.diff(sDateMoment, 'days');
    if (todayDeff < 0) return <div className='coupon_status end'>기간 종료</div>;
    if (result >= 0) return <div className='coupon_status available'>사용 가능</div>;
    if (result < 0) return <div className='coupon_status end'>기간 종료</div>;
  };
  const on9dayCheck = () => {
    const eDateMoment = moment(data.e_date);
    const todayDeff = eDateMoment.diff(moment(new Date()), 'days') + 1;
    if (todayDeff > 0 && todayDeff <= 9) return <div className='day9'>{`${todayDeff}일 남음`}</div>;
  };

  return (
    <>
      {/* 쿠폰 디테일 모달 */}

      <Container>
        <ImgBox onClick={handleModalClick}>
          <Image unoptimized alt='결제쿠폰' layout='fill' src={data?.thumbnail} />
          {on9dayCheck()}
        </ImgBox>
        <div className='text_group' onClick={handleModalClick}>
          <div className='coupon_text_box'>
            <div className='category_text'>
              <span>{data.category}</span>
              <span></span>
              <span>{data.enterprise_name}</span>
            </div>
            <div className='coupon_name'>
              <p>{data.c_name}</p>
            </div>
          </div>
          <div className='bottom_text_box'>
            <span className='date_text'>
              {data.s_date} ~ {data.e_date}
            </span>
            {onDateCheck(data.s_date, data.e_date)}
          </div>
        </div>
        <div className='coupon_delete_btn'>
          <button onClick={onDelete}>
            <IconXSquare />
          </button>
        </div>
      </Container>
      {visibleDetail && (
        <ModalDetailCoupon
          paymentType={onTypeCheck(data.b_type)}
          coupon_no={data.coupon_no}
          data={data}
          visible={visibleDetail}
          onClose={() => setVisibleDetail(false)}
          onConfirm={() => setVisibleDetail(false)}
          isFullSize={true}
        />
      )}
    </>
  );
};

export default React.memo(PaymentTabItem);

type StyledType = {
  type?: string;
};

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

  .text_group {
    display: inline-block;
    position: relative;
    width: calc(100% - 95px);
    cursor: pointer;
    .coupon_text_box {
      position: relative;
      width: calc(100% - 44px);
      .category_text {
        height: 23px;
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
        overflow-y: hidden;
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

const ImgBox = styled.div<StyledType>`
  ${props => props.theme.flexCenter};
  display: inline-block;
  width: 80px;
  height: 80px;
  position: relative;
  vertical-align: top;
  margin-right: 15px;
  cursor: pointer;
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
`;

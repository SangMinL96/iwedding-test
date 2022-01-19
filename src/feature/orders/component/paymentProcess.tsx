import { BookingStatus, DeliveryStatus, GoodsType } from '@modules/mypage/order/order.interface';
import React from 'react';

interface ProcessProps {
  bookingStatus: BookingStatus;
  deliveryStatus: DeliveryStatus;
  goodsType: GoodsType;
}

const PaymentProcess = ({ goodsType, bookingStatus, deliveryStatus }: ProcessProps) => {
  return (
    <div className='payment-process'>
      {bookingStatus == BookingStatus.CANCEL || deliveryStatus == DeliveryStatus.CANCEL ? (
        <div className='payment-process cancel-process'>
          {/*TODO 취소요청*/}
          <p className='cancel-notice'>결제 취소 요청 2020.12.22</p>
          <span className='cancel-description'>최대 3영업일 이내 위약금 규정에 의거하여 환불 예정</span>
        </div>
      ) : goodsType == GoodsType.BOOKING ? (
        bookingProgress(bookingStatus)
      ) : (
        deliveryProgress(deliveryStatus)
      )}
    </div>
  );
};

export function bookingProgress(status: BookingStatus) {
  return (
    <div className='payment-process'>
      <div className={`process-circle done`}>
        <span>결제 대기</span>
      </div>
      <span className='dots'>
        <img src='/images/icon_dots_two.png' alt='dots' />
      </span>
      <div className={`process-circle ${status > 0 ? 'done' : 'ongoing'}`}>
        <span>결제 완료</span>
      </div>
      <span className='dots'>
        <img src='/images/icon_dots_two.png' alt='dots' />
      </span>
      <div className={`process-circle ${status > 1 ? 'done' : 'ongoing'}`}>
        <span>예약 대기</span>
      </div>
      <span className='dots'>
        <img src='/images/icon_dots_two.png' alt='dots' />
      </span>
      <div className={`process-circle ${status > 2 ? 'done' : 'ongoing'}`}>
        <span>예약 완료</span>
      </div>
    </div>
  );
}

export function deliveryProgress(status: DeliveryStatus) {
  return (
    <div className='payment-process'>
      <div className={`process-circle done`}>
        <span>결제 대기</span>
      </div>
      <span className='dots'>
        <img src='/images/icon_dots_two.png' alt='dots' />
      </span>
      <div className={`process-circle ${status > 0 ? 'done' : 'ongoing'}`}>
        <span>결제 완료</span>
      </div>
      <span className='dots'>
        <img src='/images/icon_dots_two.png' alt='dots' />
      </span>
      <div className={`process-circle ${status > 1 ? 'done' : 'ongoing'}`}>
        <span>출고 대기</span>
      </div>
      <span className='dots'>
        <img src='/images/icon_dots_two.png' alt='dots' />
      </span>
      <div className={`process-circle ${status > 2 ? 'done' : 'ongoing'}`}>
        <span>출고 완료</span>
      </div>
    </div>
  );
}
export default PaymentProcess;

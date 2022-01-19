import { KcpPaymentEntity, PayMethod } from '@modules/mypage/order/order.interface';
import { showPrice, unixToDateTime } from '@utils/util';
import React, { useCallback } from 'react';

interface PaymentProps {
  kcp: KcpPaymentEntity;
  pay_method: PayMethod;
  payment_price: number;
}

const Payment = ({ kcp, pay_method, payment_price }: PaymentProps) => {
  const renderPayType = useCallback((paymethod: PayMethod, kcp: KcpPaymentEntity) => {
    switch (paymethod) {
      case PayMethod.CARD:
        return `카드결제(${kcp.raw_data?.card_name ? kcp.raw_data.card_name : kcp.kp_instrument})`;
      case PayMethod.BANK:
        return `계좌이체(${kcp.bankname})`;
    }
  }, []);

  return (
    <>
      <div className='payment_method_info'>
        <p className='payment_method_title'>결제 수단</p>

        <div className='method_line'>
          <div className='inner_group'>
            <span className='method_date'>{unixToDateTime(kcp.kp_settle_date)}</span>
            <span className='method_company'>아이웨딩</span>
          </div>
          <div className='inner_group'>
            <span className='method_name'>{renderPayType(pay_method, kcp)}</span>
            <span className='method_price'>{showPrice(payment_price)}원</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Payment;

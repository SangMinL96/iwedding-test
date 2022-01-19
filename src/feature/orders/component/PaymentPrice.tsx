import { PayMethod, UserPaymentHist, WeddingOrder } from '@modules/mypage/order/order.interface';
import { copyToClipBoard, getDateTime, showPrice } from '@utils/util';
import router from 'next/router';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

interface PaymentPriceProps {
  order: WeddingOrder;
  iwedding_free_kcp?: UserPaymentHist[];
  direct_free_kcp?: UserPaymentHist;
  onClickBalanceModal: () => void;
}
const PaymentPrice = ({ order, iwedding_free_kcp, direct_free_kcp, onClickBalanceModal }: PaymentPriceProps) => {
  const reducePriceBalancePrice = useMemo(() => {
    if (iwedding_free_kcp?.length) {
      return iwedding_free_kcp.reduce((acc, kcp) => (acc += kcp.payPrice), 0);
    }
  }, [iwedding_free_kcp]);

  const copyAccountNumber = useCallback(
    (bankname: string, accountNumber: string, payPrice: number) => () => {
      copyToClipBoard(`${bankname} ${accountNumber} ${showPrice(payPrice)}원`);

      alert('클립보드에 복사되었습니다.');
    },
    [],
  );
  const needToBalance = useMemo(() => {
    if (order && order.freeOrderPayments?.balance && order.freeOrderPayments.balance.price && order.freeOrderPayments.balance.price > 0) {
      return order.freeOrderPayments.balance.price;
    } else {
      return null;
    }
  }, [order]);
  return (
    <div className='sum-price-box'>
      <p className='final-payment-title'>결제 정보</p>
      {!order.is_free_order && (
        <div className='row-group'>
          <span className='price-title'>총 금액</span>
          <span className='price-num'>{showPrice(order.total_price)}원</span>
        </div>
      )}
      {order.coupon_price > 0 && (
        <div className='row-group'>
          <span className='price-title'>할인 쿠폰 적용</span>
          <span className='price-num sale-price'>-{showPrice(order.coupon_price)}원</span>
        </div>
      )}

      {order.icash_price > 0 && (
        <div className='row-group'>
          <span className='price-title'>아이 캐시 사용</span>
          <span className='price-num sale-price'>-{showPrice(order.icash_price)}원</span>
        </div>
      )}
      <div className='row-group final-group'>
        <span className='final-price-title'>총 결제 금액</span>
        <span className='final-price-num'>{showPrice(order.payment_price)}원</span>
        <div className='price_tool_box'>
          {needToBalance && (
            <div className='row_group'>
              <div className='text_area'>
                <p className='account_text'>
                  <span>잔금 결제</span>
                </p>
                <span className='deposit_date'>{showPrice(needToBalance)}원</span>
              </div>

              <button
                className='tool_btn'
                onClick={() => {
                  router.push(router.asPath + '#ordermodal');
                  onClickBalanceModal();
                }}
              >
                잔금 결제
              </button>
            </div>
          )}

          {order.is_free_order && direct_free_kcp && (
            <div className='row_group'>
              <div className='text_area'>
                <p className='account_text'>
                  <span>업체에서 직접 결제</span>
                </p>
                <span className='deposit_date'>{showPrice(direct_free_kcp.payPrice)}원</span>
              </div>
            </div>
          )}

          {order.is_free_order && reducePriceBalancePrice != null && reducePriceBalancePrice > 0 && (
            <div className='row_group'>
              <div className='text_area'>
                <p className='account_text'>
                  <span>아이웨딩에서 결제</span>
                </p>
                <span className='deposit_date'>{showPrice(reducePriceBalancePrice)}원</span>
              </div>
            </div>
          )}

          {!order.is_free_order && order.order_status == 0 && order.pay_method == PayMethod.BANK && (
            <div className='row_group'>
              <div className='text_area'>
                <p className='account_text'>
                  <span>입금 계좌</span> {order.kcp.bankname} {order.kcp.kp_bank_num}
                </p>
                <span className='deposit_date'>입금기한 {getDateTime(order.kcp.va_date)} 까지</span>
              </div>
              <button
                className='tool_btn'
                onClick={copyAccountNumber(order.kcp.bankname || '', order.kcp.kp_bank_num, order.payment_price)}
              >
                계좌 복사
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentPrice;

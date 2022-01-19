import { useRouter } from 'next/router';
import React, { useCallback } from 'react';

interface Props {
  goodsNo: number;
  isCancelStatus: boolean;
}

const PaymentCancelButton = ({ goodsNo, isCancelStatus }: Props) => {
  const router = useRouter();
  const cancelOrderGoods = useCallback(() => {
    router.push('/order/1/cancel?goodsNo=3');
  }, [goodsNo, isCancelStatus]);

  const revertCancelOrderGoods = useCallback(() => {
    console.log('revert order');
  }, [goodsNo, isCancelStatus]);

  return (
    <div className='payment-cancel-btn'>
      <a onClick={isCancelStatus ? revertCancelOrderGoods : cancelOrderGoods}>{isCancelStatus ? '결제 취소 요청 철회' : '결제 취소'}</a>
    </div>
  );
};

export default PaymentCancelButton;

import { UserPaymentHist } from '@modules/mypage/order/order.interface';
import { getDate, showPrice } from '@utils/util';
import React from 'react';

interface PaymentProps {
  iwedding_free_kcp?: UserPaymentHist[];
  direct_free_kcp?: UserPaymentHist;
}

const FreePaymentMethod = ({ iwedding_free_kcp, direct_free_kcp }: PaymentProps) => {
  const removeHistoryStrInPaymethod = (str: string) => {
    if (str.includes('구매내역')) {
      return str.replace('구매내역', '');
    }
    return str;
  };
  return (
    <>
      <div className='payment_method_info'>
        <p className='payment_method_title'>결제 수단</p>

        {direct_free_kcp && (
          <div className='method_line'>
            <>
              <div className='inner_group'>
                <span className='method_date' style={{ visibility: 'hidden' }}>
                  {getDate(direct_free_kcp.payDate)}
                </span>
                <span className='method_company'>{direct_free_kcp.place}</span>
              </div>
              <div className='inner_group'>
                <span className='method_name'>업체에서 직접 결제</span>
                <span className='method_price'>{showPrice(direct_free_kcp.payPrice)}원</span>
              </div>
            </>
          </div>
        )}

        {iwedding_free_kcp?.map((kcp, index) => (
          <div className='method_line' key={'kcp_index_' + index}>
            <>
              <div className='inner_group'>
                <span className='method_date'>{getDate(kcp.payDate)}</span>
                <span className='method_company'>{kcp.place}</span>
              </div>
              <div className='inner_group'>
                <span className='method_name'>{removeHistoryStrInPaymethod(kcp.payMethod)}</span>
                <span className='method_price'>{showPrice(kcp.payPrice)}원</span>
              </div>
            </>
          </div>
        ))}

        {direct_free_kcp && <></>}

        {/*<p className='remaining_charges'>잔금 100,000원</p>*/}
      </div>
    </>
  );
};

export default FreePaymentMethod;

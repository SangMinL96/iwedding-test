import MyPageLayout from '@components/layout/MyPageLayout';
import { useOrder } from '@modules/mypage/order/order.api';
import { PayUserInfo } from '@modules/mypage/order/order.interface';
import theme from '@styles/theme';
import { getDate } from '@utils/util';
import router, { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import styled from 'styled-components';
import FreePaymentMethod from '../../component/FreePaymentMethod';
import Liner from '../../component/Liner';
import Payment from '../../component/Payment';
import PaymentPrice from '../../component/PaymentPrice';
import ModalBalanceIndex, { PaymentMethod } from '../modal/balance/modal.balance.index';
import ModalOrderQuestionIndex from '../modal/question/modalOrderQuestionIndex';
import OrderDetailItem from './order.detail.item';

const OrderDetailIndex = () => {
  const {
    query: { no, is_free, goods_no },
  } = useRouter();

  const { data: order, isValidating, revalidate } = useOrder(no as string, is_free as string);

  // 미납 잔금 결제 1단계
  const [visibleBalance, setVisibleBalance] = useState<boolean>(false);

  const [visibleTalk, setVisibleTalk] = useState(false);

  //펼쳐진 Goods Id
  const [openGoods, setOpenGoods] = useState(0);

  useEffect(() => {
    const no = Number(goods_no);
    setOpenGoods(isNaN(no) ? 0 : no);
  }, [goods_no]);

  const onPay = (
    userInfo: PayUserInfo,
    payPrice: number,
    selectedPrice: number,
    selectedCash: number,
    selectedPayMethod: PaymentMethod,
    list_code: string,
  ) => {
    if (process.env.NODE_ENV != 'production') {
      list_code = 'fr_list_1621996219';
    }
    if (payPrice < 1000) {
      return alert('1000원 이하로는 결제할 수 없습니다.');
    }

    if (isMobile) {
      const f = document.getElementById('f') as any;
      f.pay_method.value = selectedPayMethod;
      f.price.value = payPrice;
      f.icash.value = selectedCash;
      f.list_code.value = list_code;
      f.submit();
    } else {
      const f = document.getElementById('sm_form') as any;
      f.pay_method.value = selectedPayMethod == PaymentMethod.CARD ? '100000000000' : '001000000000';
      f.good_mny.value = payPrice;
      f.buyr_name.value = userInfo.user_name;
      f.buyr_mail.value = userInfo.user_email;
      f.buyr_tel1.value = userInfo.user_hp;
      f.ordr_idxx.value = userInfo.ordr_idxx;
      f.icash.value = selectedCash;
      f.list_code.value = list_code;
      create_goodInfo(f, userInfo, payPrice);
      jsf__pay(f);
    }
  };

  /* 표준웹 실행 */
  function jsf__pay(form: any) {
    try {
      (global.window as any).KCP_Pay_Execute(form);
    } catch (e) {
      /* IE 에서 결제 정상종료시 throw로 스크립트 종료 */
      alert('에러가 발생했습니다. 페이지를 새로고침후 다시 시도해주세요.');
      console.log(e);
    }
  }

  function create_goodInfo(form: any, userInfo: PayUserInfo, finalPrice: number) {
    const chr30 = String.fromCharCode(30); // ASCII 코드값 30
    const chr31 = String.fromCharCode(31); // ASCII 코드값 31
    const good_info =
      'seq=1' +
      chr31 +
      'ordr_numb=' +
      userInfo?.ordr_idxx +
      '_0001' +
      chr31 +
      'good_name=이용상품 잔금' +
      chr31 +
      'good_cntx=1' +
      chr31 +
      'good_amtx=' +
      finalPrice;
    form.good_info.value = good_info;
  }
  const onModalOpen = () => {
    router.push(router.asPath + '#ordermodal');
    setVisibleTalk(true);
  };

  return (
    <>
      {/* 미납 잔금 결제 모달 */}

      {order && order.freeOrderPayments?.balance?.price > 0 && (
        <ModalBalanceIndex
          visible={visibleBalance}
          onClose={() => setVisibleBalance(false)}
          onConfirm={() => {
            setVisibleBalance(false);
          }}
          isFullSize
          order={order}
          onPay={onPay}
        />
      )}

      {/* 웨딩톡 문의  */}
      {order && (
        <ModalOrderQuestionIndex
          setVisibleTalk={setVisibleTalk}
          visible={visibleTalk}
          onClose={() => setVisibleTalk(false)}
          onConfirm={() => {
            setVisibleTalk(false);
          }}
          isFullSize
          order={order}
        />
      )}

      <MyPageLayout title='결제내역 &gt; 상세 보기'>
        <Container>
          <div className='item_box'>
            <div className='payment-header'>
              {order?.reg_date && <p className='date-text'>{getDate(order?.reg_date)}</p>}
              {/*<OrderStatus is_cancel={order.is_cancel}>{order.order_status_title}</OrderStatus>*/}
            </div>
            {order?.goods.map(good => (
              <OrderDetailItem
                key={good.goods_no}
                orderRegDate={getDate(order?.reg_date)}
                good={good}
                openGoods={good.goods_no == openGoods}
                onOpenGoods={flag => {
                  setOpenGoods(flag ? good.goods_no : 0);
                }}
                revalidate={revalidate}
              />
            ))}
          </div>

          {(order?.kcp || order?.iwedding_free_kcp) && (
            <div className='payment_group_box'>
              <PaymentPrice
                order={order}
                iwedding_free_kcp={order.iwedding_free_kcp}
                direct_free_kcp={order.direct_free_kcp}
                onClickBalanceModal={() => setVisibleBalance(true)}
              />
              <Liner />
              {/*자유계약 결제수단*/}
              {order.is_free_order && order.iwedding_free_kcp && (
                <FreePaymentMethod iwedding_free_kcp={order.iwedding_free_kcp} direct_free_kcp={order.direct_free_kcp} />
              )}

              {/*아이웨딩 결제수단*/}
              {order.order_status !== 0 && !order.is_free_order && (
                <Payment kcp={order.kcp} pay_method={order.pay_method} payment_price={order.payment_price} />
              )}
            </div>
          )}

          <div className='inquiry-btn-box'>
            <button className='inquiry-btn' onClick={onModalOpen}>
              상품 문의하기
            </button>
          </div>

          {/*Mobile PAY*/}
          <form name='f' id='f' method='post' action='https://www.iwedding.co.kr/payment/pay_hub'>
            <input type='hidden' name='pay_method' />
            <input type='hidden' name='price' />
            <input type='hidden' name='icash' />
            <input type='hidden' name='list_code' value={order?.list_code} />
          </form>

          {/*PC PAY*/}
          <form name='sm_form' id='sm_form' method='POST' action='https://www.iwedding.co.kr/payment/pp_ax_hub_from_myorder'>
            <input type='hidden' name='pay_method' id='pay_method' />
            <input type='hidden' name='encoding_trans' value='UTF-8' />
            <input type='hidden' name='PayUrl' />
            <input type='hidden' name='site_logo' value='http://www.ifamily.co.kr/image/iFamily/meta_image.png' />
            <input type='hidden' name='good_name' value='나의 이용서비스 잔금' />
            <input type='hidden' name='good_mny' />
            <input type='hidden' name='icash' />
            <input type='hidden' name='buyr_name' />
            <input type='hidden' name='buyr_mail' />
            <input type='hidden' name='buyr_tel1' />
            <input type='hidden' name='buyr_tel2' value='' />
            <input type='hidden' name='list_val' value='' />
            <input type='hidden' name='list_code' value={order?.list_code} />
            <input type='hidden' name='user_with_id' />
            <input type='hidden' name='req_tx' value='pay' />
            <input type='hidden' name='site_cd' value='A7S6O' />
            <input type='hidden' name='site_key' value='1D60yM9VMbbBKjH6q-vH3xf__' />
            <input type='hidden' name='shop_name' value='IWEDDING' />
            <input type='hidden' name='ordr_idxx' />
            <input type='hidden' name='quotaopt' value='36' />
            <input type='hidden' name='currency' value='WON' />
            <input type='hidden' name='escw_used' value='Y' />
            <input type='hidden' name='pay_mod' id='pay_mod' value='N' />
            <input type='hidden' name='deli_term' value='01' />
            <input type='hidden' name='bask_cntx' value='1' />
            <input type='hidden' name='good_info' value='' />
            <input type='hidden' name='kcp_noint' value='' />
            <input type='hidden' name='kcp_noint_quota' value='CCSH-03' />
            <input type='hidden' name='module_type' value='01' />
            <input type='hidden' name='disp_tax_yn' value='Y' />
            <input type='hidden' name='res_cd' value='' />
            <input type='hidden' name='res_msg' value='' />
            <input type='hidden' name='enc_info' value='' />
            <input type='hidden' name='enc_data' value='' />
            <input type='hidden' name='ret_pay_method' value='' />
            <input type='hidden' name='tran_cd' value='' />
            <input type='hidden' name='use_pay_method' value='' />
            <input type='hidden' name='ordr_chk' value='' />
            <input type='hidden' name='cash_yn' value='' />
            <input type='hidden' name='cash_tr_code' value='' />
            <input type='hidden' name='cash_id_info' value='' />
            <input type='hidden' name='good_expr' value='0' />
          </form>
        </Container>
      </MyPageLayout>
    </>
  );
};

export default OrderDetailIndex;
const Container = styled.div`
  .item_box {
    width: 100%;
    position: relative;
    @media all and (max-width: ${theme.pc}px) {
      padding: 30px 15px 35px 15px;
      background-color: #f7f7f7;
    }

    .payment-header {
      width: 100%;
      height: 43px;
      border-bottom: 2px solid #262626;
      margin-bottom: 20px;
      @media all and (max-width: ${theme.pc}px) {
        width: 100%;
        margin: 0;
        border-bottom: 0;
        height: 35px;
      }
    }

    .date-text {
      display: inline-block;
      font-size: 20px;
      font-weight: 600;
      @media all and (max-width: ${theme.pc}px) {
        font-size: 16px;
      }
    }
  }
  .payment_group_box {
    width: 100%;
    position: relative;
    padding-top: 40px;
    /* @media all and (max-width: ${theme.pc}px) {
        padding: 25px 15px 0 15px;
      } */
    .sum-price-box {
      display: inline-block;
      width: 420px;
      vertical-align: top;
      margin-right: 48px;
      @media all and (max-width: ${theme.pc}px) {
        width: 100%;
        padding: 0 15px;
        > .divide-line {
          width: 100%;
        }
      }
      .final-payment-title {
        display: block;
        font-size: 20px;
        font-weight: 700;
        margin-bottom: 30px;
        @media all and (max-width: ${theme.pc}px) {
          font-size: 16px;
        }
      }
      .row-group {
        width: 100%;
        position: relative;
        font-size: 15px;
        margin-bottom: 8px;
        .price-num,
        .final-price-num {
          display: block;
          position: absolute;
          top: 0;
          right: 0;
        }
        .price-num.sale-price {
          color: ${props => props.theme.red};
        }
      }
      .row-group.final-group {
        margin-top: 35px;
        @media all and (max-width: ${theme.pc}px) {
          margin-top: 30px;
          margin-bottom: 35px;
        }
        .final-price-title,
        .final-price-num {
          font-size: 17px;
          font-weight: 700;
        }
        .price_tool_box {
          width: 100%;
          position: relative;
          border: 1px solid #dfdfdf;
          background-color: #f7f7f7;
          margin-top: 20px;
          .row_group {
            width: 100%;
            /* height: 40px; */
            border-bottom: 1px solid #dfdfdf;
            padding: 10px;
            position: relative;
            .tool_title,
            .tool_price {
              font-size: 14px;
              line-height: 20px;
            }
            .tool_price {
              position: absolute;
              right: 10px;
              top: 10px;
            }
            .tool_btn {
              width: 68px;
              height: 24px;
              background-color: ${props => props.theme.blue};
              color: #fff;
              font-size: 12px;
              font-weight: 500;
              position: absolute;
              top: 50%;
              transform: translateY(-50%);
              right: 10px;
            }
            .text_area {
              .deposit_date {
                margin-top: 3px;
                display: block;
                color: #8c8c8c;
                font-size: 12px;
              }
              .account_text {
                line-height: 20px;
                > span {
                  @media all and (max-width: ${theme.pc}px) {
                    display: block;
                  }
                }
              }
            }
          }
          .row_group.unpaid_box {
            .tool_price {
              position: absolute;
              right: 85px;
              top: 10px;
              color: ${props => props.theme.blue};
            }
          }
          &:last-child {
            border-bottom: 0;
          }
        }
      }
    }
    .payment_method_info {
      display: inline-block;
      width: 320px;
      vertical-align: top;
      @media all and (max-width: ${theme.pc}px) {
        width: 100%;
        margin-top: 30px;
        padding: 0 15px;
      }
      .payment_method_title {
        display: block;
        font-size: 20px;
        font-weight: 700;
        margin-bottom: 30px;
        @media all and (max-width: ${theme.pc}px) {
          font-size: 16px;
        }
      }
      .remaining_charges {
        font-size: 15px;
        font-weight: 500;
        margin-top: 20px;
        text-align: right;
      }
      .method_line {
        width: 100%;
        position: relative;
        padding: 14px 0 16px 0;
        border-bottom: 1px solid #dfdfdf;
        @media all and (max-width: ${theme.pc}px) {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: center;
        }
        &:nth-child(2) {
          padding: 15px 0 15px 0;
          border-top: 1px solid #dfdfdf;
        }
        .inner_group {
          width: 100%;
          position: relative;
          margin-bottom: 4px;
          padding: 0 3px;
          > span {
            display: block;
            font-size: 15px;
            line-height: 22px;
          }
          .method_company,
          .method_price {
            position: absolute;
            top: 0;
            right: 3px;
          }
          .method_name {
            color: #8c8c8c;
          }
        }
        .method-title {
          color: #8c8c8c;
          display: inline-block;
          vertical-align: middle;
        }
        .method-text {
          display: inline-block;
          font-size: 15px;
          > span {
            vertical-align: middle;
          }
        }
        .copy-btn {
          width: 44px;
          height: 24px;
          color: #fff;
          font-size: 12px;
          margin-left: 10px;
          ${props => props.theme.resetBtnStyle}
          background-color: ${props => props.theme.blue}
        }
      }
    }
  }
  .inquiry-btn-box {
    width: 100%;
    text-align: center;
    margin: 40px 0;
    .inquiry-btn {
      width: 350px;
      height: 50px;
      font-size: 16px;
      ${props => props.theme.resetBtnStyle};
      background-color: #fff;
      border: 1px solid #dfdfdf;
      color: #262626;
      @media all and (max-width: ${theme.pc}px) {
        width: 92%;
      }
    }
  }
  .divide-line {
    width: 100%;
    height: 1px;
    background-color: #d8d8d8;
    margin-top: 33px;
    @media all and (max-width: ${theme.pc}px) {
      width: 92%;
      margin: 6.6vw auto 0 auto;
    }
  }
  .lg-divide-line {
    display: none;
    width: 100%;
    height: 8px;
    background-color: #e9ecef;
    @media all and (max-width: ${theme.pc}px) {
      display: block;
    }
  }
`;

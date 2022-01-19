import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import BalanceStepHeader from './component/BalanceStepHeader';
import BalanceProductItem from './component/BalanceProductItem';
import BalanceComplete from './component/BalanceComplete';
import { UserApi } from '@modules/user/user.api';
import axios from 'axios';
import theme from '@styles/theme';
import { CommonModalProps } from '@modules/CommonInterface';
import { showPrice } from '@utils/util';
import { PayUserInfo, WeddingOrder } from '@modules/mypage/order/order.interface';
import useSWR from 'swr';
import { InputWithClear } from '@components/core/inputs';
import AbstractModal from '@components/core/modal/AbstractModal/AbstractModal';
import router from 'next/router';

interface AvailableProps extends CommonModalProps {
  onConfirm: () => void;
  order: WeddingOrder;
  onPay: (
    userInfo: PayUserInfo,
    payPrice: number,
    selectedPrice: number,
    selectedCash: number,
    selectedPayMethod: PaymentMethod,
    list_code: string,
  ) => void;
}

enum BalanceStep {
  PAY = 1,
  COMPLETE = 2,
}

export enum PaymentMethod {
  CARD = 'CARD',
  ACCOUNT = 'VCNT',
}

const ModalBalanceIndex = ({ visible, onClose, onConfirm, order, onPay }: AvailableProps) => {
  const [currentStep, setCurrentStep] = useState(BalanceStep.PAY);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod>(PaymentMethod.CARD);
  const { data } = useSWR<any>('icash', () => UserApi.getCash());
  const [userInfo, setUserInfo] = useState<PayUserInfo>();
  useEffect(() => {
    axios
      .get('https://www.iwedding.co.kr/payment/get_user_info')
      .then(r => {
        console.log(r);
        if (!r.data.result) {
          return alert('로그인 이후 이용가능합니다.');
        }
        const data = r.data.data as PayUserInfo;
        setUserInfo(data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  // useEffect(() => {
  //   kcpExecute.current = (window as any).KCP_Pay_Execute;
  // }, [window]);
  const [selectedPrice, setSelectedPrice] = useState(order.freeOrderPayments.balance.price || 0);
  const [selectedCash, setSelectedCash] = useState(0);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  const canNext = useMemo(() => {
    if (currentStep == BalanceStep.COMPLETE) return true;
    return selectedPaymentMethod && selectedPrice > 0 && selectedPrice >= selectedCash;
  }, [selectedPaymentMethod, selectedPrice, selectedCash, currentStep]);

  const cancel = () => {
    clear();
    onClose();
  };

  const clear = () => {
    setCurrentStep(BalanceStep.PAY);
    setSelectedPaymentMethod(PaymentMethod.CARD);
    setSelectedPrice(0);
    setSelectedCash(0);
  };

  const pasteAllBalancePrice = () => {
    setSelectedPrice(order.freeOrderPayments.balance.price);
  };

  const pasterAllCache = () => {
    if (data?.cash) {
      setSelectedCash(data.cash);
    }
  };

  const finalPrice = useMemo(() => {
    const price = selectedPrice - selectedCash;
    if (price < 0) {
      return 0;
    }

    return price;
  }, [selectedPrice, selectedCash]);

  const changePaymentMethod = useCallback(
    (method: PaymentMethod) => () => {
      setSelectedPaymentMethod(method);
    },
    [],
  );

  const setMyCash = (v: string) => {
    const icash = Number(v);
    if (icash > selectedPrice) {
      alert('아이캐쉬를 확인해주세요');
      return;
    }

    setSelectedCash(icash);
  };

  const onChangeBalanceText = (v: string) => {
    setSelectedPrice(Number(v));
  };

  return (
    <AbstractModal
      noPadding
      visible={visible}
      onClose={cancel}
      title='잔금 결제'
      isFullSize
      stepFooter
      cancelText='취소'
      confirmText={currentStep === BalanceStep.PAY ? '결제' : '완료'}
      onConfirm={() => {
        if (userInfo) {
          router.back();
          onPay(userInfo, finalPrice, selectedPrice, selectedCash, selectedPaymentMethod, order.list_code);
        }
      }}
      canConfirm={canNext}
      isIcash
    >
      <Container>
        <BalanceStepHeader currentStep={currentStep} />
        <div className='lg_divide_line' />

        {currentStep == BalanceStep.COMPLETE && <BalanceComplete order={order} />}

        {currentStep == BalanceStep.PAY && (
          <div className='balance_container'>
            <div className='balance_header'>
              <p>결제 금액과 결제 수단을 선택하세요.</p>
            </div>

            <div className='item_area'>
              <div className='info-item-box'>
                <div className='info-box'>
                  <a>
                    {order.goods.length && <BalanceProductItem goods={order.goods[0]} key={order.goods[0].goods_no} />}
                    {/*{order.goods.map(good => (*/}
                    {/*  <BalanceProductItem goods={good} key={good.goods_no} />*/}
                    {/*))}*/}
                  </a>
                </div>
              </div>
            </div>

            <div className='balance_box'>
              <span className='balance_title'>잔금</span>
              <span className='balance_num'>{showPrice(order.freeOrderPayments.balance.price)}원</span>
            </div>

            <form className='balance_form' onSubmit={handleSubmit}>
              <div className='balance_form_item'>
                <p className='balance_form_title'>결제 금액</p>
                <div className='balance_input_box'>
                  <InputWithClear
                    onChangeText={onChangeBalanceText}
                    placeHolder='0 원'
                    defaultText={selectedPrice.toString()}
                    clearComplete={() => setSelectedPrice(0)}
                    canUpdate={inputVal => !isNaN(inputVal) && inputVal <= order.freeOrderPayments.balance.price}
                  />
                  <button className='balance_btn' onClick={pasteAllBalancePrice}>
                    잔금 전액
                  </button>
                </div>
              </div>

              {data?.cash ? (
                <div className='balance_form_item'>
                  <div className='balance_form_title'>
                    아이캐시 <span className='cash_text'>{showPrice(data?.cash ?? 0)}캐시</span>
                  </div>
                  <div className='balance_input_box'>
                    <InputWithClear
                      onChangeText={v => setMyCash(v)}
                      placeHolder='0 캐시'
                      clearComplete={() => setSelectedCash(0)}
                      defaultText={selectedCash.toString()}
                      canUpdate={inputVal => !isNaN(inputVal) && inputVal <= data.cash}
                    />
                    <button className='balance_btn' onClick={pasterAllCache}>
                      모두 사용
                    </button>
                  </div>
                </div>
              ) : null}

              <div className='balance_form_item'>
                <p className='balance_form_title'>결제 수단</p>
                <div className='method_radio_box'>
                  <div className='method_item'>
                    <div className='method_btn'>
                      <input
                        type='radio'
                        name='payment_method'
                        id='creditCard'
                        onChange={changePaymentMethod(PaymentMethod.CARD)}
                        defaultChecked
                      />
                      <label htmlFor='creditCard'>신용카드</label>
                    </div>
                  </div>
                  <div className='method_item'>
                    <div className='method_btn'>
                      <input
                        type='radio'
                        name='payment_method'
                        id='accountTransfer'
                        onChange={changePaymentMethod(PaymentMethod.ACCOUNT)}
                      />
                      <label htmlFor='accountTransfer'>계좌이체</label>
                    </div>
                  </div>
                </div>
              </div>
            </form>

            <div className='final_payment_price'>
              <span className='price_title'>최종 결제 금액</span>
              <span className='price_num'>{showPrice(finalPrice)}원</span>
            </div>
          </div>
        )}
      </Container>
    </AbstractModal>
  );
};
export default ModalBalanceIndex;
const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  background-color: #fff;

  .step_header {
    width: 100%;
    position: relative;
    padding: 27px 0;
    border-top: 1px solid #dfdfdf;
    @media all and (max-width: ${theme.pc}px) {
      border-top: 0;
    }

    .step_group {
      width: 210px;
      height: 46px;
      margin: 0 auto;

      > div {
        display: inline-block;
      }

      .step_box {
        text-align: center;

        .step_text {
          display: block;
          font-size: 13px;
          margin-top: 5px;
          color: #8c8c8c;
        }
      }

      .step_box.on {
        .step_text {
          font-weight: 700;
          color: #262626;
        }
      }

      .three_dots {
        vertical-align: top;
        margin: 0 10px;
      }
    }
  }

  .lg_divide_line {
    width: 100%;
    height: 8px;
    background-color: #e9ecef;
  }

  .balance_container {
    width: 100%;
    position: relative;
    background-color: #fff;
    padding: 0 30px 10px 30px;
    @media all and (max-width: ${theme.pc}px) {
      padding: 0 15px 10px 15px;
    }

    .balance_header {
      width: 100%;
      padding: 30px 0;
      font-size: 16px;
      font-weight: 700;
      border-bottom: 1px solid #dfdfdf;
    }

    .item_area {
      width: 100%;
      padding: 15px 0;

      .info-item-box {
        width: 100%;
        position: relative;

        .info-box {
          width: 100%;
          position: relative;

          > a {
            display: block;
            position: relative;
            width: 100%;
            height: 100%;
            @media all and (max-width: ${theme.pc}px) {
              display: flex;
              flex-wrap: wrap;
            }

            .top_info_box {
              width: 100%;
              display: inline-block;
              @media all and (max-width: ${theme.pc}px) {
                display: flex;
              }

              .info-img {
                display: inline-block;
                width: 75px;
                height: 75px;
                overflow: hidden;
                > span {
                  position: relative;
                  display: block;
                  width: 100%;
                  height: 100%;

                  > img {
                    height: 100%;
                    position: absolute;
                    left: 50%;
                    transform: translateX(-50%);
                  }
                }
              }

              .info-text-box {
                display: inline-block;
                width: calc(100% - 90px);
                vertical-align: top;
                padding-top: 2px;
                margin-left: 15px;
                @media all and (max-width: ${theme.pc}px) {
                  padding-top: 5px;
                  margin-left: 12px;
                }

                .category-text {
                  display: block;
                  font-size: 14px;
                  font-weight: 300;
                  color: ${props => props.theme.gray};
                  margin-bottom: 8px;
                  @media all and (max-width: ${theme.pc}px) {
                    font-size: 13px;
                    margin-bottom: 3px;
                  }
                }

                .title-text {
                  color: #262626;
                  font-size: 15px;
                  font-weight: 500;
                  line-height: 22px;
                  display: block;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  overflow: hidden;
                  margin-bottom: 10px;
                  @media all and (max-width: ${theme.pc}px) {
                    margin-bottom: 12px;
                  }
                }

                .price-num {
                  color: #262626;
                  display: block;
                  font-size: 14px;
                }
              }
            }
          }
        }
      }
    }

    .balance_box {
      width: 100%;
      border: 1px solid #dbe8ee;
      background-color: #f0faff;
      padding: 15px 12px;
      position: relative;
      margin-bottom: 20px;

      > span {
        font-size: 15px;
        font-weight: 700;
        line-height: 22px;
        color: ${props => props.theme.blue};
      }

      .balance_num {
        position: absolute;
        right: 12px;
      }
    }

    .balance_form {
      width: 100%;
      padding-bottom: 8px;
      border-bottom: 1px solid #dfdfdf;

      .balance_form_item {
        width: 100%;
        margin-bottom: 22px;

        .balance_form_title {
          display: block;
          position: relative;
          font-size: 14px;
          font-weight: 500;

          .cash_text {
            font-size: 15px;
            font-weight: 500;
            color: #fd4381;
            position: absolute;
            top: -2px;
            right: 0;
          }
        }

        .balance_input_box {
          width: 100%;
          height: 50px;
          position: relative;
          margin-top: 14px;
          /* 아래 > div 는 input 컴포넌트 */

          > div {
            top: 0;
            left: 0;

            .input_box {
              width: calc(100% - 90px);

              .title-input-box {
                > input {
                  width: calc(100% - 15px);
                  text-align: right;
                }
              }

              .title-input-box.on {
                > input {
                  width: calc(100% - 33px);
                  padding-right: 10px;
                }
              }
            }
          }

          .balance_btn {
            ${props => props.theme.resetBtnStyle};
            font-family: 'Noto Sans KR', sans-serif;
            width: 90px;
            height: 50px;
            border: 1px solid #dfdfdf;
            border-left: 0;
            position: absolute;
            top: 0;
            right: 0;
            font-size: 15px;
            color: #262626;
          }
        }

        .method_radio_box {
          width: 100%;
          display: inline-flex;
          justify-content: space-between;
          margin-top: 14px;

          .method_item {
            width: 49.275%;
            display: inline-flex;
            align-items: center;

            .method_btn {
              width: 100%;
              height: 50px;
              display: inline-flex;

              input[type='radio'] {
                display: none;
              }

              input[type='radio'] + label {
                width: 100%;
                height: 50px;
                border: 1px solid #dfdfdf;
                text-align: center;
                cursor: pointer;
                font-size: 16px;
                line-height: 48px;
                vertical-align: middle;
              }

              input[type='radio']:checked + label {
                border: 0;
                color: #fff;
                background-color: #262626;
              }
            }
          }
        }
      }
    }

    .final_payment_price {
      width: 100%;
      position: relative;
      margin-top: 20px;

      > span {
        font-size: 16px;
        font-weight: 700;
      }

      .price_num {
        position: absolute;
        right: 0;
        top: 0;
      }
    }
  }
`;

import { WeddingOrder } from '@modules/mypage/order/order.interface';
import theme from '@styles/theme';
import { getDate, showPrice } from '@utils/util';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo } from 'react';
import styled from 'styled-components';
import OrderListGoods from './order.list.goods';

interface OrderItemProps {
  order: WeddingOrder;
}

const OrderListItem = ({ order }: OrderItemProps) => {
  const router = useRouter();
  const goToDetail = (order: WeddingOrder) => {
    router.push(`/order/${order.order_no}?is_free=${order.is_free_order ? 'true' : 'false'}`);
  };

  const needToBalance = useMemo(() => {
    if (order && order.freeOrderPayments?.balance && order.freeOrderPayments.balance.price && order.freeOrderPayments.balance.price > 0) {
      return order.freeOrderPayments.balance.price;
    } else {
      return null;
    }
  }, [order]);
  return (
    <PaymentItemList>
      <div className='payment-header'>
        <p className='date-text'>{getDate(order.reg_date)}</p>
        <OrderStatus is_cancel={order.is_cancel}>{order.order_status_title}</OrderStatus>
        {/* TO DO : 결제내역 상세로 이동 */}
        <a className='detail-link' onClick={() => goToDetail(order)}>
          결제 내역 상세 &gt;
        </a>
      </div>

      <div className='payment-item-box'>
        {/*상품 상세 */}
        {order &&
          order.goods.map(good => (
            <div key={'goods_no' + good.goods_no}>
              <OrderListGoods content={good} freeOrder={order.is_free_order} order={order} />
            </div>
          ))}

        <div className='sum-price-box'>
          <div className='row-group final-group'>
            {needToBalance && (
              <div className='price_group unpaid_price'>
                <span className='final-price-title'>미납 잔금</span>
                <span className='final-price-num'>{showPrice(needToBalance)}원</span>
              </div>
            )}
            <div className='price_group'>
              <span className='final-price-title'>총 결제 금액</span>
              <span className='final-price-num'>{showPrice(order.payment_price)}원</span>
            </div>
          </div>
        </div>
        <div className='lg-divide-line' />
      </div>
    </PaymentItemList>
  );
};

export default OrderListItem;
const PaymentItemList = styled.div`
  position: relative;
  width: 100%;
  &:not(:first-child) {
    margin-top: 42px;
  }
  .payment-header {
    width: 100%;
    height: 43px;
    border-bottom: 2px solid #262626;
    margin-bottom: 20px;
    @media all and (max-width: ${theme.pc}px) {
      width: 92%;
      margin: 0 auto 20px auto;
    }
    .red-text {
      color: ${() => theme.red};
    }

    .blue-text {
    }
    .date-text {
      display: inline-block;
      font-size: 20px;
      font-weight: 600;
      @media all and (max-width: ${theme.pc}px) {
        font-size: 16px;
      }
    }
    .detail-link {
      display: block;
      font-size: 14px;
      font-weight: 300;
      color: #262626;
      float: right;
      cursor: pointer;
    }
    &::after {
      ${props => props.theme.clearFloat}
    }
  }
  .payment-item-box {
    width: 100%;
    > div {
      display: block;
      .payment-item {
        width: 100%;
        /* height: 75px; */
        position: relative;
        @media all and (max-width: ${theme.pc}px) {
          padding: 0 4vw;
        }
        .status-text {
          display: block;
          font-size: 17px;
          font-weight: 500;
          color: ${props => props.theme.blue};
          margin-bottom: 13px;
        }
        .status-text.done {
          color: #bebebe;
        }
        .info-box {
          width: 100%;
          position: relative;
          > a,
          > label {
            position: relative;
            display: block;
            width: 100%;
            height: 100%;
            margin-bottom: 20px;
            padding-right: 10px;
            @media all and (max-width: ${theme.pc}px) {
              display: flex;
              flex-wrap: wrap;
              padding-right: 0;
            }
            .info-img {
              display: inline-block;
              width: 75px;
              height: 75px;
              > span {
                position: relative;
                display: block;
                width: 100%;
                height: 100%;
                > img {
                  width: 100%;
                  height: 100%;
                  position: absolute;
                  background-size: contain;
                  left: 50%;
                  transform: translateX(-50%);
                }
              }
            }
            .group_box {
              position: relative;
              width: calc(100% - 75px);
              display: inline-block;
              vertical-align: top;
              @media all and (max-width: ${theme.pc}px) {
                display: flex;
                flex-wrap: wrap;
                padding-right: 0;
              }
              .info-text-box {
                display: inline-block;
                width: 390px;
                vertical-align: top;
                padding-top: 15px;
                margin-left: 15px;
                @media all and (max-width: ${theme.pc}px) {
                  order: 1;
                  width: 100%;
                  padding-top: 2px;
                  margin-bottom: 13px;
                }
                .category-text {
                  display: block;
                  font-size: 14px;
                  font-weight: 300;
                  color: ${props => props.theme.gray};
                  margin-bottom: 10px;
                  @media all and (max-width: ${theme.pc}px) {
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
                  @media all and (max-width: ${theme.pc}px) {
                    width: calc(100% - 30px);
                  }
                }
              }
              .status_box {
                display: inline-block;
                position: relative;
                vertical-align: top;
                margin-left: 40px;
                width: 100px;
                text-align: center;
                @media all and (max-width: ${theme.pc}px) {
                  order: 3;
                  margin-left: 0;
                  position: absolute;
                  right: 0;
                  bottom: 0;
                  text-align: right;
                }
                .status_text {
                  font-size: 14px;
                  font-weight: 700;
                  padding-top: 30px;
                  @media all and (max-width: ${theme.pc}px) {
                    padding-top: 0;
                  }
                }
                .blue_text {
                  color: ${props => props.theme.blue};
                }
                .red_text {
                  color: ${props => props.theme.red};
                }
              }
              .price_box {
                display: inline-block;
                vertical-align: top;
                text-align: right;
                position: absolute;
                top: 50%;
                right: 0;
                transform: translateY(-50%);
                padding-top: 12px;
                @media all and (max-width: ${theme.pc}px) {
                  order: 2;
                  top: 0;
                  right: unset;
                  position: relative;
                  transform: unset;
                  padding-left: 15px;
                  padding-top: 0;
                }
                .price-num {
                  color: #262626;
                  vertical-align: top;
                  font-size: 14px;
                }
              }
            }
            .row-group {
              display: inline-block;
              position: relative;
              width: 100%;
              height: 100%;

              .final-price-num {
                display: block;
                position: absolute;
                top: 0;
                right: 0;
              }
              .price-num.sale-price {
                color: ${props => props.theme.red};
              }
              .price-num.icash-price {
                color: ${props => props.theme.blue};
              }
            }
          }
        }
        .divide-line {
          width: 100%;
          height: 1px;
          background-color: #d8d8d8;
          margin: 20px 0;
          display: block;
          @media all and (max-width: ${theme.pc}px) {
            width: 100%;
            margin: 20px 0;
          }
        }
      }
    }
    .sum-price-box {
      width: 100%;
      /* height: 75px; */
      padding: 4px 0 20px 0;
      position: relative;
      @media all and (max-width: ${theme.pc}px) {
        /* height: 60px; */
        margin-top: -5px;
      }
      .row-group {
        &:not(:first-child) {
          margin-top: 12px;
        }
      }
      .row-group.final-group {
        width: 100%;
        position: relative;
        @media all and (max-width: ${theme.pc}px) {
          padding: 0 4vw;
        }
        .price_group {
          position: relative;
          > span {
            font-size: 15px;
            font-weight: 500;
          }
          .final-price-num {
            display: block;
            position: absolute;
            top: 0;
            right: 0;
            @media all and (max-width: ${theme.pc}px) {
              font-size: 15px;
            }
          }
        }
        .price_group.unpaid_price {
          margin-bottom: 8px;
          color: ${props => props.theme.blue};
        }
      }
    }
    .lg-divide-line {
      width: 100%;
      height: 8px;
      background-color: #e9ecef;
      margin-top: 15px;
      @media all and (max-width: ${theme.pc}px) {
        margin-top: 20px;
      }
    }
  }
`;

const OrderStatus = styled.span<{ is_cancel: boolean }>`
  margin-left: 16px;
  font-size: 14px;
  font-weight: 700;
  padding-top: 30px;
  @media all and (max-width: ${theme.pc}px) {
    padding-top: 0;
  }
  color: ${props => (props.is_cancel ? theme.red : theme.blue)};
`;

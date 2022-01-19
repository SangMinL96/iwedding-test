import React from 'react';
import OrderModalProductItem from '../../order.detail.modal.product.item';
import styled from 'styled-components';
import theme from '@styles/theme';
import { WeddingOrder } from '@modules/mypage/order/order.interface';

interface Props {
  order: WeddingOrder;
}

const BalanceComplete = ({ order }: Props) => {
  return (
    <BalanceContainer>
      <div className='balance_container'>
        <div className='balance_header'>
          <p>결제가 완료 되었습니다.</p>
        </div>

        <div className='item_area'>
          <div className='info-item-box'>
            <div className='info-box'>
              <a>
                {order.goods.map(good => (
                  <OrderModalProductItem goods={good} key={good.goods_no} />
                ))}
              </a>
            </div>
          </div>
        </div>

        <div className='balance_result_box'>
          <div className='row_group'>
            <span className='result_title'>결제 일시</span>
            <span className='result_content'>2020.11.19 12:33</span>
          </div>
          <div className='row_group'>
            <span className='result_title'>결제 수단</span>
            <span className='result_content'>카드결제(국민 7167)</span>
          </div>
          <div className='row_group'>
            <span className='result_title'>납부 금액</span>
            <span className='result_content'>100,000원</span>
          </div>
          <div className='row_group'>
            <span className='result_title'>아이캐시 차감</span>
            <span className='result_content'>-20,000원</span>
          </div>
          <div className='row_group'>
            <span className='result_title'>최종 결제 금액</span>
            <span className='result_content'>80,000원</span>
          </div>
        </div>
      </div>
    </BalanceContainer>
  );
};

export default BalanceComplete;
const BalanceContainer = styled.div`
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

    .balance_result_box {
      width: 100%;
      padding: 20px 0;
      border: 1px solid #dfdfdf;
      border-left: 0;
      border-right: 0;
      .row_group {
        width: 100%;
        position: relative;
        margin-bottom: 7px;
        &:last-child {
          margin-bottom: 0;
        }
        > span {
          font-size: 15px;
        }
        .result_content {
          position: absolute;
          top: 0;
          right: 0;
        }
      }
    }

    .extra_payment_box {
      width: 100%;
      height: 70px;
      margin-top: 20px;
      border: 1px solid #dbe8ee;
      background-color: #f0faff;
      padding: 15px;
      position: relative;
      > p {
        font-size: 15px;
        color: ${props => props.theme.blue};
        line-height: 20px;
        > span {
          font-weight: 700;
        }
      }
      .extra_payment_btn {
        ${props => props.theme.resetBtnStyle};
        width: 86px;
        height: 40px;
        background-color: ${props => props.theme.blue};
        color: #fff;
        font-weight: 500;
        font-size: 14px;
        position: absolute;
        top: 15px;
        right: 14px;
      }
    }
  }
`;

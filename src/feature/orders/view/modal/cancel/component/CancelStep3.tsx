import React from 'react';
import styled from 'styled-components';
import { Reason } from './CancelStep2';
import CancelProductItem from './CancelProductItem';
import { WeddingOrderGoods } from '@modules/mypage/order/order.interface';
import theme from '@styles/theme';
import { showPrice } from '@utils/util';

interface CancelStep3Props {
  selectedReason?: Reason;
  goods: WeddingOrderGoods;
}

const CancelStep3 = ({ selectedReason, goods }: CancelStep3Props) => {
  return (
    <Container>
      <div className='cancel_container'>
        <div className='cancel_header'>
          <p>취소 요청 사항을 확인해 주세요.</p>
        </div>

        <div className='item_area'>
          <div className='info-item-box'>
            <div className='info-box'>
              <a>
                <CancelProductItem goods={goods} />
                <div className='bottom_info_box'>
                  <div className='row_group'>
                    <span className='info_title'>최종 결제 금액</span>
                    <span className='info_content'>{showPrice(goods.goods_price)}원</span>
                  </div>
                  <p className='final_cancel_reason'>취소 요청 사유 : {selectedReason?.str}</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default CancelStep3;
const Container = styled.div`
  .cancel_container {
    width: 100%;
    position: relative;
    background-color: #fff;
    padding: 0 30px 10px 30px;
    @media all and (max-width: ${theme.pc}px) {
      padding: 0 15px 10px 15px;
    }
    .cancel_header {
      width: 100%;
      padding: 30px 0;
      font-size: 16px;
      font-weight: 700;
      border-bottom: 1px solid #dfdfdf;
      > .description {
        margin-top: 10px;
        display: block;
        font-size: 13px;
        color: #8c8c8c;
        line-height: 19px;
        font-weight: 400;
      }
    }

    .item_area {
      width: 100%;
      padding: 20px 0;
      border-bottom: 1px solid #dfdfdf;
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
                padding-top: 15px;
                margin-right: 15px;
                @media all and (max-width: ${theme.pc}px) {
                  margin-bottom: 13px;
                  margin-right: 12px;
                }
                .category-text {
                  display: block;
                  font-size: 14px;
                  font-weight: 300;
                  color: ${props => props.theme.gray};
                  margin-bottom: 3px;
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
                  margin-bottom: 8px;
                }
              }
            }
            .bottom_info_box {
              width: 100%;
              display: inline-block;
              margin-top: 20px;
              @media all and (max-width: ${theme.pc}px) {
                display: flex;
                flex-wrap: wrap;
              }
              .row_group {
                width: 100%;
                position: relative;
                > span {
                  color: #262626;
                  display: block;
                  font-size: 15px;
                }
                .info_content {
                  position: absolute;
                  top: 0;
                  right: 0;
                  font-weight: 700;
                }
              }
              .final_cancel_reason {
                font-size: 15px;
                font-weight: 500;
                line-height: 22px;
                margin-top: 20px;
                color: ${props => props.theme.red};
              }
            }
          }
        }
      }
    }
  }
`;

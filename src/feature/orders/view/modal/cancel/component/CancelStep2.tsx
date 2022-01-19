import React, { useCallback } from 'react';
import styled from 'styled-components';
import { WeddingOrderGoods } from '@modules/mypage/order/order.interface';
import CancelProductItem from './CancelProductItem';
import theme from '@styles/theme';
import { showPrice } from '@utils/util';
import { CommonRadioBox } from '@components/core/checkboxes';

export interface Reason {
  str: string;
  id: number;
}

interface CancelStep2Interface {
  goods: WeddingOrderGoods;
  contractContent?: string;
  canNext: (reason: Reason) => void;
  selectedReason?: Reason;
}

enum CancelReason {
  CHANGE_MIND,
  OTHER_PRODUCT,
  DISABLE_SCHEDULE,
  COMPLAIN,
  IWD_COMPLAIN,
  ETC_CANCEL,
}

const cancelReasonData: Reason[] = [
  { str: '단순 변심', id: CancelReason.CHANGE_MIND },
  { str: '동일 업체의 다른 상품 이용', id: CancelReason.OTHER_PRODUCT },
  { str: '희망하는 일정 이용불가', id: CancelReason.DISABLE_SCHEDULE },
  { str: '상품 제공 업체 서비스 불만족', id: CancelReason.COMPLAIN },
  { str: ' 아이웨딩 서비스 불만족', id: CancelReason.IWD_COMPLAIN },
  { str: '행사 무기한 연기 or 취소', id: CancelReason.ETC_CANCEL },
];

const CancelStep2 = ({ goods, selectedReason, canNext }: CancelStep2Interface) => {
  const onSelectCancelReason = useCallback(
    (id: string) => {
      const reason = cancelReasonData.find(d => d.id === Number(id));
      if (reason) canNext(reason);
    },
    [canNext],
  );

  return (
    <>
      <Container>
        <div className='cancel_container'>
          <div className='cancel_header'>
            <p>취소 사유를 선택해 주세요.</p>
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
                  </div>
                </a>
              </div>
            </div>

            <div className='cancel_reason_box'>
              <p className='reason_title'>취소 사유</p>
              <div className='reason_radio_form'>
                {cancelReasonData.map((data, index) => (
                  <div className='reason_item' key={index}>
                    <CommonRadioBox
                      name={'cancel_reason'}
                      id={data.id.toString()}
                      onChange={onSelectCancelReason}
                      defaultCheck={selectedReason?.id == data.id}
                    />
                    <label className='radio_label' htmlFor={data.id.toString()}>
                      {data.str}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default CancelStep2;
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
      padding: 15px 0 20px 0;
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
            }
          }
        }
      }

      .cancel_reason_box {
        width: 100%;
        background-color: #fbfbfb;
        border: 1px solid #dfdfdf;
        margin-top: 20px;
        .reason_title {
          display: block;
          width: 100%;
          font-size: 16px;
          line-height: 24px;
          font-weight: 700;
          padding: 13px 0 13px 20px;
          border-bottom: 1px solid #dfdfdf;
        }
        .reason_radio_form {
          padding: 17px 0 0 20px;
          .reason_item {
            margin-bottom: 15px;
            cursor: pointer;
            > div {
              display: inline-block;
              cursor: pointer;
            }
            .radio_label {
              display: inline-block;
              font-size: 15px;
              vertical-align: top;
              margin-left: 10px;
              cursor: pointer;
            }
          }
        }
      }
    }
  }
`;

import React, { useState } from 'react';
import styled from 'styled-components';

import ModalExtraTerms from '../modal/modal.extra.terms';
import ModalCancelIndex from '../modal/cancel/modal.cancel.index';
import { clickOderGoodsDetail, clickOrderGoodsEntRule } from '@modules/user/UserLogAPI';
import theme from '@styles/theme';
import router, { useRouter } from 'next/router';
import { goToProductPage, showPrice } from '@utils/util';
import IconBoldDownArrow from '@svgs/icon_bold_down_arrow';
import IconLowerPointer from '@svgs/icon_lower_pointer';
import { useOrder } from '@modules/mypage/order/order.api';
import { WeddingOrderGoods } from '@modules/mypage/order/order.interface';
import Image from 'next/image';

interface Props {
  orderRegDate: string;
  good: WeddingOrderGoods;
  openGoods: boolean;
  onOpenGoods: (flag: boolean) => void;
  revalidate: any;
}

const OrderDetailItem = ({ openGoods, good, onOpenGoods, revalidate }: Props) => {
  const {
    query: { no, is_free },
  } = useRouter();

  const { data: order } = useOrder(no as string, is_free as string);
  const {
    goods_price,
    option_price,
    real_coupon_price,
    product_cnt,
    product_price,
    decodedProduct: { name, category: enterprise_category, ent_name, thumb, ent_code },
    selectedOptions,
    selectedCoupons,
    metadata,
    order_status_title,
    is_cancel,
  } = good;
  console.log(order);
  // 추가비용 및 위약금 규정 모달

  const [visibleTerms, setVisibleTerms] = useState(false);

  // 진행 단계 확인 모달
  const [visibleProgress, setVisibleProgress] = useState(false);

  // 결제 취소 모달
  const [visibleCancel, setVisibleCancel] = useState(false);

  // visible
  const onClickModal = (modal: string) => {
    router.push(router.asPath + '#ordermodal');
    if (modal === 'terms') {
      setVisibleTerms(true);
    } else if (modal === 'progress') {
      setVisibleProgress(true);
    }
  };

  const goProduct = (ent_code: string, product_no: number) => (e: React.MouseEvent<any>) => {
    if (is_free != 'true') {
      e.stopPropagation();
      goToProductPage(ent_code, product_no);
    }
  };

  const openGoodsFunc = () => {
    if (!openGoods)
      if (order && good)
        clickOderGoodsDetail({ order_no: order?.order_no, goods_no: good.goods_no, is_free: order.is_free_order })
          .then(r => {
            console.log(r);
          })
          .catch(err => {
            console.log(err);
          });
    onOpenGoods(!openGoods);
  };
  return (
    <>
      {/* 진행 단계 확인 모달 */}
      {/*{visibleProgress && (*/}
      {/*  <ModalProgressCheck*/}
      {/*    visible={visibleProgress}*/}
      {/*    onClose={() => setVisibleProgress(false)}*/}
      {/*    onConfirm={() => setVisibleProgress}*/}
      {/*    oneButtonFooter={true}*/}
      {/*    isFullSize={true}*/}
      {/*  />*/}
      {/*)}*/}

      {/* 위약금 규정 모달 */}
      {good.enterprise_rule && (
        <ModalExtraTerms
          visible={visibleTerms}
          onClose={() => setVisibleTerms(false)}
          onConfirm={() => setVisibleTerms(false)}
          enterprise_rule={good.enterprise_rule}
          regDate={order?.reg_date}
        />
      )}

      {/* 결제 취소 요청 모달 */}
      <ModalCancelIndex
        visible={visibleCancel}
        onClose={() => setVisibleCancel(false)}
        onConfirm={() => {
          revalidate();
          setVisibleCancel(false);
        }}
        isFullSize
        goods={good}
      />
      {order && (
        <InfoItem>
          <div className={`info-item-box ${openGoods ? 'opened' : ''}`}>
            <div className='info-box'>
              <a>
                <div className='top_info_box'>
                  <div className='info-img' onClick={goProduct(good.decodedProduct.ent_code, good.product_no)}>
                    <span>{thumb && <Image unoptimized src={thumb} layout='fill' alt={name} />}</span>
                  </div>
                  <div className='info-text-box'>
                    <span className='category-text' onClick={goProduct(good.decodedProduct.ent_code, good.product_no)}>
                      {enterprise_category} &gt; {ent_name}
                    </span>
                    <p className='title-text' onClick={goProduct(good.decodedProduct.ent_code, good.product_no)}>
                      {name}
                    </p>
                    <span className='price-num'>
                      {showPrice(product_price)}원 / 수량 : {product_cnt}개
                    </span>
                  </div>
                </div>

                <div className='group_box open_box'>
                  <div className='status_box'>
                    <p className={`status_text ${is_cancel ? 'red_text' : 'blue_text'}`}>{order_status_title}</p>
                  </div>

                  <div className='more_box' onClick={() => openGoodsFunc()}>
                    <span>
                      {/* 아이템 펼쳐진 상태 -> svg 컬러 #262626으로 변경 및 180deg 회전: 상태 추가되면 회전시킬 것 */}
                      {openGoods ? '접기' : '자세히'} <IconBoldDownArrow lineColor={openGoods ? '#8C8C8C' : '#262626'} />
                    </span>
                  </div>
                </div>
              </a>
            </div>

            <div className='divide_line' />

            {openGoods && (
              <div className='detail_open_box'>
                {/*<div className='process_check'>*/}
                {/*  <p>*/}
                {/*    담당자와의 상담을 통해 드레스 상담 및 가봉 일정을*/}
                {/*    <br />*/}
                {/*    체크해드릴 예정이에요.*/}
                {/*  </p>*/}
                {/*  /!* TO DO: 진행단계 확인 모달 *!/*/}
                {/*  <button className='process_check_btn' onClick={() => onClickModal('progress')}>*/}
                {/*    진행단계 확인*/}
                {/*  </button>*/}
                {/*</div>*/}

                {metadata && metadata.length > 0 && (
                  <div className='row_box usage_info'>
                    <p className='group_title'>상품 이용 정보</p>
                    {metadata.map(meta => (
                      <div className='row_group' key={meta.template_code}>
                        <span className='info_title'>{meta.title}</span>
                        <span className='info_content'>{meta.value}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className='row_box prd_price_box'>
                  <p className='group_title'>상품 금액</p>
                  <div className='row_group black_text'>
                    <span className='info_title'>상품금액</span>
                    <span className='info_content'>{showPrice(product_price * product_cnt)}원</span>
                  </div>

                  {selectedOptions && selectedOptions.length > 0 && (
                    <>
                      <div className='row_group black_text'>
                        <span className='info_title'>선택옵션</span>
                        <span className='info_content'>+{showPrice(option_price)}원</span>
                      </div>
                      {selectedOptions.map((option, index) => (
                        <div className='row_group' key={'option_index' + index}>
                          <span className='info_title'>
                            <IconLowerPointer /> {option.decodedProduct.name}
                          </span>
                          <span className='info_content'>+{showPrice(option.product_cnt * option.product_price)}원</span>
                        </div>
                      ))}
                    </>
                  )}

                  {selectedCoupons && selectedCoupons.length > 0 && (
                    <>
                      <div className='row_group black_text'>
                        <span className='info_title'>할인쿠폰</span>
                        <span className='info_content sale_price'>-{showPrice(real_coupon_price)}원</span>
                      </div>
                      {selectedCoupons.map((sc, index) => (
                        <div className='row_group' key={sc.decodedCoupon.no + 'index' + index}>
                          <span className='info_title'>
                            <IconLowerPointer /> {sc.decodedCoupon.c_name2 || sc.decodedCoupon.c_name}
                          </span>
                          {sc.decodedCoupon.b_price > 0 && (
                            <span className='info_content'>-{showPrice(sc.decodedCoupon.b_price * product_cnt)}원</span>
                          )}
                        </div>
                      ))}
                    </>
                  )}

                  <div className='row_group final_group'>
                    <span className='info_title'>최종 상품 금액</span>
                    <span className='info_content'>{showPrice(goods_price)}원</span>
                  </div>

                  {good.enterprise_rule && (
                    <div className='extra_group'>
                      <button
                        className='extra_btn'
                        onClick={e => {
                          e.stopPropagation();
                          onClickModal('terms');
                          clickOrderGoodsEntRule({ goods_no: good.goods_no, is_free: order?.is_free_order });
                        }}
                      >
                        추가비용 및 위약금 규정 보기
                      </button>
                      {/*{!good.is_cancel && (*/}
                      {/*  <p className='cancel_payment_btn' onClick={() => setVisibleCancel(true)}>*/}
                      {/*    결제 취소 요청 <IconKeyboardRightArrow lineColor='#8c8c8c' />*/}
                      {/*  </p>*/}
                      {/*)}*/}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </InfoItem>
      )}
    </>
  );
};

export function getTotalGoodsPrice(productPrice: number, productCnt: number, totalCpDiscount: number) {
  return showPrice(productPrice * productCnt - totalCpDiscount);
}

export default OrderDetailItem;
const InfoItem = styled.div`
  position: relative;
  width: 100%;

  .info-item-box {
    width: 100%;
    position: relative;
    @media all and (max-width: ${theme.pc}px) {
      border: 1px solid #dfdfdf;
      margin-bottom: 10px;
      background-color: #fff;
    }

    .info-box {
      width: 100%;
      position: relative;
      cursor: pointer;

      > a,
      > label {
        position: relative;
        display: block;
        width: 100%;
        height: 100%;
        padding-right: 10px;
        @media all and (max-width: ${theme.pc}px) {
          display: flex;
          flex-wrap: wrap;
          padding-right: 0;
        }

        .top_info_box {
          width: calc(100% - 275px);
          display: inline-block;
          @media all and (max-width: ${theme.pc}px) {
            display: flex;
            width: 100%;
            padding: 15px;
            border-bottom: 1px solid #dfdfdf;
          }

          .info-img {
            display: inline-block;
            width: 75px;
            height: 75px;
            background-color: pink;

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
            width: 390px;
            vertical-align: top;
            padding-top: 2px;
            margin-left: 15px;
            @media all and (max-width: ${theme.pc}px) {
              width: calc(100% - 90px);
              padding-top: 4px;
              margin-bottom: 5px;
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
            }

            .price-num {
              color: #262626;
              display: block;
              font-size: 14px;
            }
          }
        }

        .group_box {
          position: relative;
          width: 275px;
          height: 100%;
          display: inline-block;
          vertical-align: top;
          @media all and (max-width: ${theme.pc}px) {
            display: flex;
            width: 100%;
            justify-content: space-between;
            align-items: center;
            padding: 16px 15px 17px 15px;
          }

          .status_box {
            display: inline-block;
            position: relative;
            vertical-align: top;
            margin-left: 45px;
            width: 100px;
            text-align: center;
            @media all and (max-width: ${theme.pc}px) {
              margin-left: 0;
              text-align: left;
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

          .more_box {
            display: block;
            position: absolute;
            right: 0;
            top: 50%;
            padding-top: 30px;
            transform: translateY(-50%);
            font-size: 14px;
            color: #8c8c8c;
            font-weight: 500;

            > span {
              > svg {
                margin-bottom: 2px;
              }
            }

            @media all and (max-width: ${theme.pc}px) {
              position: relative;
              right: unset;
              top: unset;
              transform: unset;
              padding: 0;
            }
          }
        }

        .price_box {
          display: block;
          text-align: right;
          position: relative;
          padding-top: 12px;

          .price-num {
            color: #262626;
            vertical-align: top;
            font-size: 14px;
          }
        }
      }
    }

    .divide_line {
      width: 100%;
      height: 1px;
      background-color: #d8d8d8;
      margin: 20px 0;
      @media all and (max-width: ${theme.pc}px) {
        width: 100%;
        display: none;
      }
    }

    .detail_open_box.visible {
      visibility: visible;
    }
    .detail_open_box {
      width: calc(100% - 90px);
      position: relative;
      margin-left: 90px;
      @media all and (max-width: ${theme.pc}px) {
        width: 100%;
        margin-left: 0;
        padding: 0 15px;
      }

      .process_check {
        width: 100%;
        font-size: 14px;
        line-height: 20px;
        border-bottom: 1px solid #dfdfdf;
        padding-bottom: 25px;
        @media all and (max-width: ${theme.pc}px) {
          padding-top: 20px;
        }

        .process_check_btn {
          width: 100px;
          height: 34px;
          border: 1px solid ${props => props.theme.blue};
          color: ${props => props.theme.blue};
          font-size: 13px;
          font-weight: 700;
          line-height: 19px;
          margin-top: 8px;
        }
      }

      .row_box {
        width: 100%;
        margin-top: 20px;
        position: relative;
        border-bottom: 1px solid #dfdfdf;
        padding-bottom: 22px;

        .group_title {
          font-size: 14px;
          font-weight: 700;
          margin-bottom: 14px;
        }

        .row_group {
          width: 100%;
          position: relative;

          &:not(:last-child) {
            margin-bottom: 10px;
          }

          > span {
            color: #8c8c8c;
            font-size: 14px;
          }

          .info_title {
            > svg {
              margin-top: 2px;
              margin-right: 2px;
              vertical-align: top;
            }
          }

          .info_content {
            position: absolute;
            top: 0;
            right: 0;
          }

          .info_content.sale_price {
            color: ${props => props.theme.red};
          }
        }

        .row_group.black_text {
          > span {
            color: #262626;
          }
        }

        .row_group.final_group {
          margin-top: 20px;
          margin-bottom: 0;

          > span {
            font-size: 15px;
            font-weight: 700;
            color: #262626;
          }
        }

        .extra_group {
          width: 100%;
          position: relative;
          margin-top: 25px;

          .extra_btn {
            width: 180px;
            height: 34px;
            border: 1px solid ${props => props.theme.blue};
            color: ${props => props.theme.blue};
            font-size: 13px;
            font-weight: 700;
            line-height: 19px;
          }

          .cancel_payment_btn {
            position: absolute;
            top: 10px;
            right: 0;
            font-size: 13px;
            color: #8c8c8c;
            font-weight: 700;
            cursor: pointer;

            > svg {
              height: 12px;
              margin-left: 2px;
              margin-bottom: 2px;
              vertical-align: middle;
            }
          }
        }
      }

      .row_box.prd_price_box {
        border-bottom: 0;
        padding-bottom: 25px;
      }
    }
  }

  .info-item-box.opened {
    border-bottom: 1px solid #d8d8d8;
    margin-bottom: 30px;
    @media all and (max-width: ${theme.pc}px) {
      border: 1px solid #8c8c8c;
    }

    .info-box {
      > a {
        .group_box.open_box {
          @media all and (max-width: ${theme.pc}px) {
            background-color: #fafafa;
          }

          .more_box {
            color: #262626;

            > span {
              > svg {
                transform: rotate(180deg);
              }
            }
          }
        }
      }
    }
  }
`;

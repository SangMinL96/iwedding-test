import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import useSWR from 'swr';
import { CouponDetail, PaymentCouponType } from '@modules/mypage/coupon/interface';
import { getCouponDetail, mypageCouponKeys } from '@modules/mypage/coupon/api';
import { CommonModalProps } from '@modules/CommonInterface';
import Loading from '@components/Loading';
import { showPrice, webViewReplace } from '@utils/util';
import theme from '@styles/theme';
import Image from 'next/image';
import AbstractModal from '@components/core/modal/AbstractModal/AbstractModal';
import { isWebview } from '@utils/isWebview';
interface AvailableProps extends CommonModalProps {
  onConfirm?: () => void;
  paymentType?: string;
  coupon_no?: string;
  data?: any;
}

import { createPortal } from 'react-dom';

export const IFrame = ({ children, ...props }) => {
  const [contentRef, setContentRef] = useState(null);
  const mountNode = contentRef?.contentWindow?.document?.body;

  return (
    <iframe {...props} ref={setContentRef}>
      {mountNode && createPortal(children, mountNode)}
    </iframe>
  );
};
const ModalDetailCoupon = ({ coupon_no, data, visible, onClose, paymentType, isFullSize, onConfirm }: AvailableProps) => {
  const {
    data: detailData,
    isValidating,
    mutate,
  } = useSWR<CouponDetail>(mypageCouponKeys.getCouponDetail, () => getCouponDetail(coupon_no || ''));
  useEffect(() => {
    mutate();
  }, [coupon_no, mutate]);

  return (
    <AbstractModal
      noPadding
      visible={visible}
      onClose={onClose}
      title='쿠폰 상세'
      isFullSize={true}
      oneButtonFooter={true}
      onConfirm={onConfirm}
      noFooter={true}
    >
      {isValidating ? (
        <Loading />
      ) : (
        <Container>
          <div className='coupon_detail_container'>
            <div className='coupon_detail_box'>
              <ImgContainer>
                <ImgBox paymentType={paymentType}>
                  {data?.thumbnail && <Image unoptimized alt='썸네일' layout='fill' src={data.thumbnail} />}
                </ImgBox>
                <div className='text_group'>
                  <div className='coupon_text_box'>
                    <div className='category_text'>
                      <span>{data?.category}</span>
                      <span></span>
                      <span>{data?.enterprise_name}</span>
                    </div>
                    <div className='coupon_name'>
                      <p>{data?.c_name}</p>
                    </div>
                  </div>
                  <div className='bottom_text_box'>
                    <span className='date_text'></span>
                    {status === '사용 가능' && <div className='coupon_status available'>{status}</div>}
                    {status === '기간 종료' && <div className='coupon_status end'>{status}</div>}
                  </div>
                </div>
              </ImgContainer>
              <div className='coupon_description'>
                <p>- 기간 내 신규 계약 고객님께 적용됩니다.</p>
                <p>- 쿠폰은 정해진 수량 및 기간에 따라 조기 마감될 수 있습니다.</p>
                <p>- 쿠폰은 마이페이지 &gt; 쿠폰함에서 확인 가능합니다.</p>
              </div>
            </div>

            <div className='available_coupon_box'>
              <div className='available_coupon_header'>
                <p>쿠폰 적용 가능 상품</p>
              </div>
              <div className='available_coupon_items'>
                {detailData?.list?.map(item => {
                  const salePrice = parseInt(item?.price) - parseInt(item?.b_price);
                  const discount = 100 - (salePrice / parseInt(item.price)) * 100;

                  return (
                    <span style={{ width: '100%' }} key={item.enterprise_code}>
                      <div
                        onClick={() =>
                          webViewReplace(`${process.env.NEXT_PUBLIC_WEB_HOST}/enterprise/prd/${item.enterprise_code}/${item.product_no}`)
                        }
                        className='available_coupon_item'
                      >
                        <div className='item_img'>
                          <Image
                            unoptimized
                            width={75}
                            height={75}
                            src={`${process.env.NEXT_PUBLIC_WEB_HOST}/center/iweddingb/product/110_${item.thumb}`}
                            alt='sample img'
                          />
                        </div>
                        <div className='item_text_box'>
                          <p className='title'>{item?.name}</p>
                          {paymentType === '할인' && (
                            <>
                              <div className='row_price_group'>
                                <span className='normal_price'>{showPrice(item?.product_price)}</span>
                                <span className='sale_price'>{showPrice(Number(item?.price))}</span>
                              </div>
                              <p className='applied_coupon_price'>{`쿠폰 적용가 ${showPrice(Number(salePrice))} (${Math.round(
                                discount,
                              )}%)`}</p>
                            </>
                          )}
                          {paymentType === '업그레이드' && (
                            <div className='row_price_group'>
                              <div className='row_price_group'>
                                <span className='sale_price'>{item?.b_upgrade}</span>
                              </div>
                              <p style={{ color: '#020202', fontWeight: 'bold' }} className='applied_coupon_price'>{`${showPrice(
                                Number(item.price),
                              )}`}</p>
                            </div>
                          )}
                          {paymentType === '추가 혜택' && (
                            <div className='row_price_group'>
                              <div className='row_price_group'>
                                <span className='sale_price'>{item?.b_etc}</span>
                              </div>
                              <p style={{ color: '#020202', fontWeight: 'bold' }} className='applied_coupon_price'>{`${showPrice(
                                Number(item.price),
                              )}`}</p>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className='divide_line'></div>
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </Container>
      )}
    </AbstractModal>
  );
};

export default React.memo(ModalDetailCoupon);
type StyledType = {
  paymentType?: string;
};
const ImgBox = styled.div<StyledType>`
  ${props => props.theme.flexCenter};
  display: inline-block;
  width: 80px;
  height: 80px;
  position: relative;
  vertical-align: top;
  margin-right: 15px;
  cursor: pointer;
  background-color: ${props => props.paymentType === '할인' && '#96A8E5'};
  background-color: ${props => props.paymentType === '업그레이드' && '#96E5D3'};
  background-color: ${props => props.paymentType === '추가 혜택' && '#96D3E5'};
  h5 {
    font-size: 14px;
    font-weight: normal;
    color: white;
    ${props => props.theme.flexCenter};
    width: 100%;
    height: 100%;
  }
`;

const Container = styled.div`
  width: 100%;

  .coupon_detail_container {
    width: 100%;
    position: relative;
    .coupon_detail_box {
      width: 100%;
      background-color: #f4f6f8;
      padding: 30px;
      @media all and (max-width: ${theme.pc}px) {
        padding: 30px 15px;
      }
      > div {
        width: 100%;
        margin-right: 0;
        border: 0;
        box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
        .coupon_img_box,
        .text_group {
          cursor: default;
          pointer-events: none;
        }
        .coupon_delete_btn {
          display: none;
        }
      }
      .coupon_description {
        margin-top: 10px;
        font-size: 13px;
        line-height: 22px;
        color: #8c8c8c;
        padding-left: 5px;
        background-color: transparent;
        box-shadow: none;
      }
    }
    .available_coupon_box {
      width: 100%;
      .available_coupon_header {
        padding: 30px;
        @media all and (max-width: ${theme.pc}px) {
          padding: 30px 15px;
        }
        > p {
          font-size: 16px;
          font-weight: 700;
        }
      }
      .available_coupon_items {
        padding: 0 30px;
        @media all and (max-width: ${theme.pc}px) {
          padding: 0 15px;
        }
        .available_coupon_item {
          display: block;
          position: relative;
          width: 100%;
          cursor: pointer;
          .item_img {
            display: inline-block;
            width: 75px;
            height: 75px;
            margin-right: 12px;
            vertical-align: top;
            > img {
              width: 100%;
              height: 100%;
              object-fit: contain;
            }
          }
          .item_text_box {
            display: inline-block;
            width: calc(100% - 117px);
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            .title {
              font-size: 13px;
              line-height: 18px;
              color: #262626;
            }
            .row_price_group {
              > span {
                font-size: 13px;
                font-weight: 500;
                line-height: 19px;
              }
              .normal_price {
                color: #8c8c8c;
                margin-right: 3px;
                text-decoration: line-through;
              }
              .sale_price {
                color: #262626;
              }
            }
            .applied_coupon_price {
              font-size: 13px;
              font-weight: 500;
              line-height: 19px;
              color: #ff3535;
            }
          }
        }
        .divide_line {
          width: 100%;
          height: 1px;
          margin: 20px 0;
          background-color: #d8d8d8;
        }
      }
    }
  }
`;

const ImgContainer = styled.div`
  display: inline-block;
  position: relative;
  width: 385px;
  height: 110px;
  border-radius: 12px;
  border: 1px solid #dfdfdf;
  padding: 15px;
  margin-right: 19px;
  margin-bottom: 20px;
  background-color: #fff;
  &:nth-child(2n) {
    margin-right: 0;
  }
  @media all and (max-width: ${theme.pc}px) {
    width: 100%;
    margin-right: 0;
    border: 0;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  }
  .coupon_img_box {
    display: inline-block;
    width: 80px;
    height: 80px;
    position: relative;
    vertical-align: top;
    margin-right: 15px;
    cursor: pointer;
    > img {
      width: 100%;
    }
  }
  .text_group {
    display: inline-block;
    position: relative;
    width: calc(100% - 95px);
    cursor: pointer;
    .coupon_text_box {
      position: relative;
      width: calc(100% - 44px);
      .category_text {
        height: 23px;
        line-height: 23px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: middle;
        > span {
          font-size: 13px;
          color: #8c8c8c;
          line-height: 19px;
          &:nth-child(2) {
            display: inline-block;
            width: 1px;
            height: 11px;
            background-color: #e6e6ea;
            margin: 0 5px;
          }
        }
      }
      .coupon_name {
        width: 100%;
        height: 38px;
        margin-bottom: 3px;
        > p {
          font-size: 14px;
          font-weight: 700;
          color: #262626;
          line-height: 19px;
        }
      }
    }
    .bottom_text_box {
      display: inline-block;
      position: relative;
      width: 100%;
      .date_text {
        font-size: 12px;
        line-height: 18px;
        color: #bebebe;
      }
      .coupon_status {
        position: absolute;
        top: 0;
        right: 0;
        width: 60px;
        height: 19px;
        border-radius: 4px;
        font-size: 12px;
        line-height: 19px;
        vertical-align: middle;
        text-align: center;
      }
      .coupon_status.available {
        background-color: #f5f5f5;
        color: #8c8c8c;
      }
      .coupon_status.end {
        background-color: #bebebe;
        color: #fff;
      }
    }
  }
`;

import { ApplyButton } from '@feature/quotation/components/buttons/ApplyButton';
import { QUOTE_COUPON_MODAL } from '@utils/modalKeys';
import { useModalVisible } from '@hooks/useModalVisible';
import { CartDto, QuotationDetail } from '@modules/mypage/quotation/QuotationInterface';
import { ProductCategoryValue } from '@modules/product/product.interface';
import theme from '@styles/theme';
import React, { MutableRefObject, useCallback, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { useSelectedCart } from '@feature/quotation/hooks/useSelectedCart';
import dynamic from 'next/dynamic';
import TopToolBox from './TopToolBox';
import { useRouter } from 'next/router';
const AddsInfo = dynamic(() => import('./AddsInfo'));
const Category = dynamic(() => import('./Category'));
const MainInfo = dynamic(() => import('./MainInfo'));
const OptionSelector = dynamic(() => import('./OptionSelector'));
const CouponList = dynamic(() => import('../CouponList'));
const DetailProductPrice = dynamic(() => import('../DetailProductPrice'));

const QuoteDetailProduct = ({ cart, checkBoxRef, unCheckAllSelect, onDeleteCart, isRealtime, fromTalk }: ItemProps) => {
  const { setModalVisible } = useModalVisible(QUOTE_COUPON_MODAL);
  const { setSelectedCart } = useSelectedCart();
  const router = useRouter();

  const totalCouponPrice = useMemo(() => {
    const product_cnt = cart.product_cnt;
    return cart.appliedCoupons.reduce((acc, coupon) => (acc += product_cnt * coupon.b_price), 0);
  }, [cart.appliedCoupons, cart.product_cnt]);

  const onClickCouponModal = useCallback(() => {
    router.push(router.asPath + '#CouponModal');
    setSelectedCart(cart);
    setModalVisible(true);
  }, [setSelectedCart, setModalVisible, cart, router]);

  return (
    <>
      <Container>
        <Category category={cart.product.category as ProductCategoryValue} />
        <TopToolBox
          cart={cart}
          checkboxRef={checkBoxRef}
          fromTalk={fromTalk}
          isRealtime={isRealtime}
          onDelete={onDeleteCart}
          unCheckAllSelect={unCheckAllSelect}
        />
        <div className='info_box'>
          <MainInfo cart={cart} isRealtime={isRealtime} fromTalk={fromTalk} />
          <DetailProductPrice
            regularPrice={cart.product_cnt * cart.product.product_price}
            price={cart.product_cnt * cart.product.price}
            couponPrice={totalCouponPrice}
            fontSize={14}
          />

          <>
            {cart.available_coupon_cnt > 0 ? <div className='divide_line' /> : null}
            <div className='option_container'>
              {cart.available_coupon_cnt > 0 &&
                (isRealtime && !cart.appliedCoupons.length ? null : (
                  <div className='coupon_container opiton_top_box'>
                    <p>쿠폰</p>
                    {!isRealtime && !fromTalk && <ApplyButton onClick={onClickCouponModal}>쿠폰 적용 하기</ApplyButton>}
                  </div>
                ))}

              {cart.appliedCoupons && cart.appliedCoupons.length > 0 && <CouponList appliedCoupons={cart.appliedCoupons} />}

              {!isRealtime && (
                <div className='option-box'>
                  {cart.available_option_cnt > 0 && <OptionSelector cart={cart} fromTalk={fromTalk} />}
                  {cart.metadata.length > 0 ? <AddsInfo cart={cart} /> : null}
                </div>
              )}
            </div>
          </>
        </div>
      </Container>
      <LgDivdeLine />
    </>
  );
};

export default QuoteDetailProduct;

const Container = styled.div`
  width: 100%;
  position: relative;
  padding: 10px 15px 0 15px;
  @media all and (min-width: ${theme.pc}px) {
    padding: 10px 0 0 0;
  }
  .category {
    display: inline-block;
    width: 100%;
    height: 67px;
    border-bottom: 2px solid #262626;
    font-size: 16px;
    font-weight: 700;
    line-height: 67px;
    vertical-align: middle;
    margin-bottom: 20px;
    @media all and (min-width: ${theme.pc}px) {
      font-size: 20px;
    }
  }
  .action_container {
    width: 100%;
    position: relative;
    .top_tool_box {
      width: 100%;
      position: relative;
      .right_tool_box {
        display: inline-block;
        position: absolute;
        top: 0;
        right: 0;
        height: 22px;
        > span {
          font-size: 14px;
          color: #8c8c8c;
          vertical-align: middle;
        }
        .vertical_line {
          display: inline-block;
          margin: 1px 8px 0 8px;
          width: 1px;
          height: 15px;
          background-color: #8c8c8c;
        }
      }
    }
  }
  .info_box {
    width: 100%;
    position: relative;
    padding-top: 10px;
    > a,
    > label {
      display: block;
      width: 100%;
      margin-bottom: 8px;
      .info_text_box {
        display: inline-block;
        width: 64%;
        vertical-align: top;
        padding-top: 10px;
        .category_text {
          display: block;
          font-size: 14px;
          font-weight: 300;
          color: ${props => props.theme.gray};
          margin-bottom: 5px;
        }
        .title_text {
          font-size: 15px;
          font-weight: 500;
          line-height: 22px;
          display: block;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          color: #262626;
          @media all and (max-width: ${theme.pc}px) {
            white-space: normal;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
            line-height: 22px;
            height: 44px;
          }
        }
        .counter_box {
          display: flex;
          flex-direction: row;
          align-items: center;
          > div {
            flex-direction: row;
            margin-top: 15px;
          }
          .counter_text {
            margin-top: 25px;
            font-size: 14px;
          }
          .remaining_num {
            display: block;
            font-size: 13px;
            font-weight: 700;
            margin-top: 15px;
            margin-left: 10px;
          }
          @media all and (max-width: ${theme.pc}px) {
            > div {
              margin-top: 30px;
            }
            .counter_text {
              margin-top: 15px;
              margin-bottom: 15px;
            }
            .remaining_num {
              margin-top: 30px;
            }
          }
        }
      }
      .info_img {
        float: right;
        display: block;
        width: 100px;
        height: 100px;
        margin-top: 10px;
        position: relative;
        overflow: hidden;
        > span {
          display: block;
          width: 100%;
          height: 100%;
          position: relative;
          > img {
            height: 100%;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
          }
        }
        .prd_end_box {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(38, 38, 38, 0.7);
          color: #fff;
          z-index: 1;
          .prd_end_text {
            position: absolute;
            text-align: center;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            > p {
              font-size: 18px;
              font-weight: 700;
            }
          }
        }
      }
      &::after {
        ${props => props.theme.clearFloat}
      }
    }
  }
  .row-group {
    width: 100%;
    position: relative;
    font-size: 14px;
    &:not(:first-child) {
      margin-top: 8px;
    }
    @media all and (min-width: ${theme.pc}px) {
      font-size: 15px;
      &:not(:first-child) {
        margin-top: 10px;
      }
    }
    .price-num,
    .final-price-num {
      display: block;
      position: absolute;
      top: 0;
      right: 0;
      white-space: nowrap;
      > .change_option {
        display: inline-block;
        margin-left: 8px;
        color: ${props => props.theme.blue};
        text-decoration: underline;
      }
    }
  }
  .row-group.coupon {
    color: ${props => props.theme.red};
  }
  .row-group.default {
    color: #8c8c8c;
    > .price-num {
      text-decoration: line-through;
    }
  }
  .row-group.default-option {
    color: #8c8c8c;
    > .price-num.default {
      color: #dfdfdf;
    }
  }
  .option_container {
    width: 100%;
    position: relative;
    margin: 20px 0;
    &:last-child {
      margin-bottom: 0;
    }
    .opiton_top_box {
      width: 100%;
      height: 34px;
      position: relative;
      line-height: 34px;
      vertical-align: middle;
      margin-bottom: 15px;
      > p {
        display: inline-block;
        font-size: 15px;
        font-weight: 700;
      }
      .apply_btn {
        width: 100px;
        height: 34px;
        background-color: ${props => props.theme.blue};
        color: #fff;
        font-size: 14px;
        position: absolute;
        right: 0;
        top: 0;
        @media all and (min-width: ${theme.pc}px) {
          width: 140px;
        }
      }
    }
    .coupon_list {
      width: 100%;
      margin-bottom: 20px;
      .coupon_item {
        width: 100%;
        position: relative;
        margin-bottom: 10px;
        &:last-child {
          margin-bottom: 0;
        }
        > span {
          display: block;
          font-size: 14px;
          color: #8c8c8c;
          line-height: 20px;
          @media all and (min-width: ${theme.pc}px) {
            font-size: 15px;
          }
        }
      }
    }
    .option-box {
      width: 100%;
      display: block;
      @media all and (min-width: ${theme.pc}px) {
        padding: 0;
      }
      .option-header {
        display: block;
        width: 100%;
        height: 40px;
        font-size: 14px;
        line-height: 40px;
        text-align: center;
        background-color: #f5f5f5;
        margin-bottom: 20px;
        > p {
          > span {
            color: #ff3535;
          }
        }
        &:not(:first-child) {
          margin-top: 20px;
        }
        @media all and (min-width: ${theme.pc}px) {
          font-size: 15px;
          height: 42px;
          line-height: 42px;
        }
      }
      > .row-group {
        color: #8c8c8c;
        @media all and (min-width: ${theme.pc}px) {
          font-size: 15px;
        }
      }
      .add-option-btn-box {
        width: 100%;
        height: 58px;
        text-align: center;
        padding-top: 10px;
        display: block;
        > .add-option-btn {
          width: 140px;
          height: 34px;
          border: 1px solid ${props => props.theme.blue};
          color: ${props => props.theme.blue};
          font-size: 14px;
          background-color: #fff;
        }
      }
      .add-option-btn-box.change-info {
        margin-top: 20px;
      }
    }
  }
  .divide_line {
    width: 100%;
    height: 1px;
    background-color: #d8d8d8;
    margin: 25px 0 0 0;
  }
`;

const LgDivdeLine = styled.div`
  width: 100%;
  height: 10px;
  background-color: #e9ecef;
  border-top: 1px solid #dddddd;
  margin: 20px 0 0 0;
`;

interface ItemProps {
  quotation: QuotationDetail;
  cart: CartDto;
  unCheckAllSelect: () => void;
  onDeleteCart: (cart_no: number[]) => () => Promise<void>;
  checkBoxRef: MutableRefObject<HTMLInputElement>;
  isRealtime?: boolean;
  fromTalk?: boolean;
}

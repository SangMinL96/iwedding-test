import React, { MouseEventHandler, useEffect, useRef, useState } from 'react';
import { CouponDetailDto } from '@modules/mypage/coupon/interface';
import styled from 'styled-components';
import { CommonModalProps } from '@modules/CommonInterface';
import IconKeyboardDownArrow from '@svgs/icon_keyboard_down_arrow';
import IconX from '@svgs/icon_x';
import { showPrice } from '@utils/util';
import theme from '@styles/theme';
import { appliedSelectCoupons, getAvailableCoupons } from '@modules/mypage/coupon/api';
import AbstractModal from '@components/core/modal/AbstractModal/AbstractModal';
import { useSelectedCart } from '@feature/quotation/hooks/useSelectedCart';
import { useDeepEffect } from '@hooks/useDeepEffect';

interface AvailableProps extends CommonModalProps {
  onConfirm: () => void;
}

const ModalSelectCoupon = ({ visible, onClose, onConfirm }: AvailableProps) => {
  //선택한 상품
  const { selectedCart, clearSelectedCart } = useSelectedCart();
  //이 모달에서 선택한 쿠폰 (이미 적용한 쿠폰은 기본적으로 들어감)
  const [alreadyHaveCoupons, setAlreadyHaveCoupons] = useState<CouponDetailDto[]>([]);
  const [selectedCoupons, setSelectedCoupons] = useState<CouponDetailDto[]>([]);

  useDeepEffect(() => {
    if (visible && selectedCart?.appliedCoupons?.length) {
      setSelectedCoupons(selectedCart.appliedCoupons);
      setAlreadyHaveCoupons(selectedCart.appliedCoupons);
    }
  }, [visible, selectedCart]);

  // 쿠폰 추가
  const selectCoupon = (ac: CouponDetailDto) => {
    if (selectedCoupons.filter(sc => sc.b_type == ac.b_type).length) {
      setVisibleSelectBox(false);
      return alert('이미 적용한 타입의 쿠폰이 있습니다.');
    }
    setAvailableCouponList(availableCouponList.filter(acl => acl.no !== ac.no));
    setSelectedCoupons(prev => [...prev, ac]);
    setVisibleSelectBox(false);
  };

  //쿠폰 삭제
  const removeCoupon = (ac: CouponDetailDto) => {
    const duplicate = availableCouponList.some(coupon => coupon.no === ac.no);
    if (!duplicate) {
      setAvailableCouponList(availableCouponList.concat(ac));
    }
    setSelectedCoupons(selectedCoupons.filter(sc => sc.no !== ac.no));
  };

  //쿠폰 선택완료
  const confirmCoupon = async () => {
    if (selectedCart) {
      const selectedCouponIds = selectedCoupons.map(sc => sc.no);
      const alreadyCouponIds = alreadyHaveCoupons.map(ahc => ahc.no);
      //기존과 변화 있는지 체크
      let found = selectedCouponIds.length == alreadyCouponIds.length && alreadyCouponIds.every(sci => selectedCouponIds.includes(sci));
      if (selectedCoupons.length == 0) found = false;
      if (!found) {
        try {
          await appliedSelectCoupons(selectedCart.cart_no, selectedCouponIds);
          closeCoupon();
          onConfirm();
        } catch (error) {
          console.error(error);
        }
      } else {
        closeCoupon();
      }
    }
  };

  //적용가능한 쿠폰 리스트
  const [availableCouponList, setAvailableCouponList] = useState<CouponDetailDto[]>([]);
  useDeepEffect(() => {
    if (visible && selectedCart) {
      fetchAvailableCoupons(selectedCart.cart_no);
    }
  }, [selectedCart, visible, selectedCart?.appliedCoupons]);

  const fetchAvailableCoupons = async (cart_no: number) => {
    try {
      const { data } = await getAvailableCoupons(cart_no);
      setAvailableCouponList(data);
    } catch (error) {
      console.error(error);
    }
  };

  // 쿠폰 리스트 셀렉트박스
  const couponSelectBox = useRef(null);
  const [visibleSelectBox, setVisibleSelectBox] = useState(false);
  const onClickVisibleSelectBox = () => {
    //선택한 것을 제외하고 가능한 쿠폰이 있으면 보여줌

    if (availableCouponList?.length > 0) setVisibleSelectBox(true);
  };

  useEffect(() => {
    const pageClickEvent = (e: MouseEventHandler) => {
      // @ts-ignore
      if (couponSelectBox?.current && !couponSelectBox.current.contains(e.target)) {
        setVisibleSelectBox(!visibleSelectBox);
      }
    };
    if (visibleSelectBox) {
      // @ts-ignore
      window.addEventListener('click', pageClickEvent);
    }
    return () => {
      // @ts-ignore
      window.removeEventListener('click', pageClickEvent);
    };
  }, [visibleSelectBox]);

  //모달 닫으면서 초기화
  const closeCoupon = () => {
    setAvailableCouponList([]);
    setSelectedCoupons([]);
    setAlreadyHaveCoupons([]);
    clearSelectedCart();
    onClose();
  };
  return (
    <AbstractModal
      visible={visible}
      onClose={closeCoupon}
      title={'쿠폰 적용하기'}
      confirmText={'선택완료'}
      canConfirm
      onConfirm={confirmCoupon}
      noPadding
    >
      <Container>
        <div className='select-coupon-box'>
          <div className='select-coupon' onClick={onClickVisibleSelectBox}>
            <span>사용가능 쿠폰 선택</span>
            <IconKeyboardDownArrow />
          </div>
        </div>

        {/* 적용가능한 셀렉트박스 */}
        <div className={`coupon-menu ${visibleSelectBox ? 'active' : 'inactive'}`} ref={couponSelectBox}>
          <ul>
            {availableCouponList &&
              availableCouponList
                .filter(ao => !selectedCoupons.map(sc => sc.no).includes(ao.no))
                .map((coupon, index) => (
                  <li key={index + 'available' + coupon.no} onClick={() => selectCoupon(coupon)}>
                    <p className='coupon-title'>{coupon.c_name2}</p>
                    {coupon.b_price > 0 ? <span className='coupon-price'>{showPrice(coupon.b_price)}원</span> : ''}
                  </li>
                ))}
          </ul>
        </div>

        {/*선택한 쿠폰 리스트*/}
        <ul className='selected-coupon-list'>
          {selectedCoupons &&
            selectedCoupons.map((appliedCoupon, index) => (
              <li className='selected-coupon-item' key={index + 'selected' + appliedCoupon.no}>
                <p className='coupon-title'>{appliedCoupon.c_name2}</p>
                <button className='delete-coupon-btn' onClick={() => removeCoupon(appliedCoupon)}>
                  <IconX />
                </button>
              </li>
            ))}
        </ul>
      </Container>
    </AbstractModal>
  );
};

export default ModalSelectCoupon;

const Container = styled.div`
  position: relative;
  width: 100%;
  .select-coupon-box {
    width: 100%;
    padding: 20px 30px 0 30px;
    @media all and (max-width: ${theme.pc}px) {
      padding: 20px 15px 0 15px;
    }

    .select-coupon {
      width: 100%;
      height: 45px;
      position: relative;
      border: 1px solid #dfdfdf;
      background-color: #fff;
      font-size: 15px;
      line-height: 45px;
      vertical-align: middle;
      padding-left: 15px;
      cursor: pointer;

      > svg {
        display: block;
        position: absolute;
        top: 18px;
        right: 16.5px;
        width: 18px;
        height: 9px;
      }
    }
  }

  .coupon-menu {
    position: absolute;
    z-index: 11;
    padding: 0 30px;
    width: 100%;
    opacity: 0;
    visibility: hidden;
    display: none;
    transform: translateY(-20px);
    transition: opacity 0.4s ease, transform 0.4 ease;
    @media all and (max-width: ${theme.pc}px) {
      padding: 0 15px;
    }

    > ul {
      width: 100%;
      overflow-x: hidden;

      li {
        width: 100%;
        padding: 13px 0 13px 15px;
        border: 1px solid #dfdfdf;
        border-top: none;
        background-color: #fff;
        font-size: 14px;
        position: relative;
        cursor: pointer;

        .coupon-title {
          display: inline-block;
          width: calc(100% - 104px);
          line-height: 18px;
        }

        .coupon-price {
          display: inline-block;
          position: absolute;
          top: 15px;
          right: 15px;
          vertical-align: top;
        }
      }
    }
  }

  .coupon-menu.active {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
    display: block;
  }

  .selected-coupon-list {
    width: 100%;
    padding: 0 30px;
    margin-top: 15px;
    height: 396px;
    overflow-x: hidden;
    overflow-y: scroll;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
      display: none;
    }

    @media all and (max-width: ${theme.pc}px) {
      padding: 0 15px;
      height: 339px;
    }

    .selected-coupon-item {
      width: 100%;
      position: relative;
      padding: 13px 0 14px 15px;
      border: 1px solid #dfdfdf;
      margin-bottom: 10px;
      padding-left: 15px;
      background-color: #fff;

      .coupon-title {
        display: inline-block;
        font-size: 15px;
        line-height: 22px;
        width: calc(100% - 41px);
      }

      .delete-coupon-btn {
        ${props => props.theme.resetBtnStyle};
        display: inline-block;
        width: 41px;
        height: 22px;
        font-size: 18px;
        text-align: center;
        vertical-align: top;
        /* > img {
          margin-top: 6px;
          width: 10px;
          height: 10px;
        } */
        > svg {
          vertical-align: top;
          margin-top: 5px;
          width: 12px;
          height: 12px;
        }
      }
    }
  }
`;

import Counter, { UpdateCntProps } from '@components/Counter';
import { CartDto, QuotationDetail } from '@modules/mypage/quotation/QuotationInterface';
import React, { useCallback } from 'react';
import Image from 'next/image';
import { goToProductPage } from '@utils/util';
import myAxios from '@utils/MyAxios';
import { useQuotationDetail } from '@modules/mypage/quotation/QuotationAPI';
import { sendErrorToSynology } from '@service/synologyAlarmService';
import { useSelectedCart } from '@feature/quotation/hooks/useSelectedCart';
import { useSelectedCartList } from '@feature/quotation/hooks/useSelectedCartList';
import { useSelectedQuotation } from '@feature/quotation/hooks/useSelectedQuotation';

interface Props {
  cart: CartDto;
  fromTalk: boolean;
  isRealtime: boolean;
}

const updateCartCnt = (cart: CartDto, cntType: UpdateCntProps) => {
  if (cart) {
    const value = cntType == UpdateCntProps.UP ? cart.product_cnt + 1 : cart.product_cnt - 1;
    return { ...cart, product_cnt: value };
  }
};

const MainInfo = ({ cart, fromTalk, isRealtime }: Props) => {
  const { selectedQuotation } = useSelectedQuotation();
  const { selectedCartList, setSelectedCartList } = useSelectedCartList();
  const { selectedCart, setSelectedCart } = useSelectedCart();
  const { mutate } = useQuotationDetail(selectedQuotation.group_no, isRealtime);

  const onChangeProductCntSelectedCart = useCallback(
    (cart_no: number, cntType: UpdateCntProps) => {
      if (selectedCartList?.length) {
        setSelectedCartList(
          selectedCartList.map(sc => {
            return sc.cart_no == cart_no ? updateCartCnt(sc, cntType) : sc;
          }),
        );
        setSelectedCart(updateCartCnt(selectedCart, cntType));
      }
    },
    [setSelectedCart, selectedCartList, selectedCart, setSelectedCartList],
  );

  const onUpdateCartCnt = useCallback(
    async (cntType: UpdateCntProps) => {
      onChangeProductCntSelectedCart(cart.cart_no, cntType);
      if (selectedQuotation) {
        try {
          const res = await myAxios.put<QuotationDetail>(`/quotation/${selectedQuotation.group_no}/item/${cart.cart_no}/cnt/${cntType}`);
          const newGroupTotalPrice = res?.data.group_total_price;
          const newGroupTotalCouponPrice = res?.data.group_total_coupon_price;
          mutate(
            {
              ...selectedQuotation,
              group_total_price: newGroupTotalPrice,
              group_total_coupon_price: newGroupTotalCouponPrice,
              carts: selectedQuotation?.carts?.map(c => (c.cart_no == cart.cart_no ? updateCartCnt(cart, cntType) : c)),
            },
            false,
          );
        } catch (error) {
          sendErrorToSynology({ message: '????????? ?????? ?????? ????????? ?????????????????????.' });
        }
      }
    },
    [mutate, cart, onChangeProductCntSelectedCart, selectedQuotation],
  );

  const onClickProduct = useCallback(
    (cart: CartDto) => () => {
      goToProductPage(cart.ent_code, cart.product.no);
    },
    [],
  );

  return (
    <a>
      <div className='info_text_box'>
        <span className='category_text'>
          {cart.product.category} &gt; {cart.ent_name}
        </span>
        <p className='title_text'>{cart.product.name}</p>
        <div className='counter_box'>
          {!isRealtime && !fromTalk ? (
            <Counter
              initNumber={cart.product_cnt}
              limitedBool={cart.product.limited_sales}
              limitedNumber={cart.product.limited_sales_cnt}
              onClickUpdateCnt={type => onUpdateCartCnt(type)}
            />
          ) : null}
          {/* ?????? ????????? ????????? ??? ?????? ????????? ?????? ?????? span ????????? ??? */}
          {fromTalk ? <span className='counter_text'>?????? {cart.product_cnt}???</span> : null}
          {/* ?????? ?????? ?????? */}
          {cart.product.limited_sales && <span className='remaining_num'>?????? ?????? : {cart.product.limited_sales_cnt}???</span>}
          {/* <span className='remaining_num'>?????? ?????? : {cart.product.limited_sales_cnt}???</span> */}
        </div>
      </div>
      <div className='info_img pointer' onClick={onClickProduct(cart)}>
        {cart.product.limited_sales && cart.product.limited_sales_cnt === 0 && (
          <div className='prd_end_box'>
            <div className='prd_end_text'>
              <p>??????</p>
            </div>
          </div>
        )}
        <span>
          <Image unoptimized src={cart.product.thumb} alt='thumbnail' layout='fill' />
        </span>
      </div>
    </a>
  );
};

export default React.memo(MainInfo);

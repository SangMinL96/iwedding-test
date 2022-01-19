import { CommonCheckBox } from '@components/core/checkboxes';
import { useSelectedCart } from '@feature/quotation/hooks/useSelectedCart';
import { useSelectedCartList } from '@feature/quotation/hooks/useSelectedCartList';
import { useSelectedQuotation } from '@feature/quotation/hooks/useSelectedQuotation';
import { useModalVisible } from '@hooks/useModalVisible';
import { CartDto } from '@modules/mypage/quotation/QuotationInterface';
import { COPY_QUOTE_MODAL } from '@utils/modalKeys';
import { useRouter } from 'next/router';
import React, { MutableRefObject, useCallback } from 'react';
import styled from 'styled-components';

interface Props {
  cart: CartDto;
  isRealtime: boolean;
  fromTalk: boolean;
  onDelete: (cart_nos: number[]) => () => Promise<void>;
  unCheckAllSelect: () => void;
  checkboxRef: MutableRefObject<HTMLInputElement>;
}

const TopToolBox = ({ cart, isRealtime, fromTalk, checkboxRef, unCheckAllSelect, onDelete }: Props) => {
  const { selectedQuotation } = useSelectedQuotation();
  const { setSelectedCart } = useSelectedCart();
  const { selectedCartList, setSelectedCartList } = useSelectedCartList();
  const { setModalVisible } = useModalVisible(COPY_QUOTE_MODAL);
  const router = useRouter();
  //체크박스 단일 선택
  const onClickCart = useCallback(
    (checked: boolean, cart: CartDto) => {
      if (selectedQuotation) {
        if (checked) {
          setSelectedCartList([...selectedCartList, cart]);
        } else {
          setSelectedCartList(selectedCartList.filter(selected => selected.cart_no !== cart.cart_no));
          unCheckAllSelect();
        }
      }
    },
    [selectedCartList, selectedQuotation, unCheckAllSelect, setSelectedCartList],
  );

  const onClickCopyModal = useCallback(
    (cart: CartDto) => () => {
      setSelectedCart(cart);
      setModalVisible(true);
      router.push(router.asPath + '#CopyModal');
    },
    [setModalVisible, setSelectedCart, router],
  );
  return (
    <Container>
      <div className='top_tool_box'>
        <div className='left_check_box'>
          <CommonCheckBox
            id={'cart_checkbox_' + cart.cart_no}
            name={cart.cart_no.toString()}
            onChange={checked => onClickCart(checked, cart)}
            limitedBool={cart.product.limited_sales}
            limitedNumber={cart.product.limited_sales_cnt}
            ref={checkboxRef}
            initialState
          />
        </div>
        {!isRealtime && !fromTalk && (
          <div className='right_tool_box'>
            <>
              <span className='pointer' onClick={onDelete([cart.cart_no])}>
                삭제
              </span>
              <span className='vertical_line' />

              <span className='pointer' onClick={onClickCopyModal(cart)}>
                다른 견적으로 복사
              </span>
            </>
          </div>
        )}
      </div>
    </Container>
  );
};

export default React.memo(TopToolBox);

const Container = styled.div`
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
`;

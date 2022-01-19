import { useSelectedCart } from '@feature/quotation/hooks/useSelectedCart';
import { useModalVisible } from '@hooks/useModalVisible';
import { CartDto } from '@modules/mypage/quotation/QuotationInterface';
import { QUOTE_OPTION_MODAL } from '@utils/modalKeys';
import { showPrice } from '@utils/util';
import { useRouter } from 'next/router';
import React, { useCallback } from 'react';

interface Props {
  cart: CartDto;
  fromTalk: boolean;
}

const OptionSelector = ({ cart, fromTalk }: Props) => {
  const { setModalVisible } = useModalVisible(QUOTE_OPTION_MODAL);
  const { setSelectedCart } = useSelectedCart();
  const router = useRouter();
  const onClickOptionModal = useCallback(
    (cart: CartDto) => () => {
      router.push(router.asPath + '#OptionModal');
      setSelectedCart(cart);
      setModalVisible(true);
    },
    [setModalVisible, setSelectedCart, router],
  );

  return (
    <div className='option-box'>
      {cart.available_option_cnt > 0 && (
        <div className='option_container'>
          <div className='option-header'>
            <p>옵션</p>
          </div>

          {cart.options.map(option => (
            <div className='row-group default-option' key={`option_item_${option.product.name}`}>
              <span className='price-title'>{option.product.name}</span>
              <span className='price-num'>{option.product.price ? showPrice(option.product.price * option.product_cnt) + '원' : ''}</span>
            </div>
          ))}

          {!fromTalk && (
            <div className='add-option-btn-box'>
              <button className='add-option-btn' onClick={onClickOptionModal(cart)}>
                {!cart.options?.length ? '옵션 추가 ' : '옵션 변경'}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default React.memo(OptionSelector);

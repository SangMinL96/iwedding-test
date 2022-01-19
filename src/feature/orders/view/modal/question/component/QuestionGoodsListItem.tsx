import React from 'react';
import checkOn from '@images/common/checkbox_square_checked.png';
import checkOff from '@images/common/checkbox_square_unchecked.png';
import styled from 'styled-components';
import { WeddingOrderGoods } from '@modules/mypage/order/order.interface';
import CancelProductItem from '../../cancel/component/CancelProductItem';
interface QuestionGoodsList {
  good: WeddingOrderGoods;
  onChange: any;
  checked: boolean;
}

const QuestionGoodsListItem = ({ good, checked, onChange }: QuestionGoodsList) => {
  return (
    <div className='item_area' key={good.goods_no}>
      <CheckBoxContainer>
        <CheckBox checked={checked} onClick={() => onChange(good.goods_no)} />
      </CheckBoxContainer>
      <div className='info-item-box' onClick={() => onChange(good.goods_no)}>
        <div className='info-box'>
          <label htmlFor={good.goods_no.toString()}>
            <CancelProductItem goods={good} />
          </label>
        </div>
      </div>
    </div>
  );
};

export default QuestionGoodsListItem;

const CheckBoxContainer = styled.div`
  display: flex;
  align-items: center;
`;

const CheckBox = styled.label<{ checked: boolean }>`
  width: 20px;
  height: 20px;
  display: inline-flex;
  background: ${({ checked }) => (!checked ? `url(${checkOff.src})` : `url(${checkOn.src})`)} no-repeat;
  background-size: 20px;
`;

import { WeddingOrderGoods } from '@modules/mypage/order/order.interface';
import React from 'react';
interface Props {
  goods: WeddingOrderGoods;
}

const BalanceProductItem = ({ goods }: Props) => {
  return (
    <div className='top_info_box'>
      <div className='info-text-box'>
        <span className='category-text'>
          {goods.decodedProduct.category} &gt; {goods.decodedProduct.ent_name}
        </span>
        <p className='title-text'>{goods.decodedProduct.name}</p>
      </div>

      <div className='info-img'>
        <span>
          <img src={goods.decodedProduct.thumb} alt='sample' />
        </span>
      </div>
    </div>
  );
};

export default BalanceProductItem;

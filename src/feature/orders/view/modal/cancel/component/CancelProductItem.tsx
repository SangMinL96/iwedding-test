import React from 'react';
import { WeddingOrderGoods } from '@modules/mypage/order/order.interface';
interface Props {
  goods: WeddingOrderGoods;
}

const CancelProductItem = ({ goods }: Props) => {
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

export default CancelProductItem;

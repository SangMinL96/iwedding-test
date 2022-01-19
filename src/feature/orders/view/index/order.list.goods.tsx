import { WeddingOrderGoods, WeddingOrder } from '@modules/mypage/order/order.interface';
import { showPrice } from '@utils/util';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect } from 'react';

type Props = {
  content: WeddingOrderGoods;
  freeOrder: boolean;
  order: WeddingOrder;
};

const OrderListGoods = ({ content, freeOrder, order }: Props) => {
  const router = useRouter();
  const {
    goods_no,
    decodedProduct: { ent_name, name, category: enterprise_category, thumb },
    goods_price,
  } = content;

  const onClickItem = useCallback(() => {
    router.push(`/order/${order.order_no}?is_free=${freeOrder ? 'true' : 'false'}&goods_no=${goods_no}`);
  }, [content, order, freeOrder, router]);
  return (
    <div className='payment-item pointer' onClick={onClickItem}>
      <div className='info-box'>
        <a>
          <div className='info-img'>
            <span>{thumb && <Image unoptimized src={thumb} layout='fill' alt={name} />}</span>
          </div>
          <div className='group_box'>
            <div className='info-text-box'>
              <span className='category-text'>
                {enterprise_category} &gt; {ent_name}
              </span>
              <p className='title-text'>{name}</p>
            </div>
            <div className='price_box'>
              <span className='price-num'>{showPrice(goods_price)}원</span>
            </div>
          </div>
        </a>
      </div>
      <div className='divide-line' />
    </div>
  );
};

export default OrderListGoods;

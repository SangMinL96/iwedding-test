import CommonPrice from '@components/Price/CommonPrice';
import React from 'react';

interface Props {
  regularPrice: number;
  price: number;
  couponPrice: number;
  fontSize?: number;
}

const DetailProductPrice = ({ regularPrice, price, couponPrice = 0, fontSize = 14 }: Props) => {
  return (
    <>
      <CommonPrice fontSize={fontSize} title='정상가' price={regularPrice} regularPrice lineThrough />
      <CommonPrice title='판매가' fontSize={fontSize} price={price} />
      {couponPrice > 0 ? <CommonPrice title='쿠폰 적용가' coupon price={price - couponPrice} fontSize={fontSize} /> : null}
    </>
  );
};

export default React.memo(DetailProductPrice);

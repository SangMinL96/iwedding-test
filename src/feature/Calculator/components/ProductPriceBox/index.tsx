import CommonPrice from '@components/Price/CommonPrice';
import React from 'react';

interface Props {
  regularPrice: number;
  iWeddingPrice: number;
  bestPrice: number;
  fontSize?: number;
  coupon?: boolean;
}

const ProductPriceBox = ({ regularPrice, iWeddingPrice, bestPrice, coupon = false, fontSize = 14 }: Props) => {
  return (
    <>
      <CommonPrice fontSize={fontSize} title='정상가' price={regularPrice} regularPrice lineThrough />
      <CommonPrice title='아이웨딩가' fontSize={fontSize} price={iWeddingPrice} />
      {bestPrice ? (
        <CommonPrice title={`${coupon ? '쿠폰 적용가' : '최대혜택가'}`} coupon={!!coupon} price={bestPrice} fontSize={fontSize} />
      ) : null}
    </>
  );
};

export default React.memo(ProductPriceBox);

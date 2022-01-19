import React from 'react';
import { PriceNum } from './PriceNum';
import { PriceRow } from './PriceRow';
import { PriceTitle } from './PriceTitle';

interface Props {
  title: string;
  price: number | string;
  fontSize?: number;
  bold?: boolean;
  coupon?: boolean;
  regularPrice?: boolean;
  lineThrough?: boolean;
  final?: boolean;
}

const CommonPrice = ({ title, price, fontSize, bold, coupon, final, regularPrice, lineThrough }: Props) => {
  return (
    <PriceRow fontSize={fontSize} bold={bold} coupon={coupon} regularPrice={regularPrice}>
      <PriceTitle title={title} regularPrice={regularPrice} coupon={coupon} />
      <PriceNum price={price} coupon={coupon} final={final} lineThrough={lineThrough} />
    </PriceRow>
  );
};

export default React.memo(CommonPrice);

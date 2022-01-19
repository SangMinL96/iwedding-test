import { IbrandMyCouponLogEntity } from '@modules/mypage/coupon/interface';
import { isNotEmpty } from '@utils/util';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

const useTotalCouponDiscount = (selectedCoupons: IbrandMyCouponLogEntity[]): [number, Dispatch<SetStateAction<number>>] => {
  const [totalCpDiscount, setTotalCpDiscount] = useState<number>(0);
  useEffect(() => {
    if (isNotEmpty(selectedCoupons)) {
      setTotalCpDiscount(
        selectedCoupons.reduce(function (acc, obj) {
          if (obj && obj.decodedCoupon.b_price) {
            return acc + Number(obj.decodedCoupon.b_price);
          }
          return acc;
        }, 0),
      );
    }
  }, [selectedCoupons]);

  return [totalCpDiscount, setTotalCpDiscount];
};

export default useTotalCouponDiscount;

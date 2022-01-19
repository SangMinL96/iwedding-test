import dynamic from 'next/dynamic';
import React from 'react';
const CouponIndex = dynamic(() => import('@feature/coupon/CouponIndex'));

function CouponPageIndex() {
  return <CouponIndex />;
}

export default CouponPageIndex;

import React from 'react';
import dynamic from 'next/dynamic';
const RsvIndex = dynamic(() => import('@feature/coupon/rsv/RsvIndex'));
function index() {
  return <RsvIndex />;
}

export default index;

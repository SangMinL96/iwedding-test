import React from 'react';
import dynamic from 'next/dynamic';
const RsvDetail = dynamic(() => import('@feature/coupon/rsv/RsvDetail'));
function index() {
  return <RsvDetail />;
}

export default index;

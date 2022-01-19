import SiteTitle from '@components/layout/SiteTitle';
import dynamic from 'next/dynamic';
import React from 'react';
const Calculator = dynamic(() => import('@feature/Calculator'));

const index = () => {
  return (
    <>
      <SiteTitle title='견적 계산기' />
      <Calculator />
    </>
  );
};

export default index;

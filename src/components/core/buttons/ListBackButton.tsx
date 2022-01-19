import React from 'react';
import useGoBack from '@hooks/useGoBack';
import backBtn from '@images/common/back_btn.png';
import Image from 'next/image';

export default function ListBackButton() {
  const goBack = useGoBack(true);
  return (
    <button className='back-btn' onClick={goBack}>
      <Image unoptimized src={backBtn} width={9} height={18} alt='back-btn' />
    </button>
  );
}

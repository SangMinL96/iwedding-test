import React from 'react';
import Image from 'next/image';
import useGoBack from '@hooks/useGoBack';
import backBtn from '@images/common/back_btn.png';

type PropsType = {
  goMain?: boolean;
  onClickBack?: () => void;
};

export function BackButton({ goMain, onClickBack }: PropsType) {
  const goBack = useGoBack();
  return goMain ? (
    <a href={'/main/index'}>
      <button className='back-btn'>
        <Image unoptimized src={backBtn} alt='뒤로가기' width={9} height={18} />
      </button>
    </a>
  ) : (
    <button className='back-btn' onClick={onClickBack || goBack}>
      <Image unoptimized src={backBtn} alt='뒤로가기' width={9} height={18} />
    </button>
  );
}

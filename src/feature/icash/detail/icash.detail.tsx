import React from 'react';
const ActiveContainer = dynamic(() => import('@components/core/containers/ActiveContainer'));

import IcashDetailContent from './icash.detail.content';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

// 미션 클릭시 나오는 detail 페이지

interface IcashDetailProps {
  active: boolean;
}

const IcashDetail = ({ active }: IcashDetailProps) => {
  const router = useRouter();
  return (
    <ActiveContainer active={router.asPath.includes('icash-public') || active}>
      <IcashDetailContent />
    </ActiveContainer>
  );
};
export default IcashDetail;

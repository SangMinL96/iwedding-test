import MyPageLayout from '@components/layout/MyPageLayout';
import ZzimIndex from '@feature/zzim/zzim.index';
import React from 'react';

function ZzimPageIndex() {
  return (
    <MyPageLayout title='찜'>
      <ZzimIndex />
    </MyPageLayout>
  );
}

export default ZzimPageIndex;

import { Desktop } from '@hooks/useDevice';
import React from 'react';
import styled from 'styled-components';

const CouponNotice = () => {
  const isDesktop = Desktop();
  return (
    <Notice>
      적용 가능한 최대 할인 쿠폰이 적용가로, {!isDesktop && <br />}
      구매/사용 시점에 따라 변경될 수 있습니다.
    </Notice>
  );
};

const Notice = styled.p`
  line-height: 21px;
  margin-bottom: 21px;
`;

export default CouponNotice;

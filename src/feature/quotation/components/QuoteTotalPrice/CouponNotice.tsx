import React from 'react';
import styled from 'styled-components';

export const CouponNotice = () => {
  return (
    <Container>
      <p>유의사항</p>
      <span>견적 최종 금액은 쿠폰 혜택 기간과 결제 시점에 따라 변경될 수 있습니다</span>
    </Container>
  );
};

const Container = styled.div`
  width: calc(100% - 44px);
  margin-top: 20px;
  font-size: 14px;
  line-height: 20px;

  > p {
    font-weight: 700;
  }
`;

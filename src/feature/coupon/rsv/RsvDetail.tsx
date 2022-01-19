import MobileModalHeader from '@components/core/modal/AbstractModal/MobileModalHeader';
import PCModalHeader from '@components/core/modal/AbstractModal/PCModalHeader';
import { Desktop } from '@hooks/useDevice';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';

function RsvDetail() {
  const isDeskTop = Desktop();
  const router = useRouter();
  // 보겸차장님이 만들어준 예약하기 api중 어떤 아이디가 필요할지 모름.
  // 아래 데이터를 받기 위해 이런식으로 창을 열어야함 ex) /coupon/rsv?couponId=123&entId=땡땡떙F
  // const {couponId,entId,entName,bbsNo}= router.query

  const onClose = () => {
    if (isDeskTop) {
      global.window && window.close();
    } else {
      router.back();
    }
  };

  return (
    <Container>
      {isDeskTop ? <PCModalHeader title={'예약하기F'} onClose={onClose} /> : <MobileModalHeader title={'예약하기F'} onClose={onClose} />}
    </Container>
  );
}

export default React.memo(RsvDetail);

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

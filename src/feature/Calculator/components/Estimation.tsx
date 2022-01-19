import { WhiteButton } from '@feature/quotation/components/buttons/WhiteButton';
import { useModalVisible } from '@hooks/useModalVisible';
import theme from '@styles/theme';
import { COPY_QUOTE_MODAL } from '@utils/modalKeys';
import { showPrice } from '@utils/util';
import router from 'next/router';
import React from 'react';
import styled from 'styled-components';
import { useCalculatorState } from '../store/calcStore';
import CouponNotice from './CouponNotice';
import SectionHeader from './SectionHeader';

const getSum = (prices: number[]) => prices.reduce((acc, cur) => (acc += cur), 0);
export const CALC_ESTIMATION_ID = 'calc_estimation';

const Estimation = () => {
  const calcItems = useCalculatorState(state => state.calcItems);
  const { setModalVisible } = useModalVisible(COPY_QUOTE_MODAL);

  const prices = calcItems
    ?.filter(({ item }) => !!item)
    .map(({ item }) => [item?.product_price ?? 0, item?.price ?? 0, item?.event_price ?? 0]);
  const regularPrice = getSum(prices.map(p => p[0]));
  const iWeddingPrice = getSum(prices.map(p => p[1]));
  const couponPrice = getSum(prices.map(p => p[2] || p[1]));

  const handleCopyQuote = () => {
    setModalVisible(true);
    router.push(router.asPath + '#CopyModal');
  };
  return (
    <Wrapper id={CALC_ESTIMATION_ID}>
      <SectionHeader title='견적 계산 결과' />
      <Container>
        <Main>
          {couponPrice === iWeddingPrice ? (
            <>
              <LightPrice>정상가 {showPrice(regularPrice)}원</LightPrice>
              <MainPrice>
                <span>아이웨딩가</span>
                <p>{showPrice(iWeddingPrice)}원</p>
              </MainPrice>
            </>
          ) : (
            <>
              <LightPrice>
                정상가 {showPrice(regularPrice)}원 | 아이웨딩가 {showPrice(iWeddingPrice)}원
              </LightPrice>
              <MainPrice coupon>
                <span>최대 혜택가</span>
                <p>{showPrice(couponPrice)}원</p>
              </MainPrice>
            </>
          )}
          <CouponNotice />
        </Main>
        <CopyButton onClick={handleCopyQuote}>이대로 내 견적함에 추가하기</CopyButton>
      </Container>
    </Wrapper>
  );
};
export default Estimation;

const Wrapper = styled.div``;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  padding: 30px 20px;
  border-radius: 15px;
  background: white;
  filter: drop-shadow(2px 6px 9px rgba(0, 0, 0, 0.04));
`;

const Main = styled.div`
  font-size: 14px;
  padding: 0 4px;
`;

const LightPrice = styled.span`
  color: ${theme.gray};
`;

const MainPrice = styled.div<{ coupon?: boolean }>`
  display: flex;
  flex-direction: column;
  font-family: 'Poppins', sans-serif;

  > span {
    color: ${theme.lightBlack};
    margin-top: 19px;
    margin-bottom: 4px;
    font-size: 15px;
  }

  > p {
    color: ${({ coupon }) => (coupon ? theme.blue : theme.black)};
    font-size: 26px;
    font-weight: bold;
    line-height: 39px;
    margin-bottom: 15px;
  }
`;

const CopyButton = styled(WhiteButton)`
  border-radius: 10px;
  width: 100%;
`;

import TextArea from '@components/core/texts/TextArea';
import { Desktop } from '@hooks/useDevice';
import { IconCalculator } from '@svgs/icon_calculator';
import theme from '@styles/theme';
import React from 'react';
import styled from 'styled-components';

const Hero = () => {
  const isDesktop = Desktop();
  return (
    <Container>
      <Texts>
        <SDMTitle>스드메 견적 계산기</SDMTitle>
        <TA fontSize={14}>
          스드메 조합 견적을 간편하게 확인하고
          {!isDesktop && <br />} 내 견적함에 추가할 수 있어요.
        </TA>
      </Texts>
      {!isDesktop && <IconCalculator />}
    </Container>
  );
};

export default Hero;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 50px;
  padding: 43px 35px 31px 31px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(244, 246, 248, 1) 100%);

  @media (min-width: ${theme.pc}px) {
    background: rgb(255, 255, 255);
    padding: 70px 0 53px 0;
  }
`;

const Texts = styled.div`
  display: flex;
  @media (max-width: ${theme.pc}px) {
    flex-direction: column;
  }
`;
const SDMTitle = styled.p`
  font-weight: bold;
  font-size: 20px;
  @media (min-width: ${theme.pc}px) {
    font-size: 32px;
  }
`;
const TA = styled(TextArea)`
  text-align: unset;
  margin: 10px 0;
  line-height: 21px;

  @media (min-width: ${theme.pc}px) {
    margin-left: 20px;
  }
`;

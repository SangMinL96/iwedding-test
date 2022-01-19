import React from 'react';
import BoyImg from '@images/common/boy@2x.png';
import GirlImg from '@images/common/girl@2x.png';
import theme from '@styles/theme';
import styled from 'styled-components';
import SectionHeader from '../SectionHeader';
import LinkBox from './LinkBox';

const index = () => {
  return (
    <Wrapper>
      <SectionHeader title='견적함' />
      <Container>
        <LinkBox header={'나의 견적함'} mainText='모든 상품 견적내고 싶다면?' to='' img={GirlImg.src} color='#96a8e5' />
        <Divider />
        <LinkBox header={'실시간 견적'} mainText='다양한 견적이 궁금하다면?' to='realtime' img={BoyImg.src} color='#96D3E5' />
      </Container>
    </Wrapper>
  );
};

export default index;
const Wrapper = styled.div`
  width: 560px;
  margin: auto;
  margin-bottom: 120px;

  @media (max-width: ${theme.pc}px) {
    width: 100%;
    padding: 15px;
  }
`;
const Container = styled.div`
  position: relative;
  width: 100%;
  height: 201px;
  margin: auto;
  padding: 25px 20px;
  border: 1px solid #e6e6ea;
  border-radius: 15px;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  margin: 20px auto;
  background: #e6e6ea;
  @media (min-width: ${theme.pc}px) {
    width: 400px;
  }
`;

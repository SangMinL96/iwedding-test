import { Desktop } from '@hooks/useDevice';
import theme from '@styles/theme';
import React from 'react';
import styled from 'styled-components';

const LoadingContainer = () => {
  const isDeskTop = Desktop();
  return (
    <Container>
      {Array.from({ length: isDeskTop ? 40 : 30 }).map((_, index) => (
        <CardContainer key={index}>
          <ImgContainer>
            <div />
          </ImgContainer>
          <Category />
          <Title />
        </CardContainer>
      ))}
    </Container>
  );
};

export default React.memo(LoadingContainer);

const Container = styled.div`
  display: grid;
  place-items: center;
  grid-template-columns: repeat(4, 1fr);
  width: 100%;
  grid-gap: 50px 30px;
  margin-bottom: 80px;
  @media (max-width: ${theme.pc + 1}px) {
    grid-template-columns: repeat(3, 1fr);
    padding: 0 15px;
  }

  @media (max-width: ${theme.tablet}px) {
    grid-template-columns: repeat(2, 1fr);
    padding: 0 15px;
    grid-gap: 50px 15px;
  }
`;
const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 230px;
  width: 100%;
  height: 100%;

  vertical-align: top;
  @media (max-width: ${theme.pc + 1}px) {
    min-width: 100%;
  }

  @media (max-width: ${theme.tablet}px) {
    min-width: 100%;
  }
  @keyframes fadein {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
 animation: fadein 1.2s ease-in-out infinite;
`;

const ImgContainer = styled.div`
 
  position: relative;
  width: 100%;
  padding-top: 100%;
  margin-bottom: 12px;
  background: rgba(236, 239, 241, 0.856);
 
`;

const Category = styled.span`
  background-color: rgb(236, 239, 241);
  height: 10px;
  width: 60px;
  border-radius: 10px;
  
`;

const Title = styled.p`
  margin-top: 8px;
  background-color: rgb(236, 239, 241);
  height: 15px;
  width: 100%;
  border-radius: 10px;

`;

import dynamic from 'next/dynamic';
import React from 'react';
import styled from 'styled-components';
import { useRecentKeywords, useRecommendKeywords } from '../../hooks';
const KeywordList = dynamic(() => import('./KeywordList'));

export const SearchBody = () => {
  const { recentKeywords } = useRecentKeywords();
  const recommendedKeywords = useRecommendKeywords();
  return (
    <Container>
      <KeywordList list={recentKeywords ?? []} isRecent />
      <KeywordList list={recommendedKeywords} />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  padding: 20px;
`;

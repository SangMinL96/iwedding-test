import GridContainer from '@feature/product/GridContainer';
import { useMdRecommendData } from '@modules/search/searchAPI';
import React from 'react';
import styled from 'styled-components';
import PopularKeywordPC from './PopularKeywordPC';

function NoSearchResultPC() {
  const { data } = useMdRecommendData(8);
  return (
    <Container>
      <PopularKeywordPC />
      <GridWidthBox>
        <h3>웨딩 MD 추천 패키지</h3>
        <GridContainer list={data} />
      </GridWidthBox>
    </Container>
  );
}

export default React.memo(NoSearchResultPC);
const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

const GridWidthBox = styled.div`
  width: calc(100% - 269px);
  h3 {
    padding: 30px 0 22px 0;
    font-size: 24px;
    font-weight: 500;
    color: #262626;
  }
`;

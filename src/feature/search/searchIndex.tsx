import theme from '@styles/theme';
import React from 'react';
import styled from 'styled-components';
import MobileSearch from './components/MobileSearch';
import MDKeyword from './sections/MDKeyword';
import MDRecommendProduct from './sections/MDRecommendProduct';
import PopularKeyword from './sections/PopularKeyword';
import RecentKeyword from './sections/RecentKeyword';

const SearchIndex = () => {
  return (
    <Container>
      <MobileSearch type='index' />
      <div className='search_part'>
        <RecentKeyword type='index' />
        <PopularKeyword type='index' />
        <MDKeyword type='index' />
        <MDRecommendProduct />
      </div>
    </Container>
  );
};

export default SearchIndex;

const Container = styled.div`
  position: relative;
  width: 100%;
  .search_part {
    position: relative;
    overflow: hidden;
    width: 1280px;
    min-width: 1280px;
    margin: 0 auto;
    padding-bottom: 80px;
    @media all and (max-width: ${theme.pc}px) {
      width: 100%;
      min-width: 100%;
    }
  }
`;

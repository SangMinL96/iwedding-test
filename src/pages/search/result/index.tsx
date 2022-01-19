import React from 'react';
import dynamic from 'next/dynamic';

const SearchResult = dynamic(() => import('@feature/search/searchResult'));

function Index() {
  return <SearchResult />;
}

export default Index;

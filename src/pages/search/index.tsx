import React from 'react';
import dynamic from 'next/dynamic';

const SearchIndex = dynamic(() => import('@feature/search/searchIndex'));

function Index() {
  return <SearchIndex />;
}

export default Index;

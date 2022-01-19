import { Desktop } from '@hooks/useDevice';
import { useSearchBannerData } from '@modules/search/searchAPI';
import React from 'react';
import BannerSlide from '../components/BannerSlide';

function NoSearchResultBanner() {
  const isDeskTop = Desktop();
  const { data: bannerList } = useSearchBannerData('99');
  return <BannerSlide data={bannerList?.top} searchResult noTopMargin noBottomMargin isNoneResult />;
}

export default NoSearchResultBanner;

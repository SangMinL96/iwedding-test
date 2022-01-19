import { useDeepEffect } from '@hooks/useDeepEffect';
import { useInfinityScroll } from '@hooks/useInifinityScroll';
import { REALTIME_LAST_QUOTE_META, useRealtimeInfiPage } from '@modules/mypage/quotation/QuotationAPI';
import { setScrollY } from '@utils/util';
import dynamic from 'next/dynamic';
import React, { useEffect } from 'react';
import { QuoteListContainer } from '../components/QuotationList/QuoteListContainer';
import QuoteListItem from '../components/QuotationList/QuoteListItem';
import { useLastQuoteMetadata } from '../hooks/useLastQuoteMetadata';

const NoList = dynamic(() => import('@components/core/texts/NoList'));
const Loading = dynamic(() => import('@components/Loading'));

const InfiniteRealtimeList = () => {
  const { data, metadata, isValidating, size, setSize } = useRealtimeInfiPage();
  const { lastQuoteMetadata, setLastQuoteMetadata } = useLastQuoteMetadata(REALTIME_LAST_QUOTE_META);
  useInfinityScroll({
    isMobile: true,
    isFetching: isValidating,
    canNext: metadata?.totalPages > size,
    onNextPage: () => {
      setSize(size + 1);
    },
  });

  useEffect(() => {
    setScrollY(lastQuoteMetadata?.scroll);
  }, [lastQuoteMetadata]);

  useDeepEffect(() => {
    setLastQuoteMetadata({ totalItems: metadata?.totalItems || 0 });
  }, [metadata]);

  return (
    <QuoteListContainer>
      {!data && isValidating ? (
        <Loading body='견적함을 불러오는 중입니다.' />
      ) : metadata?.totalItems > 0 ? (
        <>
          {data?.map(page => page.items.map(item => <QuoteListItem quotation={item} key={item.group_no} isRealtime />))}
          {isValidating && <Loading body='견적함을 불러오는 중입니다.' />}
        </>
      ) : (
        <NoList text='해당 조건을 만족하는 견적함이 없습니다.' noBorder />
      )}
    </QuoteListContainer>
  );
};

export default InfiniteRealtimeList;

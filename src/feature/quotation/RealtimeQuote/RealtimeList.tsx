import NoList from '@components/core/texts/NoList';
import Loading from '@components/Loading';
import { useDeepEffect } from '@hooks/useDeepEffect';
import { usePagination } from '@hooks/usePagination';
import { REALTIME_LAST_QUOTE_META, REALTIME_PAGINATION, useGetRealtimeQuotation } from '@modules/mypage/quotation/QuotationAPI';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import { QuoteListContainer } from '../components/QuotationList/QuoteListContainer';
import QuoteListItem from '../components/QuotationList/QuoteListItem';
import { useLastQuoteMetadata } from '../hooks/useLastQuoteMetadata';

const Pagination = dynamic(() => import('@components/Pagination'));
const NUM_OF_PAGES_PER_CALL = 15;
const ITEMS_PER_PAGE = 6;

/**
 * 6개씩 부를 경우 다음 페이지로 이동 시
 * 노드에서 데이터 끌어오는 게 너무 느려서 90개씩 불러서 프론트에서 나눠줌.
 */
const RealtimeList = () => {
  const { page } = usePagination(REALTIME_PAGINATION);
  const [batch, setBatch] = useState(1);
  const { data, metadata, isValidating } = useGetRealtimeQuotation(batch);
  const { setLastQuoteMetadata } = useLastQuoteMetadata(REALTIME_LAST_QUOTE_META);
  const currentBatch = Math.ceil(page / NUM_OF_PAGES_PER_CALL);
  const startIndex = page > NUM_OF_PAGES_PER_CALL ? ((page - 1) % NUM_OF_PAGES_PER_CALL) * ITEMS_PER_PAGE : (page - 1) * ITEMS_PER_PAGE;

  useDeepEffect(() => {
    setLastQuoteMetadata({ totalItems: metadata?.totalItems || 0 });
  }, [metadata]);

  useDeepEffect(() => {
    if (currentBatch !== batch) {
      setBatch(currentBatch);
    }
  }, [page]);

  return isValidating ? (
    <Loading body='견적함을 불러오는 중입니다.' />
  ) : data?.length ? (
    <>
      <QuoteListContainer>
        {data?.slice(startIndex, startIndex + ITEMS_PER_PAGE).map(item => (
          <QuoteListItem quotation={item} key={item.group_no} isRealtime />
        ))}
      </QuoteListContainer>
      <Pagination totalItems={metadata?.totalItems || 0} paginationKey={REALTIME_PAGINATION} />
    </>
  ) : (
    <NoList text='해당 조건을 만족하는 견적함이 없습니다.' noBorder />
  );
};

export default React.memo(RealtimeList);

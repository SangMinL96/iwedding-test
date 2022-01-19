import { useDeepEffect } from '@hooks/useDeepEffect';
import { Desktop } from '@hooks/useDevice';
import { useModalVisible } from '@hooks/useModalVisible';
import { useSort } from '@hooks/useSort';
import { REALTIME_LAST_QUOTE_META } from '@modules/mypage/quotation/QuotationAPI';
import { RT_QUOTE_SORT } from '@utils/localSwrKeys';
import { DETAIL_SORT_MODAL } from '@utils/modalKeys';
import { storeSortOptions, SortType } from '@utils/sortOptions';
import dynamic from 'next/dynamic';
import React, { useCallback } from 'react';
import SortSection from '../components/SortSection';
import { useLastQuoteMetadata } from '../hooks/useLastQuoteMetadata';
import { useSelectedSortValue } from '../hooks/useSelectedSortValue';
import { ConfigSection } from './ConfigSection';

const RealtimeList = dynamic(() => import('./RealtimeList'));
const InfiniteRealtimeList = dynamic(() => import('./InfiniteRealtimeList'));
const ModalRealDetailSortIndex = dynamic(() => import('../components/modals/detail_sort_modal/ModalRealSortIndex'));

const RealtimeQuote = () => {
  const { currentSort } = useSort(RT_QUOTE_SORT, storeSortOptions[0]);
  const { lastQuoteMetadata, setLastQuoteMetadata } = useLastQuoteMetadata(REALTIME_LAST_QUOTE_META);
  const { selectedSortValue } = useSelectedSortValue();

  const { modalVisible: visibleDetailSort, setModalVisible: setVisibleDetailSort } = useModalVisible(DETAIL_SORT_MODAL);

  useDeepEffect(() => {
    setLastQuoteMetadata({ sort: currentSort?.method as SortType });
  }, [currentSort?.method]);

  const onCloseFilter = useCallback(() => {
    setVisibleDetailSort(false);
  }, [setVisibleDetailSort]);

  const isDesktop = Desktop();

  return (
    <>
      {visibleDetailSort && <ModalRealDetailSortIndex visible={visibleDetailSort} onClose={onCloseFilter} />}
      <ConfigSection selected={selectedSortValue && Object.keys(selectedSortValue).length} />
      <SortSection swrKey={RT_QUOTE_SORT} options={storeSortOptions} totalItems={lastQuoteMetadata?.totalItems || 0} />
      {isDesktop ? <RealtimeList /> : <InfiniteRealtimeList />}
    </>
  );
};

export default RealtimeQuote;

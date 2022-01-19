import { useDeepEffect } from '@hooks/useDeepEffect';
import { Desktop } from '@hooks/useDevice';
import { useModalVisible } from '@hooks/useModalVisible';
import { usePagination } from '@hooks/usePagination';
import { useSort } from '@hooks/useSort';
import { MY_QUOTE_METADATA, MY_QUOTE_PAGINATION } from '@modules/mypage/quotation/QuotationAPI';
import { MY_QUOTE_SORT } from '@utils/localSwrKeys';
import { CREATE_QUOTE_MODAL } from '@utils/modalKeys';
import { storeSortOptions, SortType } from '@utils/sortOptions';
import { overFlowHidden, setScrollY } from '@utils/util';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect } from 'react';
import { useLastQuoteMetadata } from '../hooks/useLastQuoteMetadata';
import { useSelectedCartList } from '../hooks/useSelectedCartList';

const InfiMyQuoteList = dynamic(() => import('./InfiMyQuoteList'));
const MyQuoteList = dynamic(() => import('./MyQuoteList'));

const MyQuotation = () => {
  const { clearSelectedCartList } = useSelectedCartList();
  const { lastQuoteMetadata, setLastQuoteMetadata } = useLastQuoteMetadata(MY_QUOTE_METADATA);
  const { setModalVisible } = useModalVisible(CREATE_QUOTE_MODAL);
  const router = useRouter();

  useDeepEffect(() => {
    clearSelectedCartList();
  }, []);

  const { currentSort } = useSort(MY_QUOTE_SORT, storeSortOptions[0]);
  const { setPage } = usePagination(MY_QUOTE_PAGINATION);

  const handleNewQuote = useCallback(() => {
    router.push(router.asPath + '#NewQuote');
    overFlowHidden();
    setModalVisible(true);
  }, [setModalVisible, router]);

  //페이징 스크롤 메타데이터
  useDeepEffect(() => {
    if (Object.keys(lastQuoteMetadata).length) {
      setPage(lastQuoteMetadata.page);
      setScrollY(lastQuoteMetadata.scroll);
    } else {
      setLastQuoteMetadata({
        page: 1,
        scroll: 0,
        sort: storeSortOptions[0].method as SortType,
      });
    }
  }, [lastQuoteMetadata]);

  useDeepEffect(() => {
    setLastQuoteMetadata({ sort: currentSort?.method as SortType });
  }, [currentSort]);

  const isDesktop = Desktop();
  return isDesktop ? <MyQuoteList handleNewQuote={handleNewQuote} /> : <InfiMyQuoteList handleNewQuote={handleNewQuote} />;
};

export default MyQuotation;

import Loading from '@components/Loading';
import { useLastQuoteMetadata } from '@feature/quotation/hooks/useLastQuoteMetadata';
import { useInfinityScroll } from '@hooks/useInifinityScroll';
import { useModalVisible } from '@hooks/useModalVisible';
import { MY_QUOTE_METADATA, useInfiMyQuotationList } from '@modules/mypage/quotation/QuotationAPI';
import { MY_QUOTE_SORT } from '@utils/localSwrKeys';
import { CREATE_QUOTE_MODAL } from '@utils/modalKeys';
import { storeSortOptions } from '@utils/sortOptions';
import { setScrollY } from '@utils/util';
import dynamic from 'next/dynamic';
import React, { useCallback, useEffect } from 'react';
import PullToRefresh from 'react-simple-pull-to-refresh';
import { QuoteListContainer } from '../components/QuotationList/QuoteListContainer';
import QuoteListItem from '../components/QuotationList/QuoteListItem';
import SortSection from '../components/SortSection';
import { MyQuoteProps } from './MyQuoteList';
import NewQuote from './NewQuote';

const ModalCreateQuotation = dynamic(() => import('../components/modals/ModalCreateQuotation'));

const InfiMyQuoteList = ({ handleNewQuote }: MyQuoteProps) => {
  const { lastQuoteMetadata } = useLastQuoteMetadata(MY_QUOTE_METADATA);
  const { data, metadata, mutate, isValidating, size, setSize } = useInfiMyQuotationList();
  const { modalVisible, setModalVisible } = useModalVisible(CREATE_QUOTE_MODAL);

  useInfinityScroll({
    isMobile: true,
    canNext: metadata?.currentPage < metadata?.totalPages,
    onNextPage: () => setSize(size + 1),
    isFetching: isValidating,
  });

  useEffect(() => {
    setScrollY(lastQuoteMetadata?.scroll);
  }, [lastQuoteMetadata]);

  const handleRefresh = useCallback(async () => await mutate(), [mutate]);
  const onCreateQuote = useCallback(() => {
    setModalVisible(false);
    mutate();
  }, [setModalVisible, mutate]);

  return (
    <>
      {modalVisible && <ModalCreateQuotation onClose={onCreateQuote} visible={modalVisible} />}
      <NewQuote onClick={handleNewQuote} />
      <SortSection options={storeSortOptions} swrKey={MY_QUOTE_SORT} totalItems={metadata?.totalItems || 0} />
      <PullToRefresh onRefresh={handleRefresh}>
        <QuoteListContainer>
          {!data && isValidating ? (
            <Loading body='견적함을 불러오는 중입니다.' />
          ) : (
            <>
              {data?.map(list => list?.items.map(quotation => <QuoteListItem quotation={quotation} key={quotation.group_no} />))}
              {isValidating && <Loading body='견적함을 불러오는 중입니다.' />}
            </>
          )}
        </QuoteListContainer>
      </PullToRefresh>
    </>
  );
};

export default InfiMyQuoteList;

import Loading from '@components/Loading';
import Pagination from '@components/Pagination';
import { useModalVisible } from '@hooks/useModalVisible';
import { MY_QUOTE_PAGINATION, useMyQuotationList } from '@modules/mypage/quotation/QuotationAPI';
import { MY_QUOTE_SORT } from '@utils/localSwrKeys';
import { CREATE_QUOTE_MODAL } from '@utils/modalKeys';
import { storeSortOptions } from '@utils/sortOptions';
import React, { useCallback } from 'react';
import ModalCreateQuotation from '../components/modals/ModalCreateQuotation';
import QuotationList from '../components/QuotationList';
import SortSection from '../components/SortSection';
import NewQuote from './NewQuote';

export interface MyQuoteProps {
  handleNewQuote: () => void;
}

const MyQuoteList = ({ handleNewQuote }: MyQuoteProps) => {
  const { list, metadata, mutate, isValidating } = useMyQuotationList();
  const { modalVisible, setModalVisible } = useModalVisible(CREATE_QUOTE_MODAL);

  const onCreateQuote = useCallback(() => {
    setModalVisible(false);
    mutate();
  }, [setModalVisible, mutate]);

  return (
    <>
      {modalVisible && <ModalCreateQuotation onClose={onCreateQuote} visible={modalVisible} />}
      <NewQuote onClick={handleNewQuote} />
      <SortSection options={storeSortOptions} swrKey={MY_QUOTE_SORT} totalItems={metadata?.totalItems || 0} />
      {isValidating ? (
        <Loading body='견적함을 불러오는 중 입니다.' />
      ) : (
        <>
          <QuotationList list={list} />
          <Pagination itemsPP={6} totalItems={metadata?.totalItems || 0} pageRange={5} paginationKey={MY_QUOTE_PAGINATION} />
        </>
      )}
    </>
  );
};

export default MyQuoteList;

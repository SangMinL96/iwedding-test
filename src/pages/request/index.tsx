import NoList from '@components/core/texts/NoList';
import useCrossTabState from '@hooks/useCrossTabState';
import { useDeepEffect } from '@hooks/useDeepEffect';
import { useModalVisible } from '@hooks/useModalVisible';
import { usePagination } from '@hooks/usePagination';
import { useSwrLocal } from '@hooks/useSwrLocal';
import { useQnAList } from '@modules/mypage/QnA/QnAApi';
import { QnAProps } from '@modules/mypage/QnA/QnAInterface';
import { DropdownOption } from '@utils/dropdownOptions';
import { FILTER_BY_BRAND, FILTER_BY_STATUS } from '@utils/localSwrKeys';
import { QNA_EDIT_MODAL, QNA_FORM_MODAL } from '@utils/modalKeys';
import { usePaginatedList } from 'feature/QnA/hooks/usePaginatedList';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';

const QnAEditModal = dynamic(() => import('@feature/QnA/QnAEditModal'));
const QnAFormModal = dynamic(() => import('@feature/QnA/QnAFormModal'));
const MyPageLayout = dynamic(() => import('@components/layout/MyPageLayout'));
const Loading = dynamic(() => import('@components/Loading'));
const Pagination = dynamic(() => import('@components/Pagination'));
const FilterSection = dynamic(() => import('@feature/QnA/components/FilterSection'));
const MyPageQnAHero = dynamic(() => import('@feature/QnA/components/MyPageQnAHero'));
const QnAList = dynamic(() => import('@feature/QnA/components/QnAList'));

const QNA_PAGINATION = 'QNA_PAGINATION';
const Request = () => {
  const { list, isValidating, mutateList } = useQnAList();
  const { modalVisible: formModalVisible } = useModalVisible(QNA_FORM_MODAL);
  const { modalVisible: editModalVisible } = useModalVisible(QNA_EDIT_MODAL);
  const { data: statusFilter } = useSwrLocal<DropdownOption>(FILTER_BY_STATUS);
  const { data: brandFilter } = useSwrLocal<DropdownOption>(FILTER_BY_BRAND);
  const [filteredList, setFilteredList] = useState<QnAProps[]>([]);
  const { page, setPage } = usePagination(QNA_PAGINATION);
  const [tableRefetch, setTableRefetch] = useCrossTabState('tableRefetch', false);

  useEffect(() => {
    if (tableRefetch) {
      mutateList();
      setTableRefetch(false);
    }
  }, [tableRefetch]);

  useDeepEffect(() => {
    setFilteredList(list);
  }, [list, setFilteredList]);

  // filter
  useDeepEffect(() => {
    if (statusFilter) {
      setPage(1);
      if (statusFilter.method == 'all') {
        setFilteredList(list);
      } else if (statusFilter.method == 'complete') {
        setFilteredList(list.filter(li => li.status == '답변완료'));
      } else if (statusFilter.method == 'incomplete') {
        setFilteredList(list.filter(li => li.status == '미완료'));
      } else {
        setFilteredList(list.filter(li => li.status == '답변중'));
      }
    }
  }, [statusFilter]);

  useDeepEffect(() => {
    if (brandFilter) {
      setPage(1);
      if (brandFilter.method == 'all') {
        setFilteredList(list);
      } else {
        setFilteredList(list.filter(li => li.mainCategory == brandFilter.title));
      }
    }
  }, [brandFilter]);
  const paginatedList = () => {
    return filteredList?.slice((page - 1) * 10, page * 10);
  };
  return (
    <>
      <MyPageLayout title='문의 내역'>
        <MyPageQnAHero />
        <FilterSection />
        {isValidating ? (
          <Loading body='문의 내역을 불러오는 중 입니다.' />
        ) : filteredList?.length ? (
          <>
            <QnAList setFilteredList={setFilteredList} list={paginatedList()} />
            <Pagination itemsPP={10} totalItems={filteredList?.length || 0} pageRange={5} paginationKey={QNA_PAGINATION} />
          </>
        ) : (
          <NoList text='문의 내역이 없습니다.' />
        )}
      </MyPageLayout>
      {formModalVisible && <QnAFormModal />}
      {editModalVisible && <QnAEditModal />}
    </>
  );
};

export default Request;

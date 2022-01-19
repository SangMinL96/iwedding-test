import { useBbsPageState } from '@feature/Ibrandplus/hooks/useBbsPageState';
import { Desktop } from '@hooks/useDevice';
import { useSearchTabData } from '@modules/search/searchAPI';
import theme from '@styles/theme';
import { eventSortOptions } from '@utils/sortOptions';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import shallow from 'zustand/shallow';
import LoadingContainer from '../../../components/LoadingContainer';
import GridContainer from '../components/GridContainer';
const NoListDataBox = dynamic(() => import('../components/NoListDataBox'));
const SortSectionPC = dynamic(() => import('@feature/Ibrandplus/pcUI/SortSectionPC'));
const SortSection = dynamic(() => import('@feature/Ibrandplus/SortSection'));
const Pagination = dynamic(() => import('@components/Pagination/BbsPagination'));

const SearchEvent = ({ totalCount }: any) => {
  const {
    query: { keyword, tag, category: queryCategory, page, subCategory },
  } = useRouter();
  const isDeskTop = Desktop();

  const selectedCategory = useBbsPageState(state => state.selectedCategory, shallow);
  const currentSort = useBbsPageState(state => state.currentSort, shallow);
  const setCurrentSort = useBbsPageState(state => state.setCurrentSort, shallow);
  const infinityPage = useBbsPageState(state => state.infinityPage, shallow);

  const { list, isValidating } = useSearchTabData({
    keyword,
    contentsCategory: '3',
    category: queryCategory || '전체',
    subCategory: subCategory || '전체',
    sort: currentSort || eventSortOptions[0].method,
    page: isDeskTop ? page : infinityPage,
    tag,
    isDeskTop,
  });
  useEffect(() => {
    setCurrentSort(eventSortOptions[0].method);
  }, []);
  return (
    <Container>
      <div className='search_sort_box'>
        {isDeskTop ? (
          <SortSectionPC
            isSearch={true}
            mainCategory={selectedCategory?.displayName}
            totalItems={list?.meta?.totalItems}
            sortOptions={eventSortOptions}
          />
        ) : (
          <SortSection
            isSearch={true}
            mainCategory={selectedCategory?.displayName}
            totalItems={list?.meta?.totalItems}
            sortOptions={eventSortOptions}
          />
        )}
      </div>
      {infinityPage === 1 && isValidating ? (
        <LoadingContainer />
      ) : (
        <section style={{ width: '100%' }}>
          {list?.items?.length === 0 && <NoListDataBox isSearch />}
          <GridContainer totalCount={totalCount} contentType={'이벤트'} list={list?.items ?? []} />
          {list?.meta?.totalItems && isDeskTop ? <Pagination totalItems={list?.meta?.totalItems} /> : null}
        </section>
      )}
    </Container>
  );
};

export default React.memo(SearchEvent);

const Container = styled.div`
  .search_sort_box {
    position: relative;
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 0 15px;
    @media all and (min-width: 1280px) {
      padding: 0;
      margin-top: 0;
      margin-bottom: 0;
    }
    h3 {
      font-size: 16px;
      font-weight: bold;
    }
  }
  .swiper-container {
    .swiper-wrapper {
      width: 100%;
      .swiper-slide {
        width: auto;
        button {
          border: 1px solid #dfdfdf;
          padding: 8px 12px;
          border-radius: 7px;
          color: #020202;
          padding: 7px 10px 9px 10px;
        }
        .active {
          background-color: #4866e4;
          color: #ffffff;
          font-size: 13px;
          font-weight: bold;
        }
        span {
          font-size: 14px;
          color: ${theme.blue};
        }
      }
    }
  }
`;

const FilterContainer = styled.ul`
  width: 100%;
`;

const FilterBox = styled.li`
  width: 100%;
  height: 44px;
  border-bottom: 1px solid #e7e7e7;
  padding: 15px 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  h3 {
    width: 100px;
  }
`;

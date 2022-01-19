import { useBbsPageState } from '@feature/Ibrandplus/hooks/useBbsPageState';
import { Desktop } from '@hooks/useDevice';
import { useSearchTabData } from '@modules/search/searchAPI';
import theme from '@styles/theme';
import { brandSortOptions } from '@utils/sortOptions';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';
import shallow from 'zustand/shallow';
import LoadingContainer from '../../../components/LoadingContainer';
import GridContainer from '../components/GridContainer';
const NoListDataBox = dynamic(() => import('../components/NoListDataBox'));
const SortSectionPC = dynamic(() => import('@feature/Ibrandplus/pcUI/SortSectionPC'));
const SortSection = dynamic(() => import('@feature/Ibrandplus/SortSection'));
const Pagination = dynamic(() => import('@components/Pagination/BbsPagination'));

const SearchBrand = ({ totalCount }: any) => {
  const router = useRouter();

  const {
    query: { keyword, tag, category: queryCategory, page, subCategory },
  } = useRouter();
  const isDeskTop = Desktop();
  const selectedCategory = useBbsPageState(state => state.selectedCategory, shallow);
  const currentSort = useBbsPageState(state => state.currentSort, shallow);
  const infinityPage = useBbsPageState(state => state.infinityPage, shallow);

  const { list, isValidating } = useSearchTabData({
    keyword,
    isDeskTop,
    contentsCategory: '1',
    category: queryCategory || '전체',
    subCategory: subCategory || '전체',
    sort: currentSort || brandSortOptions[0].method,
    page: isDeskTop ? page : infinityPage,
    tag,
  });

  return (
    <Container>
      <div className='search_sort_box'>
        {isDeskTop ? (
          <SortSectionPC
            isSearch={true}
            mainCategory={selectedCategory?.displayName}
            totalItems={list?.meta?.totalItems}
            sortOptions={brandSortOptions}
          />
        ) : (
          <SortSection
            isSearch={true}
            mainCategory={selectedCategory?.displayName}
            totalItems={list?.meta?.totalItems}
            sortOptions={brandSortOptions}
          />
        )}
      </div>
      {infinityPage === 1 && isValidating ? (
        <LoadingContainer />
      ) : (
        <section style={{ width: '100%' }}>
          {list?.items?.length === 0 && <NoListDataBox isSearch />}
          <GridContainer totalCount={totalCount} contentType={'브랜드'} list={list?.items ?? []} />
          {list?.meta?.totalItems && isDeskTop ? <Pagination totalItems={list?.meta?.totalItems} /> : null}
        </section>
      )}
    </Container>
  );
};

export default React.memo(SearchBrand);

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

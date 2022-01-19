import GridContainer from '@feature/Ibrandplus/GridContainer';
import { useBbsPageState } from '@feature/Ibrandplus/hooks/useBbsPageState';
import { Desktop } from '@hooks/useDevice';
import { useBBSData } from '@modules/ibrandplus/ibrandplusAPI';
import { eventSortOptions } from '@utils/sortOptions';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';
import shallow from 'zustand/shallow';
const CategorySection = dynamic(() => import('@feature/Ibrandplus/CategorySection'), { ssr: false });
const LoadingContainer = dynamic(() => import('@components/LoadingContainer'), { ssr: false });
const FilterSectionPC = dynamic(() => import('@feature/Ibrandplus/pcUI/FilterSectionPC'), { ssr: false });
const SortSectionPC = dynamic(() => import('@feature/Ibrandplus/pcUI/SortSectionPC'), { ssr: false });
const SortSection = dynamic(() => import('@feature/Ibrandplus/SortSection'), { ssr: false });
const NoListDataBox = dynamic(() => import('@feature/search/components/NoListDataBox'), { ssr: false });
const SiteTitle = dynamic(() => import('@components/layout/SiteTitle'), { ssr: false });
const FilterSection = dynamic(() => import('@feature/Ibrandplus/FilterSection'), { ssr: false });
const Pagination = dynamic(() => import('@components/Pagination/BbsPagination'), { ssr: false });

const EventPage = () => {
  const {
    query: { category: queryCategory, tag, keyword, page, subCategory },
  } = useRouter();
  const isDeskTop = Desktop();
  const selectedCategory = useBbsPageState(state => state.selectedCategory, shallow);
  const currentSort = useBbsPageState(state => state.currentSort, shallow);
  const infinityPage = useBbsPageState(state => state.infinityPage, shallow);
  const { list, isValidating } = useBBSData({
    page: isDeskTop ? page : infinityPage,
    isDeskTop,
    category: queryCategory,
    subCategory: subCategory || '전체',
    tag: tag || '',
    keyword: keyword || '',
    contentsCategory: '3',
    sort: currentSort || eventSortOptions[0].method,
  });
  return (
    <Container>
      <SiteTitle title='이벤트' />
      <CategorySection category='이벤트' categoryKey='event' />
      {isDeskTop && (
        <WebContainer>
          <FilterSectionPC category='event' />
          <PcGridBox>
            <SortSectionPC
              category='event'
              mainCategory={selectedCategory?.displayName}
              totalItems={list?.meta?.totalItems}
              sortOptions={eventSortOptions}
            />
            {infinityPage === 1 && isValidating ? (
              <LoadingContainer />
            ) : (
              <div style={{ width: '100%' }}>
                {list?.items?.length === 0 && <NoListDataBox />}
                <GridContainer list={list?.items ?? []} event category={selectedCategory?.displayName} contents_category={'3'} />
                {list?.meta?.totalItems && isDeskTop ? <Pagination totalItems={list?.meta?.totalItems} /> : null}
              </div>
            )}
          </PcGridBox>
        </WebContainer>
      )}
      {!isDeskTop && (
        <section style={{ width: '100%' }}>
          <FilterSection category='event' />
          <SortSection
            category='event'
            mainCategory={selectedCategory?.displayName}
            totalItems={list?.meta?.totalItems}
            sortOptions={eventSortOptions}
          />
          {infinityPage === 1 && isValidating ? (
            <LoadingContainer />
          ) : (
            <div style={{ width: '100%' }}>
              {list?.items?.length === 0 && <NoListDataBox />}
              <GridContainer list={list?.items ?? []} event category={selectedCategory?.displayName} contents_category={'3'} />
            </div>
          )}
        </section>
      )}
      {/* {formVisible && <QnAFormModal visible={formVisible} />}
    {copyVisible && <ModalCopyQuotation visible={copyVisible} is_realtime={false} />} */}
    </Container>
  );
};

export default EventPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: min(1280px, 100vw);
  margin: auto;
  padding-bottom: 120px;
`;

const WebContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: min(1280px, 100vw);
  padding-bottom: 120px;
`;

const PcGridBox = styled.div`
  width: calc(100% - 270px);
`;

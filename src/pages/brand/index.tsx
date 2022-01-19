import dynamic from 'next/dynamic';
import { useBbsPageState } from '@feature/Ibrandplus/hooks/useBbsPageState';
import { Desktop } from '@hooks/useDevice';
import { useBBSData } from '@modules/ibrandplus/ibrandplusAPI';
import { brandSortOptions } from '@utils/sortOptions';
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
const GridContainer = dynamic(() => import('@feature/Ibrandplus/GridContainer'), { ssr: false });

const BrandPage = () => {
  const {
    query: { category: queryCategory, tag, keyword, page, subCategory },
  } = useRouter();

  const isDeskTop = Desktop();
  const selectedCategory = useBbsPageState(state => state.selectedCategory, shallow);
  const currentSort = useBbsPageState(state => state.currentSort, shallow);
  const infinityPage = useBbsPageState(state => state.infinityPage);
  // useInfinityScroll2(setInfinityPage);

  // const { modalVisible: formVisible } = useModalVisible(QNA_FORM_MODAL);
  // const { modalVisible: copyVisible } = useModalVisible(COPY_QUOTE_MODAL);
  const { list, isValidating } = useBBSData({
    page: isDeskTop ? page : infinityPage,
    isDeskTop,
    category: queryCategory,
    subCategory: subCategory || '전체',
    tag: tag || '',
    keyword: keyword || '',
    contentsCategory: '1',
    sort: currentSort || brandSortOptions[0].method,
  });

  return (
    <Container>
      <SiteTitle title='브랜드' />
      <CategorySection category='브랜드' categoryKey='brand' />
      {isDeskTop && (
        <WebContainer>
          <FilterSectionPC category='brand' />
          <PcGridBox>
            <SortSectionPC
              category='brand'
              mainCategory={selectedCategory?.displayName}
              totalItems={list?.meta?.totalItems}
              sortOptions={brandSortOptions}
            />
            {infinityPage === 1 && isValidating ? (
              <LoadingContainer />
            ) : (
              <div style={{ width: '100%' }}>
                {list?.items?.length === 0 && <NoListDataBox />}
                <GridContainer list={list?.items ?? []} category={selectedCategory?.displayName} contents_category={'1'} />
                {list?.meta?.totalItems && isDeskTop ? <Pagination totalItems={list?.meta?.totalItems} /> : null}
              </div>
            )}
          </PcGridBox>
        </WebContainer>
      )}
      {!isDeskTop && (
        <section style={{ width: '100%' }}>
          <FilterSection category='brand' />
          <SortSection
            category='brand'
            mainCategory={selectedCategory?.displayName}
            totalItems={list?.meta?.totalItems}
            sortOptions={brandSortOptions}
          />
          {infinityPage === 1 && isValidating ? (
            <LoadingContainer />
          ) : (
            <div style={{ width: '100%' }}>
              {list?.items?.length === 0 && <NoListDataBox />}
              <GridContainer list={list?.items ?? []} category={selectedCategory?.displayName} contents_category={'1'} />
            </div>
          )}
        </section>
      )}
      {/* {formVisible && <QnAFormModal visible={formVisible} />}
      {copyVisible && <ModalCopyQuotation visible={copyVisible} is_realtime={false} />} */}
    </Container>
  );
};

export default BrandPage;

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: min(1280px, 100vw);
  margin: auto;
  padding-bottom: 120px;
`;

const WebContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  width: min(1280px, 100vw);
  padding-bottom: 120px;
`;

const PcGridBox = styled.div`
  width: calc(100% - 270px);
`;

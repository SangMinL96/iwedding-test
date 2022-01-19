import { useBbsPageState } from '@feature/Ibrandplus/hooks/useBbsPageState';
import GridContainer from '@feature/product/GridContainer';
import { Desktop } from '@hooks/useDevice';
import { useBBSData } from '@modules/ibrandplus/ibrandplusAPI';
import { productSortOptions } from '@utils/sortOptions';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
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

const ProductPage = () => {
  const {
    query: { category: queryCategory, tag, keyword, page, subCategory },
  } = useRouter();
  const isDeskTop = Desktop();
  const router = useRouter();
  const selectedCategory = useBbsPageState(state => state.selectedCategory, shallow);
  const currentSort = useBbsPageState(state => state.currentSort, shallow);
  const infinityPage = useBbsPageState(state => state.infinityPage, shallow);

  // const { modalVisible: formVisible } = useModalVisible(QNA_FORM_MODAL);
  // const { modalVisible: copyVisible } = useModalVisible(COPY_QUOTE_MODAL);
  const { list, isValidating } = useBBSData({
    page: isDeskTop ? page : infinityPage,
    isDeskTop,
    category: queryCategory,
    subCategory: subCategory || '전체',
    tag: tag || '',
    keyword: keyword || '',
    contentsCategory: 'product',
    sort: currentSort || productSortOptions[0].method,
  });

  useEffect(() => {
    if (queryCategory == '청첩장') {
      router.push('/main/page/753');
    }
  }, [queryCategory]);

  return (
    <Container>
      <SiteTitle title='스토어' />
      <CategorySection category='스토어' categoryKey='product' />
      {isDeskTop && (
        <WebContainer>
          <FilterSectionPC category='product' />
          <PcGridBox>
            <SortSectionPC
              category='product'
              mainCategory={selectedCategory?.displayName}
              totalItems={list?.meta?.totalItems}
              sortOptions={productSortOptions}
            />
            {infinityPage === 1 && isValidating ? (
              <LoadingContainer />
            ) : (
              <div style={{ width: '100%' }}>
                {list?.items?.length === 0 && <NoListDataBox />}
                <GridContainer list={list?.items ?? []} contents_category={'product'} />
                {list?.meta?.totalItems && isDeskTop ? <Pagination totalItems={list?.meta?.totalItems} /> : null}
              </div>
            )}
          </PcGridBox>
        </WebContainer>
      )}
      {!isDeskTop && (
        <section style={{ width: '100%' }}>
          <FilterSection category='product' />
          <SortSection
            category='product'
            mainCategory={selectedCategory?.displayName}
            totalItems={list?.meta?.totalItems}
            sortOptions={productSortOptions}
          />
          {infinityPage === 1 && isValidating ? (
            <LoadingContainer />
          ) : (
            <div style={{ width: '100%' }}>
              {list?.items?.length === 0 && <NoListDataBox />}
              <GridContainer list={list?.items ?? []} contents_category={'product'} />
            </div>
          )}
        </section>
      )}
      {/* {formVisible && <QnAFormModal visible={formVisible} />}
      {copyVisible && <ModalCopyQuotation visible={copyVisible} is_realtime={false} />} */}
    </Container>
  );
};

export default ProductPage;

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

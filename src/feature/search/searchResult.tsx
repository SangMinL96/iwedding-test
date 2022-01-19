import Loading from '@components/Loading';
import { useBbsPageState } from '@feature/Ibrandplus/hooks/useBbsPageState';
import { Desktop } from '@hooks/useDevice';
import { useBBsMainCategory, useSubCategoryList } from '@modules/ibrandplus/ibrandplusAPI';
import { useSearchAllData } from '@modules/search/searchAPI';
import theme from '@styles/theme';
import { showPrice } from '@utils/util';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import shallow from 'zustand/shallow';
const FilterSection = dynamic(() => import('@feature/Ibrandplus/FilterSection'));
const FilterSectionPC = dynamic(() => import('@feature/Ibrandplus/pcUI/FilterSectionPC'));
const MobileSearch = dynamic(() => import('./components/MobileSearch'));
const CategoryListPC = dynamic(() => import('./pc/CategoryListPC'));
const NoSearchResultBanner = dynamic(() => import('./pc/NoSearchResultBanner'));
const NoSearchResultPC = dynamic(() => import('./pc/NoSearchResultPC'));
const SearchAll = dynamic(() => import('./search_tabs/search.all'));
const SearchBrand = dynamic(() => import('./search_tabs/search.brand'));
const SearchContents = dynamic(() => import('./search_tabs/search.contents'));
const SearchEvent = dynamic(() => import('./search_tabs/search.event'));
const SearchProduct = dynamic(() => import('./search_tabs/search.product'));
const MDKeyword = dynamic(() => import('./sections/MDKeyword'));
const MDRecommendProduct = dynamic(() => import('./sections/MDRecommendProduct'));
const PopularKeyword = dynamic(() => import('./sections/PopularKeyword'));
const RecentKeyword = dynamic(() => import('./sections/RecentKeyword'));
interface TabProps {
  tabActive: boolean;
  noData?: boolean;
}

const SearchResult = () => {
  const {
    query: { tab, category: queryCategory, keyword, subCategory },
  } = useRouter();
  const isDeskTop = Desktop();
  const router = useRouter();
  const { list, isValidating } = useSearchAllData({ keyword });
  const setSelectedCategory = useBbsPageState(state => state.setSelectedCategory, shallow);
  const resetState = useBbsPageState(state => state.resetState, shallow);
  const setResetInfinityPage = useBbsPageState(state => state.setResetInfinityPage, shallow);
  const selectedCategory = useBbsPageState(state => state.selectedCategory, shallow);
  const { data: subCategoryList, isValidating: subCategoryLoading } = useSubCategoryList(
    queryCategory as string,
    keyword as string,
    tab as string,
  );
  const { data: categoryList } = useBBsMainCategory(tab as string, keyword as string);

  const handleTabClick = (id: string) => async () => {
    setResetInfinityPage();
    const targetId = id;
    if (id !== tab) {
      router.push(
        {
          pathname: router.pathname,
          query: { ...router.query, tab: targetId, category: '전체', tag: undefined, page: 1, subCategory: '전체' },
        },
        undefined,
        { scroll: false },
      );
    }
  };

  const onCategoryChange = categoryItem => async () => {
    if (queryCategory === categoryItem.category) return;
    if (categoryItem.category === '청첩장' && router.asPath.includes('product'))
      return router.replace('https://www.iwedding.co.kr/main/page/753');

    await resetState();
    router.push(
      {
        pathname: router.pathname,
        query: { ...router.query, category: categoryItem.category, subCategory: '전체', tag: undefined, page: 1 },
      },
      undefined,
      { scroll: false },
    );
    setSelectedCategory(categoryItem);
  };

  const onSubCategoryChange = item => async () => {
    await resetState();
    router.push(
      {
        pathname: router.pathname,
        query: { ...router.query, subCategory: item.no, tag: undefined, page: 1 },
      },
      undefined,
      { scroll: false },
    );
  };

  useEffect(() => {
    if (subCategoryList?.length === 2) {
      router.push(
        {
          pathname: router.pathname,
          query: { ...router.query, subCategory: subCategoryList?.[1]?.no },
        },
        undefined,
        { scroll: false },
      );
    }
  }, [queryCategory, subCategoryLoading]);

  useEffect(() => {
    if (queryCategory !== '전체') {
      setSelectedCategory(categoryList?.find(item => item.category === queryCategory));
    } else {
      setSelectedCategory({ category: '전체', displayName: '전체', thumbnailURL: '' });
    }
    if (categoryList?.length <= 1) {
      setSelectedCategory(
        categoryList?.find(item => item.category === categoryList?.[0]?.category) || {
          category: '전체',
          displayName: '전체',
          thumbnailURL: '',
        },
      );
      router.push(
        {
          pathname: router.pathname,
          query: { ...router.query, category: categoryList?.[0]?.category || '전체', page: 1 },
        },
        undefined,
        { scroll: false },
      );
    }
  }, [categoryList, tab]);

  if (isValidating)
    return (
      <Loading
        body={
          <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            {keyword && (
              <>
                <h3 style={{ color: theme.blue }}>{`'${keyword}'`}</h3>
                <span style={{ color: '#262626', marginTop: 7 }}>검색중입니다.</span>
              </>
            )}
          </span>
        }
      />
    );
  return list?.product?.meta?.totalItems +
    list?.brand?.meta?.totalItems +
    list?.event?.meta?.totalItems +
    list?.content?.meta?.totalItems ===
    0 ? (
    <Container>
      {isDeskTop ? (
        <section style={{ width: '100%' }}>
          <KeywordResultBox>
            <p>{`'${keyword}'`}</p>
            <p>검색 결과가 없습니다.</p>
          </KeywordResultBox>
          <NoSearchResultBanner />
          <NoSearchResultPC />
        </section>
      ) : (
        <section style={{ width: '100%' }}>
          <MobileSearch type='result' value={keyword as string} />
          <div className='search_tab_box'>
            <NoSearchText>
              <p>{`'${keyword}'`}</p>
              <p>검색 결과가 없습니다.</p>
            </NoSearchText>
            <NoSearchResultBanner />
            <RecentKeyword type='result' />
            <PopularKeyword type='result' />
            <MDKeyword type='result' />
            <MDRecommendProduct />
          </div>
        </section>
      )}
    </Container>
  ) : (
    //위에는 검색 조건에 해당하는 데이터가 1개도 없을때
    //아래는 검색조건후 웹/모바일 조건문 처리가 많음.. isDeskTop에 따라 같은컴포넌트지만 위치가 다름..
    <section style={{ width: '100%' }}>
      {isDeskTop && (
        <KeywordResultBox>
          <p>
            {`'${keyword}'`}
            <span>에 대한</span>
          </p>
          <p>검색결과</p>
        </KeywordResultBox>
      )}

      <Container>
        {!isDeskTop && <MobileSearch type='result' value={keyword as string} />}
        {/* pc일때는 업종 카테고리 컨테이너가 왼쪽으로 와야함  css 디스플레이 플렉스로 설정*/}
        {isDeskTop && (
          <FilterContainerPC>
            {String(tab) === 'all' ? (
              <AllTabBox>
                <h3>필터</h3>
                <div>
                  우측의 상세 유형 탭에서
                  <br /> 필터를 설정할 수 있어요!
                </div>
              </AllTabBox>
            ) : (
              <CategoryListPC allTab={String(tab) === 'all'} isSearch categoryList={categoryList} />
            )}
            {String(tab) !== 'all' && selectedCategory?.category !== '전체' && <FilterSectionPC isSearch category={String(tab)} />}
          </FilterContainerPC>
        )}
        {/* ------------------------------------------------------------ */}
        <ContentWrapper>
          {/* 텝 컨테이너 */}
          <div className='tab_wrapper'>
            <TabButton onClick={handleTabClick('all')} tabActive={String(tab) === 'all'}>
              전체&nbsp;
              <div>
                {showPrice(
                  list?.product?.meta?.totalItems +
                    list?.brand?.meta?.totalItems +
                    list?.event?.meta?.totalItems +
                    list?.content?.meta?.totalItems || 0,
                )}
              </div>
            </TabButton>
            <TabButton
              className={list?.product?.meta?.totalItems === 0 && 'no_data'}
              onClick={list?.product?.meta?.totalItems !== 0 ? handleTabClick('product') : null}
              tabActive={String(tab) === 'product'}
            >
              스토어 <div>{showPrice(list?.product?.meta?.totalItems || 0)}</div>
            </TabButton>
            <TabButton
              className={list?.brand?.meta?.totalItems === 0 && 'no_data'}
              onClick={list?.brand?.meta?.totalItems !== 0 ? handleTabClick('brand') : null}
              tabActive={String(tab) === 'brand'}
            >
              브랜드 <div>{showPrice(list?.brand?.meta?.totalItems || 0)}</div>
            </TabButton>
            <TabButton
              className={list?.event?.meta?.totalItems === 0 && 'no_data'}
              onClick={list?.event?.meta?.totalItems !== 0 ? handleTabClick('event') : null}
              tabActive={String(tab) === 'event'}
            >
              이벤트 <div>{showPrice(list?.event?.meta?.totalItems || 0)}</div>
            </TabButton>
            <TabButton
              className={list?.content?.meta?.totalItems === 0 && 'no_data'}
              onClick={list?.content?.meta?.totalItems !== 0 ? handleTabClick('content') : null}
              tabActive={String(tab) === 'content'}
            >
              콘텐츠 <div>{showPrice(list?.content?.meta?.totalItems || 0)}</div>
            </TabButton>
          </div>
          {/* --------- */}
          {/* 업종 고르는 필터가 모바일일때는 텝 컨테이너 아래에 있어야함 */}
          {!isDeskTop && String(tab) !== 'all' && (
            <FilterContainer>
              {categoryList?.length > 1 && (
                <FilterBox>
                  <h3>업종</h3>
                  <Swiper slidesPerView={'auto'} spaceBetween={6}>
                    {[{ category: '전체', displayName: '전체', thumbnailURL: '' }, ...categoryList]?.map((item, index) => {
                      return (
                        <SwiperSlide key={`${item.category}_${index}`}>
                          <button className={item.category === queryCategory && 'active'} onClick={onCategoryChange(item)}>
                            {item.displayName}
                          </button>
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>
                </FilterBox>
              )}
              {subCategoryList?.length > 2 && (
                <FilterBox>
                  <h3>상품종류</h3>
                  <Swiper slidesPerView={'auto'} spaceBetween={6}>
                    {subCategoryList?.map((item, index) => {
                      return (
                        <SwiperSlide key={`${item.no}_${index}`}>
                          <button className={subCategory === item.no && 'active'} onClick={onSubCategoryChange(item)}>
                            {item.sub_category}
                          </button>
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>
                </FilterBox>
              )}
              {queryCategory !== '전체' && <FilterSection isSearch category={String(tab)} />}
            </FilterContainer>
          )}
          {/* ----------------------------------------------- */}

          {/* 데이터 썸네일 그리드 컨테이너 */}
          <div className='search_tab_contents'>
            {String(tab) === 'all' && (
              <SearchAll
                data={{
                  brand: list?.brand?.items,
                  content: list?.content?.items,
                  event: list?.event?.items,
                  product: list?.product?.items,
                }}
                count={{
                  brand: list?.brand?.meta?.totalItems,
                  content: list?.content?.meta?.totalItems,
                  event: list?.event?.meta?.totalItems,
                  product: list?.product?.meta?.totalItems,
                }}
              />
            )}
            {String(tab) === 'product' ? <SearchProduct totalCount={list?.product?.meta?.totalItems} /> : null}
            {String(tab) === 'brand' ? <SearchBrand totalCount={list?.brand?.meta?.totalItems} /> : null}
            {String(tab) === 'content' ? <SearchContents totalCount={list?.content?.meta?.totalItems} /> : null}
            {String(tab) === 'event' ? <SearchEvent totalCount={list?.event?.meta?.totalItems} /> : null}
          </div>
          {/* ------------------------ */}
        </ContentWrapper>
      </Container>
    </section>
  );
};

export default React.memo(SearchResult);

const Container = styled.div`
  position: relative;
  width: 1280px;
  min-width: 1280px;
  margin: 0 auto;
  padding: 0 0 80px 0;
  @media all and (min-width: ${theme.pc}px) {
    display: flex;
    justify-content: space-between;
  }
  @media all and (max-width: ${theme.pc}px) {
    width: 100%;
    min-width: 100%;
  }
  .search_part,
  .search_tab_box,
  .search_tab_contents {
    position: relative;
    width: 100%;
    overflow: hidden;
  }

  .search_part {
    position: sticky;
    top: 0;
    z-index: 50;
    background-color: white;
  }
  .search_tab_box {
    .no_data {
      color: #dfdfdf;
      > div {
        color: #dfdfdf;
      }
    }
  }
  .search_tab_contents {
  }
`;
const ContentWrapper = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  .tab_wrapper {
    margin-bottom: 40px;
    @media all and (max-width: 1280px) {
      margin-bottom: 0;
    }
  }
  .no_data {
    color: #dfdfdf;
    > div {
      color: #dfdfdf;
    }
  }
  > button {
    &:last-child {
      color: red;
    }
  }
  @media all and (min-width: ${theme.pc}px) {
    width: calc(100% - 269px);
  }
`;
const NoSearchText = styled.div`
  ${props => props.theme.flexCenter};
  flex-direction: column;
  width: 100%;
  height: 180px;
  color: #8c8c8c;
  font-size: 15px;
  line-height: 1.5;
`;
const TabButton = styled.button<TabProps>`
  ${props => props.theme.resetBtnStyle};
  display: inline-block;
  width: 20%;
  height: 68px;
  text-align: center;
  /* border: 1px solid #dddddd; */
  font-size: 14px;
  font-weight: bold;
  line-height: 1.5;
  border-left: 1px solid #dddddd;
  border-top: 1px solid #dddddd;
  color: ${({ tabActive }) => (tabActive ? '#262626' : '#8C8C8C')};
  background-color: ${({ tabActive }) => (tabActive ? '#fff' : '#FAFAFA')};
  border-bottom: ${({ tabActive }) => (tabActive ? '0' : '1px solid #dddddd')};
  &:last-child {
    border-right: 1px solid #dddddd;
    @media all and (max-width: 1280px) {
      border-right: 0;
    }
  }
  &:first-child {
    @media all and (max-width: 1280px) {
      border-left: 0;
    }
  }
  > div {
    color: ${({ tabActive }) => (tabActive ? theme.blue : '#8C8C8C')};
    font-size: 12px;
    font-weight: bold;
  }
`;
const FilterContainer = styled.ul`
  @media all and (max-width: ${theme.pc}px) {
    width: 100%;
    min-width: 100%;
  }
  .swiper-container {
    width: 100%;
    .swiper-wrapper {
      width: 100%;
      .swiper-slide {
        width: auto;
        button {
          ${theme.flexCenter}
          padding: 7px 10px 9px 10px;
          border: 1px solid #dfdfdf;
          border-radius: 6px;
          background-color: #fafafa;
          color: #262626;
          font-size: 13px;
        }
        .active {
          background-color: #4866e4;
          color: #ffffff;
          font-weight: bold;
          border: 1px solid #4866e4;
        }
        span {
          font-size: 13px;
          color: #262626;
        }
      }
    }
  }
`;

const FilterBox = styled.li`
  width: 100%;
  height: 44px;
  border-bottom: 1px solid #f0f0f0;
  padding: 12px 0 12px 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  h3 {
    width: 115px;
  }
`;

const FilterContainerPC = styled.div`
  width: 220px;
`;

const KeywordResultBox = styled.div`
  ${props => props.theme.flexCenter}
  position: relative;
  width: 1280px;
  min-width: 1280px;
  height: 200px;
  margin: 0 auto;
  text-align: center;
  @media all and (min-width: 1280px) {
    flex-direction: column;
    height: 300px;
  }
  p {
    span {
      color: #262626;
    }
    display: block;
    font-size: 32px;
    font-weight: 700;
    color: #262626;
    line-height: 40px;
    &:first-child {
      color: ${theme.blue};
    }
  }
`;

const AllTabBox = styled.div`
  width: 220px;
  h3 {
    border-top: 1px solid #707070;
    ${props => props.theme.flexCenter};
    justify-content: flex-start;
    align-items: flex-end;
    height: 57px;
    font-size: 20px;
  }
  div {
    margin-top: 17px;
    width: 100%;
    height: 250px;
    background-color: #fafafa;
    ${props => props.theme.flexCenter};
    color: #777777;
    text-align: center;
    font-size: 15px;
    line-height: 1.5;
  }
`;

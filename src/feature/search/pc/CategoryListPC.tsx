import { useBbsPageState } from '@feature/Ibrandplus/hooks/useBbsPageState';
import { CategoryProps } from '@modules/sharedData';
import IconArrowDownUp from '@styles/svgs/icon_Arrow_downUp';
import theme from '@styles/theme';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import styled from 'styled-components';
import shallow from 'zustand/shallow';

type PropsType = {
  categoryList?: CategoryProps[];
  allTab?: boolean;
  isSearch?: boolean;
};
function CategoryListPC({ categoryList, allTab = false, isSearch = false }: PropsType) {
  const resetState = useBbsPageState(state => state.resetState, shallow);
  const router = useRouter();

  const setSelectedCategory = useBbsPageState(state => state.setSelectedCategory, shallow);
  const selectedCategory = useBbsPageState(state => state.selectedCategory, shallow) || {
    category: '전체',
    displayName: '전체',
    thumbnailURL: '',
  };
  const [addMore, setAddMore] = useState(false);

  const onCategoryChange = categoryItem => async () => {
    if (router.query.category === categoryItem.category) return;
    if (categoryItem.category === '청첩장' && router.asPath.includes('product'))
      return router.replace('https://www.iwedding.co.kr/main/page/753');

    if (isSearch) {
      router.push(
        {
          pathname: router.pathname,
          query: { ...router.query, category: categoryItem.category, subCategory: '전체', tag: undefined, page: 1 },
        },
        undefined,
        { scroll: false },
      );
    } else {
      router.push(
        {
          pathname: router.pathname,
          query: { ...router.query, category: categoryItem.category, subCategory: '전체', tag: undefined, page: 1, keyword: undefined },
        },
        undefined,
        { scroll: false },
      );
    }

    await resetState();
    setSelectedCategory(categoryItem);
  };

  const allStatic = { category: '전체', displayName: '전체', thumbnailURL: '' };
  return allTab ? (
    <AllTabBox>
      <h3>필터</h3>
      <div>
        우측의 상세 유형 탭에서
        <br /> 필터를 설정할 수 있어요!
      </div>
    </AllTabBox>
  ) : (
    <Container>
      <h3>필터</h3>
      {categoryList?.length > 1 && <h5>업종</h5>}
      {categoryList?.length > 1 && (
        <CategoryBox rowCount={Math.ceil(categoryList && [allStatic, ...categoryList].length / 2)} addMore={addMore}>
          {categoryList &&
            [allStatic, ...categoryList]?.map((item, index) => {
              return (
                <button
                  className={item.category === selectedCategory?.category && 'active'}
                  onClick={onCategoryChange(item)}
                  key={`${item.category}_${index}`}
                >
                  {item.displayName}
                </button>
              );
            })}
        </CategoryBox>
      )}

      {categoryList && [allStatic, ...categoryList].length > 10 && (
        <AddMore onClick={() => setAddMore(prev => !prev)}>
          <p>더보기</p>
          <IconArrowDownUp type={addMore ? 'up' : 'down'} />
        </AddMore>
      )}
    </Container>
  );
}

export default CategoryListPC;
type StyledType = {
  addMore?: boolean;
  rowCount?: number;
};
const Container = styled.section`
  width: 220px;
  h3 {
    border-top: 1px solid #707070;
    ${props => props.theme.flexCenter};
    justify-content: flex-start;
    align-items: flex-end;
    height: 57px;
    font-size: 20px;
  }
  h5 {
    margin-top: 16px;
    border-top: 1px solid #f0f0f0;
    ${props => props.theme.flexCenter};
    justify-content: flex-start;
    align-items: flex-end;
    height: 55px;
    font-size: 16px;
  }
`;

const CategoryBox = styled.div<StyledType>`
  margin-top: 16px;
  width: 220px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 6px;
  overflow-y: hidden;
  height: ${props => (props.addMore ? props.rowCount * 41 : props.rowCount > 5 ? 204 : props.rowCount * 41)}px;
  transition: all ${props => props.rowCount / 45}s linear;
  div {
    display: flex;
  }
  button {
    ${theme.resetBtnStyle}
    width: 107px;
    height: 36px;
    border: 1px solid #e5e5e5;
    background-color: #fafafa;
    color: #262626;
    font-size: 14px;
    border-radius: 6px;
    letter-spacing: -0.03em;
  }
  .active {
    border: 1px solid #4866e4;
    background-color: #4866e4;
    color: white;
    font-weight: bold;
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
const AddMore = styled.div`
  cursor: pointer;
  ${props => props.theme.flexCenter};
  justify-content: flex-start;
  margin-bottom: 30px;
  margin-top: 15px;
  font-size: 13px;
  font-weight: bold;
  color: #262626;
  p {
    margin-right: 7px;
  }
`;

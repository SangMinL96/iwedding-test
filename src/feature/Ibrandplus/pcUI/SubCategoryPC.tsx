import { useBbsPageState } from '@feature/Ibrandplus/hooks/useBbsPageState';
import { CategoryProps } from '@modules/sharedData';
import IconArrowDownUp from '@styles/svgs/icon_Arrow_downUp';
import theme from '@styles/theme';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import shallow from 'zustand/shallow';

type PropsType = {
  categoryList?: any[];
  isSearch?: boolean;
};
function SubCategoryPC({ categoryList, isSearch }: PropsType) {
  const router = useRouter();
  const {
    query: { subCategory },
  } = useRouter();

  const onCategoryChange = categoryItem => async () => {
    if (isSearch) {
      router.push(
        {
          pathname: router.pathname,
          query: { ...router.query, subCategory: categoryItem.no, tag: undefined, page: 1 },
        },
        undefined,
        { scroll: false },
      );
    } else {
      router.push(
        {
          pathname: router.pathname,
          query: { ...router.query, subCategory: categoryItem.no, tag: undefined, page: 1, keyword: undefined },
        },
        undefined,
        { scroll: false },
      );
    }
  };

  return (
    categoryList?.length > 2 && (
      <Container isSearch={isSearch}>
        <h5>{'상품 종류'}</h5>
        <CategoryBox>
          {categoryList &&
            categoryList?.map((item, index) => {
              return (
                <button className={item.no === subCategory && 'active'} onClick={onCategoryChange(item)} key={`${item.no}_${index}`}>
                  {item.sub_category}
                </button>
              );
            })}
        </CategoryBox>
      </Container>
    )
  );
}

export default React.memo(SubCategoryPC);

const Container = styled.section<{ isSearch?: boolean }>`
  border-top: 1px solid #f0f0f0;
  width: 220px;
  margin-bottom: 30px;
  h5 {
    ${props => props.theme.flexCenter};
    justify-content: flex-start;
    align-items: flex-end;
    height: 50px;
    font-size: 16px;
  }
`;

const CategoryBox = styled.div`
  margin-top: 16px;
  width: 220px;
  display: flex;
  flex-direction: column;
  div {
    display: flex;
  }
  button {
    padding: 0 14px 1px 14px;
    margin-bottom: 6px;
    ${theme.resetBtnStyle}
    text-align: left;
    width: 100%;
    height: 36px;
    border: 1px solid rgb(229, 229, 229);
    background-color: rgb(250, 250, 250);
    color: rgb(38, 38, 38);
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

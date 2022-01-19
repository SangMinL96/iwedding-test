import { CategoryProps } from '@modules/sharedData';
import { now } from 'lodash';
import React, { useCallback } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { useBbsPageState } from '../hooks/useBbsPageState';
import shallow from 'zustand/shallow';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { allCategory } from '@utils/util';
interface Props {
  selected?: string;
  categoryList: CategoryProps[];
  categoryKey?: string;
}
function CategoryPC({ selected, categoryList, categoryKey }: Props) {
  const router = useRouter();
  const setSelectedCategory = useBbsPageState(state => state.setSelectedCategory, shallow);
  const resetState = useBbsPageState(state => state.resetState, shallow);

  const onSelectCategory = category => async () => {
    if (router.query.category === category.category) return;
    if (category.category === '청첩장' && router.asPath.includes('product'))
      return router.replace('https://www.iwedding.co.kr/main/page/753');

    await resetState();
    router.push(
      {
        pathname: router.pathname,
        query: { ...router.query, category: category.category, subCategory: '전체', tag: undefined, page: 1, keyword: undefined },
      },
      undefined,
      { scroll: false },
    );
    setSelectedCategory(category);
  };

  return (
    <CategoryBox>
      {categoryKey === 'event' || categoryKey === 'contents'
        ? Array.from({ length: Math.ceil(categoryList && [allCategory(categoryKey), ...categoryList]?.length / 11) })?.map((_, index) => (
            <BoxBody className={index !== 0 && 'border_top'} key={`${index}_${Date.now()}`}>
              {[allCategory(categoryKey), ...categoryList]
                ?.slice(index * 11, 11 * (index === 0 ? 1 : index + 1))
                ?.map((category, index1) => (
                  <tr key={`${category.category}_${index1}`}>
                    <ContentBox onClick={onSelectCategory(category)}>
                      {category?.thumbnailURL && <Image src={category?.thumbnailURL} width={74} height={74} alt='categoryImage' />}
                      <p className={category.category === router.query.category && 'focus'}>{category.displayName}</p>
                    </ContentBox>
                  </tr>
                ))}
            </BoxBody>
          ))
        : Array.from({ length: Math.ceil(categoryList && categoryList?.length / 11) }).map((_, index) => (
            <BoxBody className={index !== 0 && 'border_top'} key={`${index}_${Date.now()}`}>
              {categoryList?.slice(index * 11, 11 * (index === 0 ? 1 : index + 1))?.map((category, index1) => (
                <tr key={`${category.category}_${index1}`}>
                  <ContentBox onClick={onSelectCategory(category)}>
                    {category?.thumbnailURL && <Image src={category?.thumbnailURL} width={74} height={74} alt='categoryImage' />}
                    <p className={category.category === router.query.category && 'focus'}>{category.displayName}</p>
                  </ContentBox>
                </tr>
              ))}
            </BoxBody>
          ))}
    </CategoryBox>
  );
}

export default React.memo(CategoryPC);

const CategoryBox = styled.table`
  width: 1280px;
  -webkit-tap-highlight-color: transparent;
  height: 100%;
  margin-top: 40px;
  margin-bottom: 80px;
  border: 1px solid #f0f0f0;
  .border_top {
    border-top: 1px solid #f0f0f0;
  }
`;

const BoxBody = styled.tbody`
  ${props => props.theme.flexCenter};
  justify-content: flex-start;
  height: 140px;
  display: flex;
  padding: 0 7px;
  tr {
    width: 115px;
    ${props => props.theme.flexCenter};
    flex-direction: column;

    border-right: 1px solid #f0f0f0;
    &:nth-last-child(1) {
      border-right: none;
    }
    p {
      margin-top: 13px;
      ${props => props.theme.flexCenter};
      font-size: 15px;
    }
  }
  img {
    border-radius: 25px;
    width: 64px;
    height: 64px;
  }
`;
const ContentBox = styled.tr`
  display: block;
  cursor: pointer;
  ${props => props.theme.flexCenter};
  flex-direction: column;
  > p {
    letter-spacing: -0.02em;
  }
  .focus {
    font-weight: bold;
  }
`;

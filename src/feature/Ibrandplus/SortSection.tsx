import theme from '@styles/theme';
import React, { ChangeEvent, useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components';
import shallow from 'zustand/shallow';
import { useBbsPageState } from './hooks/useBbsPageState';
import IconPlus from '@svgs/icon_plus';
import SortSVG from '@styles/svgs/SortSVG';
import ResetSVG from '@styles/svgs/ResetSVG';
import { ISort, SortType } from '@utils/sortOptions';
import { useDeepEffect } from '@hooks/useDeepEffect';
import { hangleCategory, showPrice } from '@utils/util';
import { useRouter } from 'next/router';
import { bbsFilterReset, bbsOrderByLog } from '@modules/log/bbs/bbsLogger';
import sortIcon from '@images/common/sortIcon_3x.png';
interface Props {
  mainCategory: string;
  sortOptions?: ISort[];
  totalItems: number;
  isSearch?: boolean;
  category?: string;
}

const SortSection = ({ mainCategory, totalItems, sortOptions, isSearch, category }: Props) => {
  const router = useRouter();
  const {
    query: { tag: queryTag },
  } = useRouter();
  const [currentSort, setCurrentSort] = useBbsPageState(state => [state.currentSort, state.setCurrentSort], shallow);
  const setResetInfinityPage = useBbsPageState(state => state.setResetInfinityPage, shallow);
  const selectRef = useRef<HTMLSelectElement>(null);

  useDeepEffect(() => {
    if (!currentSort) {
      setCurrentSort(sortOptions[0].method);
    }
  }, [currentSort]);

  const onSelect = async (e: ChangeEvent<HTMLSelectElement>) => {
    setCurrentSort(e.currentTarget.value as SortType);
    await bbsOrderByLog(hangleCategory(category), sortOptions.find(item => item.method === e.currentTarget.value).title, isSearch);
  };
  const onRemoveTag = tag => () => {
    setResetInfinityPage();
    if (isSearch) {
      router.push(
        {
          pathname: router.pathname,
          query: {
            ...router.query,
            tag: String(queryTag)
              ?.split(',')
              ?.filter(item => item !== tag)
              .toString(),
          },
        },
        undefined,
        { scroll: false },
      );
    } else {
      router.push(
        {
          pathname: router.pathname,
          query: {
            ...router.query,
            tag: String(queryTag)
              ?.split(',')
              ?.filter(item => item !== tag)
              .toString(),
            keyword: undefined,
          },
        },
        undefined,
        { scroll: false },
      );
    }
  };
  const onallResetTags = async () => {
    await bbsFilterReset(isSearch);

    setResetInfinityPage();
    if (isSearch) {
      router.push(
        {
          pathname: router.pathname,
          query: { ...router.query, tag: undefined, subCategory: '전체' },
        },
        undefined,
        { scroll: false },
      );
    } else {
      router.push(
        {
          pathname: router.pathname,
          query: { ...router.query, tag: undefined, keyword: undefined, subCategory: '전체' },
        },
        undefined,
        { scroll: false },
      );
    }
  };

  const queryTagArray = String(queryTag)
    .split(',')
    .map(item => item.split('::').map(item2 => item2))
    .map(item => item[1]);
  return (
    <Container isSearch={isSearch}>
      <SectionBox>
        {isSearch ? (
          <h3>
            <span>{showPrice(totalItems)}</span>개의 검색 결과
          </h3>
        ) : (
          <CatNum>
            {router.query.keyword ? (
              <span>
                <Keyword>{router.query.keyword}</Keyword> 검색결과
              </span>
            ) : (
              '총'
            )}{' '}
            {totalItems}
          </CatNum>
        )}
        <Right>
          <SelectBox ref={selectRef} onChange={onSelect}>
            {sortOptions?.map((sort, i) => (
              <option key={`${sort.method}_${i}`} value={sort.method} selected={sort.method == currentSort}>
                {sort.title}
              </option>
            ))}
          </SelectBox>
          {/* <div onClick={() => setTimeout} style={{ cursor: 'pointer' }}>
            <SortSVG />
          </div> */}
        </Right>
      </SectionBox>
      {String(queryTag) && String(queryTag) !== '' && String(queryTag) !== 'undefined' ? (
        <FilterTagBox>
          <TagBar>
            {queryTagArray?.map(
              (tag, index) =>
                tag !== undefined &&
                tag !== '' && (
                  <SelectedTag key={tag}>
                    <span>{tag}</span>{' '}
                    <DeleteButton onClick={onRemoveTag(String(queryTag).split(',')[index])}>
                      <IconPlus rotation={45} thin width={11} height={11} />
                    </DeleteButton>
                  </SelectedTag>
                ),
            )}
          </TagBar>
          <ResetBtn onClick={onallResetTags}>
            <ResetSVG />
          </ResetBtn>
        </FilterTagBox>
      ) : null}
    </Container>
  );
};

export default React.memo(SortSection);

const Container = styled.div<{ isSearch?: boolean }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1280px;
  margin: auto;
  padding: ${props => (props.isSearch ? 0 : '0 15px')};
`;
const SectionBox = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
  height: 80px;
  font-size: 16px;
  font-weight: 700;
  padding-bottom: 20px;
`;
const FilterTagBox = styled(SectionBox)`
  align-items: flex-start;
  height: 57px;
  margin-bottom: 0;
  padding-bottom: 0;
`;

const CatNum = styled.span``;
const ResetBtn = styled.span`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 33px;
  padding-top: 8px;
`;
const Right = styled.span`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Keyword = styled.span`
  color: ${theme.blue};
`;

const TagBar = styled.div`
  display: flex;
  width: calc(100% - 33px);
  overflow: hidden;
  overflow-x: scroll;
  ${theme.hideScroll};
`;

const SelectedTag = styled.div`
  position: relative;
  padding: 9px 10px;
  height: 36px;
  margin-right: 6px;
  padding-right: 30px;
  background: ${theme.lightBlue};
  color: ${theme.blue};
  border: 1px solid ${theme.mediumBlue};
  border-radius: 6px;
  font-size: 14px;
  white-space: nowrap;
`;

const SelectBox = styled.select`
  display: inline;
  border: none;
  font-size: 15px;
  font-weight: bold;
  padding-right: 20px;
  color: #262626;
  -webkit-appearance: none;
  -moz-appearance: none;
  direction: rtl;
  background: url(${sortIcon.src}) no-repeat;
  background-position: right center;
  background-size: 10px 9px;
  @media all and (max-width: 1280px) {
    background-size: 20px 20px;
    padding-right: 22px;
  }
`;

const DeleteButton = styled.div`
  position: absolute;
  top: 4px;
  right: 0;
  width: 26px;
  height: 26px;
  cursor: pointer;
  z-index: 2;
  display: grid;
  place-items: center;
  cursor: pointer;
`;

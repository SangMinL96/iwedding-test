import { bbsFilterReset, bbsOrderByLog } from '@modules/log/bbs/bbsLogger';
import ResetSVG from '@styles/svgs/ResetSVG';
import theme from '@styles/theme';
import IconPlus from '@svgs/icon_plus';
import { ISort } from '@utils/sortOptions';
import { hangleCategory } from '@utils/util';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';
import shallow from 'zustand/shallow';
import { useBbsPageState } from '../hooks/useBbsPageState';
import { Swiper, SwiperSlide } from 'swiper/react';

interface Props {
  mainCategory: string;
  sortOptions?: ISort[];
  totalItems?: number;
  isSearch?: boolean;
  category?: string;
}

const SortSectionPC = ({ sortOptions, isSearch, category, mainCategory, totalItems }: Props) => {
  const router = useRouter();
  const setCurrentSort = useBbsPageState(state => state.setCurrentSort, shallow);
  const currentSort = useBbsPageState(state => state.currentSort, shallow);
  const {
    query: { tag: queryTag },
  } = useRouter();
  const onRemoveTag = tag => () => {
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
            page: 1,
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
            page: 1,
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

    if (isSearch) {
      router.push(
        {
          pathname: router.pathname,
          query: { ...router.query, tag: undefined, page: 1, subCategory: '전체' },
        },
        undefined,
        { scroll: false },
      );
    } else {
      router.push(
        {
          pathname: router.pathname,
          query: { ...router.query, tag: undefined, page: 1, subCategory: '전체', keyword: undefined },
        },
        undefined,
        { scroll: false },
      );
    }
  };

  const onSorting = sort => async () => {
    setCurrentSort(sort.method);
    await bbsOrderByLog(hangleCategory(category), sort.title, isSearch);
  };
  const queryTagArray = String(queryTag)
    .split(',')
    .map(item => item.split('::').map(item2 => item2))
    .map(item => item[1]);
  return (
    <Container isSearch={isSearch}>
      <SectionBox tagCount={String(queryTag) && String(queryTag) !== '' && String(queryTag) !== 'undefined' ? true : false}>
        <div>
          {router.query.keyword ? (
            <span>
              <Keyword>{router.query.keyword}</Keyword> 검색결과
            </span>
          ) : (
            '총'
          )}{' '}
          {totalItems}건
        </div>
        <Right>
          <SelectBox>
            {sortOptions?.map((sort, i) => (
              <span
                onClick={onSorting(sort)}
                key={`${sort.method}_${i}`}
                className={currentSort ? currentSort === sort.method && 'active' : sortOptions[0].method === sort.method && 'active'}
              >
                {sort.title}
              </span>
            ))}
          </SelectBox>
        </Right>
      </SectionBox>
      {String(queryTag) && String(queryTag) !== '' && String(queryTag) !== 'undefined' ? (
        <TagSectionBox>
          <Swiper slidesPerView={'auto'} freeMode={true}>
            <TagBar>
              {queryTagArray?.map(
                (tag, index) =>
                  tag !== undefined &&
                  tag !== '' && (
                    <SwiperSlide key={`${tag}_${index}`}>
                      <SelectedTag>
                        <span>{tag}</span>
                        <DeleteButton onClick={onRemoveTag(String(queryTag).split(',')[index])}>
                          <IconPlus rotation={45} thin width={11} height={11} />
                        </DeleteButton>
                      </SelectedTag>
                    </SwiperSlide>
                  ),
              )}
            </TagBar>
          </Swiper>

          <CatNum onClick={onallResetTags}>
            <span>초기화</span>
            <span>
              <ResetSVG />
            </span>
          </CatNum>
        </TagSectionBox>
      ) : null}
    </Container>
  );
};

export default React.memo(SortSectionPC);

const Container = styled.div<{ isSearch?: boolean }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1280px;
  margin: auto;
`;
const SectionBox = styled.section<{ tagCount?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 89px;
  font-size: 16px;
  font-weight: 600;
  border-bottom: ${props => (props.tagCount ? '1px solid #3e3e3e' : 'none')};
  > div {
    font-weight: 400;
    font-size: 15px;
    color: #262626;
  }
`;
const TagSectionBox = styled.section`
  /* margin: 30px 0; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  font-size: 16px;
  cursor: pointer;
  font-weight: 600;
  .swiper-container {
    margin: 0;
  }
  .swiper-wrapper {
    width: 100%;
    .swiper-slide {
      width: auto;
    }
  }
`;
const CatNum = styled.span`
  cursor: pointer;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 101px;
  height: 96px;
  mask-repeat: 10px;
  font-size: 14px;
  font-weight: 700;
  line-height: 20px;
  > span {
    &:first-child {
      margin-right: 7px;
    }
    &:last-child {
      display: flex;
      justify-content: center;
      align-items: flex-end;
      width: 24px;
      height: 24px;
      > div {
        height: 20px;
      }
    }
  }
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
  width: 100%;
  overflow: hidden;
  overflow-x: scroll;
  margin-right: 10px;
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
  > span {
    color: ${theme.blue};
    font-weight: 700;
  }
`;

const SelectBox = styled.div`
  font-size: 15px;
  color: #777777;
  font-weight: 400;
  ${props => props.theme.flexCenter};
  span {
    cursor: pointer;
    margin-left: 20px;
  }
  .active {
    color: #262626;
    font-weight: bold;
  }
`;

const DeleteButton = styled.div`
  position: absolute;
  top: 4px;
  right: 2px;
  width: 26px;
  height: 26px;
  z-index: 2;
  display: grid;
  place-items: center;
  cursor: pointer;
`;

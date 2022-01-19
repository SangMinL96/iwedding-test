import TagSwiper from '@components/swipers/TagSwiper';
import { useDeepEffect } from '@hooks/useDeepEffect';
import ArrowImg from '@images/common/up_arrow_black.png';
import { useSubCategoryList, useTagList } from '@modules/ibrandplus/ibrandplusAPI';
import { BBSTag } from '@modules/ibrandplus/ibrandplusInterface';
import { bbsFliterLog } from '@modules/log/bbs/bbsLogger';
import { searchFilterLog } from '@modules/log/search/searchLogger';
import theme from '@styles/theme';
import { hangleCategory } from '@utils/util';
import Image from 'next/image';
import router, { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import shallow from 'zustand/shallow';
import { useBbsPageState } from './hooks/useBbsPageState';
2;
interface Props {
  category?: string;
  isSearch?: boolean;
}
const FilterSection = ({ category, isSearch = false }: Props) => {
  const {
    query: { keyword, category: queryCategory, subCategory },
  } = useRouter();
  const selectedCategory = useBbsPageState(state => state.selectedCategory, shallow);
  const setResetInfinityPage = useBbsPageState(state => state.setResetInfinityPage, shallow);
  const { data: subCategoryList, isValidating: subCategoryLoading } = useSubCategoryList(
    queryCategory as string,
    isSearch ? (keyword as string) : '',
    category,
  );
  const { tags } = useTagList(category, queryCategory as string, keyword as string, subCategory as string);
  const [openFilter, setFilter] = useState(false);
  const toggleFilter = useCallback(() => setFilter(!openFilter), [openFilter, setFilter]);
  useDeepEffect(() => {
    setFilter(false);
  }, [selectedCategory?.displayName]);

  const onTagLog = async (tag: string) => {
    if (isSearch) {
      await searchFilterLog(keyword as string, tag);
    } else {
      await bbsFliterLog(hangleCategory(category), tag);
    }
  };
  const onSubCategoryChange = item => async () => {
    setResetInfinityPage();
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
    if (!isSearch && !subCategoryLoading) {
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
    }
  }, [queryCategory, subCategoryLoading]);

  return (
    <>
      {!isSearch && subCategoryList?.length > 2 && (
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
      {tags && tags?.every(tag => tag.typical === null) ? null : (
        <>
          <Section openFilter={openFilter} filterCount={tags && ((Object.entries(tags)?.length - 1) as number)}>
            {tags?.map((tag: BBSTag, index) => {
              if (tag.groupItemName !== '업종')
                if (tag.groupItemName !== '상품 종류')
                  return (
                    <TagSwiper
                      key={`${index}_${tag.groupName}`}
                      onTagLog={onTagLog}
                      title={tag.groupItemName}
                      tagList={{ group: tag.groupItemName, tags: tag.typical.split(',') }}
                    />
                  );
            })}
          </Section>
          {tags?.length > 3 && (
            <MoreFilter onClick={toggleFilter}>
              {openFilter ? (
                <>
                  검색 필터 접기
                  <Arrow>
                    <Image src={ArrowImg} layout='fill' alt='arrow_up' />
                  </Arrow>
                </>
              ) : (
                <>
                  더 많은 검색 필터
                  <Arrow className='down'>
                    <Image src={ArrowImg} layout='fill' alt='arrow_down' />
                  </Arrow>
                </>
              )}
            </MoreFilter>
          )}
        </>
      )}
    </>
  );
};

export default React.memo(FilterSection);

type styledPropsType = {
  openFilter?: boolean;
  filterCount?: any;
};

const Section = styled.section<styledPropsType>`
  display: flex;
  flex-direction: column;
  height: ${props => (props.openFilter ? `${props.filterCount * 45}px` : `${props.filterCount === 1 ? 45 : 90}px`)};
  transition: all ${props => props.filterCount / 35}s linear;
  overflow-y: hidden;
  width: 100%;
`;

const MoreFilter = styled.div`
  ${theme.flexCenter};
  font-size: 13px;
  font-weight: 700;
  height: 54px;
  cursor: pointer;
`;
const FilterBox = styled.li`
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
          font-size: 13px;
          font-weight: bold;
          border: 1px solid #4866e4;
        }
        span {
          font-size: 14px;
          color: #020202;
        }
      }
    }
  }
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
const Arrow = styled.span`
  position: relative;
  margin-left: 10px;
  width: 9.5px;
  height: 6px;
  &.down {
    transform: rotate(180deg);
  }
`;

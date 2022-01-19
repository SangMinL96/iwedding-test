import SubCategoryPC from '@feature/Ibrandplus/pcUI/SubCategoryPC';
import { useDeepEffect } from '@hooks/useDeepEffect';
import { useSubCategoryList, useTagList } from '@modules/ibrandplus/ibrandplusAPI';
import { bbsFliterLog } from '@modules/log/bbs/bbsLogger';
import { searchFilterLog } from '@modules/log/search/searchLogger';
import IconArrowDownUp from '@styles/svgs/icon_Arrow_downUp';
import IconCheckBox from '@styles/svgs/icon_check_box';
import { hangleCategory } from '@utils/util';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import shallow from 'zustand/shallow';
import { useBbsPageState } from '../hooks/useBbsPageState';
import PcSearchBox from './PcSearchBox';
interface Props {
  category?: string;
  isSearch?: boolean;
}

function FilterSectionPC({ category, isSearch = false }: Props) {
  const {
    query: { keyword, tag: queryTag, category: queryCategory, subCategory },
  } = useRouter();

  const router = useRouter();
  const selectedCategory = useBbsPageState(state => state.selectedCategory, shallow);
  const { data: subCategoryList, isValidating } = useSubCategoryList(
    queryCategory as string,
    isSearch ? (keyword as string) : '',
    category,
  );
  const { tags } = useTagList(category, queryCategory as string, keyword as string, subCategory as string);
  const [openFilter, setFilter] = useState<string[]>([]);
  const queryTagArray = String(queryTag)
    .split(',')
    .map(item => item.split('::').map(item2 => item2))
    .map(item => item[1]);
  useDeepEffect(() => {
    setFilter([]);
  }, [selectedCategory?.displayName]);

  const onTagClick = (tag: string, group: string) => async () => {
    if (queryTagArray?.includes(tag)) {
      router.push(
        {
          pathname: router.pathname,
          query: {
            ...router.query,
            tag: String(queryTag)
              ?.split(',')
              ?.filter(item => item !== `${group}::${tag}`)
              ?.toString(),
            page: 1,
          },
        },
        undefined,
        { scroll: false },
      );
    } else {
      if (isSearch) {
        await searchFilterLog(keyword as string, tag);
      } else {
        await bbsFliterLog(hangleCategory(category), tag);
      }
      router.push(
        {
          pathname: router.pathname,
          query: { ...router.query, tag: String(queryTag)?.split(',')?.concat(`${group}::${tag}`)?.toString(), page: 1 },
        },
        undefined,
        { scroll: false },
      );
    }
  };
  useEffect(() => {
    if (subCategoryList?.length === 2 && !isValidating) {
      if (isSearch) {
        router.push(
          {
            pathname: router.pathname,
            query: { ...router.query, subCategory: subCategoryList?.[1]?.no },
          },
          undefined,
          { scroll: false },
        );
      } else {
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
  }, [queryCategory, isValidating]);

  const onAddMore = (item: string) => () => {
    if (openFilter.includes(item)) {
      setFilter(prev => prev.filter(data => data !== item));
    } else {
      setFilter(prev => prev.concat(item));
    }
  };

  const hangleTitle =
    category === 'brand'
      ? '브랜드'
      : category === 'contents'
      ? '콘텐츠'
      : category === 'event'
      ? '이벤트'
      : category === 'product'
      ? '스토어'
      : '전체';

  return (
    <Container>
      <StickyBox>
        {!isSearch && (
          <>
            <TitleBox>
              <h5>{`홈 > ${hangleTitle}`}</h5>
              <h3>{selectedCategory?.displayName}</h3>
            </TitleBox>
            <PcSearchBox category={category} />
          </>
        )}
        <Filter_ButtonBox>
          <FilterContainer>
            {!isSearch && <h3>필터</h3>}
            {selectedCategory?.category === '전체' ? (
              <AllTabBox>
                <div>
                  카테고리 선택시
                  <br /> 필터를 설정할 수 있어요!
                </div>
              </AllTabBox>
            ) : (
              <>
                <SubCategoryPC isSearch={isSearch} categoryList={subCategoryList} />
                {tags?.map((item, index) => {
                  if (item.groupItemName === '업종') return;
                  if (item.groupItemName === '상품 종류') return;
                  return (
                    <FilterBox key={`${item.groupItemName}_${index}`}>
                      <h5>{item.groupItemName}</h5>
                      <CheckContainer rowCount={item.typical.split(',').length} openFilter={openFilter.includes(item.groupItemName)}>
                        {item.typical.split(',').map((tag, index) => (
                          <CheckBox key={`${tag}_${index}`} onClick={onTagClick(tag, item.groupItemName)}>
                            <span>
                              <IconCheckBox checked={queryTagArray?.includes(tag)} />
                            </span>
                            <p className={queryTagArray?.includes(tag) ? 'checked' : ''}>{tag}</p>
                          </CheckBox>
                        ))}
                      </CheckContainer>
                      {item.typical.split(',').length > 5 && (
                        <AddMore onClick={onAddMore(item.groupItemName)}>
                          <>
                            <p>더보기</p>
                            <IconArrowDownUp type={openFilter.includes(item.groupItemName) ? 'up' : 'down'} />
                          </>
                        </AddMore>
                      )}
                    </FilterBox>
                  );
                })}
              </>
            )}
          </FilterContainer>
        </Filter_ButtonBox>
      </StickyBox>
    </Container>
  );
}

export default React.memo(FilterSectionPC);

type StyledType = {
  rowCount?: number;
  openFilter?: boolean;
};

const Container = styled.section`
  width: 220px;
  position: relative;

  h3 {
    font-size: 20px;
    color: #262626;
  }
  @media all and (max-width: 1300px) {
    margin-left: 10px;
  }
`;
const StickyBox = styled.div`
  /* position: sticky; */
  /* top: 100px; */
`;
const TitleBox = styled.div`
  width: 100%;
  h5 {
    font-size: 15px;
    font-weight: 400;
    color: #777777;
    margin-bottom: 10px;
  }
  h3 {
    width: 100%;
    font-size: 32px;
    color: #262626;
    margin-bottom: 10px;
    border-bottom: 1px solid #707070;
    padding-bottom: 22px;
  }
`;

const FilterContainer = styled.div`
  margin-top: 28px;
  h3 {
    margin-bottom: 16px;
  }
`;
const FilterBox = styled.div`
  padding: 30px 0;
  border-top: 1px solid #f0f0f0;
  h5 {
    font-size: 16px;
    color: #262626;
    margin-bottom: 16px;
  }
`;

const CheckContainer = styled.div<StyledType>`
  overflow: hidden;
  ${props => props.theme.flexCenter};
  justify-content: flex-start;
  height: ${props => (props.openFilter ? `${31 * props.rowCount}px` : `${props.rowCount < 6 ? props.rowCount * 30 : 150}px`)};
  flex-direction: column;
  align-items: flex-start;
  transition: all ${props => props.rowCount / 50}s linear;
`;

const CheckBox = styled.div`
  cursor: pointer;
  height: 24px;
  ${props => props.theme.flexCenter};
  justify-content: flex-start;
  margin-bottom: 7px;
  p {
    font-size: 15px;
    color: #777777;
    margin-left: 5px;
    padding-bottom: 1px;
    letter-spacing: -0.02em;
  }
  > p.checked {
    font-weight: 700;
    color: #4866e4;
  }
  > span {
    display: flex;
    align-items: center;
    width: 24px;
    height: 24px;
  }
  &:last-child {
    margin-bottom: 0;
  }
`;

const AddMore = styled.div`
  cursor: pointer;
  ${props => props.theme.flexCenter};
  justify-content: flex-start;
  margin-top: 15px;
  /* margin-bottom: 30px; */
  font-size: 13px;
  font-weight: bold;
  color: #262626;
  p {
    margin-right: 7px;
  }
`;
const Filter_ButtonBox = styled.div`
  width: 220px;
  padding-bottom: 10px;
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

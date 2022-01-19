import CategorySwiper from '@components/swipers/CategorySwiper';
import { Desktop } from '@hooks/useDevice';
import DeleteImg from '@images/common/delete_text_icon.png';
import SearchIcon from '@images/common/search_icon_x3.png';
import { useBBsMainCategory } from '@modules/ibrandplus/ibrandplusAPI';
import { bbsFliterLog } from '@modules/log/bbs/bbsLogger';
import { useAutoKeyword } from '@modules/search/searchAPI';
import theme from '@styles/theme';
import { hangleCategory, makeBold } from '@utils/util';
import parse from 'html-react-parser';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import shallow from 'zustand/shallow';
import { useBbsPageState } from './hooks/useBbsPageState';
import CategoryPC from './pcUI/CategoryPC';

interface Props {
  category: string;
  categoryKey: string;
}

const CategorySection = ({ category, categoryKey }: Props) => {
  const autoKeywordList = useAutoKeyword(categoryKey);
  const { data: categoryList, isValidating } = useBBsMainCategory(categoryKey);
  const {
    query: { category: queryCategory, keyword },
  } = useRouter();

  const [isFocus, setFocus] = useState<boolean>(false);

  const router = useRouter();
  const [mouseOver, setMouseOver] = useState<boolean>(false);
  const isWeb = Desktop();
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchText, setSearchText] = useState('');
  const setSelectedCategory = useBbsPageState(state => state.setSelectedCategory, shallow);
  const selectedCategory = useBbsPageState(state => state.selectedCategory, shallow);
  const setResetInfinityPage = useBbsPageState(state => state.setResetInfinityPage, shallow);
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMouseOver(true);
    setSearchText(e.target.value);
  };
  const clearSearchText = () => {
    setSearchText('');
  };
  const onSearch = async () => {
    setResetInfinityPage();
    router.push(
      {
        pathname: router.pathname,
        query: { ...router.query, keyword: searchText, page: 1, tag: undefined },
      },
      undefined,
      { scroll: false },
    );
    setMouseOver(false);
    inputRef.current.blur();
    await bbsFliterLog(hangleCategory(category), searchText, true);
  };
  const onBlur = () => {
    setMouseOver(false);
    setFocus(false);
  };

  const handleKeydown = e => e.key === 'Enter' && onSearch();

  useEffect(() => {
    //업종 카테고리 초기셋팅
    if (router.isReady) {
      //url 쿼리에 업종카테고리 존재시 초기 셋팅
      if (queryCategory) {
        if ((queryCategory as string) === '전체') {
          setSelectedCategory({ category: '전체', displayName: '전체', thumbnailURL: '' });
        } else {
          setSelectedCategory(categoryList?.find(item => item.category === queryCategory));
        }
      }
    }
  }, [categoryList, queryCategory]);

  useEffect(() => {
    if (keyword) {
      setSearchText(keyword as string);
    }
  }, [keyword]);

  const onKeywordClick = (keyword: string) => () => {
    setSearchText(keyword);
    setMouseOver(false);
    setResetInfinityPage();
    router.push(
      {
        pathname: router.pathname,
        query: { ...router.query, keyword, page: 1, tag: undefined },
      },
      undefined,
      { scroll: false },
    );
    bbsFliterLog(hangleCategory(category), keyword, true);
  };
  return isWeb ? (
    <CategoryPC categoryList={categoryList} selected={queryCategory as string} categoryKey={categoryKey} />
  ) : (
    <section style={{ width: '100%' }}>
      <CategorySwiper
        setSearchText={setSearchText}
        categoryList={categoryList}
        selected={queryCategory as string}
        categoryKey={categoryKey}
      />
      <Container onMouseLeave={() => setMouseOver(false)}>
        {!isValidating && queryCategory && (
          <SearchBar isFocus={isFocus}>
            <input
              ref={inputRef}
              onBlur={onBlur}
              onMouseOver={() => setMouseOver(true)}
              type='text'
              placeholder={`${category} > ${selectedCategory?.displayName} 카테고리 내 검색`}
              value={searchText}
              onChange={handleSearchChange}
              onKeyPress={handleKeydown}
              onFocus={() => setFocus(true)}
            />
            <div>
              {searchText.length > 1 && (
                <span className='delete' onClick={clearSearchText}>
                  <Image src={DeleteImg} layout='fixed' width={20} height={20} alt='delete_icon' />
                </span>
              )}
              <span className='search' onClick={onSearch}>
                <Image src={SearchIcon} layout='fixed' width={24} height={24} alt='search_icon' />
              </span>
            </div>
          </SearchBar>
        )}
        {autoKeywordList && searchText.length > 1 && autoKeywordList?.find(filterText => filterText.includes(searchText)) && (
          <SearchDropDwon mouseOver={mouseOver}>
            <ul className='recommend_schbox'>
              {autoKeywordList &&
                searchText.length > 1 &&
                autoKeywordList
                  ?.filter(filterText => filterText.includes(searchText))
                  ?.map(item => (
                    <li onClick={onKeywordClick(item)} key={item}>
                      {parse(makeBold(item, searchText.length > 1 ? searchText : ''))}
                    </li>
                  ))}
            </ul>
          </SearchDropDwon>
        )}
      </Container>
      {/* {mouseOver && <BGColorBox onClick={() => setMouseOver(false)} />} */}
    </section>
  );
};

export default CategorySection;

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-bottom: 22px;
  background: ${theme.lightGray};
`;

const SearchBar = styled.div<{ isFocus: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: calc(100% - 30px);
  height: 44px;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 8px;
  border: 1px solid ${props => (props.isFocus ? '#262626' : '#e5e5e5')};
  padding: 0 12px 0 15px;
  z-index: 5;
  > input {
    width: calc(100% - 68px);
    background: transparent;
    font-size: 15px;
    line-height: 22px;
    border: none;
    &::placeholder {
      color: #8c8c8c;
    }
  }
  span {
    cursor: pointer;
  }
  > div {
    width: 68px;
    height: 100%;
    display: flex;

    justify-content: flex-end;
    align-items: center;
    span.delete {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 20px;
      height: 100%;
      margin-right: 12px;
    }
    span.search {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 24px;
      height: 100%;
    }
  }
`;
const SearchDropDwon = styled.div<{ mouseOver?: boolean }>`
  position: absolute;
  top: 43px;
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - 30px);
  height: ${props => (props.mouseOver ? ' 183px' : ' 0px')};
  transition: all 0.1s linear;
  overflow-y: hidden;
  background-color: #fff;
  border: ${props => (props.mouseOver ? '1px solid #262626' : 0)};
  border-radius: 8px;
  z-index: 6;
  .searchTextStyle {
    color: #4866e4;
  }
  .recommend_schbox {
    width: 100%;
    height: 100%;
    padding: 0 15px;
    overflow-y: auto;
    li {
      ${props => props.theme.flexCenter};
      justify-content: flex-start;
      width: 100%;
      height: 39px;
      font-size: 14px;
      border-bottom: 1px solid #f0f0f0;
      &:first-child {
        margin-top: 7px;
      }
      &:nth-last-child(1) {
        border-bottom: none;
      }
    }
    .searchTextStyle {
      color: #4866e4;
      font-size: 15px;
    }
  }
`;

const BGColorBox = styled.div`
  @keyframes fadein {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }
  animation: fadein 0.3s ease-in-out;
  position: absolute;
  z-index: 30;
  width: 100%;
  top: 0;
  height: 100vh;
  background-color: rgba(9, 9, 9, 0.118);
`;

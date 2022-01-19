import { bbsFliterLog } from '@modules/log/bbs/bbsLogger';
import { useAutoKeyword } from '@modules/search/searchAPI';
import IconSearch from '@styles/svgs/icon_search';
import { hangleCategory, makeBold } from '@utils/util';
import parse from 'html-react-parser';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

type PropsType = {
  category?: string;
};

function PcSearchBox({ category }: PropsType) {
  const autoKeywordList = useAutoKeyword(category);
  const router = useRouter();
  const [mouseOver, setMouseOver] = useState<boolean>(false);
  const [keywordValue, setKeywordValue] = useState<string>('');
  const [isFocus, setFocus] = useState<boolean>(false);
  const listRef = useRef<HTMLDivElement>(null);
  const listItemRef = useRef<HTMLDivElement>(null);
  const [keyboradIndex, setKeyboradIndex] = useState<number>(-1);
  const onkeydown = ev => {
    const filterList = autoKeywordList?.filter(filterText => filterText?.includes(keywordValue));
    if (ev.keyCode === 40) {
      if (filterList?.length === keyboradIndex + 1) return;
      setKeyboradIndex(prev => prev + 1);
    }
    if (ev.keyCode === 38) {
      if (keyboradIndex === -1) return;
      setKeyboradIndex(prev => prev - 1);
    }
  };

  useEffect(() => {
    if (listRef.current && listItemRef.current) {
      listRef.current.scrollTo(0, listItemRef.current.offsetTop + listItemRef.current.clientHeight - listRef.current.clientHeight);
    }
  });
  const {
    query: { keyword },
  } = useRouter();

  const onKeyword = async ev => {
    if (ev.charCode === 13) {
      const filterList = autoKeywordList?.filter(filterText => filterText?.includes(keywordValue));
      router.push(
        {
          pathname: router.pathname,
          query: { ...router.query, keyword: keyboradIndex === -1 ? keywordValue : filterList[keyboradIndex], page: 1, tag: undefined },
        },
        undefined,
        { scroll: false },
      );
      await bbsFliterLog(hangleCategory(category), keyboradIndex === -1 ? keywordValue : filterList[keyboradIndex], true);
    }
  };

  const onKeywordClick = (keyword: string) => async () => {
    router.push(
      {
        pathname: router.pathname,
        query: { ...router.query, keyword, page: 1, tag: undefined },
      },
      undefined,
      { scroll: false },
    );
    await bbsFliterLog(hangleCategory(category), keyword, true);
  };

  const onTextChange = ev => {
    setKeywordValue(ev.target.value);
    setKeyboradIndex(-1);
  };

  const onBlur = () => {
    // setMouseOver(false);
    setFocus(false);
    setKeyboradIndex(-1);
  };

  useEffect(() => {
    setKeywordValue((keyword as string) || '');
    setTimeout(() => setMouseOver(false), 100);
  }, [keyword]);
  useEffect(() => {
    if (keywordValue?.length > 1) {
      if (!mouseOver) {
        setMouseOver(true);
      }
    } else {
      if (mouseOver) {
        setMouseOver(false);
      }
    }
  }, [keywordValue]);

  return (
    <SearchBox>
      <h3>카테고리 내 검색</h3>
      <InputBox isFocus={isFocus}>
        <input
          onBlur={onBlur}
          onKeyDown={onkeydown}
          placeholder='검색어 입력'
          value={keywordValue}
          onChange={onTextChange}
          onKeyPress={onKeyword}
          onFocus={() => setFocus(true)}
        />
        <IconSearch />
      </InputBox>
      {keywordValue?.length >= 2 && autoKeywordList?.find(filterText => filterText.includes(keywordValue)) ? (
        <SearchDropDwon ref={listRef} mouseOver={mouseOver}>
          {keywordValue?.length >= 2 &&
            autoKeywordList
              ?.filter(filterText => filterText.includes(keywordValue))
              ?.map((item, index) => (
                <div
                  ref={keyboradIndex === index ? listItemRef : null}
                  className={keyboradIndex === index && 'active'}
                  onClick={onKeywordClick(item)}
                  key={item}
                >
                  {parse(makeBold(item, keywordValue.length >= 1 ? keywordValue : ''))}
                </div>
              ))}
        </SearchDropDwon>
      ) : null}
    </SearchBox>
  );
}

export default React.memo(PcSearchBox);
const SearchBox = styled.div`
  position: relative;
  margin-top: 35px;
  input {
    width: 100%;
    height: 44px;
    padding: 12px;
    border-radius: 8px;
    border: 1px solid #e5e5e5;
    color: #262626;
    font-size: 15px;
    &::placeholder {
      color: #8c8c8c;
      font-size: 15px;
    }
  }
`;

const InputBox = styled.div<{ isFocus: boolean }>`
  position: relative;
  width: 100%;
  margin-top: 16px;
  padding-bottom: 36px;
  border-bottom: 1px solid #707070;
  input {
    width: 100%;
    height: 44px;
    padding: 12px;
    border-radius: 8px;
    border: 1px solid ${props => (props.isFocus ? '#262626' : '#e5e5e5')};
    color: #262626;
    font-size: 15px;
    &::placeholder {
      color: #8c8c8c;
      font-size: 15px;
    }
  }
  svg {
    position: absolute;
    right: 24px;
    top: 22px;
    transform: translate(50%, -50%);
  }
`;
const SearchDropDwon = styled.div<{ mouseOver?: boolean }>`
  position: absolute;
  border-radius: 6px;
  top: 83px;
  width: 100%;
  overflow-y: auto;
  height: ${props => (props.mouseOver ? '183px' : ' 0px')};
  border: ${props => (props.mouseOver ? '1px solid #262626' : 0)};
  transition: all 0.1s linear;
  background-color: #fff;
  .searchTextStyle {
    color: #4866e4;
  }
  > div {
    display: flex;
    align-items: center;
    width: calc(100% - 30px);
    height: 39px;
    margin: 0 auto;
    cursor: pointer;
    user-select: none;
    /* padding: 8px 0 10px 0; */
    font-size: 14px;
    color: #262626;
    ${props => props.theme.flexCenter};
    justify-content: flex-start;
    border-bottom: 1px solid #f0f0f0;
    &:first-child {
      margin-top: 7px;
    }
    &:nth-last-child(1) {
      border-bottom: none;
    }
  }
  .active {
    padding: 0 -15px;
    background-color: #e6e6e6;
  }
`;

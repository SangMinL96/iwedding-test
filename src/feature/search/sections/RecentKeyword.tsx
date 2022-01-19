import { searchKeywordLog } from '@modules/log/search/searchLogger';
import { keyWordCount } from '@modules/search/searchAPI';
import { getRecentSearch, removeRecentSearch } from '@service/LocalStorageService';
import { IconClose } from '@styles/svgs/icon_close';
import theme from '@styles/theme';
import { Router, useRouter } from 'next/router';
import React, { useState } from 'react';
import styled from 'styled-components';
import SearchWordItem from '../components/SearchWordItem';

type PropsType = {
  type: 'index' | 'result';
};
const RecentKeyword = ({ type }: PropsType) => {
  const router = useRouter();
  const [keywordList, setKeywordList] = useState(getRecentSearch() || []);
  const onRemoveKeyword = (keyword: string) => ev => {
    ev.stopPropagation();
    removeRecentSearch(keyword);
    setKeywordList(getRecentSearch());
  };
  const onRecentKeywordAllRemove = () => {
    global.window && window.localStorage.removeItem('recentSearchData');
    setKeywordList(getRecentSearch());
  };
  const onKeywordClick = (keyword: string) => async () => {
    await searchKeywordLog(keyword);
    await keyWordCount(keyword);
    router.push(`/search/result?keyword=${encodeURIComponent(keyword)}&tab=all`);
  };
  return (
    <Container>
      <TitleBox>
        <h3>최근 검색어</h3>
        <span onClick={onRecentKeywordAllRemove}>검색어 전체 삭제</span>
      </TitleBox>
      <RecentList>
        {keywordList?.length > 0 ? (
          keywordList?.map((keyword, index) => (
            <li key={`${keyword}_${index}`}>
              <button onClick={onKeywordClick(keyword)}>
                {keyword}
                <span onClick={onRemoveKeyword(keyword)}>
                  <IconClose />
                </span>
              </button>
            </li>
          ))
        ) : (
          <div>최근 입력한 검색어가 없습니다.</div>
        )}
      </RecentList>
    </Container>
  );
};

export default RecentKeyword;

const Container = styled.section`
  width: 100%;
  padding: 0 15px;
  /* padding-bottom: 30px; */
  @media all and (max-width: ${theme.pc}px) {
    width: 100%;
    min-width: 100%;
    > h3 {
      font-size: 21px;
    }
  }
`;

const TitleBox = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  width: 100%;
  height: 62px;
  @media all and (max-width: ${theme.pc}px) {
    width: 100%;
    min-width: 100%;
    > h3 {
      font-size: 18px;
      font-weight: bold;
      color: #262626;
    }
    > span {
      color: #8c8c8c;
      font-weight: 300;
      font-size: 13px;
    }
  }
`;
const RecentList = styled.ul`
  width: 100%;
  max-height: 100px;
  display: flex;
  flex-wrap: wrap;
  overflow-y: hidden;
  padding: 20px 0 4px 0;
  @media all and (max-width: ${theme.pc}px) {
    width: 100%;
    > div {
      width: 100%;
      height: 98px;
      ${props => props.theme.flexCenter};
      font-size: 15px;
      color: #8c8c8c;
    }
    > li {
      height: 36px;
      margin-right: 6px;
      margin-bottom: 6px;
      > button {
        height: 100%;
        font-size: 14px;
        color: #262626;
        border: 1px solid #e5e5e5;
        padding: 7px 10px;
        background-color: #fafafa;
        border-radius: 7px;
      }
      span {
        margin-left: 10px;
      }
    }
  }
`;

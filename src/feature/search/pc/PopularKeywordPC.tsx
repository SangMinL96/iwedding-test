import { searchKeywordLog } from '@modules/log/search/searchLogger';
import { keyWordCount, usePopularData } from '@modules/search/searchAPI';
import { PopularKeywordItf } from '@modules/search/searchInterface';
import IconPopular from '@styles/svgs/icon_popular';
import theme from '@styles/theme';
import moment from 'moment';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';

const PopularKeywordPC = () => {
  const router = useRouter();
  const { data: popularList } = usePopularData();

  const onKeywordClick = (item: PopularKeywordItf) => async () => {
    await keyWordCount(item.search_word);
    await searchKeywordLog(item.search_word);
    return router.push(`/search/result?keyword=${encodeURIComponent(item.search_word.replace(/ /g, ''))}&tab=all`);
  };
  return (
    <ContainerPc>
      <TitleBox>
        <h3>인기 검색어</h3>
        <span>최근 업데이트 {popularList && moment(popularList[0]?.search_count_date)?.format('YYYY.MM.DD HH:mm')}</span>
      </TitleBox>
      <Box>
        <SearchListBox>
          {popularList?.map((item, index) => (
            <li key={`${item.search_word}_${index}`} onClick={onKeywordClick(item)}>
              <div className='list_title'>
                <h5>{index + 1}</h5>
                <p>{item.search_word}</p>
              </div>
              <span>
                <IconPopular type={item.search_word_status as any} />
              </span>
            </li>
          ))}
        </SearchListBox>
      </Box>
    </ContainerPc>
  );
};

export default React.memo(PopularKeywordPC);
const ContainerPc = styled.section`
  width: 220px;
`;
const Box = styled.div`
  width: 100%;
  padding: 0 0 30px 0;
  height: 540px;
  overflow-y: hidden;
  transition: all 0.3s linear;
`;

const TitleBox = styled.div`
  width: 100%;
  height: 62px;
  margin-bottom: 17px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  line-height: 1.5;
  h3 {
    font-size: 18px;
    color: #262626;
  }
  span {
    font-size: 13px;
    color: #8c8c8c;
  }
`;
const SearchListBox = styled.ul`
  width: 100%;
  -webkit-tap-highlight-color: transparent;
  > li {
    cursor: pointer;
    ${theme.flexCenter};
    justify-content: space-between;
    background-color: rgb(247, 247, 250);
    margin-bottom: 1px;
    height: 50px;
    > span {
      width: 25px;
      margin-right: 19px;
      ${theme.flexCenter};
    }
    .list_title {
      ${theme.flexCenter};
      color: #262626;
      h5 {
        width: 40px;
        height: 44px;
        ${theme.flexCenter};
        font-size: 14px;
      }
      p {
        font-size: 14px;
      }
    }
  }
`;
const MoreFilter = styled.div`
  ${theme.flexCenter};
  font-size: 13px;
  height: 50px;
`;

const Arrow = styled.span`
  position: relative;
  margin-left: 10px;
  width: 9.4px;
  height: 6.1px;
  color: #262626;
  &.down {
    transform: rotate(180deg);
  }
`;

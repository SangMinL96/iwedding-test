import IconArrowDownUp from '@styles/svgs/icon_Arrow_downUp';
import theme from '@styles/theme';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ArrowImg from '@images/common/up_arrow_black.png';
import Image from 'next/image';
import IconPopular from '@styles/svgs/icon_popular';
import { keyWordCount, usePopularData } from '@modules/search/searchAPI';
import { useRouter } from 'next/router';
import moment from 'moment';
import { PopularKeywordItf } from '@modules/search/searchInterface';
import { searchKeywordLog } from '@modules/log/search/searchLogger';
import { getDateTime } from '@utils/util';
type PropsType = {
  type: 'index' | 'result';
};
const PopularKeyword = ({ type }: PropsType) => {
  const router = useRouter();
  const { data: popularList } = usePopularData();
  const [toggle, setToggle] = useState<boolean>(false);
  const [autoCount, setAutoCount] = useState(0);
  useEffect(() => {
    const up =
      autoCount === 0 ? setTimeout(() => setAutoCount(prev => prev + 1), 100) : setTimeout(() => setAutoCount(prev => prev + 1), 2000);
    if (autoCount === popularList?.length + 1) {
      setAutoCount(0);
    }
    return () => clearTimeout(up);
  }, [autoCount, setAutoCount]);

  const onFilterToggle = () => {
    setToggle(prev => !prev);
  };
  const onKeywordClick = (item: PopularKeywordItf, index: number) => async () => {
    if (toggle === false && autoCount !== index) return;
    await keyWordCount(item.search_word);
    await searchKeywordLog(item.search_word);
    router.push(`/search/result?keyword=${encodeURIComponent(item.search_word?.replace(/ /g, ''))}&tab=all`);
  };
  return (
    <div style={{ padding: '0 15px', marginBottom: '10px' }}>
      <TitleBox>
        <h3>인기 검색어</h3>
        <span>최근 업데이트 {popularList && getDateTime(popularList?.[0]?.search_count_date)}</span>
      </TitleBox>
      <Box toggle={toggle}>
        <SearchListBox keywordLength={popularList?.length + 1 * 45} toggle={toggle} autoCount={autoCount}>
          {popularList?.map((item, index) => (
            <li key={`${item.search_word}_${index}`} onClick={onKeywordClick(item, index)}>
              <div className='list_title'>
                <h5>{index + 1}</h5>
                <p>{item.search_word}</p>
              </div>
              <span>
                <IconPopular type={item.search_word_status as any} />
              </span>
            </li>
          ))}
          {!toggle && (
            <li key={`${popularList && popularList?.[0]?.search_word}_${11}`} onClick={onKeywordClick(popularList && popularList?.[0], 10)}>
              <div className='list_title'>
                <h5>{1}</h5>
                <p>{popularList && popularList?.[0]?.search_word}</p>
              </div>
              <span>
                <IconPopular type={popularList && (popularList?.[0]?.search_word_status as any)} />
              </span>
            </li>
          )}
        </SearchListBox>
      </Box>
      <MoreFilter onClick={onFilterToggle}>
        {toggle ? (
          <>
            인기 검색어 닫기
            <Arrow>
              <Image src={ArrowImg} layout='fill' alt='arrow_up' />
            </Arrow>
          </>
        ) : (
          <>
            인기 검색어 더 보기
            <Arrow className='down'>
              <Image src={ArrowImg} layout='fill' alt='arrow_down' />
            </Arrow>
          </>
        )}
      </MoreFilter>
    </div>
  );
};

export default React.memo(PopularKeyword);

type StyledType = {
  toggle?: boolean;
  autoCount?: any;
  keywordLength?: number;
};

const Box = styled.div<StyledType>`
  -webkit-tap-highlight-color: transparent;
  position: ${props => !props.toggle && 'relative'};
  width: 100%;
  height: ${props => (props.toggle ? `${props.keywordLength}px` : '44px')};
  overflow-y: hidden;
  transition: all 0.3s linear;
  margin-top: 20px;
  cursor: pointer;
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
const SearchListBox = styled.ul<StyledType>`
  position: ${props => !props.toggle && 'absolute'};
  width: 100%;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  top: ${props => props.autoCount * -44}px;
  transition: ${props => props.autoCount !== 0 && 'all 1s ease'};
  > li {
    cursor: pointer;
    user-select: none;
    ${theme.flexCenter};
    justify-content: space-between;
    background-color: #f7f7fa;
    margin-bottom: ${props => (props.toggle ? '1px' : 0)};
    height: 44px;
    &:active {
      background-color: ${theme.lightGray};
    }
    &:last-child {
      margin-bottom: 0;
    }
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

import React from 'react';
import styled from 'styled-components';
import KeywordListItem from './KeywordListItem';

interface Props {
  list: string[];
  isRecent?: boolean;
}

const KeywordList = ({ list, isRecent = false }: Props) => {
  return (
    <List>
      <Title>{isRecent ? '최근 검색어' : '추천 검색어'}</Title>
      {isRecent && (!list || list.length < 1) ? (
        <NoItem>최근 검색어 없음</NoItem>
      ) : (
        list.map(keyword => <KeywordListItem isRecent={isRecent} keyword={keyword} key={`${isRecent ? 'recent_' : ''}${keyword}`} />)
      )}
    </List>
  );
};

export default React.memo(KeywordList);

const List = styled.ul`
  width: 50%;
  position: relative;
  font-size: 15px;
  .remove-term-btn {
    display: block;
    width: 12px;
    height: 12px;
    margin-left: 9px;
    padding-top: 1px;
    > img {
      width: 12px;
      height: 12px;
    }
  }
`;

const Title = styled.p`
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  font-weight: 500;
`;

const NoItem = styled.li`
  color: #aaaaaa;
`;

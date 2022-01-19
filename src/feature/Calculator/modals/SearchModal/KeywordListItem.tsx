import closeBtn from '@images/common/close_btn.png';
import Image from 'next/image';
import router from 'next/router';
import React from 'react';
import styled from 'styled-components';
import { useRecentKeywords, useSearchKeyword } from '../../hooks';

interface Props {
  keyword: string;
  isRecent: boolean;
}

const KeywordListItem = ({ keyword, isRecent }: Props) => {
  const { recentKeywords, setRecentKeywords } = useRecentKeywords();
  const { setSearchKeyword } = useSearchKeyword();

  const removeRecentKeyword = () => {
    if (recentKeywords) {
      setRecentKeywords(recentKeywords.filter(rKeyword => rKeyword !== keyword));
    }
  };

  const handleKeywordClick = () => {
    setSearchKeyword(keyword);
    router.back();
  };

  return (
    <Item>
      <Pointer onClick={handleKeywordClick}>#{keyword}</Pointer>
      {isRecent ? (
        <RemoveButton onClick={removeRecentKeyword}>
          <Image unoptimized src={closeBtn} alt='delete-btn' />
        </RemoveButton>
      ) : null}
    </Item>
  );
};

export default React.memo(KeywordListItem);

const Item = styled.li`
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  &:last-child {
    margin-bottom: 0;
  }
`;

const Pointer = styled.a`
  cursor: pointer;
`;

const RemoveButton = styled(Pointer)`
  width: 12px;
  height: 12px;
  margin-left: 9px;
  margin-top: -5px;
`;

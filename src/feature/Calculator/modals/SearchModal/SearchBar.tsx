import deleteText from '@images/common/delete_text_icon.png';
import searchBtn from '@images/common/icon_search.png';
import { escSpecialCharacters } from '@utils/Regex';
import Image from 'next/image';
import router from 'next/router';
import React, { ChangeEvent, SyntheticEvent, useCallback, useState } from 'react';
import styled from 'styled-components';
import { useRecentKeywords, useSearchKeyword } from '../../hooks';

export const SearchBar = () => {
  const [keyword, setKeyword] = useState('');
  const { setSearchKeyword } = useSearchKeyword();
  const { recentKeywords, setRecentKeywords } = useRecentKeywords();

  const handleKeywordChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setKeyword(e.target.value);
    },
    [setKeyword],
  );

  const addRecentKeyword = () => {
    if (recentKeywords && !recentKeywords.includes(keyword)) {
      setRecentKeywords([keyword, ...recentKeywords]);
    }
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    setSearchKeyword(keyword);
    addRecentKeyword();
    router.back();
  };

  const onClickReset = useCallback(() => setKeyword(''), [setKeyword]);

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Input type='text' placeholder='검색어를 입력하세요.' onChange={handleKeywordChange} value={keyword} />
        {keyword.length > 0 && (
          <DeleteButton onClick={onClickReset} type='reset'>
            <Image unoptimized src={deleteText} alt='delete-text-btn' />
          </DeleteButton>
        )}
        <Button type='submit'>
          <Image unoptimized src={searchBtn} alt='search-btn' />
        </Button>
      </form>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  width: 93%;
  height: 50px;
  border: 2px solid #262626;
  margin: 10px auto;
`;

const Input = styled.input`
  ${props => props.theme.resetBtnStyle}
  width: calc(100% - 66px);
  padding-left: 15px;
  height: 46px;
  font-size: 15px;
  border: none;
`;

const Button = styled.button`
  ${props => props.theme.resetBtnStyle}
  background-color: #fff;
  width: 20px;
  height: 20px;
  position: absolute;
  top: 13px;
  right: 13px;
  cursor: pointer;
  > img {
    width: 20px;
    height: 20px;
  }
`;

const DeleteButton = styled(Button)`
  right: 42px;
`;

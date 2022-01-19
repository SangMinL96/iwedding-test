import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import parse from 'html-react-parser';
import Image from 'next/image';
import searchIcon from '@images/common/search_icon_x3.png';
import deleteTermIcon from '@images/common/delete_text_icon.png';
import theme from '@styles/theme';
import { keyWordCount, useAutoKeyword, useMdBasicKeywordData } from '@modules/search/searchAPI';
import { makeBold } from '@utils/util';
import { useRouter } from 'next/router';
import { searchKeywordLog } from '@modules/log/search/searchLogger';
import { confirmAlert } from 'react-confirm-alert';
import closeIcon from '@images/common/close_icon_x3.png';

const MenuSearchInput = () => {
  const router = useRouter();
  const {
    query: { keyword },
  } = useRouter();
  const [isFocus, setFocus] = useState(false);
  const [mouseOver, setMouseOver] = useState<boolean>(false);
  const [keywordValue, setKeywordValue] = useState<string>('');
  const autoKeywordList = useAutoKeyword('all');
  const [keyboradIndex, setKeyboradIndex] = useState<number>(-1);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listItemRef = useRef<HTMLDivElement>(null);
  const { data } = useMdBasicKeywordData();

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
  const onTextChange = ev => {
    setKeywordValue(ev.target.value);
    setKeyboradIndex(-1);
  };
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

  useEffect(() => {
    if (router.asPath.includes('search')) {
      setKeywordValue(keyword as string);
      setTimeout(() => setMouseOver(false), 100);
      setTimeout(() => setFocus(false), 100);
    }
  }, [keyword]);

  const onSearch = async ev => {
    ev.preventDefault();
    if (keywordValue?.length < 2)
      return confirmAlert({
        title: `최소 2자 이상 입력해주세요.`,
        buttons: [{ label: '확인', onClick: () => null }],
      });
    const filterList = autoKeywordList?.filter(filterText => filterText?.includes(keywordValue));
    await keyWordCount(keyboradIndex === -1 ? keywordValue : filterList?.[keyboradIndex]);
    await searchKeywordLog(keyboradIndex === -1 ? keywordValue : filterList?.[keyboradIndex]);
    router.push(
      `/search/result?keyword=${
        keyboradIndex === -1 ? encodeURIComponent(keywordValue) : encodeURIComponent(filterList[keyboradIndex]?.replace(/ /g, ''))
      }&tab=all`,
    );
    if (keyboradIndex !== -1) {
      setKeywordValue(filterList[keyboradIndex]?.replace(/ /g, ''));
    }
    setTimeout(() => setMouseOver(false), 300);
  };
  const onBlur = () => {
    setMouseOver(false);
    setFocus(false);
    setKeyboradIndex(-1);
  };
  const onKeywordClick = (keyword: string) => async ev => {
    ev.preventDefault();
    ev.stopPropagation();
    await searchKeywordLog(keyword);
    await keyWordCount(keyword);
    router.push(`/search/result?keyword=${encodeURIComponent(keyword)}&tab=all`);
  };

  const onMouseSearch = async ev => {
    ev.preventDefault();
    ev.stopPropagation();
    if (keywordValue === '' || !keywordValue) {
      await searchKeywordLog(data?.[0]?.search_word);
      await keyWordCount(data?.[0]?.search_word);
      router.push(`/search/result?keyword=${encodeURIComponent(data?.[0]?.search_word?.replace(/ /g, ''))}&tab=all`);
    }
  };

  const onValueReset = () => {
    setKeywordValue('');
  };
  useEffect(() => {
    if (!router.asPath.includes('search')) {
      setKeywordValue('');
    }
  }, [router]);
  const onClose = () => {
    setMouseOver(false);
    setFocus(false);
  };
  return (
    <Container isFocus={isFocus}>
      <form onSubmit={onSearch} className='menu_search_form' name='search_form'>
        <input
          onBlur={() => setTimeout(() => onBlur, 300)}
          type='text'
          onKeyDown={onkeydown}
          name='search_text'
          value={keywordValue}
          id='search_text'
          placeholder={(data && `${data?.[0]?.search_word}`) || ''}
          autoComplete='off'
          onFocus={() => setFocus(true)}
          onChange={onTextChange}
        />
        <div className='input_btns'>
          <span onClick={onValueReset} className={keywordValue === '' ? 'delete_btn' : ''}>
            <Image src={deleteTermIcon} alt='텍스트삭제 아이콘' width={20} height={20} />
          </span>
          <span onClick={onMouseSearch} className='search_btn'>
            <Image src={searchIcon} alt='검색 아이콘' width={24} height={24} />
          </span>
        </div>
      </form>
      {keywordValue?.length > 1 && autoKeywordList?.find(filterText => filterText.includes(keywordValue)) && (
        <SearchDropDwon mouseOver={mouseOver}>
          <div ref={listRef} className='search_dropdown_wrapper'>
            {keywordValue?.length > 1 &&
              autoKeywordList
                ?.filter(filterText => filterText.includes(keywordValue))
                ?.map((item, index) => (
                  <div
                    ref={keyboradIndex === index ? listItemRef : null}
                    className={keyboradIndex === index ? 'active' : ''}
                    onClick={onKeywordClick(item)}
                    key={item}
                  >
                    {parse(makeBold(item, keywordValue.length >= 1 ? keywordValue : ''))}
                  </div>
                ))}
          </div>
          {mouseOver && (
            <div className='close_box'>
              <span onClick={onClose}>
                닫기&nbsp; <Image src={closeIcon} width={24} height={24} alt='close_icon' />
              </span>
            </div>
          )}
        </SearchDropDwon>
      )}
    </Container>
  );
};

export default MenuSearchInput;

const Container = styled.div<{ isFocus: boolean }>`
  position: relative;
  width: 460px;
  height: 50px;
  margin-right: 53px;
  border: 1px solid ${props => (props.isFocus ? '#262626' : '#f4f4f4')};
  border-radius: 8px;
  background-color: #f4f4f4;
  padding: 14px 12px 14px 18px;
  .menu_search_form {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;
    > input {
      all: initial;
      width: calc(100% - 70px);
      font-size: 15px;
    }
    .input_btns {
      display: flex;
      align-items: center;
      > span {
        ${theme.flexCenter};
        cursor: pointer;
      }
      > .delete_btn {
        cursor: pointer;
        display: none;
        width: 20px;
        height: 20px;
      }
      > .search_btn {
        cursor: pointer;
        width: 40px;
        height: 40px;
        margin-left: 10px;
      }
    }
  }
`;

const SearchDropDwon = styled.div<{ mouseOver?: boolean }>`
  /* display: ${props => (props.mouseOver ? 'none' : 'block')}; */
  position: absolute;
  border-radius: 8px;
  top: 48px;
  left: 0;
  width: 100%;
  height: ${props => (props.mouseOver ? '360px' : '0')};
  /* height: 360px; */
  padding: ${props => props.mouseOver && '10px 25px 0 27px'};
  background-color: #ffffff;
  z-index: 9999;
  border: ${props => props.mouseOver && ' 1px solid #262626'};
  ${props => props.theme.flexCenter};
  flex-direction: column;
  justify-content: flex-start;
  .search_dropdown_wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: calc(100% - 60px);
    overflow: hidden;
    overflow-y: auto;
    > div {
      width: 95%;
      cursor: pointer;
      user-select: none;
      padding: 16.5px 0;
      font-size: 15px;
      color: #262626;
      ${props => props.theme.flexCenter};
      justify-content: flex-start;
      border-bottom: 1px solid #f0f0f0;
      &:nth-last-child(1) {
        border-bottom: none;
      }
    }
    .active {
      background-color: #e6e6e6;
    }
  }
  .searchTextStyle {
    color: #4866e4;
  }

  > div.close_box {
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    width: 100%;
    height: 37px;
    border-top: 1px solid #f0f0f0;
    background-color: #fff;
    font-size: 14px;
    font-weight: 700;
    > span {
      display: flex;
      align-items: center;
      cursor: pointer;
      /* margin-right: 3px;
      margin-bottom: 4px; */
    }
  }
`;

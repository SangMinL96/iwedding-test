import useGoBack from '@hooks/useGoBack';
import iconSearch from '@images/common/search_icon_x3.png';
import iconBack from '@images/common/menu_sprite.png';
import { keyWordCount, useAutoKeyword, useMdBasicKeywordData } from '@modules/search/searchAPI';
import { setRecentSearch } from '@service/LocalStorageService';
import { makeBold } from '@utils/util';
import parse from 'html-react-parser';
import { useRouter } from 'next/router';
import deleteTermIcon from '@images/common/delete_text_icon.png';
import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import styled from 'styled-components';
import Image from 'next/image';
import { searchKeywordLog } from '@modules/log/search/searchLogger';
type PropsType = {
  value?: string;
  type: 'index' | 'result';
};

const MobileSearch = ({ value, type }: PropsType) => {
  const autoKeywordList = useAutoKeyword('all');
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchText, setSearchText] = useState('');
  const router = useRouter();
  const [isMouseOver, setMouseOver] = useState(false);
  const { data } = useMdBasicKeywordData();
  const onChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (event.target.value.length > 1) {
      setMouseOver(true);
    } else {
      setMouseOver(false);
    }
    setSearchText(event.target.value);
  };
  useEffect(() => {
    setSearchText(value);
  }, [setSearchText, value]);

  useEffect(() => {
    if (type === 'index' && inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef, type]);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    inputRef.current.blur();
    if (searchText.length > 1) {
      await searchKeywordLog(searchText);
      setRecentSearch(searchText);
      await keyWordCount(searchText);
      router.push(`/search/result?keyword=${encodeURIComponent(searchText)}&tab=all`);
    } else {
      confirmAlert({
        title: `최소 2자 이상 입력해주세요.`,
        buttons: [{ label: '확인', onClick: () => null }],
      });
    }
  };

  const onKeywordClick = (keyword: string) => async () => {
    await searchKeywordLog(keyword);
    await keyWordCount(keyword);
    inputRef.current.blur();
    router.push(`/search/result?keyword=${encodeURIComponent(keyword?.replace(/ /g, ''))}&tab=all`);
  };

  const onMouseLeave = () => {
    setMouseOver(false);
  };

  const onBasicSearch = async ev => {
    ev.preventDefault();
    ev.stopPropagation();
    await searchKeywordLog(searchText === '' ? data?.[0]?.search_word : searchText);
    if (searchText === '' || !searchText) {
      await keyWordCount(data?.[0]?.search_word);
      router.push(`/search/result?keyword=${encodeURIComponent(data?.[0]?.search_word?.replace(/ /g, ''))}&tab=all`);
    } else {
      setRecentSearch(searchText);
      keyWordCount(searchText);
      router.push(`/search/result?keyword=${encodeURIComponent(searchText?.replace(/ /g, ''))}&tab=all`);
    }
  };
  const goBack = () => {
    if (router.query.keyword) {
      router.push('/search');
    } else {
      router.push('/main/index');
    }
  };
  return (
    <Container>
      <form className='search-form' name='search_form' onSubmit={onSubmit}>
        <div className='top_search_box'>
          <button className='back_btn' onClick={goBack} type='button'>
            <span className='skip'>뒤로</span>
          </button>
          <div className='top_search_ip'>
            <input
              ref={inputRef}
              type='text'
              id='search_text'
              name='search_text'
              placeholder={(data && `${data?.[0]?.search_word}`) || ''}
              value={searchText}
              onChange={onChangeSearch}
            />

            <span onClick={() => setSearchText('')} style={searchText === '' ? { display: 'none' } : null} className={'delete_btn'}>
              <Image src={deleteTermIcon} alt='텍스트삭제 아이콘' width={20} height={20} />
            </span>
            <div onClick={onBasicSearch} className='search_btn'>
              <span className='skip'>검색</span>
            </div>
          </div>
        </div>
        {isMouseOver && searchText?.length > 1 && autoKeywordList?.find(filterText => filterText.includes(searchText)) && (
          <MouseDropDown className='search_list_box' isMouseOver={isMouseOver}>
            <ul className='recommend_schbox'>
              {searchText?.length > 1
                ? autoKeywordList
                    ?.filter(filterText => filterText.includes(searchText))
                    ?.map(item => (
                      <li onClick={onKeywordClick(item)} key={item}>
                        {parse(makeBold(item, searchText.length > 1 ? searchText : ''))}
                      </li>
                    ))
                : autoKeywordList?.map(item => (
                    <li onClick={onKeywordClick(item)} key={item}>
                      {item}
                    </li>
                  ))}
            </ul>
          </MouseDropDown>
        )}
      </form>

      {searchText?.length > 1 && autoKeywordList?.find(filterText => filterText.includes(searchText)) && isMouseOver && (
        <BGColorBox onClick={onMouseLeave} />
      )}
    </Container>
  );
};

export default MobileSearch;

const Container = styled.div`
  z-index: 50;
  position: sticky;
  top: 0;
  width: 100%;
  background-color: #fff;
  form {
    position: relative;
    .top_search_box {
      width: 100%;
      display: flex;
      align-items: center;
      height: 60px;
      background-color: #fff;
      z-index: 100;
      margin-right: 11px;
      .back_btn {
        outline: none;
        border: none;
        cursor: pointer;
        appearance: none;
        width: 50px;
        height: 60px;
        z-index: 1;
        background: url(${iconBack.src}) 2px center/auto 44px no-repeat;
        .skip {
          ${props => props.theme.skip}
        }
      }
      .top_search_ip {
        display: flex;
        align-items: center;
        width: calc(100% - 65px);
        height: 100%;
        position: relative;
        > input {
          width: 100%;
          outline: none;
          border: 1px solid #262626;
          border-radius: 8px;
          appearance: none;
          padding-left: 18px;
          max-height: 60px;
          height: 44px;
          font-size: 15px;
          color: #262626;
          letter-spacing: 0;
          font-weight: 400;
          &::placeholder {
            color: #8c8c8c;
            font-size: 15px;
          }
        }
      }
      .delete_btn {
        position: absolute;
        height: 55px;
        ${props => props.theme.flexCenter};
        right: 50px;
      }
      .search_btn {
        position: absolute;
        right: 0;
        outline: none;
        border: none;
        cursor: pointer;
        appearance: none;
        background: url(${iconSearch.src}) center/21px no-repeat;
        background-position: 12px center;
        background-size: 24px 24px;
        width: 51px;
        height: 44px;
        .skip {
          ${props => props.theme.skip}
        }
      }
    }
  }
`;
const MouseDropDown = styled.div<{ isMouseOver?: boolean }>`
  position: absolute;
  top: 60px;
  height: ${props => (props.isMouseOver ? '430px' : '0px')};
  transition: all 0.1s linear;
  z-index: 51;
  width: 100%;
  background-color: white;
  border: none;
  letter-spacing: 0;
  font-size: 15px;
  .recommend_schbox {
    width: 100%;
    height: 100%;
    ${props => props.theme.flexCenter}
    justify-content: flex-start;
    flex-direction: column;
    overflow-y: scroll;
    ${props => props.theme.hideScroll};
    li {
      width: calc(100% - 30px);
      padding: 15px 0;
      ${props => props.theme.flexCenter};
      justify-content: flex-start;
      border-bottom: 1px solid #f0f0f0;
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
  animation: fadein 0.2s ease-in-out;
  position: absolute;
  z-index: -1;
  width: 100%;
  top: 0;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
`;

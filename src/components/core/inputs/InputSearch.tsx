import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import deleteText from '@images/common/delete_text_icon.png';
import searchBtn from '@images/common/icon_search.png';
import Image from 'next/image';

interface InputWithClearProps {
  placeHolder?: string;
  onSearch?: (keyword: string) => void;
  onChangeText: (text: string) => void;
}

const InputBox = styled.div`
  width: 100%;
  display: block;
  position: relative;
  .input-box {
    width: 100%;
    height: 50px;
    .title-input-box {
      width: 100%;
      height: 100%;
      border: 2px solid #262626;
      position: relative;
      margin-bottom: 20px;
      > input {
        ${props => props.theme.resetBtnStyle}
        width: calc(100% - 66px);
        padding-left: 15px;
        height: 48px;
        font-size: 15px;
        background-color: transparent;
        &::placeholder {
          font-size: 15px;
          color: #8c8c8c;
        }
      }
      > button {
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
      }
      .delete-text-btn {
        right: 42px;
      }
      > .search-btn {
      }
    }
    .title-input-box.on {
      border: 2px solid #262626;
    }
  }
`;

const InputSearch = ({ placeHolder, onSearch, onChangeText }: InputWithClearProps) => {
  const [text, setText] = useState('');
  const mOnChangeText = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setText(e.target.value);
      onChangeText(e.target.value);
    },
    [setText, onChangeText],
  );
  const clearText = useCallback(() => {
    setText('');
  }, [setText]);

  const mOnSearch = useCallback(() => {
    if (onSearch) onSearch(text);
  }, [text, onSearch]);

  return (
    <InputBox>
      <div className='input-box'>
        <div className={text.length > 1 ? 'title-input-box on' : 'title-input-box'}>
          <input
            type='text'
            placeholder={placeHolder || ''}
            id='estimate-title'
            onKeyPress={mOnSearch}
            onChange={mOnChangeText}
            value={text}
          />
          {text.length > 1 && (
            <button className='delete-text-btn' onClick={clearText}>
              <Image unoptimized src={deleteText} alt='delete-text-btn' />
            </button>
          )}
          <button className='search-btn' onClick={mOnSearch}>
            <Image unoptimized src={searchBtn} alt='search-btn' />
          </button>
        </div>
        <div className='item-divide-line' />
      </div>
    </InputBox>
  );
};

export default InputSearch;

import theme from '@styles/theme';
import React, { forwardRef, useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import deleteText from '@images/common/delete_text_icon.png';
import Image from 'next/image';

const InputBox = styled.div<{ not_list?: boolean }>`
  display: inline-block;
  position: absolute;
  top: -16px;
  right: 0;
  .input_box {
    width: 245px;
    height: 50px;
    @media all and (max-width: ${theme.pc}px) {
      /* width: calc(100% - 55px); */
    }
    .title-input-box {
      width: 100%;
      height: 100%;
      border: 1px solid #dfdfdf;
      > input {
        background: transparent;
        appearance: none;
        border: none;
        outline: none;
        width: calc(100% - 33px);
        height: 48px;
        font-size: 15px;
        padding-left: 15px;
        &::placeholder {
          font-size: 15px;
          color: #8c8c8c;
        }
      }
      .delete-text-btn {
        width: 20px;
        height: 100%;
        background-color: transparent;

        > div {
          width: 20px;
          height: 20px;
        }
      }
    }
    .title-input-box.on {
      border: 1px solid #262626;
    }
  }
  .input_box.small_height {
    /* top: -9px; */
    height: 42px;
    > .title-input-box {
      > input {
        height: 40px;
      }
    }
  }
  .input_box.small_width {
    width: 180px;
    > .title-input-box {
      > input {
        width: calc(100% - 28px);
        padding-right: 5px;
      }
    }
  }
`;

interface InputWithClearProps {
  id?: string;
  name?: string;
  onChangeText?: (text: string) => void;
  placeHolder?: string;
  isSmall?: boolean;
  onClear?: boolean;
  clearComplete?: () => void;
  disable?: boolean;
  isList?: boolean;
  defaultText?: string;
  canUpdate?: (v: any) => boolean;
}

const InputWithClear = forwardRef<HTMLInputElement, InputWithClearProps>(
  (
    { onChangeText, placeHolder, isSmall, onClear, clearComplete, disable, defaultText, name, canUpdate, ...rest }: InputWithClearProps,
    inputRef,
  ) => {
    const [text, setText] = useState<string>(defaultText ? defaultText : '');

    useEffect(() => {
      if (defaultText != undefined) setText(defaultText);
    }, [defaultText]);

    const mOnChangeText = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        if (value.length > 0 && canUpdate !== undefined) {
          if (!canUpdate(value)) return;
        }
        setText(e.target.value);
        if (onChangeText) onChangeText(e.target.value);
      },
      [canUpdate, onChangeText, setText],
    );

    const clearText = useCallback(() => {
      setText('');
      if (clearComplete) {
        clearComplete();
      }
    }, [setText, clearComplete]);

    useEffect(() => {
      if (onClear) {
        clearText();
      }
    }, [onClear, clearText]);

    return (
      <InputBox {...rest}>
        {/* 해당 input은 주소검색 모달에서 업체명,장소명 입력을 위해 추가 */}
        {placeHolder === '업체명' || placeHolder === '직장,공항,위탁장소,etc.' ? (
          <div className='input_box small_width'>
            <div className={text && text.length > 1 ? 'title-input-box on' : 'title-input-box'}>
              <input
                type='text'
                placeholder={placeHolder || ''}
                onChange={mOnChangeText}
                value={text}
                ref={inputRef}
                className={`${disable ? 'no-click' : ''}`}
              />
            </div>
          </div>
        ) : (
          <div className={isSmall ? 'input_box small_height' : 'input_box'}>
            <div className={text && text.length > 1 ? 'title-input-box on' : 'title-input-box'}>
              <input
                type='text'
                placeholder={placeHolder || ''}
                onChange={mOnChangeText}
                value={text}
                ref={inputRef}
                className={`${disable ? 'no-click' : ''}`}
              />
              {text && text.length > 1 && (
                <button className='delete-text-btn' onClick={clearText}>
                  <Image unoptimized src={deleteText} alt='delete-text-btn' />
                </button>
              )}
            </div>
          </div>
        )}
      </InputBox>
    );
  },
);

InputWithClear.displayName = 'InputWithClear';
export default InputWithClear;

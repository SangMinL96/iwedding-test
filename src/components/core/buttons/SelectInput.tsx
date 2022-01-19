import IconInputReset from '@svgs/icon_input_reset';
import React, { useRef } from 'react';
import styled from 'styled-components';

type PropsType = {
  onChange: any;
  value?: string;
  row?: number;
  placeholder?: string;
  isArea?: boolean;
};

export const SelectInput = ({ onChange, value, row = 6, isArea = false, placeholder = '텍스트를 입력하세요.' }: PropsType) => {
  const inputAreaRef = useRef<HTMLTextAreaElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const onReset = () => {
    if (isArea) {
      if (inputAreaRef.current) inputRef.current.value = '';
    } else {
      if (inputRef.current) inputRef.current.value = '';
    }
  };
  return (
    <Container>
      {!isArea ? (
        <input ref={inputRef} placeholder={placeholder} value={value} onChange={onChange} />
      ) : (
        <textarea ref={inputAreaRef} rows={row} placeholder={placeholder} value={value} onChange={onChange} />
      )}

      <div className='icon' onClick={onReset}>
        <IconInputReset />
      </div>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  cursor: pointer;
  width: 100%;
  height: 100%;
  text-align: left;
  display: inline-block;
  width: 100%;
  margin-bottom: 8px;
  border-radius: 8px;

  margin-right: 5px;
  input {
    height: 48px;
    line-height: 38px;
    padding-left: 14px;
    padding-right: 45px;
    color: #262626;
    width: 100%;
    border: 1px solid #dfdfdf;
    border-radius: 8px;
    font-size: 15px;
    &:focus {
      border: 1px solid #4866e4;
    }
  }
  textarea {
    padding-top: 16px;
    padding-left: 14px;
    padding-right: 45px;
    color: #262626;
    width: 100%;
    height: 100%;
    border: 1px solid #dfdfdf;
    border-radius: 8px;
    font-size: 15px;
    &:focus {
      border: 1px solid #4866e4;
    }
  }
  .icon {
    ${props => props.theme.flexCenter};
    position: absolute;
    height: 48px;
    top: 0;
    right: 1em;
  }
`;

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { useFormContext } from 'react-hook-form';

import { hanbokList } from '../../util';
import { useSwrLocal } from '@hooks/useSwrLocal';
import { RSV_CENTER_RENTAL_CHECK } from '@utils/localSwrKeys';
import { SelectButton } from '@components/core/buttons/SelectButton';

function Content4({ setIsValidate }) {
  const { setValue } = useFormContext();
  const { data } = useSwrLocal<boolean[]>(RSV_CENTER_RENTAL_CHECK);
  const [values, setValues] = useState<any>({
    list1: null,
    list2: null,
    list3: null,
    list4: [],
  });

  //  리액트훅폼 데이터 셋팅 및 인풋값 유효성 검사
  useEffect(() => {
    // 선택 인풋과 입력 인풋이 존재함 하지만 단일 선택이 가능하므로 입력 인풋일경우와 선택인풋일경우를 나눔
    setValue('easy_book.which_style', values.list1);
    setValue('easy_book.cnt', values.list2);
    setValue('easy_book.fitting', values.list3);
    setValue('easy_book_which_ent_type', values.list4);

    // 입력폼 유효성검사
    if (values.list1 !== null) {
      setIsValidate(prev => ({ ...prev, 'easy_book.which_style': true }));
    }
    if (values.list2 !== null) {
      setIsValidate(prev => ({ ...prev, 'easy_book.cnt': true }));
    }
    if (values.list3 !== null) {
      setIsValidate(prev => ({ ...prev, 'easy_book.fitting': true }));
    }
    if (values.list4.length > 0) {
      setIsValidate(prev => ({ ...prev, easy_book_which_ent_type: true }));
    }
  }, [values]);

  useEffect(() => {
    if (data?.every(item => !item)) setIsValidate(prev => ({ ...prev, 'easy_book.fitting': true }));
  }, [data]);

  // 단일 클릭 이벤트 함수
  const onClick = (type: string) => (ev: React.MouseEvent) => {
    const { id } = ev.currentTarget;
    setValues(prev => ({ ...prev, [type]: id }));
  };

  // 다중 클릭 이벤트 함수
  const onMultiClick = (type: string) => (ev: React.MouseEvent) => {
    const { id } = ev.currentTarget;
    const isFind = values[type].find(item => item.type === id);
    if (isFind) {
      setValues(prev => ({ ...prev, [type]: prev[type].filter(item => item.type !== id) }));
    } else {
      setValues(prev => ({ ...prev, [type]: prev[type].concat({ type: id }) }));
    }
  };

  return (
    <ContentBox>
      <h3>선호하는 홀 타입이 있나요?</h3>
      <p style={{ color: 'blue' }}>여러개를 선택할 수 있어요.</p>
      <InputBox>
        <SelectButton style={{ width: '49%' }}>테스트</SelectButton>
        <SelectButton style={{ width: '49%' }}>테스트</SelectButton>
        <SelectButton style={{ width: '49%' }}>테스트</SelectButton>
        <SelectButton style={{ width: '49%' }}>테스트</SelectButton>
        <SelectButton style={{ width: '49%' }}>테스트</SelectButton>
        <SelectButton style={{ width: '49%' }}>테스트</SelectButton>
        <SelectButton style={{ width: '49%' }}>테스트</SelectButton>
      </InputBox>
    </ContentBox>
  );
}
export default React.memo(Content4);

const ContentBox = styled.div`
  width: 100%;
  padding: 51px 0 35px 0;
  h3 {
    font-size: 18px;
    font-weight: bold;
  }
  & > p {
    margin-top: 12px;
    margin-bottom: 22px;
    font-size: 14px;
    color: #8c8c8c;
  }
  h5 {
    margin-top: 2.5em;
    margin-bottom: 1em;
    font-size: 15px;
    font-weight: bold;
    &:nth-last-child(4) {
      margin-top: 1.5em;
    }
  }
`;

const InputBox = styled.div`
  position: relative;
  width: 100%;
  flex-wrap: wrap;
  display: flex;
  justify-content: space-between;
  button {
    background-color: #f5f5f5;
  }
`;

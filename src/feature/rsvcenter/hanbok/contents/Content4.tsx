import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useFormContext } from 'react-hook-form';

import { hanbokList } from '../../util';
import { useSwrLocal } from '@hooks/useSwrLocal';
import { RSV_CENTER_RENTAL_CHECK } from '@utils/localSwrKeys';
import { SelectButton } from '@components/core/buttons/SelectButton';
import { SelectInput } from '@components/core/buttons/SelectInput';

function Content4({ setIsValidate }) {
  const { setValue } = useFormContext();
  const { data } = useSwrLocal<boolean[]>(RSV_CENTER_RENTAL_CHECK);
  const [values, setValues] = useState<any>({
    list1: null,
    list2: null,
    list3: null,
    list4: [],
  });

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
    } else {
      setIsValidate(prev => ({ ...prev, easy_book_which_ent_type: false }));
    }
  }, [values]);

  useEffect(() => {
    if (data?.every(item => !item)) {
      setIsValidate(prev => ({ ...prev, 'easy_book.fitting': true }));
    } else {
      setIsValidate(prev => ({ ...prev, 'easy_book.fitting': false }));
      setValues(prev => ({ ...prev, list3: null }));
    }
  }, [data]);

  // 단일 클릭 이벤트 함수
  const onClick = (type: string) => (ev: React.MouseEvent) => {
    const { id } = ev.currentTarget;
    setValues(prev => ({ ...prev, [type]: id }));
  };
  const onMultiClick = (type: string) => (ev: React.MouseEvent) => {
    const { id } = ev.currentTarget;
    const isFind = values[type].find(item => item.type === id);
    if (isFind) {
      setValues(prev => ({ ...prev, [type]: prev[type].filter(item => item.type !== id) }));
    } else {
      if (values[type]?.length < 3) setValues(prev => ({ ...prev, [type]: prev[type].concat({ type: id }) }));
    }
  };

  return (
    <ContentBox>
      <h3>어떤 스타일을 선호하시나요?</h3>
      <p>선호하는 스타일에 맞춰 한복샵을 추천해드릴게요.</p>
      <h5 id='which_style'>Q. 어떤 스타일의 한복을 찾으시나요?</h5>
      {hanbokList.content4_1.map(item => (
        <InputBox key={item.value}>
          <SelectButton
            id={item.value}
            btnActive={item.value === values['list1']}
            onClick={onClick('list1')}
            style={{ lineHeight: '22px' }}
          >
            {item.name}
          </SelectButton>
        </InputBox>
      ))}
      <h5 id='cnt'>Q. 업체 몇 군데를 비교하고 싶으신가요?</h5>
      {hanbokList.content4_2.map(item => (
        <InputBox key={item.value}>
          <SelectButton
            id={item.value}
            btnActive={item.value === values['list2']}
            onClick={onClick('list2')}
            style={{ lineHeight: '22px' }}
          >
            {item.name}
          </SelectButton>
        </InputBox>
      ))}
      {data?.some(item => item) && (
        <>
          <h5 id='fitting'>Q. 대여한복 상담 시, 직접 피팅을 원하시나요?</h5>
          {hanbokList.content4_3.map((item, index) => (
            <InputBox key={item.value}>
              <SelectButton
                id={item.value}
                btnActive={item.value === values['list3']}
                onClick={onClick('list3')}
                style={index === 0 ? { height: 78, lineHeight: '22px' } : { lineHeight: '22px' }}
              >
                {item.name}
              </SelectButton>
            </InputBox>
          ))}
        </>
      )}

      <h5 id='easy_book_which_ent_type'>
        Q. 어떤 한복샵을 방문하고 싶으신가요? <span>(최대 3개)</span>
      </h5>
      {hanbokList.content4_4.map(item => (
        <InputBox key={item.value}>
          <SelectButton
            id={item.value}
            btnActive={values.list4.find(items => items.type === item.value) ? true : false}
            onClick={onMultiClick('list4')}
            style={{ lineHeight: '22px' }}
          >
            {item.name}
          </SelectButton>
        </InputBox>
      ))}
      <h5>Q. 업체 추천에 필요한 정보가 있다면 남겨주세요.</h5>
      <SelectInput isArea row={6} onChange={ev => setValue('easy_book.info', ev.target.value)} />
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
    span {
      font-size: 14px;
      color: #8c8c8c;
    }
  }
`;

const InputBox = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: space-between;
  button {
    background-color: #f5f5f5;
  }
`;

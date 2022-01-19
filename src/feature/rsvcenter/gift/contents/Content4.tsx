import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useFormContext } from 'react-hook-form';
import { giftList } from '../../util';
import { SelectButton } from '@components/core/buttons/SelectButton';
import { SelectInput } from '@components/core/buttons/SelectInput';

function Content4({ setIsValidate }) {
  const { setValue } = useFormContext();
  const [values, setValues] = useState<any>({
    list1: null,
    list2: null,
    list3: [],
  });

  useEffect(() => {
    // 선택 인풋과 입력 인풋이 존재함 하지만 단일 선택이 가능하므로 입력 인풋일경우와 선택인풋일경우를 나눔
    setValue('easy_book.which_style', values.list1);
    setValue('easy_book.cnt', values.list2);
    setValue('easy_book_which_ent_type', values.list3);

    // 입력폼 유효성검사
    if (values.list1 !== null) {
      setIsValidate(prev => ({ ...prev, 'easy_book.which_style': true }));
    }
    if (values.list2 !== null) {
      setIsValidate(prev => ({ ...prev, 'easy_book.cnt': true }));
    }
    if (values.list3.length > 0) {
      setIsValidate(prev => ({ ...prev, easy_book_which_ent_type: true }));
    } else {
      setIsValidate(prev => ({ ...prev, easy_book_which_ent_type: false }));
    }
  }, [values]);

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
      <p>선호하는 스타일에 맞춰 예물샵을 추천해드릴게요.</p>
      <h5 id='which_style'>Q. 어떤 스타일의 예물을 찾으시나요?</h5>

      {giftList.content4_1.map(item => (
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

      {giftList.content4_2.map(item => (
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
      <h5 id='easy_book_which_ent_type'>
        Q. 어떤 예물샵을 방문하고 싶으신가요? <span>(최대 3개)</span>
      </h5>
      {giftList.content4_3.map(item => (
        <InputBox key={item.value}>
          <SelectButton
            id={item.value}
            btnActive={values.list3.find(items => items.type === item.value) ? true : false}
            onClick={onMultiClick('list3')}
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

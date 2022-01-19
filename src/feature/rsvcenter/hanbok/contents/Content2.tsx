import { SelectButton } from '@components/core/buttons/SelectButton';
import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import styled from 'styled-components';
import { hanbokList } from '../../util';

function Content2({ setIsValidate }) {
  const { setValue } = useFormContext();
  const [values, setValuse] = useState({
    list1: null,
    list2: null,
  });
  useEffect(() => {
    setValue('easy_book.type1_budget', values.list1);
    setValue('easy_book.type2_budget', values.list2);
    if (values.list1 !== null) {
      setIsValidate(prev => ({ ...prev, 'easy_book.type1_budget': true }));
    }
    if (values.list2 !== null) {
      setIsValidate(prev => ({ ...prev, 'easy_book.type2_budget': true }));
    }
  }, [values]);
  const onClick = (type: string) => (ev: React.MouseEvent) => {
    const { id } = ev.currentTarget;
    setValuse(prev => ({ ...prev, [type]: id }));
  };
  return (
    <ContentBox>
      <h3>한복 1벌 당 예산대는 어떻게 생각하시나요?</h3>
      <p>예정하고 있는 한복 예산대를 선택해주세요.</p>
      <h5>맞춤 한복 예산대</h5>
      {hanbokList.content2_1.map(item => (
        <InputBox key={item.value}>
          <SelectButton
            id={item.value}
            btnActive={values['list1'] === item.value}
            onClick={onClick('list1')}
            style={{ height: '78px', lineHeight: 1.7 }}
          >
            {item.name}
          </SelectButton>
          {item.bedge && <Badge>BEST</Badge>}
        </InputBox>
      ))}

      <h5>대여 한복 예산대</h5>
      {hanbokList.content2_2.map(item => (
        <InputBox key={item.value}>
          <SelectButton
            id={item.value}
            btnActive={values['list2'] === item.value}
            onClick={onClick('list2')}
            style={{ height: '78px', lineHeight: 1.7 }}
          >
            {item.name}
          </SelectButton>
          {item.bedge && <Badge>BEST</Badge>}
        </InputBox>
      ))}
    </ContentBox>
  );
}

export default React.memo(Content2);

const ContentBox = styled.div`
  width: 100%;
  padding: 51px 0 35px 0;
  h3 {
    font-size: 18px;
    font-weight: bold;
  }
  & > p {
    margin-top: 12px;
    margin-bottom: 20px;
    font-size: 14px;
    color: #8c8c8c;
  }
  h5 {
    margin-bottom: 15px;
    font-size: 15px;
    font-weight: bold;
    margin-top: 1.5em;
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
const Badge = styled.div`
  width: 48px;
  height: 25px;

  ${props => props.theme.flexCenter};
  border: 1px solid #fd4381;
  border-radius: 7px;
  line-height: 3.5px;
  position: absolute;
  right: 38px;
  top: 45%;
  transform: translate(50%, -50%);
  font-size: 12px;
  color: #fd4381;
  font-weight: bold;
  background-color: #ffff1f;
`;

import { SelectButton } from '@components/core/buttons/SelectButton';
import { Desktop } from '@hooks/useDevice';
import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import styled from 'styled-components';

const InputList = [
  {
    name: '웨딩밴드 (신랑 신부 커플링)',
    value: '1',
    badge: true,
  },
  {
    name: '신부 다이아 반지',
    value: '2',
    badge: false,
  },
  {
    name: '신부 다이아 목걸이',
    value: '3',
    badge: false,
  },
  {
    name: '신랑 시계',
    value: '4',
    badge: false,
  },
  {
    name: '신부 시계',
    value: '5',
    badge: false,
  },
  {
    name: '혼주 예물',
    value: '6',
    badge: false,
  },
  {
    name: '기타',
    value: '7',
    badge: false,
  },
];
function Content1({ setIsValidate }) {
  const [values, setValues] = useState<any>([]);
  const isDeskTop = Desktop();
  const { setValue } = useFormContext();

  useEffect(() => {
    setValue('easy_book_which_product', values);
    if (values.length > 0) {
      setIsValidate(prev => ({ ...prev, easy_book_which_product: true }));
    } else {
      setIsValidate(prev => ({ ...prev, easy_book_which_product: false }));
    }
  }, [values]);

  const onClick = (ev: React.MouseEvent) => {
    const { id } = ev.currentTarget;
    const filter = values.find(item => item === id);
    if (filter) {
      setValues(prev => prev.filter(item => item !== id));
    } else {
      setValues(prev => prev.concat(id));
    }
  };

  return (
    <ContentBox isDeskTop={isDeskTop}>
      <h3 id='easy_book_which_product'>어떤 상품을 이용하실 예정인가요?</h3>
      <p>이용 예정인 상품 유형을 모두 선택하세요.</p>

      {InputList.map(item => (
        <InputBox key={item.value}>
          <SelectButton id={item.value} btnActive={values.includes(item.value)} onClick={onClick}>
            {item.name}
          </SelectButton>
          {item.badge && <Badge>BEST</Badge>}
        </InputBox>
      ))}
    </ContentBox>
  );
}

export default React.memo(Content1);

type StyledType = {
  isDeskTop?: boolean;
  count?: number | string;
};
const ContentBox = styled.div<StyledType>`
  width: 100%;
  padding: 0 0 35px 0;
  h3 {
    font-size: 18px;
    font-weight: bold;
    margin-top: ${props => !props.isDeskTop && '43px'};
  }
  & > p {
    margin-top: 12px;
    margin-bottom: 22px;
    font-size: 14px;
    color: #8c8c8c;
  }
`;
const InputBox = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: space-between;
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

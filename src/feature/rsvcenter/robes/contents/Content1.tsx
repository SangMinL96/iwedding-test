import { SelectButton } from '@components/core/buttons/SelectButton';
import { Desktop } from '@hooks/useDevice';
import { useSwrLocal } from '@hooks/useSwrLocal';
import { IconCountArrow } from '@svgs/icon_count_arrow';
import { RSV_CENTER_RENTAL_CHECK } from '@utils/localSwrKeys';
import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import styled from 'styled-components';

type InputListType = {
  name: string;
  value: string;
  easy_book_who_type: any;
  cnt: number;
};

const InputList = [
  {
    name: '신랑',
    value: '1',
    cnt: 0,
    easy_book_who_type: [],
  },
  {
    name: '신부',
    value: '2',
    cnt: 0,
    easy_book_who_type: [],
  },
  {
    name: '어머님',
    value: '3',
    cnt: 0,
    easy_book_who_type: [],
  },
  {
    name: '아버님',
    value: '4',
    cnt: 0,
    easy_book_who_type: [],
  },
  {
    name: '여자(혼주,친척,기타)',
    value: '5',
    cnt: 0,
    easy_book_who_type: [],
  },
  {
    name: '남자(혼주,친척,기타)',
    value: '6',
    cnt: 0,
    easy_book_who_type: [],
  },
];
function Content1({ setIsValidate }) {
  const [values, setValues] = useState<InputListType[]>(InputList || []);
  const isDeskTop = Desktop();
  const { setValue } = useFormContext();
  const { mutation } = useSwrLocal<boolean[]>(RSV_CENTER_RENTAL_CHECK);

  useEffect(() => {
    setValue('easy_book_who', values);
    if (values.some(item => item.cnt > 0)) {
      //카운터가 0보다 큰 값을 새로운 배열로 만듬.
      const cntFilter = values.filter(item => item.cnt > 0);
      // 카운터가 0보다 큰 필터링된 배열의 type만 빼옴.
      const typeFilter = cntFilter.map(item => item.easy_book_who_type.map(type => type));
      // 필터된 타입중 null값의 true, false 추출. 예) 맞춤 대여 선택안할시 false
      const typeFilterTypeCheck = typeFilter.map(item => item.every(every => every.type !== null));
      // 만들어진 값들중 맞춤 대여가 모두 선택이 되면 true, 아니면 false
      const validateResult = typeFilterTypeCheck.every(item => item);
      if (validateResult) {
        setIsValidate(prev => ({ ...prev, easy_book_who: true }));
      }
      const rentalTypeCheck = typeFilter.map(item => item.some(every => every.type === 2));
      mutation(rentalTypeCheck);
    } else {
      setIsValidate(prev => ({ ...prev, easy_book_who: false }));
    }
  }, [values]);

  const onCounting = (type: string) => (ev: React.MouseEvent) => {
    setIsValidate(prev => ({ ...prev, easy_book_who: false }));
    const { id } = ev.currentTarget;
    // 아이디로 비교해 배열 필터
    const filterCnt = values.find(item => item.value === id);
    // 필터된 배열에 카운터가 0보다 작거나 크면 함수 종료.
    if (filterCnt && filterCnt.cnt <= 0 && type === 'minus') return;
    //카운터가 0벌이고 타이틀을 클릭했을때
    if (type === 'name' && filterCnt?.cnt === 0) {
      setValues(prev =>
        prev.map(item => {
          if (item.value === id) {
            return {
              ...item,
              cnt: item.cnt + 1,
              easy_book_who_type: Array.from({ length: item.cnt + 1 }, () => ({ type: null })),
            };
          } else {
            return item;
          }
        }),
      );
      return;
    }
    // 타이틀 클릭 이벤트만 실행하고 함수 끝냄.
    if (type === 'name') return;

    setValues(prev =>
      prev.map(item => {
        if (item.value === id) {
          return {
            ...item,
            cnt: type === 'plus' ? item.cnt + 1 : item.cnt - 1,
            easy_book_who_type:
              type === 'plus'
                ? Array.from({ length: item.cnt + 1 }, () => ({ type: null }))
                : Array.from({ length: item.cnt - 1 }, () => ({ type: null })),
          };
        } else {
          return item;
        }
      }),
    );
  };
  const onClickType = (type: string, typeIndex: number) => (ev: React.MouseEvent) => {
    const { id } = ev.currentTarget;
    setValues(prev =>
      prev.map(item => {
        if (item.value === id) {
          const easy_book_who_type = item?.easy_book_who_type.map((whoType, index) => ({
            ...whoType,
            type: index === typeIndex ? (type === '맞춤' ? 1 : 2) : whoType.type,
          }));
          return { ...item, easy_book_who_type };
        } else {
          return item;
        }
      }),
    );
  };

  return (
    <>
      <ContentBox isDeskTop={isDeskTop}>
        <h3 id='easy_book_who'>누가 입나요?</h3>
        <p>여러벌이 필요한 경우 모두 선택해주세요.</p>
        {InputList.map((item, index) => (
          <InputBox key={item.value}>
            <SelectButton id={item.value} onClick={onCounting('name')} btnActive={values[index].cnt > 0} style={{ width: '60%' }}>
              {item.name}
            </SelectButton>
            <CountBox count={values[index].cnt}>
              <div className='count'>{values[index].cnt}벌</div>
              <div className='increase' id={item.value} onClick={onCounting('plus')}>
                <IconCountArrow type='up' />
              </div>
              <div className='decrease' id={item.value} onClick={onCounting('minus')}>
                <IconCountArrow type='down' />
              </div>
            </CountBox>
          </InputBox>
        ))}
      </ContentBox>
      {values.find(item => item.cnt > 0) && (
        <>
          <Divider />
          <SubContentBox>
            <h3>어떤 방식으로 이용하시겠어요?</h3>
            <p>이용 방식에 맞춰 업체를 추천해드릴게요.</p>
            <DescBox>
              <p>맞춤 예복: 체형과 취향에 따라 맞춤 제작하는 방식</p>
              <p>대여 예복: 미리 제작된 예복을 일정 기간 대여하는 방식</p>
            </DescBox>
            {values.map(item => {
              if (item.cnt > 0) {
                const cntArray = Array.from({ length: item.cnt }, (v, i) => i);
                return cntArray.map(cnt => (
                  <InputBox key={item.value}>
                    <SelectButton style={{ width: '60%', backgroundColor: '#F5F5F5', border: 'none' }}>
                      {item.name}&nbsp;{cnt + 1}
                    </SelectButton>
                    <div style={{ width: '38%', display: 'flex', justifyContent: 'space-between' }}>
                      <SelectButton
                        id={item.value}
                        onClick={onClickType('맞춤', cnt)}
                        btnActive={item.easy_book_who_type[cnt].type === 1}
                        style={{ width: '49%', textAlign: 'center', padding: 0 }}
                      >
                        맞춤
                      </SelectButton>
                      <SelectButton
                        id={item.value}
                        onClick={onClickType('대여', cnt)}
                        btnActive={item.easy_book_who_type[cnt].type === 2}
                        style={{ width: '49%', textAlign: 'center', padding: 0 }}
                      >
                        대여
                      </SelectButton>
                    </div>
                  </InputBox>
                ));
              }
            })}
          </SubContentBox>
        </>
      )}
    </>
  );
}

export default React.memo(Content1);

type StyledType = {
  isDeskTop?: boolean;
  count?: number | string;
};
const ContentBox = styled.div<StyledType>`
  position: relative;
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
const SubContentBox = styled.div<StyledType>`
  width: 100%;
  padding: 51px 0 35px 0;
  h3 {
    font-size: 18px;
    font-weight: bold;
    /* margin-top: ${props => !props.isDeskTop && '43px'}; */
  }
  & > p {
    margin-top: 12px;
    margin-bottom: 22px;
    font-size: 14px;
    color: #8c8c8c;
  }
`;
const InputBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
const CountBox = styled.div<StyledType>`
  ${props => props.theme.flexCenter};
  justify-content: space-between;
  width: 38%;
  height: 48px;
  border: 1px solid #dfdfdf;
  border-radius: 8px;
  user-select: none;
  .count {
    ${props => props.theme.flexCenter};
    width: 40%;
    height: 100%;
    font-size: 15px;
    color: ${props => props.count === 0 && '#dfdfdf'};
  }
  .increase {
    ${props => props.theme.flexCenter};
    border: 1px solid #dfdfdf;
    border-top: none;
    border-bottom: none;
    height: 100%;
    width: 31%;
    cursor: pointer;
    svg {
      width: 100%;
    }
  }
  .decrease {
    ${props => props.theme.flexCenter};
    width: 30%;
    height: 100%;
    cursor: pointer;
    svg {
      width: 100%;
    }
  }
`;

const Divider = styled.div`
  position: absolute;
  left: 0;
  width: 100%;
  height: 8px;
  background-color: #f2f2f2;
`;
const DescBox = styled.div`
  ${props => props.theme.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  background-color: #f4f6f8;
  border-radius: 10px;
  margin-bottom: 20px;
  line-height: 1.8;
  padding: 20px 20px 20px 15px;
  p {
    font-weight: 400;
    font-size: 14px;
    color: #8c8c8c;
  }
`;

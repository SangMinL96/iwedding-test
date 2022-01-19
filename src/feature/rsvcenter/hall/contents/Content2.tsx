import { CheckBox } from '@components/core/buttons/CheckBox';
import { SelectButton } from '@components/core/buttons/SelectButton';
import { SelectDatePicker } from '@components/core/buttons/SelectDatePicker';
import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';

const contentList = [
  {
    id: '0',
    date: '',
    time: null,
  },
];
const btnList = [
  {
    value: 0,
    name: () => (
      <div>
        첫 타임<p>(12시 전)</p>
      </div>
    ),
  },
  {
    value: 1,
    name: () => (
      <div>
        점심타임<p>(12시~15시 전)</p>
      </div>
    ),
  },
  {
    value: 2,
    name: () => (
      <div>
        오후타임<p>(15시~17시 전)</p>
      </div>
    ),
  },
  {
    value: 3,
    name: () => (
      <div>
        저녁타임<p>(17시 이후)</p>
      </div>
    ),
  },
];

function Content2({ setIsValidate }) {
  const { setValue } = useFormContext();
  const [checked, setChecked] = useState<string>('');
  const [values, setValues] = useState(contentList);

  // values라는 로컬 상태값이 변하면 react-hook-form에 데이터 셋팅
  useEffect(() => {}, []);

  const btnStyle = {
    width: '100px',
    padding: 0,
    textAlign: 'center',
    height: '78px',
    lineHeight: 1.7,
  };
  // 날짜 픽커 온체인지 함수
  const onChangeDate = (id: string) => date => {
    setValues(prev =>
      prev.map(item => {
        if (item.id === id) {
          return { ...item, date };
        }
        return item;
      }),
    );
  };

  const onListAdd = () => {
    setValues(prev =>
      prev.concat({
        id: String(prev.length),
        date: '',
        time: null,
      }),
    );
  };
  const onListRemove = (id: string) => () => {
    setValues(prev => prev.filter(item => item.id !== id).map((item2, index) => ({ ...item2, id: String(index) })));
  };

  const onChecked = (type: string) => () => {
    setChecked(type);
    setValues(contentList);
  };

  return (
    <ContentBox>
      <h3>언제 예식 예정인가요?</h3>
      <p>우선순위가 높은 일정을 우선으로 안내해드립니다.</p>
      <CheckBox
        style={{ marginBottom: 0 }}
        id={'check1'}
        onClick={onChecked('check1')}
        checked={checked === 'check1'}
        name={'월/일 선택(예식일 확정시)'}
      />
      <CheckBox id={'check2'} onClick={onChecked('check2')} checked={checked === 'check2'} name={'월 선택(예식일 미확정 시)'} />
      {checked !== '' &&
        values.map((item, index) => (
          <span key={item.id}>
            {item.id === '0' ? (
              <SelectDatePicker
                type={checked === 'check2' ? 'month' : undefined}
                placeholder={`${index + 1}순위 일정 선택`}
                date={item.date}
                onChange={onChangeDate(item.id)}
              />
            ) : (
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <SelectDatePicker
                  type={checked === 'check2' ? 'month' : undefined}
                  placeholder={`${index + 1}순위 일정 선택`}
                  date={item.date}
                  onChange={onChangeDate(item.id)}
                />
                <SelectButton onClick={onListRemove(item.id)} style={{ width: 30, textAlign: 'center', padding: 0 }}>
                  x
                </SelectButton>
              </div>
            )}

            <h5>희망타임(중복 선택 가능)</h5>
            <InputBox>
              {btnList.map(btn => (
                <SelectButton key={btn.value} style={btnStyle}>
                  {btn.name()}
                </SelectButton>
              ))}
            </InputBox>
          </span>
        ))}
      {checked !== '' && (
        <SelectButton onClick={onListAdd} style={{ textAlign: 'center', padding: 0 }}>
          일정 추가하기
        </SelectButton>
      )}
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
    margin-top: 1em;
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

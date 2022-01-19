import { CheckBox } from '@components/core/buttons/CheckBox';
import { SelectButton } from '@components/core/buttons/SelectButton';
import AbstractModal from '@components/core/modal/AbstractModal/AbstractModal';
import HallSearchModal from '@feature/rsvcenter/modal/HallSearchModal';
import HallTypeSearchModal from '@feature/rsvcenter/modal/HallTypeSearchModal';
import { rsvCenterKeys } from '@modules/rsvcenter/api';
import { HallTypeItf } from '@modules/rsvcenter/interface';
import React, { ReactEventHandler, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';
import useSWR from 'swr';

const contentList = [
  {
    id: '1',
    hall: null,
    hallText: null,
    hallType: null,
    hallTypeText: null,
    checked: false,
  },
];
function Content1({ setIsValidate }) {
  const { setValue: setFormValue } = useFormContext();
  const [visible, setVisibel] = useState({ parents: false, chlid: false });
  const [values, setValues] = useState<any>(contentList);
  const [currentIndex, setCurrentIndex] = useState<string>();
  const { data, mutate } = useSWR<HallTypeItf[]>(rsvCenterKeys.hallTypeSearch);

  //리액트 훅폼 데이터 셋팅
  useEffect(() => {}, []);

  // 웨딩홀 리스트 추가 이벤트 ex) 웨딩홀1 웨딩홀2 웨딩홀3 등 하나 추가
  const onListAdd = () => {
    setValues(prev =>
      prev.concat({
        id: prev.length + 1,
        hall: null,
        hallText: null,
        hallType: null,
        hallTypeText: null,
        checked: false,
      }),
    );
  };

  // 웨딩홀 리스트 삭제 이벤트 ex) 웨딩홀1 웨딩홀2 웨딩홀3 중 하나 삭제
  const onListRemove = id => () => {
    setValues(prev => prev.filter(item => item.id !== id).map((item2, index) => ({ ...item2, id: index })));
  };

  // 홀 타입이 1개일 경우 바로 인풋값 셋팅해줌
  useEffect(() => {
    if (data?.length === 1) {
      setValues(prev =>
        prev.map(hall => {
          if (hall.id === currentIndex) {
            return { ...hall, hallType: data[0].weddinghall_code, hallTypeText: `${data[0].name} / ${data[0].local}`, checked: false };
          } else {
            return hall;
          }
        }),
      );
    }
  }, data);

  const onSearchClick = (type: string, id: string) => () => {
    // 검색 클릭시 해당 인덱스값 상태 저장 ex) 웨딩홀1 웨딩홀2 웨딩홀3 구분
    setCurrentIndex(id);
    if (type === 'parents') {
      setVisibel({ parents: true, chlid: false });
    }
    if (type === 'chlid') {
      setVisibel({ chlid: true, parents: false });
    }
  };

  const onTypeChecked = (id: string) => () => {
    setValues(prev =>
      prev.map(hall => {
        if (hall.id === id) {
          if (!hall.checked) {
            return { ...hall, checked: !hall.checked, hallType: null, hallTypeText: null };
          } else {
            return { ...hall, checked: !hall.checked };
          }
        } else {
          return hall;
        }
      }),
    );
  };

  return (
    <ContentBox>
      <h3>어떤 웨딩홀이 궁금하세요?</h3>
      <p>최대 4개의 웨딩홀을 선택할 수 있어요0.</p>
      {values?.map((item, index) => (
        <span key={item.id}>
          {item.id === '1' ? (
            <h5>웨딩홀 {index + 1}</h5>
          ) : (
            <h5>
              웨딩홀 {index + 1} <span onClick={onListRemove(item.id)}>X</span>
            </h5>
          )}
          <InputBox>
            <SelectButton style={{ lineHeight: 1.5 }}>{item.hallText ? item.hallText : '웨딩홀을 선택하세요.'}</SelectButton>
            <SearchBox tabActive onClick={onSearchClick('parents', item.id)}>
              검색
            </SearchBox>
          </InputBox>
          {data && data?.length > 0 && item.hall !== null && (
            <>
              <InputBox>
                <SelectButton style={{ lineHeight: 1.5 }}>
                  {item.hallTypeText ? item.hallTypeText : '웨딩홀 타입을 선택하세요.'}
                </SelectButton>
                <SearchBox tabActive onClick={onSearchClick('chlid', item.id)}>
                  검색
                </SearchBox>
              </InputBox>
              <CheckBox onClick={onTypeChecked(item.id)} checked={item.checked} name='홀 타입 무관/미정' />
            </>
          )}
        </span>
      ))}
      <SelectButton onClick={onListAdd} style={{ textAlign: 'center', padding: 0 }}>
        웨딩홀 추가하기
      </SelectButton>
      <AbstractModal
        onClose={() => setVisibel(prev => ({ ...prev, parents: false }))}
        visible={visible.parents}
        noFooter
        title={'웨딩홀 선택'}
        rsvcenter={true}
        canConfirm
        isFullSize
        isWrap
      >
        <HallSearchModal currentIndex={currentIndex} setVisibel={setVisibel} setValues={setValues} mutate={mutate} />
      </AbstractModal>
      <AbstractModal
        onClose={() => setVisibel(prev => ({ ...prev, chlid: false }))}
        visible={visible.chlid}
        noFooter
        title={'웨딩홀 타입 선택'}
        rsvcenter={true}
        canConfirm
        isFullSize
        isWrap
      >
        <HallTypeSearchModal setValues={setValues} setVisibel={setVisibel} currentIndex={currentIndex} data={data} />
      </AbstractModal>
    </ContentBox>
  );
}

export default React.memo(Content1);

type StyledProps = {
  tabActive?: boolean;
};

const AreaListBox = styled.div`
  padding: 0 15px;
  display: flex;
  justify-content: space-between;

  flex-wrap: wrap;
  width: 100%;

  button {
    width: 24%;
    padding: 0;
    ${props => props.theme.flexCenter};
  }
`;
const ContentBox = styled.div`
  width: 100%;
  padding: 0 0 35px 0;
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
    margin-top: 1em;
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
  display: flex;
  justify-content: space-between;
  button {
    background-color: #f5f5f5;
  }
`;

const SearchBox = styled.div<StyledProps>`
  position: absolute;
  top: 48%;
  transform: translate(50%, -50%);
  right: 4em;
  ${props => props.theme.flexCenter};
  border-radius: 8px;
  background-color: ${props => (props.tabActive ? '#262626' : '#dfdfdf')};
  width: 60px;
  height: 60px;
  color: white;
  cursor: pointer;
  user-select: none;
`;

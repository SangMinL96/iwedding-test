import { InputSearch } from '@components/core/inputs';
import { Desktop } from '@hooks/useDevice';
import { mainKeys, mainRecentAPI } from '@modules/main/api';
import { hallSearchAPI, hallTypeSearchAPI, rsvCenterKeys } from '@modules/rsvcenter/api';
import { HallSearchItf } from '@modules/rsvcenter/interface';
import React, { useState } from 'react';
import styled from 'styled-components';
import useSWR from 'swr';

type PropsType = {
  setValues: (item: any) => void;
  mutate?: any;
  setVisibel: any;
  currentIndex?: any;
};

function HallSearchModal({ mutate: typeMutate, setValues, currentIndex, setVisibel }: PropsType) {
  const isDeskTop = Desktop();
  const [text, setText] = useState<string>('');
  const { data, mutate } = useSWR<HallSearchItf[]>(rsvCenterKeys.hallSearch, () => hallSearchAPI(text));

  const { data: recentData } = useSWR(mainKeys.mainRecentData, () => mainRecentAPI());
  const onSearch = text => {
    mutate(hallSearchAPI(text), false);
  };

  // 최근 본 웨딩홀 선택 이벤트 함수
  const onRecentClickChoice = (item: any) => () => {
    // 웨딩홀 리스트중 현재 인덱스 번호로 선택값 삽입
    setValues(prev =>
      prev.map(hall => {
        if (hall.id === currentIndex) {
          return { ...hall, hall: item?.ent_code, hallText: item?.ent_name, hallTypeText: null, hallType: null };
        } else {
          return hall;
        }
      }),
    );

    //웨딩홀 선택과 동시에 웨딩홀 타입 api 실행
    typeMutate(hallTypeSearchAPI(item?.ent_code), false);

    // 웨딩홀 타입 데이터가 1개 초과 일경우 웨딩홀 타입선택 모달 상태 트루
    if (Number(item?.cnt) > 1) {
      setVisibel({ parents: false, chlid: true });
    } else {
      // 웨딩홀 타입 데이터가 0개 or 1개 일경우 모달 전부 닫음
      setVisibel({ parents: false, chlid: false });
    }
  };
  // 웨딩홀 선택 이벤트 함수
  const onClickChoice = (item: HallSearchItf) => () => {
    // 웨딩홀 리스트중 현재 인덱스 번호로 선택값 삽입
    setValues(prev =>
      prev.map(hall => {
        if (hall.id === currentIndex) {
          return { ...hall, hall: item.id, hallText: item.label, hallTypeText: null, hallType: null };
        } else {
          return hall;
        }
      }),
    );

    //웨딩홀 선택과 동시에 웨딩홀 타입 api 실행
    typeMutate(hallTypeSearchAPI(item?.id), false);

    // 웨딩홀 타입 데이터가 1개 초과 일경우 웨딩홀 타입선택 모달 상태 트루
    if (Number(item?.cnt) > 1) {
      setVisibel({ parents: false, chlid: true });
    } else {
      // 웨딩홀 타입 데이터가 0개 or 1개 일경우 모달 전부 닫음
      setVisibel({ parents: false, chlid: false });
    }
  };

  return (
    <Container isDeskTop={isDeskTop}>
      <InputSearch onChangeText={ev => setText(ev)} onSearch={onSearch} placeHolder='검색어를 입력해주세요.' />
      <h3>최근본 웨딩홀 리스트</h3>
      <RecentBox>
        {recentData
          ?.filter(filter => filter.category === '웨딩홀')
          ?.map(item => (
            <li key={item.ent_code}>
              <h5>{item.ent_name}</h5>
              <div onClick={onRecentClickChoice(item)}>선택</div>
            </li>
          ))}
      </RecentBox>
      <h3>웨딩홀</h3>
      <ListBox>
        {data?.map(item => (
          <li key={item.id}>
            <h5>{item.label}</h5>
            <div onClick={onClickChoice(item)}>선택</div>
          </li>
        ))}
      </ListBox>
    </Container>
  );
}

export default HallSearchModal;

type StyledProps = {
  floating?: boolean;
  isDeskTop?: boolean;
};

const Container = styled.section<StyledProps>`
  position: relative;
  ${props => props.theme.flexCenter};
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  padding: 0 2em;
  margin-top: ${props => !props.isDeskTop && '1em'};
  background-color: white;
  h3 {
    font-size: 11px;
    font-weight: 400;
    color: '#8C8C8C';
    margin-top: 1.5em;
    margin-bottom: 1em;
    width: 100%;
    text-align: start;
  }
`;
const RecentBox = styled.ul`
  ${props => props.theme.flexCenter};
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  height: 100px;
  overflow-y: scroll;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
  li {
    width: 100%;
    height: 50px;
    padding: 10px;
    margin-bottom: 4px;
    background-color: #f7f7fa;
    ${props => props.theme.flexCenter};
    justify-content: space-between;
    h5 {
      font-size: 13px;
      font-weight: bold;
    }
    div {
      width: 70px;
      height: 35px;
      color: white;
      font-weight: bold;
      font-size: 13px;
      ${props => props.theme.flexCenter};
      background-color: black;
      user-select: none;
      cursor: pointer;
    }
  }
`;
const ListBox = styled.ul`
  ${props => props.theme.flexCenter};
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  height: 215px;
  overflow-y: scroll;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
  li {
    width: 100%;
    height: 50px;
    padding: 10px;
    margin-bottom: 4px;
    background-color: #f7f7fa;
    ${props => props.theme.flexCenter};
    justify-content: space-between;

    h5 {
      font-size: 13px;
      font-weight: bold;
    }
    div {
      width: 70px;
      height: 35px;
      color: white;
      font-weight: bold;
      font-size: 13px;
      ${props => props.theme.flexCenter};
      background-color: black;
      user-select: none;
      cursor: pointer;
    }
  }
`;
const ChoiceListBox = styled.ul`
  ${props => props.theme.flexCenter};
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  height: 315px;
  overflow-y: scroll;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
  li {
    width: 92%;
    height: 70px;
    padding: 15px 4px;
    margin-bottom: 4px;
    border-bottom: 1px solid #eeeef2;
    ${props => props.theme.flexCenter};
    justify-content: flex-start;
    div {
      margin-left: 1em;
      line-height: 1.5;
      h5 {
        font-size: 15px;
        font-weight: bold;
      }
      p {
        font-size: 11px;
        color: #a2a2a2;
      }
    }

    button {
      border-radius: 50px;
      background-color: #f7f7fa;
    }
  }
`;

const ChoiceBox = styled.div<StyledProps>`
  position: absolute;
  ${props => props.theme.flexCenter};
  flex-direction: column;
  justify-content: flex-start;
  bottom: 0;
  width: 100%;
  height: ${props => (props.floating ? '200px' : '0px')};
  background-color: white;
  transition: all 0.3s;
`;

const ChoiceBtn = styled.div<StyledProps>`
  ${props => props.theme.flexCenter};
  justify-content: space-between;
  padding: 0 1em;
  position: absolute;
  font-weight: bold;
  font-size: 14px;
  cursor: pointer;
  left: 50%;
  transform: translate(-50%, 50%);
  top: ${props => (props.floating ? (props.isDeskTop ? '-90px' : '-100px') : props.isDeskTop ? '-80px' : '-90px')};
  width: 200px;
  height: 50px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 1px 8px;
  border-radius: 50px;
  border: 1px solid #323232;
  div {
    ${props => props.theme.flexCenter};
  }
  span {
    margin-left: 0.3em;
    color: #fd4381;
  }
`;

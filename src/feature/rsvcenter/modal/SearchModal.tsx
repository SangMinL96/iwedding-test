import { InputSearch } from '@components/core/inputs';
import { Desktop } from '@hooks/useDevice';
import { easyBookProcSearchAPI, rsvCenterKeys } from '@modules/rsvcenter/api';
import { HanbokShopItf } from '@modules/rsvcenter/interface';
import IconArrowDownUp from '@svgs/icon_Arrow_downUp';
import IconDeleteCircle from '@svgs/icon_delete_circle';
import React, { useState } from 'react';
import styled from 'styled-components';
import useSWR from 'swr';

type PropsType = {
  category: string;
  setChoiceShop: any;
  choiceShop: HanbokShopItf[] | [];
};

function SearchModal({ category, setChoiceShop, choiceShop }: PropsType) {
  const isDeskTop = Desktop();
  const [floating, setFloating] = useState(false);
  const [text, setText] = useState<string>('');
  const { data, mutate } = useSWR<HanbokShopItf[]>(rsvCenterKeys.procSearch, () => easyBookProcSearchAPI(category, text));

  const onSearch = text => {
    mutate(easyBookProcSearchAPI(category, text), false);
  };
  const onClickChoice = (item: HanbokShopItf) => () => {
    const isFind = choiceShop.find(findItem => findItem.enterprise_code === item.enterprise_code);
    if (choiceShop.length < 3) {
      if (!isFind) {
        setChoiceShop(prev => prev.concat(item));
      }
    }
  };
  const onChangeText = ev => {
    if (ev.length > 1) {
      mutate(easyBookProcSearchAPI(category, ev), false);
    }
    if (ev.length === 0) {
      mutate(easyBookProcSearchAPI(category, ''), false);
    }
  };
  const onDelChoice = (item: HanbokShopItf) => () => {
    const filterShop = choiceShop.filter(filterItem => filterItem.enterprise_code !== item.enterprise_code);
    if (filterShop.length <= 0) setFloating(false);
    setChoiceShop(filterShop);
  };
  const onFloating = () => {
    if (choiceShop.length > 0) setFloating(prev => !prev);
  };

  return (
    <Container isDeskTop={isDeskTop}>
      <InputSearch onChangeText={onChangeText} onSearch={onSearch} placeHolder='검색어를 입력해주세요.' />
      <h3>{category}</h3>
      <ListBox>
        {data?.map(item => (
          <li key={item.enterprise_code}>
            <h5>{item.enterprise_name}</h5>
            <div onClick={onClickChoice(item)}>선택</div>
          </li>
        ))}
      </ListBox>
      <ChoiceBox floating={floating}>
        <ChoiceBtn isDeskTop={isDeskTop} floating={floating} onClick={onFloating}>
          <div>
            선택한 업체 <span>{choiceShop.length}</span>
          </div>
          <div>
            <IconArrowDownUp type={floating ? 'down' : 'up'} />
          </div>
        </ChoiceBtn>
        <ChoiceListBox>
          {choiceShop?.map(item => (
            <li key={item.enterprise_code}>
              <button onClick={onDelChoice(item)}>
                <IconDeleteCircle />
              </button>
              <div>
                <h5>{item.enterprise_name}</h5>
              </div>
            </li>
          ))}
        </ChoiceListBox>
      </ChoiceBox>
    </Container>
  );
}

export default SearchModal;

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

const ListBox = styled.ul`
  ${props => props.theme.flexCenter};
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  height: calc(100% - 15em);
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

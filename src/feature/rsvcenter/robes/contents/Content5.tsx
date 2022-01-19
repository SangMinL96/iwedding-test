import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';
import { robesList } from '../../util';
import SearchModal from '../../modal/SearchModal';
import { HanbokShopItf } from '@modules/rsvcenter/interface';
import { SelectButton } from '@components/core/buttons/SelectButton';
import IconDeleteCircle from '@svgs/icon_delete_circle';
import AbstractModal from '@components/core/modal/AbstractModal/AbstractModal';
import router from 'next/router';

function Content5({ setIsValidate }) {
  const { setValue: setFormValue } = useFormContext();
  const [choiceShop, setChoiceShop] = useState<HanbokShopItf[]>([]);
  const [visible, setVisibel] = useState(false);
  const [value, setValue] = useState<string>('');

  useEffect(() => {
    setFormValue('easy_book.type3', value);
    if (value !== '') {
      if (value === '0') {
        setIsValidate(prev => ({ ...prev, 'easy_book.type3': true }));
      }
      if (value === '1' && choiceShop.length === 0) {
        setIsValidate(prev => ({ ...prev, 'easy_book.type3': false }));
      } else {
        setIsValidate(prev => ({ ...prev, 'easy_book.type3': true }));
      }
    } else {
      setIsValidate(prev => ({ ...prev, 'easy_book.type3': false }));
    }
  }, [value, choiceShop]);

  const onClick = (type: string) => (ev: React.MouseEvent) => {
    const { id } = ev.currentTarget;
    if (type === 'search') {
      router.push(router.asPath + '#rsvcentermodal');
      setValue(id);
      setVisibel(true);
    } else {
      setValue(id);
    }
  };

  const onConfirm = () => {
    setVisibel(false);
    setFormValue(
      'easy_book_which_ent',
      choiceShop.map(item => ({ enterprise_code: item.enterprise_code })),
    );
  };

  const onModalClose = () => {
    setVisibel(false);
    setChoiceShop([]);
    setValue('');
  };
  const onDelChoice = (item: HanbokShopItf) => () => {
    setChoiceShop(prev => prev.filter(filterItem => filterItem.enterprise_code !== item.enterprise_code));
    setFormValue(
      'easy_book_which_ent',
      choiceShop
        .filter(filterItem => filterItem.enterprise_code !== item.enterprise_code)
        ?.map(item => ({ enterprise_code: item.enterprise_code })),
    );
    if (choiceShop.length === 1) {
      setValue('');
    }
  };
  return (
    <ContentBox id='type3'>
      <h3>미리 생각해두신 예복샵이 있으신가요?</h3>
      <p>최대 3곳까지 선택하실 수 있어요.</p>

      {robesList.content5.map((item, index) => (
        <span key={item.value}>
          <InputBox key={item.value}>
            <SelectButton
              id={item.value}
              btnActive={value === item.value}
              onClick={onClick('')}
              style={{ height: '106px', lineHeight: 1.5 }}
            >
              {item.name}
            </SelectButton>
            {index === 1 && (
              <SearchBox id={item.value} tabActive onClick={onClick('search')}>
                검색
              </SearchBox>
            )}
          </InputBox>
        </span>
      ))}
      {choiceShop.length > 0 && (
        <>
          <h5>선택 희망 업체</h5>
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
        </>
      )}

      <AbstractModal
        noPadding
        confirmText='선택 완료'
        visible={visible}
        onClose={onModalClose}
        title={'예복샵'}
        rsvcenter={true}
        canConfirm
        onConfirm={onConfirm}
        isFullSize
      >
        <SearchModal category='예복' choiceShop={choiceShop} setChoiceShop={setChoiceShop} />
      </AbstractModal>
    </ContentBox>
  );
}

export default React.memo(Content5);

type StyledProps = {
  tabActive?: boolean;
};

const ChoiceListBox = styled.ul`
  ${props => props.theme.flexCenter};
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  li {
    width: 100%;
    border-radius: 8px;
    height: 100%;
    padding: 8px 22px 8px 14px;
    margin-bottom: 4px;
    border: 1px solid #eeeef2;
    ${props => props.theme.flexCenter};
    justify-content: flex-start;
    button {
      ${props => props.theme.flexCenter};
    }
    div {
      margin-left: 1em;
      line-height: 1.5;
      & > h5 {
        margin: 0;
        font-size: 15px;
        font-weight: bold;
      }
      & > p {
        font-size: 11px;
        color: #a2a2a2;
      }
    }
  }
`;
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

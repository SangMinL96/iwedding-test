import { SelectButton } from '@components/core/buttons/SelectButton';
import AbstractModal from '@components/core/modal/AbstractModal/AbstractModal';
import { childAreaList, parentsAreaList } from '@utils/areaList';
import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';

const areaFilter = ['서울', '인천', '경기'];

function Content1({ setIsValidate }) {
  const { setValue: setFormValue } = useFormContext();
  const [visible, setVisibel] = useState({ parents: false, chlid: false });
  const [value, setValue] = useState<string>('');
  const [parentsArea, setParentsArea] = useState<string>('');
  const [chlidArea, setChlidArea] = useState<string>('');
  //리액트 훅폼 데이터 셋팅
  useEffect(() => {}, []);

  const onClickParents = (ev: React.MouseEvent) => {
    const { id } = ev.currentTarget;
    setParentsArea(id);
    if (areaFilter.includes(id)) {
      setVisibel({ chlid: true, parents: false });
    } else {
      setVisibel({ chlid: false, parents: false });
      setChlidArea('');
    }
  };
  const onClickChild = (ev: React.MouseEvent) => {
    const { id } = ev.currentTarget;
    setChlidArea(id);
    setVisibel({ chlid: false, parents: false });
  };
  return (
    <ContentBox>
      <h3>예식 예정 지역이 어디인가요?</h3>
      <p>지역에 맞는 웨딩홀을 최대 3곳까지 예약해드려요.</p>
      <InputBox>
        <SelectButton style={{ lineHeight: 1.5 }}>{parentsArea === '' ? '지역을 선택하세요.' : parentsArea}</SelectButton>
        <SearchBox tabActive onClick={() => setVisibel(prev => ({ ...prev, parents: true }))}>
          검색
        </SearchBox>
      </InputBox>
      {areaFilter.includes(parentsArea) && (
        <InputBox>
          <SelectButton style={{ lineHeight: 1.5 }}>{chlidArea === '' ? '상세지역을 선택하세요.' : chlidArea}</SelectButton>
          <SearchBox tabActive onClick={() => setVisibel(prev => ({ ...prev, chlid: true }))}>
            검색
          </SearchBox>
        </InputBox>
      )}

      <AbstractModal
        onClose={() => setVisibel(prev => ({ ...prev, parents: false }))}
        visible={visible.parents}
        noFooter
        title={'지역 선택'}
        rsvcenter={true}
        canConfirm
        isFullSize
        isWrap
      >
        <AreaListBox>
          {parentsAreaList.map(item => (
            <SelectButton id={item} onClick={onClickParents} key={item}>
              {item}
            </SelectButton>
          ))}
        </AreaListBox>
      </AbstractModal>
      <AbstractModal
        onClose={() => setVisibel(prev => ({ ...prev, chlid: false }))}
        visible={visible.chlid}
        noFooter
        title={'상세지역 선택'}
        rsvcenter={true}
        canConfirm
        isFullSize
        isWrap
      >
        <AreaListBox>
          {childAreaList[parentsArea]?.map(item => (
            <SelectButton id={item} onClick={onClickChild} key={item}>
              {item}
            </SelectButton>
          ))}
        </AreaListBox>
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

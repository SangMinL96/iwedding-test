import { CommonCheckBox } from '@components/core/checkboxes';
import { useSelectedQuotation } from '@feature/quotation/hooks/useSelectedQuotation';
import theme from '@styles/theme';
import React, { MutableRefObject } from 'react';
import styled from 'styled-components';
import { WhiteButton } from '../buttons/WhiteButton';

interface Props {
  onClickAllCart: (checked: boolean) => void;
  showCopyModal: () => void;
  onDeleteCart: (cart_nos: number[]) => () => Promise<void>;
  selectedCartNo: number[];
  isRealtime: boolean;
  allSelectBtnRef: MutableRefObject<HTMLInputElement>;
}

const DetailSelectContainer = ({ onClickAllCart, showCopyModal, onDeleteCart, selectedCartNo, allSelectBtnRef, isRealtime }: Props) => {
  const { selectedQuotation } = useSelectedQuotation();

  return (
    <SelectContainer className={`${!selectedQuotation.carts.length && 'no-click'}`}>
      <div className={`check_box`}>
        <CommonCheckBox id={'all'} name={'all'} onChange={checked => onClickAllCart(checked)} ref={allSelectBtnRef} initialState />
        <div className='label_box'>
          <label htmlFor='all' className={`check_label`}>
            전체선택
          </label>
        </div>
      </div>
      {!isRealtime ? (
        <BtnBox>
          <SmallWhiteBtn onClick={showCopyModal}>선택 복사</SmallWhiteBtn>
          <SmallWhiteBtn onClick={onDeleteCart(selectedCartNo)}>선택 삭제</SmallWhiteBtn>
        </BtnBox>
      ) : null}
    </SelectContainer>
  );
};

export default React.memo(DetailSelectContainer);

const SelectContainer = styled.div`
  width: 100%;
  height: 56px;
  border-bottom: 1px solid #dddddd;
  padding: 0 15px;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #dfdfdf;
  @media all and (min-width: ${theme.pc}px) {
    padding: 27px 0;
    border-top: 1px solid #dddddd;
    height: auto;
    margin-top: 20px;
  }

  .check_box {
    display: inline-block;
    width: 80px;
    height: 20px;
    position: relative;
    /* margin-top: 7px; */

    .label_box {
      display: inline-block;
      position: absolute;
      top: 1px;
      right: 2px;
      font-size: 14px;
    }
  }

  .btn_box {
    display: inline-block;
    position: absolute;
    right: 15px;
    top: 10px;
    @media all and (min-width: ${theme.pc}px) {
      top: 20px;
      right: 0;
    }

    > button {
      width: 70px;
      height: 34px;
      border: 1px solid #dfdfdf;
      text-align: center;
      font-size: 14px;
      @media all and (min-width: ${theme.pc}px) {
        width: 90px;
      }
    }

    .copy {
      margin-right: 5px;
    }
  }
`;

const BtnBox = styled.div`
  display: flex;
`;

const SmallWhiteBtn = styled(WhiteButton)`
  min-height: 34px;
  height: 34px;
  width: 70px;
  color: ${theme.black};
  border: 1px solid #dfdfdf;
  font-weight: 500;
  @media all and (min-width: ${theme.pc}px) {
    width: 90px;
    font-weight: 400;
  }
  &:nth-child(1) {
    margin-right: 5px;
  }
`;

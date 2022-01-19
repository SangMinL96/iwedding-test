import checkOn from '@images/common/checkbox_square_checked.png';
import checkOff from '@images/common/checkbox_square_unchecked.png';
import React, { forwardRef, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  /* width: 100%; */
  .chk-btn {
    width: 20px;
    height: 20px;
    display: inline-flex;
    input[type='checkbox'] {
      display: none;
    }
    input[type='checkbox'] + label {
      display: inline-flex;
      width: 20px;
      height: 20px;
      background: url(${checkOff.src}) no-repeat;
      background-size: 20px;
    }
    input[type='checkbox']:checked + label {
      display: inline-flex;
      width: 20px;
      height: 20px;
      background: url(${checkOn.src}) no-repeat;
      background-size: 20px;
    }
  }
`;

interface CommonCheckboxProps {
  id: string;
  name: string;
  limitedNumber?: number;
  limitedBool?: boolean;
  initialState?: boolean;
  onChange?: (checked: boolean, value: string) => void;
}
// 체크박스 타입 - 1 체크박스만 있는 타입(label은 따로 붙여야 함)
const CommonCheckBox = forwardRef<HTMLInputElement, CommonCheckboxProps>(
  ({ name, id, initialState = false, onChange, limitedNumber, limitedBool }, ref) => {
    const mOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      event.stopPropagation();
      // 한정수량 true && 한정수량 0개 이면 체크되지 않도록
      if (onChange) {
        if (limitedBool && limitedNumber !== undefined && limitedNumber === 0) {
          onChange((event.target.checked = false), name);
        } else {
          onChange(event.target.checked, name);
        }
      }
    };

    return (
      <Container>
        <div className='chk-btn'>
          <input type='checkbox' name={name} id={id} onChange={mOnChange} ref={ref} defaultChecked={initialState} />
          <label
            onClick={e => {
              e.stopPropagation();
              const checkbox = document.getElementById(id);
              if (checkbox) checkbox.click();
            }}
          />
        </div>
      </Container>
    );
  },
);

CommonCheckBox.displayName = 'Common_Check_box';
export default CommonCheckBox;

import React, { useEffect, useState } from 'react';
import theme from '@styles/theme';
import styled from 'styled-components';
import checked from '@images/common/checkbox_square_checked.png';
import unchecked from '@images/common/checkbox_square_unchecked.png';
import { InputWithClear } from '../inputs';

const Container = styled.div`
  width: 100%;
  /* height: 56px; */
  border-bottom: 1px solid #dfdfdf;
  padding: 17.5px 0;
  display: flex;
  align-items: center;
  position: relative;
  @media all and (max-width: ${theme.pc}px) {
    padding-left: 15px;
    padding-right: 15px;
  }
  .chk-box {
    display: inline-block;
    width: 20px;
    height: 20px;
    .chk-item {
      display: inline-flex;
      align-items: center;
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
          background: url(${unchecked.src}) no-repeat;
          background-size: 20px;
        }
        input[type='checkbox']:checked + label {
          display: inline-flex;
          width: 20px;
          height: 20px;
          background: url(${checked.src}) no-repeat;
          background-size: 20px;
        }
      }
    }
  }
  .content_container {
    display: inline-block;
    width: 100%;
    height: 100%;
    vertical-align: top;
    margin-left: 10px;
    position: relative;
    display: flex;
    align-items: center;
    > label {
      width: 100%;
      .title {
        display: inline-block;
        font-size: 15px;
        font-weight: 500;
        margin-right: 12px;
        @media all and (max-width: ${theme.pc}px) {
          margin-right: 27px;
        }
      }
      .title.middle {
        vertical-align: middle;
      }
      .input_container {
        display: inline-block;
        position: absolute;
        top: 5px;
        right: 0;
      }
    }
  }
`;

interface ItemProps {
  title: string;
  sub_title?: string;
  onSelect: (checked: boolean, value: string) => void;
  onChangeText?: (text: string) => void;
  is_input?: boolean;
  id?: string;
  name?: string;
  defaultCheck?: boolean;
}

const CheckboxItem = ({ title, sub_title, is_input, onChangeText, id, name, onSelect, defaultCheck }: ItemProps) => {
  const [checked, setChecked] = useState<boolean>(false);
  useEffect(() => {
    if (defaultCheck !== undefined) setChecked(defaultCheck);
  }, [defaultCheck]);

  const onClick = () => {
    setChecked(!checked);
    onSelect(!checked, title);
  };
  return (
    <>
      {title && (
        <Container>
          {/* Checkbox */}
          <div className='chk-box'>
            <div className='chk-item'>
              <div className='chk-btn'>
                <input type='checkbox' id={id} name={name} onChange={onClick} checked={checked} />
                <label htmlFor={id} />
              </div>
            </div>
          </div>
          <div className='content_container'>
            <label htmlFor={id}>
              <div className={is_input === true ? 'title middle' : 'title'}>{title}</div>
              {sub_title && <div className='sub_title on'>{sub_title}</div>}
              {is_input && onChangeText && (
                <div className='input_container'>
                  <InputWithClear onChangeText={onChangeText} placeHolder='친구(남자), 친구(여자), etc.' isSmall={true} />
                </div>
              )}
            </label>
          </div>
        </Container>
      )}
    </>
  );
};

export default CheckboxItem;

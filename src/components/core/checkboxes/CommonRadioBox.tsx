import React, { ChangeEvent } from 'react';
import styled from 'styled-components';
import checkOff from '@images/common/radio_circle_unchecked.png';
import checkOn from '@images/common/radio_circle_checked.png';

const Container = styled.div`
  .radio_box {
    .radio_item {
      display: inline-flex;
      align-items: center;
      .radio_btn {
        width: 20px;
        height: 20px;
        display: inline-flex;
        input[type='radio'] {
          display: none;
        }
        input[type='radio'] + label {
          display: inline-flex;
          width: 20px;
          height: 20px;
          background: url(${checkOff.src}) no-repeat;
          background-size: 20px;
        }
        input[type='radio']:checked + label {
          display: inline-flex;
          width: 20px;
          height: 20px;
          background: url(${checkOn.src}) no-repeat;
          background-size: 20px;
        }
      }
    }
  }
`;

interface CommonRadioProps {
  id: string;
  name: string;
  onChange: (value: string) => void;
  defaultCheck?: boolean;
}

const CommonRadioBox = ({ id, name, onChange, defaultCheck }: CommonRadioProps) => {
  const onChangeRadio = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(id);
  };
  return (
    <Container>
      <div className='radio_box'>
        <div className='radio_item'>
          <div className='radio_btn'>
            <input type='radio' name={name} id={id} onChange={onChangeRadio} defaultChecked={defaultCheck} />
            <label htmlFor={id} />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default CommonRadioBox;

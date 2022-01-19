import { debounce } from 'lodash';
import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import downArrow from '@images/common/down_arrow.png';
import Image from 'next/image';

const CounterBox = styled.div`
  width: auto;
  position: relative;

  .counter-num {
    display: inline-block;
    width: 40px;
    height: 30px;
    border-top: 1px solid #dfdfdf;
    border-bottom: 1px solid #dfdfdf;
    text-align: center;
    padding-top: 5px;
    vertical-align: top;
    font-size: 15px;
  }
`;

export enum UpdateCntProps {
  UP = 'UP',
  DOWN = 'DOWN',
}

interface Props {
  initNumber: number;
  limitedNumber?: number;
  limitedBool?: boolean;
  onChangeNumber?: (num: number) => void;
  onClickUpdateCnt?: (type: UpdateCntProps) => void;
}

const Counter = ({ initNumber, limitedBool, limitedNumber, onChangeNumber, onClickUpdateCnt }: Props) => {
  const [num, setNum] = useState(initNumber);

  const onClickMinus = useCallback(() => {
    if (num > 1) {
      setNum(num - 1);
      if (onChangeNumber) onChangeNumber(num - 1);
      if (onClickUpdateCnt) onClickUpdateCnt(UpdateCntProps.DOWN);
    }
  }, [onChangeNumber, onClickUpdateCnt, setNum, num]);

  const debouncedMinus = debounce(onClickMinus, 100);

  const onClickPlus = useCallback(() => {
    if (limitedBool === true && limitedNumber && limitedNumber < num) {
      return;
    } else {
      setNum(num + 1);
      if (onChangeNumber) onChangeNumber(num + 1);
      if (onClickUpdateCnt) onClickUpdateCnt(UpdateCntProps.UP);
    }
  }, [limitedBool, limitedNumber, onChangeNumber, onClickUpdateCnt, num, setNum]);

  const debouncedPlus = debounce(onClickPlus, 100);
  return (
    <CounterBox>
      <Button className='minus' onClick={debouncedMinus}>
        <Image width={8} height={6} src={downArrow} alt='minus' />
      </Button>
      <div className='counter-num'>
        <span>{num}</span>
      </div>
      <Button className='plus' onClick={debouncedPlus}>
        <Image width={8} height={6} src={downArrow} alt='plus' />
      </Button>
    </CounterBox>
  );
};

export default Counter;

const Button = styled.button`
  ${props => props.theme.resetBtnStyle};
  width: 30px;
  height: 30px;
  border: 1px solid #dfdfdf;
  display: inline-block;
  padding-bottom: 0px;
  vertical-align: middle;
  line-height: 12px;

  &.plus {
    transform: rotate(180deg);
    padding-bottom: 6px;
  }
`;

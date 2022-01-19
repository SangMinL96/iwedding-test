import AbstractModal from '@components/core/modal/AbstractModal/AbstractModal';
import { CommonModalProps } from '@modules/CommonInterface';
import router from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import InputRange, { Range } from 'react-input-range';
import 'react-input-range/lib/css/index.css';
import styled from 'styled-components';

interface PriceRangeModalProps extends CommonModalProps {
  selectedPriceRange?: Range;
  onSelectPriceRange: (range: Range) => void;
}
const MIN_PRICE = 0;
const MAX_PRICE = 1900;
const defaultRange = { min: 0, max: 1000 } as Range;

const ModalRealPriceRange = ({ selectedPriceRange, onSelectPriceRange, onClose }: PriceRangeModalProps) => {
  const [priceRange, setPriceRange] = useState<Range>(defaultRange);

  useEffect(() => {
    if (selectedPriceRange) {
      setPriceRange(selectedPriceRange);
    } else {
      setPriceRange(defaultRange);
    }
  }, [selectedPriceRange, setPriceRange]);

  const onConfirm = useCallback(() => {
    if (priceRange.min < priceRange.max) {
      onSelectPriceRange(priceRange);
    } else {
      alert('올바르지 않은 값 범위입니다.');
    }
  }, [onSelectPriceRange, priceRange]);

  return (
    <AbstractModal title='금액대' onClose={onClose} onConfirm={onConfirm} canConfirm stepFooter isDuplicated isFullSize>
      <Container>
        <div className='price_text'>
          {priceRange.min == MIN_PRICE && priceRange.max == MAX_PRICE
            ? '전체'
            : `${priceRange.min == 0 ? '0' : priceRange.min + '만'}원 이상 ${priceRange.max}만원 이하`}
        </div>
        <PriceRangeContainer>
          <InputRange
            step={100}
            maxValue={MAX_PRICE}
            minValue={MIN_PRICE}
            value={priceRange}
            formatLabel={() => ''}
            onChange={range => {
              setPriceRange(range as Range);
            }}
          />
        </PriceRangeContainer>
      </Container>
    </AbstractModal>
  );
};

export default ModalRealPriceRange;
const Container = styled.div`
  width: 100%;
  .price_text {
    font-size: 16px;
    font-weight: 700;
    text-align: center;
  }
`;

const PriceRangeContainer = styled.div`
  width: 100%;
  margin: 24px auto 70px auto;
  padding: 0 30px;
  .input-range {
    .input-range__track {
      height: 14px;
      .input-range__track--active {
        background: #4866e4;
      }
      .input-range__slider-container {
        .input-range__slider {
          width: 24px;
          height: 24px;
          margin-top: -19px;
          background-color: #fff;
          border: 2px solid #4866e4;
          box-shadow: rgba(0, 0, 0, 0.13) 1px 2px 8px;
        }
      }
    }
  }
`;

import { BlueButton } from '@feature/quotation/components/buttons/BlueButton';
import { logCalcComplete } from '@modules/log/calculator/calcLogger';
import theme from '@styles/theme';
import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useCalculatorState, useSelectedItems } from '../store/calcStore';
import { CALC_ESTIMATION_ID } from './Estimation';

const BottomButton = () => {
  const [showEstimation, toggleEstimation, calcItems, setCalcItems] = useCalculatorState(state => [
    state.showEstimation,
    state.toggleEstimation,
    state.calcItems,
    state.setCalcItems,
  ]);
  const selectedItems = useSelectedItems();
  const onEstimate = useCallback(async () => {
    toggleEstimation();
    setTimeout(() => document.getElementById(CALC_ESTIMATION_ID)?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 150);
    await logCalcComplete(selectedItems);
  }, [toggleEstimation, selectedItems]);

  const handleRecalc = useCallback(() => {
    const resetItems = calcItems.map(item => ({ ...item, item: undefined }));
    setCalcItems(resetItems);
    toggleEstimation();
  }, [setCalcItems, toggleEstimation, calcItems]);

  return (
    <Container>
      {!showEstimation ? (
        <BoldButton fontSize={16} onClick={onEstimate} disabled={(selectedItems ?? []).length < 1}>
          {selectedItems?.length > 0 ? '계산하기' : '1개 이상의 상품을 선택해주세요'}
        </BoldButton>
      ) : (
        <BoldButton fontSize={16} onClick={handleRecalc}>
          다시 계산하기
        </BoldButton>
      )}
    </Container>
  );
};

export default BottomButton;

const Container = styled.div`
  font-weight: bold;
  width: 560px;
  z-index: 10;
  border: none;
  @media (max-width: ${theme.pc}px) {
    bottom: calc(55px + var(--ios-bottom));
    left: 0;
    position: fixed;
    magrin: 0;
    width: 100%;
    padding: 15px;
  }
`;

const BoldButton = styled(BlueButton)<{ disabled?: boolean }>`
  font-weight: bold;
  width: 100%;
  height: 60px;
  border-radius: 12px;
  margin: auto;
  margin-top: 20px;

  ${({ disabled }) => disabled && `background: #dfdfdf`}
`;

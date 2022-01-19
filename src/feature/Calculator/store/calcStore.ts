import { useMemo } from 'react';
import create from 'zustand';
import { CalculatorItem, SDMOptions } from './calculatorOptions';

export interface CalcParams {
  showEstimation: boolean;
  calcItems: CalculatorItem[];

  toggleEstimation: () => void;
  setCalcItems: (items: CalculatorItem[]) => void;
}

export const useCalculatorState = create<CalcParams>(set => ({
  showEstimation: false,
  calcItems: SDMOptions,

  toggleEstimation: () => set(state => ({ showEstimation: !state.showEstimation })),
  setCalcItems: items => set(() => ({ calcItems: items })),
}));

export const useSelectedItems = () => {
  const calcItems = useCalculatorState(state => state.calcItems);

  return useMemo(() => {
    return calcItems.filter(({ item }) => !!item).map(({ item }) => item);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(calcItems)]);
};

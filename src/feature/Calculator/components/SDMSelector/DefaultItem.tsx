import { useCalculatorState } from '@feature/Calculator/store/calcStore';
import { WhiteButton } from '@feature/quotation/components/buttons/WhiteButton';
import { ProductCategoryValue } from '@modules/product/product.interface';
import theme from '@styles/theme';
import React from 'react';
import styled from 'styled-components';

interface Props {
  category: ProductCategoryValue;
  onClick: () => void;
}

const DefaultItem = ({ category, onClick }: Props) => {
  const showEstimation = useCalculatorState(state => state.showEstimation);

  return (
    <>
      <Left unselected={showEstimation}>{category}</Left>
      {showEstimation ? (
        <NoChoice disabled disableClick={showEstimation}>
          선택 안 함
        </NoChoice>
      ) : (
        <Right onClick={onClick}>상품 선택</Right>
      )}
    </>
  );
};

export default React.memo(DefaultItem);

const Left = styled.p<{ unselected?: boolean }>`
  font-size: 16px;
  font-weight: bold;
  ${({ unselected }) => unselected && ` color: ${theme.gray};`}
`;

const Right = styled(WhiteButton)`
  width: 100px;
  min-height: 40px;
  height: 40px;
  border-radius: 8px;
  font-size: 15px;
  font-weight: bold;
`;

const NoChoice = styled(WhiteButton)<{ disableClick: boolean }>`
  font-size: 16px;
  font-weight: bold;
  width: 100px;
  min-height: 40px;
  height: 40px;
  color: ${theme.gray};
  background: #f5f5f5;
  border-radius: 8px;
  border: none;
  ${({ disableClick }) => disableClick && `cursor: default`}
`;

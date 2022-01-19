import React from 'react';
import Button from '@components/core/buttons/CommonButton';
import styled from 'styled-components';

interface Props {
  disabled: boolean;
  onClick: any;
  title?: string;
}
const SelectBtn = ({ onClick, disabled, title = '상품 선택', ...rest }: Props) => {
  return disabled ? (
    <DisabledButton disabled {...rest}>
      선택 완료
    </DisabledButton>
  ) : (
    <SelectButton onClick={onClick} {...rest}>
      {title}
    </SelectButton>
  );
};

export default React.memo(SelectBtn);

const SelectButton = styled(Button)`
  background: rgb(38, 38, 38);
  color: white;
  border: none;
`;

const DisabledButton = styled(Button)`
  background: rgb(216, 216, 216);
  color: white;
  cursor: default;
`;

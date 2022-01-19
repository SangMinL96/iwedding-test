import { SelectBtn } from '@feature/Calculator/components/ProductItem';
import { EnterpriseDto } from '@modules/enterprise/enterprise.interface';
import React from 'react';
import styled from 'styled-components';

interface Props {
  item: EnterpriseDto;
  onClickAdd: (ent: EnterpriseDto) => () => void;
  disabled?: boolean;
}

const EnterItem = ({ item, onClickAdd, disabled }: Props) => {
  return (
    <Item>
      <span className='item_title'>{item.enterprise_name}</span>
      <StyledButton disabled={!!disabled} onClick={onClickAdd(item)} title='업체 선택' />
    </Item>
  );
};

export default EnterItem;

const Item = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px 0 15px;
  background-color: #f7f7fa;
  margin-bottom: 2px;
  .item_title {
    font-size: 13px;
    font-weight: 700;
  }
`;

const StyledButton = styled(SelectBtn)`
  width: 70px;
  height: 35px;
  color: #fff;
  font-size: 13px;
`;

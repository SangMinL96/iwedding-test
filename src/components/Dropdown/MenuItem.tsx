import { DropdownOption } from '@utils/dropdownOptions';
import React from 'react';
import styled from 'styled-components';

interface Props {
  item: DropdownOption;
  onClick: (item: DropdownOption) => void;
}

export const MenuItem = ({ item, onClick }: Props) => {
  return (
    <Item item={item} onClick={() => onClick(item)}>
      {item.title}
    </Item>
  );
};

const Item = styled.li<Props>`
  width: 100%;
  height: 42px;
  line-height: 42px;
  vertical-align: middle;
  font-size: 15px;
  padding: 0 13px;
  cursor: pointer;
  border-bottom: 1px solid #dfdfdf;

  &:active,
  &:hover {
    background-color: #f7f7f7;
  }
`;

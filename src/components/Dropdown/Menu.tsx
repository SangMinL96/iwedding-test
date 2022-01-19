import React, { forwardRef, Ref } from 'react';
import { DropdownOption } from '@utils/dropdownOptions';
import styled, { css } from 'styled-components';
import { MenuItem } from './MenuItem';
import theme from '@styles/theme';

interface Props {
  list: DropdownOption[];
  onClick: (item: DropdownOption) => void;
  largeWidth?: boolean;
}

const Menu = forwardRef(({ list, onClick, largeWidth = false }: Props, ref: Ref<HTMLDivElement>) => {
  return (
    <Container ref={ref} largeWidth={largeWidth}>
      {list?.map(li => (
        <MenuItem item={li} key={`dropdown_${li.method}`} onClick={onClick} />
      ))}
    </Container>
  );
});

Menu.displayName = 'Dropdown Menu';
export default React.memo(Menu);

const Container = styled.div<Partial<Props>>`
  display: block;
  position: absolute;
  background-color: #fff;
  width: ${({ largeWidth }) => (largeWidth ? '155px' : 'max-content')};
  height: max-content;
  max-height: 189px;
  overflow: hidden;
  overflow-y: scroll;
  border: 1px solid #262626;
  margin-top: 18px;
  right: 0;
  ${theme.hideScroll}

  @media (min-width: ${theme.pc}px) {
    > li &:first-child {
      border-top: none;
    }
    > li &:last-child {
      border-bottom: none;
    }
  }
`;

import React from 'react';
import IconDownTriangle from '@svgs/icon_down_triangle';
import styled from 'styled-components';
import theme from '@styles/theme';

interface Props {
  title: string;
  onClick: () => void;
  largeWidth?: boolean;
}

const Trigger = ({ title, onClick, largeWidth = false }: Props) => {
  return (
    <TriggerButton onClick={onClick} largeWidth={largeWidth}>
      {title}
      <span>
        <IconDownTriangle />
      </span>
    </TriggerButton>
  );
};
export default React.memo(Trigger);
const TriggerButton = styled.button<{ largeWidth: boolean }>`
  ${props => props.theme.resetBtnStyle};
  font-size: 15px;
  font-weight: 700;
  background-color: transparent;
  width: ${({ largeWidth }) => (largeWidth ? '155px' : 'max-content')};
  text-align: right;
  color: ${theme.black};
  > span {
    ${theme.flexCenter}
    display: inline-block;
    width: 10px;
    height: 100%;
    margin-left: 2px;

    > img {
      width: 8px;
      height: 7px;
      vertical-align: middle;
    }

    > svg {
      width: 8px;
      height: 7px;
      margin-bottom: 3px;
      vertical-align: middle;
    }
  }
`;

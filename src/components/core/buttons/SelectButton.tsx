import React from 'react';
import styled from 'styled-components';
type SelectButtonType = {
  id?: string;
  children?: React.ReactNode;
  style?: any;
  active?: boolean; //선택시 백그라운드색 그레이색
  btnActive?: boolean; //선택시 테투리랑 글자색이 파란색
  onClick?: React.MouseEventHandler;
};

export const SelectButton = ({ children, id, style, active, btnActive = false, onClick }: SelectButtonType) => {
  return (
    <ButtonStyled active={active} btnActive={btnActive} id={id} onClick={onClick} style={style} type='button'>
      {children}
    </ButtonStyled>
  );
};

type StyledType = {
  active?: boolean;
  btnActive?: boolean;
};

const ButtonStyled = styled.button<StyledType>`
  width: 100%;
  text-align: left;
  display: inline-block;
  height: 48px;
  line-height: 38px;
  vertical-align: middle;
  border-radius: 8px;
  border: 1px solid #dfdfdf;

  padding-left: 14px;
  padding-right: 45px;
  padding-top: 1px;
  font-size: 15px;
  margin-bottom: 8px;
  background-color: ${props => (props.active ? '#F5F5F5' : '#ffffff')};
  color: ${props => props.active && '#262626'};
  color: ${props => props.btnActive && '#4866E4'};
  font-weight: ${props => props.btnActive && 'bold'};
  border-color: ${props => (props.btnActive ? '#4866E4' : '#dfdfdf')};
  &:active {
    background-color: #dfdfdf;
  }
  p {
    font-size: 13px;
    color: ${props => (props.btnActive ? '#4866E4' : '#8C8C8C')};
  }
`;

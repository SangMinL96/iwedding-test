import React from 'react';
import { IconChecked } from '@svgs/icon_checked';
import styled from 'styled-components';

type PropsType = {
  id?: string;
  style?: any;
  name: string;
  checked: boolean;
  onClick?: React.MouseEventHandler;
};

export const CheckBox = ({ id, style, name, checked, onClick }: PropsType) => {
  return (
    <Container style={style} id={id} onClick={onClick}>
      <IconChecked checked={checked} />
      <span>{name}</span>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;

  height: 30px;
  margin-top: 0.5em;
  margin-bottom: 2em;
  cursor: pointer;

  span {
    font-size: 15px;
    margin-left: 7px;
    margin-right: 22px;
    @media all and (max-width: 368px) {
      font-size: 13px;
      margin-right: 18px;
    }
  }
`;

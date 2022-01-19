import React, { SyntheticEvent } from 'react';
import theme from '@styles/theme';
import styled, { css } from 'styled-components';

interface Props {
  title: string;
  onClick: (e: SyntheticEvent) => void;
  active: boolean;
  fontSize?: number;
}

export const TypeButton = ({ title, onClick, active, fontSize = 12 }: Props) => {
  const titles = title.split('/');
  return (
    <Button onClick={onClick} active={active} fontSize={fontSize}>
      {titles.map(t => {
        return (
          <span key={t}>
            {t}
            <br />
          </span>
        );
      })}
    </Button>
  );
};

const Button = styled.button<{ active: boolean; fontSize: number }>`
  width: 100%;
  height: 40px;
  border-radius: 8px;
  font-weight: bold;
  border: 1px solid #dfdfdf;
  color: ${theme.black};
  background: #f5f5f5;
  ${({ active }) =>
    active &&
    css`
      border-color: ${theme.blue};
      color: ${theme.blue};
    `}

  ${({ fontSize }) =>
    fontSize &&
    css`
      font-size: ${fontSize}px;
    `}
`;

import React, { ReactNode } from 'react';
import theme from '@styles/theme';
import styled from 'styled-components';

interface Props {
  children: ReactNode;
}

const index = ({ children, ...rest }: Props) => {
  return <Inner {...rest}>{children}</Inner>;
};

export default index;

const Inner = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  height: 100%;
  width: 100%;
  padding: 0 30px;
  overflow-y: scroll;
  overflow-x: hidden;
  ${props => props.theme.hideScroll};
  @media all and (min-width: ${theme.tablet}px) {
    height: 100%;
  }
`;

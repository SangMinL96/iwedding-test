import React, { ReactNode } from 'react';
import theme from '@styles/theme';
import styled from 'styled-components';

interface Props {
  children: ReactNode;
}

const index = ({ children, ...props }: Props) => {
  return <Wrapper {...props}>{children}</Wrapper>;
};

export default index;

const Wrapper = styled.div`
  ${props => props.theme.modalLayoutCSS};
  overflow: hidden;
  z-index: 10001;
  @media all and (max-width: ${theme.pc}px) {
    box-shadow: none;
  }
`;

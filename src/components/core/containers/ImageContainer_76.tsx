import React, { SyntheticEvent } from 'react';
import { ReactNode } from 'react';
import styled from 'styled-components';

interface Props {
  children: ReactNode;
  onClick?: (e: SyntheticEvent) => void;
}

// width & height 76px Image container
export const ImageContainer_76 = ({ children, onClick, ...props }: Props) => (
  <ImageContainer onClick={onClick} {...props}>
    {children}
  </ImageContainer>
);

const ImageContainer = styled.div`
  position: relative;
  width: 76px;
  height: 76px;
  background-color: #e6e6e6;
  border: 1px solid #e6e6e6;
  cursor: pointer;
`;

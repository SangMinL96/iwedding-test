import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { ContentButtonBox } from '@feature/quotation/components/buttonBoxes/ContentButtonBox';

interface Props {
  children: ReactNode;
}

export const ModalButtonBox = ({ children }: Props) => {
  return <ButtonBox>{children}</ButtonBox>;
};

const ButtonBox = styled(ContentButtonBox)`
  display: grid;
  place-items: center;
  grid-row-gap: 7px;
  padding: 20px 0px;
`;

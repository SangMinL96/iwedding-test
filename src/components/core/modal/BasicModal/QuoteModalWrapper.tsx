import React, { ReactNode } from 'react';
import ModalWrapper from '@components/core/modal/ModalWrapper';
import styled from 'styled-components';

interface Props {
  children: ReactNode;
}
export const QuoteModalWrapper = ({ children, ...props }: Props) => {
  return <Wrapper {...props}>{children}</Wrapper>;
};

const Wrapper = styled(ModalWrapper)`
  height: 255px;
  width: 280px;
  z-index: 200001;
`;

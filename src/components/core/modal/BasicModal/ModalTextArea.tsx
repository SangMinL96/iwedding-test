import TextArea from '@components/core/texts/TextArea';
import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface Props {
  children: ReactNode;
}

export const ModalTextArea = ({ children, ...props }: Props) => {
  return <TA {...props}>{children}</TA>;
};

const TA = styled(TextArea)`
  height: 48px;
  width: 140px;
`;

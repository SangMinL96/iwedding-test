import theme from '@styles/theme';
import React from 'react';
import styled from 'styled-components';

interface Props {
  text: string;
  noBorder?: boolean;
}

const NoList = ({ text, noBorder = false }: Props) => {
  return <StyledP noBorder={noBorder}>{text}</StyledP>;
};

export default React.memo(NoList);

const StyledP = styled.p<{ noBorder: boolean }>`
  display: grid;
  place-items: center;
  font-size: 16px;
  height: 227px;
  border-bottom: 1px solid #dfdfdf;
  border-top: 1px solid #dfdfdf;
  width: 100%;
  margin: 0 auto;
  @media (max-width: ${theme.pc}px) {
    width: calc(100% - 30px);
  }

  ${({ noBorder }) => noBorder && `border: none;`}
`;

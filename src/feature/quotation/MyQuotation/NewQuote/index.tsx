import React from 'react';
import theme from '@styles/theme';
import Button, { ButtonProps } from '@components/core/buttons/CommonButton';
import styled from 'styled-components';
import IconPlus from '@svgs/icon_plus';
import { Desktop } from '@hooks/useDevice';

const index = ({ onClick }: Partial<ButtonProps>) => {
  const isDesktop = Desktop();
  return (
    <Container isDesktop={isDesktop}>
      <StyledBtn onClick={onClick}>
        <span>
          <IconPlus />
        </span>{' '}
        새 견적함 만들기
      </StyledBtn>
    </Container>
  );
};

export default index;

const Container = styled.div<{ isDesktop: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-bottom: 30px;
  margin-top: ${({ isDesktop }) => (isDesktop ? `40px` : `15px`)};
`;

const StyledBtn = styled(Button)`
  ${props => props.theme.resetBtnStyle};
  width: 345px;
  height: 50px;
  border: 1px solid ${props => props.theme.blue};
  font-size: 15px;
  font-weight: 700;
  color: ${props => props.theme.blue};
  @media all and (max-width: ${theme.pc}px) {
    width: 100%;
  }

  > span {
    font-size: 18px;
    font-weight: 100;
    > svg {
      width: 10px;
      height: 10px;
      vertical-align: top;
      margin-top: 6px;
    }
  }
`;

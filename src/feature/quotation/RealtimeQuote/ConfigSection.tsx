import React, { useCallback } from 'react';
import theme from '@styles/theme';
import styled, { css } from 'styled-components';
import IconKeyboardRightArrow from '@svgs/icon_keyboard_right_arrow';
import { useModalVisible } from '@hooks/useModalVisible';
import { DETAIL_SORT_MODAL } from '@utils/modalKeys';
import { Desktop } from '@hooks/useDevice';
import { useRouter } from 'next/router';

interface Props {
  selected: number | undefined;
  active?: boolean;
}

export const ConfigSection = ({ selected }: Props) => {
  const { setModalVisible } = useModalVisible(DETAIL_SORT_MODAL);
  const router = useRouter();
  const onOpenFilter = useCallback(() => {
    setModalVisible(true);
    router.push(router.asPath + '#DetailFilterModal');
  }, [setModalVisible, router]);
  const isDesktop = Desktop();
  return (
    <Container isDesktop={isDesktop}>
      <ConfigStateBtn onClick={onOpenFilter} active={selected ? true : undefined}>
        상세 조건 설정 {selected ? `(${selected}개 선택됨)` : ''}
        <span>
          <IconKeyboardRightArrow lineColor={selected ? '#fff' : '#4866E4'} />
        </span>
      </ConfigStateBtn>
    </Container>
  );
};

const Container = styled.div<{ isDesktop: boolean }>`
  width: 100%;
  margin-bottom: 30px;
  margin-top: ${({ isDesktop }) => (isDesktop ? `40px` : `15px`)};
  text-align: center;
`;

const ConfigStateBtn = styled.button<{ active: boolean | undefined }>`
  ${props => props.theme.resetBtnStyle};
  border: 2px solid ${props => props.theme.blue};
  width: 345px;
  height: 50px;
  font-size: 15px;
  font-weight: 700;
  color: ${props => props.theme.blue};
  position: relative;
  text-align: left;
  font-weight: 700;
  padding-left: 13px;
  @media all and (max-width: ${theme.pc}px) {
    width: 100%;
  }

  > span {
    font-size: 18px;
    font-weight: 100;
    display: block;
    position: absolute;
    right: 10px;
    top: 13px;
    width: 7.5px;
    height: 13.5px;
    /* > img {
                width: 7.5px;
                height: 13.5px;
              } */

    > svg {
      width: 7.5px;
      height: 13.5px;
    }
  }

  ${({ active }) =>
    active &&
    css`
      background-color: ${props => props.theme.blue};
      color: #fff;
    `}
`;

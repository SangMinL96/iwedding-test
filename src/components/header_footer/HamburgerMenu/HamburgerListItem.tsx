import { useBbsPageState } from '@feature/Ibrandplus/hooks/useBbsPageState';
import ArrowDown from '@images/common/chevron_down_gray.png';
import ArrowUp from '@images/common/chevron_up.png';
import { useMainCategory } from '@modules/ibrandplus/ibrandplusAPI';
import { CategoryProps } from '@modules/sharedData';
import theme from '@styles/theme';
import Image from 'next/image';
import Link from 'next/link';
import React, { SyntheticEvent, useCallback, useRef, useState } from 'react';
import styled from 'styled-components';

interface Props {
  title: string;
  categoryKey: string;
}

const HamburgerListItem = ({ title, categoryKey }: Props) => {
  const { data: categoryList } = useMainCategory(categoryKey);
  const setSelectedCategory = useBbsPageState(state => state.setSelectedCategory);
  const [active, setActive] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const toggleBody = useCallback(() => {
    if (wrapperRef.current === null || bodyRef.current === null) return;
    if (wrapperRef.current.clientHeight > 0) {
      wrapperRef.current.style.height = '0';
    } else {
      wrapperRef.current.style.height = '0';
      wrapperRef.current.style.height = `${bodyRef.current.clientHeight}px`;
    }
  }, [wrapperRef, bodyRef]);

  const onClickMenu = useCallback(
    (e: SyntheticEvent) => {
      e.stopPropagation();
      toggleBody();
      setActive(!active);
    },

    [active, toggleBody, setActive],
  );

  const onClickCategory = useCallback(
    (c: CategoryProps) => () => {
      toggleBody();
      setActive(false);
      setSelectedCategory(c);
    },
    [toggleBody, setSelectedCategory],
  );

  return (
    <Container>
      <Header onClick={onClickMenu}>
        <Title active={active}>{title}</Title>
        {active ? (
          <Arrow>
            <Image src={ArrowUp} width={12} height={6} alt='down_arrow' />
          </Arrow>
        ) : (
          <Arrow className='down'>
            <Image src={ArrowDown} width={12} height={6} alt='down_arrow' />
          </Arrow>
        )}
      </Header>
      <Wrapper ref={wrapperRef}>
        <Body ref={bodyRef}>
          {categoryList?.map((li: CategoryProps, index) => (
            <Link href={`/${categoryKey}`} passHref key={`${li.category}_${index}`}>
              <span onClick={onClickCategory(li)}>{li.displayName}</span>
            </Link>
          ))}
        </Body>
      </Wrapper>
    </Container>
  );
};

export default HamburgerListItem;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  font-size: 15px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 46px;
`;
const Wrapper = styled.div`
  height: 0;
  width: 100%;
  overflow: hidden;
  transition: height 0.35s ease;
`;
const Body = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  background: #f8f8f8;
  padding: 14px 15px;
  > span {
    display: flex;
    align-items: center;
    width: 100%;
    height: 28px;
    color: ${theme.gray};
  }
`;
const Title = styled.span<{ active: boolean }>`
  font-size: 16px;
  font-weight: 700;
  line-height: 20px;
  color: ${theme.black};
`;

const Arrow = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
`;

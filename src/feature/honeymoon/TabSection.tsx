import React, { useState } from 'react';
import styled from 'styled-components';
import theme from '@styles/theme';
import { Desktop } from '@hooks/useDevice';

interface TabMenuStyleProps {
  isActive?: boolean;
  bgColor?: string;
  activeNum?: number;
  keywordTop?: number;
  tasteTop?: number;
  vacationTop?: number;
  tourTop?: number;
}

const TabSection = ({ bgColor, activeNum, keywordTop, tasteTop, vacationTop, tourTop }: TabMenuStyleProps) => {
  const desktop = Desktop();
  const tabContArr = [
    { tabTitle: '추천키워드', tabSubTitle: '신행지 고민될 땐?', tabScroll: keywordTop },
    { tabTitle: '취향배틀', tabSubTitle: '휴양 VS 관광', tabScroll: tasteTop },
    { tabTitle: '휴양지모음', tabSubTitle: '세상 힐링 가능!', tabScroll: vacationTop },
    { tabTitle: '관광지모음', tabSubTitle: '세상 볼거리 가득!', tabScroll: tourTop },
  ];

  const onTabClick = tabScroll => {
    window.scrollTo({ top: tabScroll, behavior: 'smooth' });
  };

  return (
    <Container>
      <TabMenuBox>
        {tabContArr.map((item, index) => (
          <TabMenu
            onClick={() => onTabClick(desktop ? item.tabScroll - 40 : item.tabScroll - 65)}
            isActive={activeNum === index}
            bgColor={bgColor}
            key={item.tabTitle + '_' + index}
          >
            <span>{item.tabSubTitle}</span>
            <p>{item.tabTitle}</p>
          </TabMenu>
        ))}
      </TabMenuBox>
    </Container>
  );
};

export default TabSection;

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 130px;
  max-width: 1920px;
  margin: 0 auto;
  background-color: #fff;
  @media all and (max-width: 1280px) {
    max-width: unset;
    height: auto;
  }
`;

const TabMenuBox = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  background-color: #eaeaea;
`;
const TabMenu = styled.div<TabMenuStyleProps>`
  ${theme.flexCenter}
  flex-direction: column;
  width: 320px;
  height: 130px;
  color: ${props => (props.isActive ? '#fff' : '#262626')};
  background-color: ${props => (props.isActive ? props.bgColor : '#eaeaea')};
  cursor: pointer;
  border-right: ${props => (props.isActive ? 0 : '1px solid #cccccc')};
  &:last-child {
    border-right: 0;
  }
  @media all and (max-width: 1280px) {
    width: 25%;
    height: auto;
    padding: 15px 0;
  }
  > span {
    display: block;
    font-size: 22px;
    margin-bottom: 8px;
    @media all and (max-width: 1280px) {
      font-size: 10px;
      margin-bottom: 6px;
    }
  }
  > p {
    font-size: 30px;
    font-weight: 700;
    @media all and (max-width: 1280px) {
      font-size: 14px;
    }
  }
`;

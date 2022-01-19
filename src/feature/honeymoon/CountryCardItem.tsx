import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import theme from '@styles/theme';
import { openNewTab } from '@utils/util';

interface cardProps {
  name: string;
  bgImg: StaticImageData;
  isBest: boolean;
  cardUrl: string;
  tags: string[];
  isThird?: boolean;
}

const CountryCardItem = ({ name, bgImg, isBest, cardUrl, tags, isThird }: cardProps) => {
  return (
    <Container onClick={() => openNewTab(cardUrl)}>
      <div className='top_bg'>
        <Image src={bgImg} layout='fill' alt='card bg' />
        {isBest && <span className='best_badge'>BEST</span>}
      </div>
      <div className='bottom_info'>
        <p>{name}</p>
        <div className='tags_box'>
          {tags.map((item, index) => (
            <TagItem isThird={isThird} key={item + '___' + index}>
              <p>{item}</p>
            </TagItem>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default CountryCardItem;

const Container = styled.div`
  position: relative;
  width: 406px;
  height: 460px;
  border-radius: 20px;
  overflow: hidden;
  background-color: #fff;
  margin-right: 30px;
  margin-bottom: 30px;
  cursor: pointer;
  @media all and (max-width: 1280px) {
    width: 48%;
    height: auto;
    margin-right: 10.5px;
    margin-bottom: 10px;
    border-radius: 15px;
  }
  &:nth-child(2n) {
    @media all and (max-width: 1280px) {
      margin-right: 0;
    }
  }
  &:nth-child(3) {
    margin-right: 0;
    @media all and (max-width: 1280px) {
      margin-right: 10px;
    }
  }
  &:nth-child(6) {
    margin-right: 0;
  }
  &:nth-child(9) {
    margin-right: 0;
    @media all and (max-width: 1280px) {
      margin-right: 10px;
    }
  }
  &:last-child {
    margin-right: 0;
  }
  .top_bg {
    position: relative;
    width: 100%;
    height: 260px;
    @media all and (max-width: 1280px) {
      height: 86px;
    }
    .best_badge {
      position: absolute;
      ${theme.flexCenter}
      bottom: 0;
      left: 0;
      width: 70px;
      height: 40px;
      background-color: #ff3333;
      color: #fff;
      font-size: 20px;
      font-weight: 500;
      font-family: 'Poppins', sans-serif;
      @media all and (max-width: 1280px) {
        width: 32px;
        height: 18px;
        font-size: 10px;
      }
    }
  }
  .bottom_info {
    width: 100%;
    height: calc(100% - 260px);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px 22px 0 22px;
    @media all and (max-width: 1280px) {
      height: auto;
      padding: 13px 7px 17px 7px;
    }
    > p {
      font-size: 32px;
      font-weight: 700;
      color: #333333;
      margin-bottom: 28px;
      @media all and (max-width: 1280px) {
        font-size: 16px;
        margin-bottom: 5px;
      }
    }
    .tags_box {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      @media all and (max-width: 1280px) {
        flex-direction: column;
      }
    }
  }
`;

const TagItem = styled.div<{ isThird: boolean }>`
  position: relative;
  ${theme.flexCenter}
  width: 176px;
  height: 50px;
  border-radius: 25px;
  border: 2px solid ${props => (props.isThird ? '#33cccc' : '#6666ff')};
  @media all and (max-width: 1280px) {
    width: 100%;
    height: auto;
    height: 16px;
    border: 0;
  }
  &:first-child {
    @media all and (max-width: 1280px) {
      margin-bottom: 3px;
    }
  }
  > p {
    font-size: 20px;
    color: ${props => (props.isThird ? '#33cccc' : '#6666ff')};
    @media all and (max-width: 1280px) {
      font-size: 12px;
    }
  }
`;

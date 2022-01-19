import theme from '@styles/theme';
import React, { forwardRef, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Bg from '@images/honeymoon/vacation/vacation_inner_bg.jpg';
import mobileBg from '@images/honeymoon/vacation/m_vacation_bg.jpg';
import vacationCardImg01 from '@images/honeymoon/vacation/vacation01.jpg';
import vacationCardImg02 from '@images/honeymoon/vacation/vacation02.jpg';
import vacationCardImg03 from '@images/honeymoon/vacation/vacation03.jpg';
import vacationCardImg04 from '@images/honeymoon/vacation/vacation04.jpg';
import vacationCardImg05 from '@images/honeymoon/vacation/vacation05.jpg';
import vacationCardImg06 from '@images/honeymoon/vacation/vacation06.jpg';
import CountryCardItem from './CountryCardItem';
import { Desktop } from '@hooks/useDevice';

const VacationTab = (props, ref) => {
  const desktop = Desktop();
  const countryCardArr = [
    {
      name: '하와이',
      bgImg: vacationCardImg01,
      isBest: true,
      cardUrl: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42560',
      tags: ['이천희♥전혜진', '태평양의 낙원'],
    },
    {
      name: '몰디브',
      bgImg: vacationCardImg02,
      isBest: true,
      cardUrl: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42633',
      tags: ['이민정♥이병헌', '현실감 없는 풍경'],
    },
    {
      name: '괌',
      bgImg: vacationCardImg03,
      isBest: false,
      cardUrl: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42631',
      tags: ['송재희♥지소연', '여유로운 휴양'],
    },
    {
      name: '푸켓',
      bgImg: vacationCardImg04,
      isBest: false,
      cardUrl: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42610',
      tags: ['유재석♥나경은', '태국 최대 휴양지'],
    },
    {
      name: '사이판',
      bgImg: vacationCardImg05,
      isBest: false,
      cardUrl: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42634',
      tags: ['액티비티 천국', '365일 화창한날씨'],
    },
    {
      name: '칸쿤',
      bgImg: vacationCardImg06,
      isBest: true,
      cardUrl: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42638',
      tags: ['한가인♥연정훈', '투명한 바다'],
    },
  ];

  return (
    <Container ref={ref}>
      <BackgroundBox>
        <Image
          unoptimized
          src={desktop ? Bg : mobileBg}
          layout={desktop ? 'fill' : 'responsive'}
          width={desktop ? 1920 : 1020}
          height={desktop ? 1555 : 2042}
          alt='bg'
        />
      </BackgroundBox>
      <ContentBox>
        <TabTitle>
          <div className='tab_num'>03</div>
          <div className='tab_title_text'>
            <span>세상 힐링 가능한</span>
            <p>휴양지 모음</p>
          </div>
        </TabTitle>

        <div className='country_card_box'>
          {countryCardArr.map((item, index) => (
            <CountryCardItem
              name={item.name}
              bgImg={item.bgImg}
              isBest={item.isBest}
              cardUrl={item.cardUrl}
              tags={item.tags}
              isThird={true}
              key={item.name + '__' + index}
            />
          ))}
        </div>
      </ContentBox>
    </Container>
  );
};

export default React.forwardRef(VacationTab);

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 1555px;
  max-width: 1920px;
  margin: 0 auto;
  background-color: #25c7dd;
  @media all and (max-width: 1280px) {
    height: 790px;
    max-width: unset;
  }
`;

const BackgroundBox = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  > span {
    height: 100% !important;
  }
`;
const ContentBox = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  z-index: 1;
  padding-top: 150px;
  @media all and (max-width: 1280px) {
    padding-top: 50px;
  }
  .country_card_box {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    width: 1280px;
    margin: 0 auto;
    @media all and (max-width: 1280px) {
      width: 100%;
      padding: 0 20px;
      justify-content: space-between;
    }
  }
`;

const TabTitle = styled.div`
  margin-bottom: 70px;
  @media all and (max-width: 1280px) {
    margin-bottom: 23px;
  }
  .tab_num {
    width: 55px;
    margin: 0 auto 55px auto;
    text-align: center;
    font-family: 'Poppins', sans-serif;
    font-size: 46px;
    font-weight: 500;
    color: #fff;
    border-bottom: 2px solid #fff;
    padding-bottom: 5px;
    @media all and (max-width: 1280px) {
      width: 25px;
      font-size: 20px;
      border-bottom: 1px solid #fff;
      margin: 0 auto 18px auto;
    }
  }
  .tab_title_text {
    text-align: center;
    letter-spacing: 10px;
    color: #fff;
    @media all and (max-width: 1280px) {
      letter-spacing: 5px;
    }
    > span {
      font-size: 34px;
      font-weight: 300;
      @media all and (max-width: 1280px) {
        font-size: 13px;
      }
    }
    > p {
      font-size: 60px;
      font-weight: 700;
      margin-top: 20px;
      @media all and (max-width: 1280px) {
        font-size: 28px;
        margin-top: 8px;
      }
    }
  }
`;

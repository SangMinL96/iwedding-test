import React from 'react';
import styled from 'styled-components';
import theme from '@styles/theme';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import leftArrow from '@images/honeymoon/left_nav_icon.png';
import rightArrow from '@images/honeymoon/right_nav_icon.png';
import hawaii from '@images/honeymoon/country_list/hawaii.jpg';
import maldives from '@images/honeymoon/country_list/maldives.jpg';
import guam from '@images/honeymoon/country_list/guam.jpg';
import cancun from '@images/honeymoon/country_list/cancun.jpg';
import saipan from '@images/honeymoon/country_list/saipan.jpg';
import dubai from '@images/honeymoon/country_list/dubai.jpg';
import italy from '@images/honeymoon/country_list/italy.jpg';
import spain from '@images/honeymoon/country_list/spain.jpg';
import switzerland from '@images/honeymoon/country_list/switzerland.jpg';
import france from '@images/honeymoon/country_list/france.jpg';
import losAngeles from '@images/honeymoon/country_list/losAngeles.jpg';
import theUnitedKingdom from '@images/honeymoon/country_list/theUnitedKingdom.jpg';
import croatia from '@images/honeymoon/country_list/croatia.jpg';
import czechRepublic from '@images/honeymoon/country_list/czechRepublic.jpg';
import portugal from '@images/honeymoon/country_list/portugal.jpg';
import singapore from '@images/honeymoon/country_list/singapore.jpg';
import lasVegas from '@images/honeymoon/country_list/lasVegas.jpg';
import phuket from '@images/honeymoon/country_list/phuket.jpg';
import sweden from '@images/honeymoon/country_list/sweden.jpg';
import austria from '@images/honeymoon/country_list/austria.jpg';
import greece from '@images/honeymoon/country_list/greece.jpg';
import germany from '@images/honeymoon/country_list/germany.jpg';
import ireland from '@images/honeymoon/country_list/ireland.jpg';
import netherlands from '@images/honeymoon/country_list/netherlands.jpg';
import hungary from '@images/honeymoon/country_list/hungary.jpg';
import bulgaria from '@images/honeymoon/country_list/bulgaria.jpg';
import poland from '@images/honeymoon/country_list/poland.jpg';
import norway from '@images/honeymoon/country_list/norway.jpg';
import denmark from '@images/honeymoon/country_list/denmark.jpg';
import turkey from '@images/honeymoon/country_list/turkey.jpg';
import sanFrancisco from '@images/honeymoon/country_list/sanFrancisco.jpg';
import canada from '@images/honeymoon/country_list/canada.jpg';
import finland from '@images/honeymoon/country_list/finland.jpg';
import iceland from '@images/honeymoon/country_list/iceland.jpg';
import { Desktop } from '@hooks/useDevice';
import { openNewTab } from '@utils/util';

const CountrySection = () => {
  const desktop = Desktop();

  const countryArr = [
    { countryLink: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42560', countryImg: hawaii, countryName: '하와이' },
    { countryLink: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42565', countryImg: losAngeles, countryName: '로스앤젤레스' },
    { countryLink: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42566', countryImg: theUnitedKingdom, countryName: '영국' },
    { countryLink: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42613', countryImg: lasVegas, countryName: '라스베이거스' },
    { countryLink: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42610', countryImg: phuket, countryName: '푸켓' },
    { countryLink: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42621', countryImg: sweden, countryName: '스웨덴' },
    { countryLink: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42611', countryImg: croatia, countryName: '크로아티아' },
    { countryLink: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42616', countryImg: austria, countryName: '오스트리아' },
    { countryLink: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42617', countryImg: greece, countryName: '그리스' },
    { countryLink: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42618', countryImg: ireland, countryName: '아일랜드' },
    { countryLink: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42619', countryImg: czechRepublic, countryName: '체코' },
    { countryLink: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42620', countryImg: germany, countryName: '독일' },
    { countryLink: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42622', countryImg: netherlands, countryName: '네덜란드' },
    { countryLink: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42624', countryImg: hungary, countryName: '헝가리' },
    { countryLink: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42623', countryImg: portugal, countryName: '포르투갈' },
    { countryLink: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42634', countryImg: saipan, countryName: '사이판' },
    { countryLink: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42631', countryImg: guam, countryName: '괌' },
    { countryLink: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42639', countryImg: france, countryName: '프랑스' },
    { countryLink: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42638', countryImg: cancun, countryName: '칸쿤' },
    { countryLink: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42635', countryImg: switzerland, countryName: '스위스' },
    { countryLink: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42630', countryImg: bulgaria, countryName: '불가리아' },
    { countryLink: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42636', countryImg: spain, countryName: '스페인' },
    { countryLink: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42637', countryImg: italy, countryName: '이탈리아' },
    { countryLink: 'http://www.iwedding.co.kr/brandplus/brandplus_view/42632', countryImg: dubai, countryName: '두바이' },
    { countryLink: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42627', countryImg: poland, countryName: '폴란드' },
    { countryLink: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42633', countryImg: maldives, countryName: '몰디브' },
    { countryLink: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42628', countryImg: singapore, countryName: '싱가포르' },
    { countryLink: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42641', countryImg: norway, countryName: '노르웨이' },
    { countryLink: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42643', countryImg: denmark, countryName: '덴마크' },
    { countryLink: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42642', countryImg: turkey, countryName: '터키' },
    { countryLink: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42645', countryImg: sanFrancisco, countryName: '샌프란시스코' },
    { countryLink: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42646', countryImg: canada, countryName: '캐나다' },
    { countryLink: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42644', countryImg: finland, countryName: '핀란드' },
    { countryLink: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42647', countryImg: iceland, countryName: '아이슬란드' },
  ];
  return (
    <Container>
      <div className='description'>
        <p>
          음식이면 음식, 쇼핑이면 쇼핑 나에게 꼭 맞는 신혼여행지
          <br />
          지금 여행 가능한 곳에서 골라보세요!
        </p>
        <span>* 2021.12월 기준</span>
      </div>
      <div className='swiper_box'>
        <Swiper
          slidesPerView={'auto'}
          spaceBetween={desktop ? 26.5 : 13}
          navigation={{ prevEl: '.country_nav_prev', nextEl: '.country_nav_next' }}
          loop
        >
          {countryArr.map((item, index) => (
            <SwiperSlide key={item.countryName + '_' + index} onClick={() => openNewTab(item.countryLink)}>
              <Slide>
                <Image src={item.countryImg} layout='fill' alt='country img' />
                <span>{item.countryName}</span>
              </Slide>
            </SwiperSlide>
          ))}
        </Swiper>
        <button className='country_nav_prev'>
          <Image src={leftArrow} width={32} height={64} alt='nav arrow' />
        </button>
        <button className='country_nav_next'>
          <Image src={rightArrow} width={32} height={64} alt='nav arrow' />
        </button>
      </div>
    </Container>
  );
};

export default CountrySection;

const Container = styled.div`
  position: relative;
  width: 100%;
  max-width: 1920px;
  margin: 0 auto;
  padding: 100px 0;
  background-color: #fff;
  ${theme.flexCenter}
  flex-direction: column;
  @media all and (max-width: 1280px) {
    max-width: unset;
    height: auto;
    padding: 33px 0;
  }
  .description {
    width: 100%;
    text-align: center;
    margin-bottom: 80px;
    @media all and (max-width: 1280px) {
      margin-bottom: 25px;
    }
    > p {
      font-size: 28px;
      line-height: 42px;
      margin-bottom: 20px;
      @media all and (max-width: 1280px) {
        font-size: 14px;
        line-height: 20px;
        margin-bottom: 10px;
      }
    }
    > span {
      font-size: 20px;
      color: #999999;
      @media all and (max-width: 1280px) {
        font-size: 11px;
      }
    }
  }
  .swiper_box {
    position: relative;
    width: 1425px;
    margin: 0 auto;
    @media all and (max-width: 1280px) {
      width: 100%;
    }
    .swiper-container {
      position: relative;
      width: 1280px;
      margin: 0 auto;
      @media all and (max-width: 1280px) {
        width: 100%;
        padding: 0 20px;
      }
      .swiper-wrapper {
        .swiper-slide {
          width: 160px;
          @media all and (max-width: 1280px) {
            width: 60px;
          }
        }
      }
    }
    > button {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      ${theme.resetBtnStyle}
      width: 32px;
      height: 64px;
      z-index: 1;
      @media all and (max-width: 1280px) {
        display: none;
      }
    }
    .country_nav_prev {
      left: 0;
    }
    .country_nav_next {
      right: 0;
    }
  }
`;

const Slide = styled.div`
  position: relative;
  ${theme.flexCenter}
  width: 160px;
  height: 160px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  @media all and (max-width: 1280px) {
    width: 100%;
    height: 60px;
  }
  > span {
    font-size: 24px;
    color: #fff;
    z-index: 1;
    @media all and (max-width: 1280px) {
      font-size: 10px;
    }
  }
`;

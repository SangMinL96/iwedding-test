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
    { countryLink: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42560', countryImg: hawaii, countryName: '?????????' },
    { countryLink: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42565', countryImg: losAngeles, countryName: '??????????????????' },
    { countryLink: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42566', countryImg: theUnitedKingdom, countryName: '??????' },
    { countryLink: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42613', countryImg: lasVegas, countryName: '??????????????????' },
    { countryLink: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42610', countryImg: phuket, countryName: '??????' },
    { countryLink: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42621', countryImg: sweden, countryName: '?????????' },
    { countryLink: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42611', countryImg: croatia, countryName: '???????????????' },
    { countryLink: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42616', countryImg: austria, countryName: '???????????????' },
    { countryLink: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42617', countryImg: greece, countryName: '?????????' },
    { countryLink: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42618', countryImg: ireland, countryName: '????????????' },
    { countryLink: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42619', countryImg: czechRepublic, countryName: '??????' },
    { countryLink: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42620', countryImg: germany, countryName: '??????' },
    { countryLink: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42622', countryImg: netherlands, countryName: '????????????' },
    { countryLink: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42624', countryImg: hungary, countryName: '?????????' },
    { countryLink: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42623', countryImg: portugal, countryName: '????????????' },
    { countryLink: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42634', countryImg: saipan, countryName: '?????????' },
    { countryLink: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42631', countryImg: guam, countryName: '???' },
    { countryLink: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42639', countryImg: france, countryName: '?????????' },
    { countryLink: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42638', countryImg: cancun, countryName: '??????' },
    { countryLink: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42635', countryImg: switzerland, countryName: '?????????' },
    { countryLink: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42630', countryImg: bulgaria, countryName: '????????????' },
    { countryLink: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42636', countryImg: spain, countryName: '?????????' },
    { countryLink: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42637', countryImg: italy, countryName: '????????????' },
    { countryLink: 'http://www.iwedding.co.kr/brandplus/brandplus_view/42632', countryImg: dubai, countryName: '?????????' },
    { countryLink: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42627', countryImg: poland, countryName: '?????????' },
    { countryLink: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42633', countryImg: maldives, countryName: '?????????' },
    { countryLink: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42628', countryImg: singapore, countryName: '????????????' },
    { countryLink: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42641', countryImg: norway, countryName: '????????????' },
    { countryLink: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42643', countryImg: denmark, countryName: '?????????' },
    { countryLink: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42642', countryImg: turkey, countryName: '??????' },
    { countryLink: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42645', countryImg: sanFrancisco, countryName: '??????????????????' },
    { countryLink: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42646', countryImg: canada, countryName: '?????????' },
    { countryLink: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42644', countryImg: finland, countryName: '?????????' },
    { countryLink: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42647', countryImg: iceland, countryName: '???????????????' },
  ];
  return (
    <Container>
      <div className='description'>
        <p>
          ???????????? ??????, ???????????? ?????? ????????? ??? ?????? ???????????????
          <br />
          ?????? ?????? ????????? ????????? ???????????????!
        </p>
        <span>* 2021.12??? ??????</span>
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

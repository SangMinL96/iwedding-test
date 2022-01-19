import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import SwiperCore, { Navigation, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import IconMainBannerArrow from '@svgs/icon_main_banner_arrow';
import { MainDataType } from '@modules/main/interface';
import { isMobile } from 'react-device-detect';
import { isWebview } from '@utils/isWebview';
import { Desktop } from '@hooks/useDevice';
import Image from 'next/image';
import { useRouter } from 'next/router';

SwiperCore.use([Navigation, Autoplay]);

type PropsType = {
  data: MainDataType;
};

const MainType1 = ({ data: { item_list } }: PropsType) => {
  const router = useRouter();
  const [crrIndex, setCrrIndex] = useState(0);
  const desktop = Desktop();
  const onChangePage = (ev: any) => {
    setCrrIndex(ev.realIndex + 1);
  };

  return (
    <Container>
      <Swiper
        spaceBetween={30}
        slidesPerView={desktop ? 'auto' : 1}
        centeredSlides
        loop
        autoplay={{
          delay: 3000,
        }}
        navigation={{
          prevEl: '.main_slider_prev.type1',
          nextEl: '.main_slider_next.type1',
        }}
        onSlideChange={onChangePage}
      >
        {item_list?.map((item: any) => (
          <SwiperSlide key={item.ids as string}>
            {desktop ? (
              <a href={!desktop ? item.url_mobile : item.url_pc} target={item.url_target}>
                <img alt='메인배너' src={!desktop ? item.img_mobile : item.img_pc} />
              </a>
            ) : (
              <a onClick={() => router.push(item.url_mobile)}>
                <img alt='메인배너' src={!desktop ? item.img_mobile : item.img_pc} />
              </a>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
      <div className='main_slider_nav'>
        {desktop ? (
          <>
            <button className='main_slider_prev type1'>
              <IconMainBannerArrow type='left' />
            </button>
            <span className='main_slider_pagination'>{`${crrIndex} / ${item_list.length}`}</span>
            <button className='main_slider_next type1'>
              <IconMainBannerArrow type='right' />
            </button>
          </>
        ) : (
          <span className='main_slider_pagination'>{`${crrIndex} / ${item_list.length}`}</span>
        )}
      </div>
    </Container>
  );
};

export default MainType1;

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 380px;
  min-width: 1280px;
  overflow: hidden;
  margin-bottom: 80px;
  @media all and (max-width: 1280px) {
    height: auto;
    min-width: 100%;
    min-height: 200px;
    margin-bottom: 20px;
  }
  .swiper-slide {
    position: relative;
    text-align: center;
    max-width: 1000px;
    height: 380px;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    @media all and (max-width: 1280px) {
      aspect-ratio: 15/8;
      width: 100%;
      height: 100%;
    }
    & > a {
      display: block;
      width: 100%;
      height: 100%;
      & > img {
        display: block;
        width: 100%;
        height: 100%;
        aspect-ratio: 15/8;
        object-fit: contain;
      }
    }
  }
  .main_slider_nav {
    height: 40px;
    position: absolute;
    right: 50%;
    bottom: 0;
    transform: translateX(50%);
    z-index: 1;
    background-color: rgba(0, 0, 0, 0.7);
    @media all and (max-width: 1280px) {
      height: 25px;
      position: absolute;
      right: 25px;
    }
  }
  .main_slider_nav > button {
    display: inline-block;
    background-color: transparent;
    width: 40px;
    height: 100%;
    > div {
      > svg {
        margin-top: 3px;
      }
    }
  }
  .main_slider_nav > span {
    display: inline-block;
    width: 60px;
    height: 100%;
    line-height: 40px;
    vertical-align: middle;
    color: #fff;
    font-size: 14px;
    font-weight: 700;
    text-align: center;
    @media all and (max-width: 1280px) {
      width: 50px;
      line-height: 25px;
      font-size: 11px;
    }
  }
`;

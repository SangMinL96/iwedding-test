import { Desktop } from '@hooks/useDevice';
import IconSearchMainBannerArrow from '@styles/svgs/icon_search_main_banner_arrow';
import theme from '@styles/theme';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import styled from 'styled-components';
import SwiperCore, { Autoplay, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

SwiperCore.use([Navigation, Autoplay]);

type PropsType = {
  data: any[];
  searchResult?: boolean;
  onlyMobile?: boolean;
  noTopMargin?: boolean;
  noData?: boolean;
  noBottomMargin?: boolean;
  noMargin?: boolean;
  searchInner?: boolean;
  isSmallList?: boolean;
  isNoneResult?: boolean;
};

const BannerSlide = ({
  data,
  searchResult = false,
  onlyMobile = false,
  noTopMargin = false,
  noData = false,
  noBottomMargin = false,
  noMargin,
  searchInner,
  isSmallList,
  isNoneResult,
}: PropsType) => {
  const router = useRouter();
  const [crrIndex, setCrrIndex] = useState(0);
  const desktop = Desktop();
  const onChangePage = (ev: any) => {
    setCrrIndex(ev.realIndex + 1);
  };
  const onReplace = (data: any) => () => {
    if (desktop) {
      router.replace(data.landing_pc);
    } else {
      router.replace(data.landing_mobile);
    }
  };
  return (
    <Container
      noData={noData}
      noMargin={noMargin}
      noTopMargin={noTopMargin}
      noBottomMargin={noBottomMargin}
      searchInner={searchInner}
      isSmallList={isSmallList}
      isNoneResult={isNoneResult}
      style={searchResult ? { width: '100%' } : null}
    >
      {data && (
        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          centeredSlides
          loop={data?.length > 1 ? true : false}
          autoplay={{
            delay: 3000,
          }}
          navigation={{
            prevEl: '.main_slider_prev.banner_type',
            nextEl: '.main_slider_next.banner_type',
          }}
          onSlideChange={onChangePage}
        >
          {data?.map((item, index) => (
            <SwiperSlide key={`${item.no}_${index}`}>
              {onlyMobile && <img alt='메인배너' src={item.thumbnail_mobile} onClick={onReplace(item)} />}
              {!onlyMobile && <img alt='메인배너' src={desktop ? item.thumbnail_pc : item.thumbnail_mobile} onClick={onReplace(item)} />}
            </SwiperSlide>
          ))}
        </Swiper>
      )}
      {data?.length > 1 && (
        <div className='main_slider_nav'>
          {desktop && (
            <button className='main_slider_prev banner_type'>
              <IconSearchMainBannerArrow type='left' />
            </button>
          )}

          <span className='main_slider_pagination'>{`${crrIndex} / ${data?.length}`}</span>
          {desktop && (
            <button className='main_slider_next banner_type'>
              <IconSearchMainBannerArrow type='right' />
            </button>
          )}
        </div>
      )}
    </Container>
  );
};

export default React.memo(BannerSlide);

const Container = styled.div<{
  noMargin?: boolean;
  noTopMargin?: boolean;
  noData?: boolean;
  searchResult?: boolean;
  noBottomMargin?: boolean;
  searchInner?: boolean;
  isSmallList?: boolean;
  isNoneResult?: boolean;
}>`
  position: relative;
  margin: ${props => (props.noMargin ? 0 : props.searchInner ? '30px 0' : props.isNoneResult ? '0 0 25px 0' : '70px 0')};
  width: 100%;
  margin-top: ${props => props.noData && '0px'};
  grid-column: span 4;
  @media (max-width: ${theme.pc + 1}px) {
    grid-column: span 3;
    width: calc(100% + 30px);
    margin: ${props => (props.noMargin ? 0 : props.searchInner ? 0 : props.isSmallList ? '40px 0' : 0)};
  }
  @media (max-width: ${theme.tablet}px) {
    grid-column: span 2;
    /* width: calc(100% + 30px);
    margin: ${props => (props.noTopMargin ? '0 0 30px 0' : 0)}; */
  }
  .swiper-container {
    width: 100%;
  }
  .swiper-slide {
    position: relative;
    text-align: center;
    width: 100%;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      @media (max-width: ${theme.pc + 1}px) {
        width: 100%;
      }
      @media (max-width: ${theme.tablet}px) {
        width: 100%;
      }
    }
  }
  .main_slider_nav {
    height: 24px;
    position: absolute;
    right: 0;
    bottom: 0;

    z-index: 1;
    background-color: rgba(0, 0, 0, 0.7);
  }
  .main_slider_nav > button {
    display: inline-block;
    background-color: transparent;
    width: 24px;
    height: 100%;
    > div {
      ${props => props.theme.flexCenter};
    }
  }
  .main_slider_nav > span {
    display: inline-block;
    width: 40px;
    height: 100%;
    vertical-align: middle;
    color: #fff;
    line-height: 2;
    font-size: 12px;
    font-weight: 700;
    text-align: center;
  }
`;

import TypeTitle from '@feature/main/type_common/type.title';
import { Desktop } from '@hooks/useDevice';
import { MainDataType } from '@modules/main/interface';
import IconSlideBtn from '@svgs/icon_Slide_btn';
import { openNewTab } from '@utils/util';
import Image from 'next/image';
import router, { useRouter } from 'next/router';
import React from 'react';
import { isMobile } from 'react-device-detect';
import styled from 'styled-components';
import SwiperCore, { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

SwiperCore.use([Navigation]);

type PropsType = {
  data: MainDataType;
  sectionIndex: number;
};

// type2
const MainType2 = ({ data, sectionIndex }: PropsType) => {
  const router = useRouter();
  const deskTop = Desktop();

  const onClick = (item: any) => {
    if (isMobile) {
      router.push(item.url_mobile);
    } else {
      if (item.popup_width !== '0') {
        window.open(item.url_pc, item.url_target, `width=${item.popup_width} height=${item.popup_height}`);
      } else {
        window.open(item.url_pc, item.url_target === '' ? '_self' : item.url_target);
      }
    }
  };

  return (
    <Container>
      {/* 섹션 타이틀 부분 */}
      <TypeTitle data={data} />

      {/* 슬라이더 부분 */}
      <Swiper
        spaceBetween={deskTop ? 25 : 12}
        slidesPerView={deskTop ? 3 : 'auto'}
        observer={true}
        observeParents={true}
        navigation={{
          prevEl: `.main_slider_prev.type2${sectionIndex}`,
          nextEl: `.main_slider_next.type2${sectionIndex}`,
        }}
        onInit={swiper => {
          if (data.slide_or_bottom > 1) {
            swiper.destroy(false, true);
          }
        }}
        className={data.slide_or_bottom > 1 ? 'destroy' : ''}
      >
        {data?.item_list.map((item: any) => (
          <SwiperSlide key={data?.idx + '_' + item.no}>
            <a onClick={() => onClick(item)}>
              <div className='img_box'>
                <Image unoptimized layout='fill' objectFit='cover' alt='타입2 이미지' src={!deskTop ? item.img_mobile : item.img_pc} />

                {item.floating_icon && item.floating_icon > 0 && (
                  <span className={`badge_type_label ${item.floating_icon > 7 ? 'blue' : 'red'}`}>
                    {item.floating_icon === '1'
                      ? '1+1'
                      : item.floating_icon === '2'
                      ? '타임핫딜'
                      : item.floating_icon === '3'
                      ? '묶음할인'
                      : item.floating_icon === '4'
                      ? '일일특가'
                      : item.floating_icon === '5'
                      ? '긴급공수'
                      : item.floating_icon === '6'
                      ? '히트상품'
                      : item.floating_icon === '7'
                      ? '위클리'
                      : item.floating_icon === '8'
                      ? 'BEST'
                      : item.floating_icon === '9'
                      ? 'EVENT'
                      : item.floating_icon === '10'
                      ? 'HOT'
                      : item.floating_icon === '11'
                      ? 'NEW'
                      : null}
                  </span>
                )}
              </div>
              {/* <span className='item_badge hot'>타임핫딜</span> */}
              {item.title !== '' && item.sub_title !== '' && (
                <div className='text_box_2021'>
                  <p>{item.title}</p>
                  <span>{item.sub_title}</span>
                </div>
              )}
            </a>
          </SwiperSlide>
        ))}
        {deskTop && (
          <>
            {data.slide_or_bottom !== 2 && (
              <>
                <button className={`main_slider_prev type2${sectionIndex}`}>
                  <IconSlideBtn type='slideLeft' />
                </button>
                <button className={`main_slider_next type2${sectionIndex}`}>
                  <IconSlideBtn type='slideRight' />
                </button>
              </>
            )}
          </>
        )}
      </Swiper>
    </Container>
  );
};

export default MainType2;

const Container = styled.div`
  position: relative;
  width: 1280px;
  min-width: 1280px;
  margin: 0 auto 80px auto;
  overflow: hidden;
  @media all and (max-width: 1280px) {
    width: 100%;
    min-width: 100%;
    margin: 0 auto 50px auto;
  }
  .swiper-container {
    @media all and (max-width: 1280px) {
      position: relative;
      width: 100%;
      margin-top: 0;
      padding: 0 15px;
    }
    .swiper-slide {
      width: 410px;
      max-width: 410px;
      background: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      @media all and (max-width: 1280px) {
        width: 75.36%;
        height: auto;
      }
      > a {
        display: block;
        position: relative;
        width: 100%;
        height: 100%;
        cursor: pointer;
        .img_box {
          position: relative;
          height: 300px;
          overflow: hidden;
          @media all and (max-width: 1280px) {
            width: 100%;
            height: auto;
            min-height: 188px;
            &::after {
              content: '';
              display: block;
              padding-bottom: 73%;
            }
          }
          /* > img {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            @media all and (max-width: 1280px) {
              width: 100%;
              height: 100%;
            }
          } */
          .item_badge {
            position: absolute;
            padding: 7px 12px;
            display: flex;
            justify-content: center;
            align-items: center;
            top: 0;
            left: 0;
            font-family: Poppins-Bold, Poppins;
            font-weight: 700;
            text-anchor: middle;
            font-size: 13px;
            color: white;
            background-color: red;
          }
        }
        .text_box_2021 {
          position: relative;
          margin-top: 22px;
          @media all and (max-width: 1280px) {
            width: 100%;
            margin-top: 11px;
          }
        }
        .text_box_2021 > p {
          font-size: 18px;
          color: #262626;
          line-height: 27px;
          @media all and (max-width: 1280px) {
            font-size: 14px;
            line-height: 18px;
          }
        }
        .text_box_2021 > span {
          display: block;
          margin-top: 4px;
          font-size: 16px;
          color: #666666;
          line-height: 24px;
          @media all and (max-width: 1280px) {
            font-size: 12px;
            line-height: 18px;
          }
        }
      }
    }
  }
  .swiper-container.destroy {
    > .swiper-wrapper {
      display: block;
      > .swiper-slide {
        display: inline-flex;
        margin-right: 20px;
        margin-bottom: 30px;
        &:nth-child(3n) {
          margin-right: 0;
        }
        @media all and (max-width: 1280px) {
          width: 100%;
        }
        > a {
          > .img_box {
            @media all and (max-width: 1280px) {
              height: 66vw;
            }
          }
        }
      }
    }
  }
  .badge_type_label {
    display: inline-block;
    position: absolute;
    top: 0;
    left: 0;
    width: 70px;
    height: 30px;
    color: #fff;
    text-align: center;
    font-size: 13px;
    font-weight: 700;
    line-height: 30px;
    vertical-align: middle;
    @media all and (max-width: 1280px) {
      width: 50px;
      height: 21.43px;
      font-size: 11px;
      line-height: 21.43px;
    }
  }
  .badge_type_label.red {
    background-color: #fd4381;
  }
  .badge_type_label.blue {
    font-family: 'Poppins', sans-serif;
    letter-spacing: 1px;
    background-color: #4866e4;
  }

  .main_slider_prev {
    z-index: 9999;
    position: absolute;
    top: 125px;
    left: 0;
    width: 60px;
    height: 60px;
    background-color: rgba(247, 247, 247, 0.749);
  }
  .main_slider_next {
    z-index: 9999;
    position: absolute;
    top: 125px;
    right: 0;
    width: 60px;
    height: 60px;
    background-color: rgba(247, 247, 247, 0.749);
  }
`;

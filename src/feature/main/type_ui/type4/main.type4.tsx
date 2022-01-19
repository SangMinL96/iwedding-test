import TypeTitle from '@feature/main/type_common/type.title';
import { Desktop } from '@hooks/useDevice';
import { MainDataType } from '@modules/main/interface';
import IconSlideBtn from '@svgs/icon_Slide_btn';
import React from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import Type4Card from './Type4Card';
import Type4CardMobile from './Type4CardMobile';

type PropsType = {
  data: MainDataType;
};

const CountdownEndSpan = () => <span>마감</span>;

const MainType4 = ({ data }: PropsType) => {
  const deskTop = Desktop();
  // type4 4개씩 출력되는 슬라이더 (상품, 브랜드, 이벤트, 콘텐츠 유형에 마감 및 타임핫딜 설정 가능)
  const divideData = [];
  for (let i = 0; i < data.item_list.length; i += 4) {
    divideData.push(data.item_list.slice(i, i + 4));
  }

  return (
    <Container>
      {/* 섹션 타이틀 부분 */}
      <TypeTitle data={data} />

      {/* 슬라이더 부분 */}
      {deskTop ? (
        //  =========================================== PC 용 ===========================================
        <Swiper
          spaceBetween={40}
          slidesPerView={'auto'}
          navigation={
            data.slide_or_bottom > 1
              ? false
              : {
                  prevEl: '.main_slider_prev.type4',
                  nextEl: '.main_slider_next.type4',
                }
          }
          onInit={swiper => {
            if (data.slide_or_bottom > 1) {
              swiper.destroy(false, true);
            }
          }}
          className={data.slide_or_bottom > 1 ? 'destroy' : ''}
        >
          {data?.item_list?.map((item: any, index: number) => (
            <SwiperSlide key={item.no + '_' + index} className={data?.slide_or_bottom > 1 ? 'destroy' : ''}>
              <div className={data?.slide_or_bottom > 1 ? 'slider_item four destroy' : 'slider_item four'}>
                {item.item_status === 'coming' && (
                  <div className={data?.coming_soon_type > 0 ? 'hotdeal_coming_soon_box opacity' : 'hotdeal_coming_soon_box'}>
                    <div className='coming_soon_text'>
                      <p>COMING SOON</p>
                      <span>{item.time_start} OPEN</span>
                    </div>
                  </div>
                )}
                {item.item_status === 'end' && (
                  <>
                    {/* 남은 기간 = 1 */}
                    {item.remain_type === '1' && (
                      <div className='event_end_box'>
                        <div className='event_end_text'>
                          <p>마감</p>
                          <span>더 좋은 혜택으로 돌아올게요 :)</span>
                        </div>
                      </div>
                    )}
                    {/* 남은 수량 = 2 */}
                    {item.remain_type === '2' && (
                      <>
                        {item.type === 'product' && (
                          <div className='event_end_box'>
                            <div className='event_end_text'>
                              <p>마감</p>
                              <span>더 좋은 혜택으로 돌아올게요 :)</span>
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </>
                )}
                <Type4Card item={item} isLike={item.like != '1'} />
              </div>
            </SwiperSlide>
          ))}

          {data?.slide_or_bottom < 2 && (
            <>
              <button className='main_slider_prev type4'>
                <IconSlideBtn type='slideLeft' />
              </button>
              <button className='main_slider_next type4'>
                <IconSlideBtn type='slideRight' />
              </button>
            </>
          )}
        </Swiper>
      ) : (
        //  =========================================== mobile 용 ===========================================
        <Swiper
          spaceBetween={15}
          slidesPerView={'auto'}
          pagination={
            data?.slide_or_bottom > 1
              ? false
              : {
                  el: '.swiper-pagination.type_column_bullet',
                  clickable: true,
                }
          }
          onInit={swiper => {
            if (data?.slide_or_bottom > 1) {
              swiper.destroy(false, true);
            }
          }}
          className={data?.slide_or_bottom > 1 ? 'destroy' : ''}
        >
          {divideData?.map((itemList: any, index: number) => (
            <SwiperSlide key={itemList.idx + '_' + index}>
              <ul className='slider_group'>
                {itemList.map((item: any, index: number) => (
                  <div className={item.type === 'brand' ? 'slider_item four brand' : 'slider_item four'} key={item.no + '_' + index}>
                    {item.item_status === 'coming' && (
                      <div className={data?.coming_soon_type > 0 ? 'hotdeal_coming_soon_box opacity' : 'hotdeal_coming_soon_box'}>
                        <div className='coming_soon_text'>
                          <p>COMING SOON</p>
                          <span>{item.time_start} OPEN</span>
                        </div>
                      </div>
                    )}
                    {item.item_status === 'end' && (
                      <>
                        {/* 남은 기간 = 1 */}
                        {item.remain_type === '1' && (
                          <div className='event_end_box'>
                            <div className='event_end_text'>
                              <p>마감</p>
                              <span>더 좋은 혜택으로 돌아올게요 :)</span>
                            </div>
                          </div>
                        )}
                        {/* 남은 수량 = 2 */}
                        {item.remain_type === '2' && (
                          <>
                            {item.type === 'product' && (
                              <div className='event_end_box'>
                                <div className='event_end_text'>
                                  <p>마감</p>
                                  <span>더 좋은 혜택으로 돌아올게요 :)</span>
                                </div>
                              </div>
                            )}
                          </>
                        )}
                      </>
                    )}
                    <Type4CardMobile item={item} isLike={item.like != '1'} />
                  </div>
                ))}
              </ul>
            </SwiperSlide>
          ))}

          {data.slide_or_bottom < 2 && <ul className='swiper-pagination type_column_bullet'></ul>}
        </Swiper>
      )}
    </Container>
  );
};

export default MainType4;

const Container = styled.div`
  position: relative;
  width: 1280px;
  min-width: 1280px;
  margin: 0 auto 80px auto;
  overflow: hidden;
  @media all and (max-width: 1280px) {
    width: 100%;
    min-width: auto;
    margin: 0 auto 44px auto;
  }
  .swiper-container.destroy {
    > .swiper-wrapper {
      display: block;
      @media all and (max-width: 1280px) {
        flex-direction: column;
      }
    }
  }
  .swiper-container {
    margin-top: 33px;
    @media all and (max-width: 1280px) {
      margin-top: 0;
      padding-left: 15px;
    }
    .slider_group {
      @media all and (max-width: 1280px) {
        display: flex;
        flex-direction: column;
        width: calc(100% - 15px);
      }
    }
    .swiper-slide {
      width: 290px;
      @media all and (max-width: 1280px) {
        width: 100%;
      }
      .slider_item.four {
        position: relative;
        width: 100%;
        display: inline-block;
        @media all and (max-width: 1280px) {
          display: inline-block;
          position: relative;
          width: 100%;
          height: 108px;
          margin-bottom: 20px;
        }
        .img_box {
          position: relative;
          width: 100%;
          height: 290px;
          display: block;
          overflow: hidden;
          cursor: pointer;
          @media all and (max-width: 1280px) {
            display: inline-block;
            vertical-align: top;
            width: 108px;
            height: 108px;
            margin-right: 12px;
          }
          > img {
            width: 100%;
          }
          .hotdeal_bar {
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            height: 40px;
            font-size: 18px;
            text-align: center;
            color: #fff;
            background-color: rgba(253, 86, 142, 0.7);
            font-weight: 700;
            font-family: 'Poppins', sans-serif;
            @media all and (max-width: 1280px) {
              height: 20px;
              font-size: 11px;
            }
            > span {
              font-family: 'Poppins', sans-serif;
              display: inline-block;
              vertical-align: middle;
              line-height: 40px;
              letter-spacing: 1px;
              @media all and (max-width: 1280px) {
                line-height: 20px;
              }
            }
          }
        }
        .img_box.small {
          @media all and (max-width: 1280px) {
            width: 88px;
            height: 88px;
          }
        }
        .text_box_2021 {
          margin-top: 22px;
          @media all and (max-width: 1280px) {
            display: inline-block;
            vertical-align: top;
            width: calc(100% - 120px);
            height: 100%;
            position: relative;
            margin-top: 0;
          }
          .company_name {
            font-size: 12px;
            margin-bottom: 5px;
            color: #8c8c8c;
            line-height: 22px;
            @media all and (max-width: 1280px) {
              display: inline-block;
              font-size: 13px;
              margin: 0 3px 0 0;
            }
          }
          .event_period {
            display: block;
            font-size: 12px;
            color: #fd4381;
            margin-bottom: 5px;
            line-height: 22px;
          }
          .prd_title {
            font-size: 15px;
            line-height: 22px;
            color: #262626;
            padding-right: 15px;
            @media all and (max-width: 1280px) {
              display: inline;
              font-size: 13px;
              line-height: 20px;
            }
          }
          .prd_title.content {
            @media all and (max-width: 1280px) {
              font-size: 15px;
            }
          }
          .prd_title.brand {
            @media all and (max-width: 1280px) {
              display: inline-block;
              font-size: 14px;
            }
          }
          .prd_sub_title {
            display: block;
            margin-top: 4px;
            font-size: 14px;
            color: #8c8c8c;
            @media all and (max-width: 1280px) {
              font-size: 12px;
              line-height: 20px;
            }
          }
          .prd_sub_title.content {
            margin-top: 10px;
            @media all and (max-width: 1280px) {
              margin-top: 3px;
              font-size: 14px;
            }
          }
          .hashtag_box {
            margin-top: 7px;
            > span {
              display: inline-block;
              cursor: pointer;
              font-size: 12px;
              color: #8c8c8c;
              line-height: 17px;
            }
          }
          .description_box {
            margin-top: 10px;
            @media all and (max-width: 1280px) {
              margin-top: 7px;
            }
            > p {
              font-size: 14px;
              color: #8c8c8c;
              @media all and (max-width: 1280px) {
                font-size: 13px;
              }
            }
          }
          .price_info_box {
            position: relative;
            margin-top: 10px;
            @media all and (max-width: 1280px) {
              margin-top: 0;
              height: 20px;
            }
            .prev_price {
              display: block;
              font-size: 14px;
              line-height: 20px;
              color: #8c8c8c;
              text-decoration: line-through;
              margin-bottom: 5px;
              @media all and (max-width: 1280px) {
                display: block;
                font-size: 12px;
                margin-bottom: 1px;
                line-height: normal;
                vertical-align: middle;
              }
            }
            .sale_per,
            .current_price {
              font-size: 16px;
              font-weight: 700;
              line-height: 24px;
              @media all and (max-width: 1280px) {
                vertical-align: middle;
                line-height: 19px;
                font-size: 13px;
              }
            }
            .sale_per {
              color: #fd4381;
              margin-right: 2px;
            }
            .current_price {
              color: #262626;
              @media all and (max-width: 1280px) {
                display: inline-block;
                vertical-align: middle;
                font-size: 13px;
                line-height: 19px;
                margin-right: 5px;
              }
            }
          }
          .remaining_num {
            width: 90px;
            height: 26px;
            margin-top: 15px;
            border: 1px solid #262626;
            font-size: 12px;
            line-height: 24px;
            vertical-align: middle;
            color: #262626;
            text-align: center;
          }
          .box_info_item {
            width: 100%;
            height: 20px;
            position: absolute;
            left: 0;
            bottom: 1px;
            display: flex;
            > .sale_num_box {
              text-align: center;
              height: 100%;
              font-size: 11px;
              border: 1px solid #fd4381;
              color: #fd4381;
              line-height: 18px;
              vertical-align: middle;
              padding: 0 7px;
              margin-right: 5px;
            }
            > .remaining_num {
              vertical-align: top;
              width: auto;
              padding: 0 9px;
              margin-top: 0;
              height: 20px;
              line-height: 18px;
              font-size: 11px;
            }
          }
          > .badge_box_2021 {
            @media all and (max-width: 1280px) {
              margin-top: 0;
              position: absolute;
              left: 0;
              bottom: 0;
            }
          }
        }
        .text_box_2021.vertical_center {
          vertical-align: unset;
          height: auto;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
        }
        .hotdeal_coming_soon_box {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: #edb538;
          z-index: 1;
          .coming_soon_text {
            position: absolute;
            text-align: center;
            width: 100%;
            top: 50%;
            transform: translateY(-50%);
            > p {
              font-size: 22px;
              font-family: 'Poppins', sans-serif;
              font-weight: 700;
              line-height: 33px;
              color: #fff;
            }
            > span {
              font-size: 15px;
              margin-top: 0;
              display: block;
              color: #fff;
            }
          }
        }
        .hotdeal_coming_soon_box.opacity {
          background-color: rgba(237, 181, 56, 0.9);
        }
        .event_end_box {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(38, 38, 38, 0.7);
          color: #fff;
          z-index: 1;
          .event_end_text {
            position: absolute;
            text-align: center;
            width: 100%;
            top: 50%;
            transform: translateY(-50%);
            > p {
              font-size: 22px;
              font-family: 'Poppins', sans-serif;
              font-weight: 700;
              line-height: 33px;
              color: #fff;
            }
            > span {
              font-size: 15px;
              margin-top: 0;
              display: block;
              color: #fff;
            }
          }
        }
        .badge_box_2021 {
          position: relative;
          display: flex;
          align-items: center;
          width: 100%;
          margin-top: 13px;
        }
      }
      .slider_item.brand {
        @media all and (max-width: 1280px) {
          height: 88px;
        }
      }
    }
    .swiper-slide.destroy {
      display: inline-block;
      margin-right: 40px;
      margin-bottom: 50px;
      vertical-align: top;
      &:nth-child(4n) {
        margin-right: 0;
      }
      > .slider_item {
        > .img_box {
          height: 290px;
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
  .badge_type_box {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 22px;
    padding: 0 5px;
    font-size: 11px;
    font-weight: 700;
    margin-right: 3px;
    &:last-child {
      margin-right: 0;
    }
  }
  .badge_type_box.red {
    border: 1px solid #fd4381;
    color: #fd4381;
  }
  .badge_type_box.blue {
    border: 1px solid #4866e4;
    color: #4866e4;
  }
  .main_slider_next.type4,
  .main_slider_prev.type4 {
    position: absolute;
    top: 120px;
    width: 60px;
    height: 60px;
    background-color: rgba(255, 255, 255, 0.7);
    z-index: 1;
  }
  .main_slider_prev {
    left: 0;
  }
  .main_slider_next {
    right: 0;
  }
  .event_end_box,
  .prd_end_box {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(38, 38, 38, 0.7);
    color: #fff;
    z-index: 1;
    .event_end_text,
    .prd_end_text {
      position: absolute;
      text-align: center;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
      > p {
        font-size: 20px;
      }
      > span {
        font-size: 14px;
      }
    }
  }
  .type_column_bullet {
    width: 100%;
    text-align: center;
    position: relative;
    margin-top: 15px;
    .swiper-pagination-bullet-active {
      background-color: #262626;
    }
  }
  .swiper-container-horizontal > .swiper-pagination-bullets .swiper-pagination-bullet {
    width: 6px !important;
    height: 6px !important;
    margin: 0 6px !important;
  }
`;

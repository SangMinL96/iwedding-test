import { Desktop } from '@hooks/useDevice';
import { MainDataType } from '@modules/main/interface';
import IconSlideBtn from '@svgs/icon_Slide_btn';
// import Icon from '@components/common/component/Icon/Icon';
import { getDateTimeSS, getDateTimeSST, showPrice, urlReplace } from '@utils/util';
import Image from 'next/image';
import React from 'react';
import Countdown from 'react-countdown';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';

type PropsType = {
  data: MainDataType;
};

// const CountdownEndSpan = () => <span></span>;

const MainType5 = ({ data }: PropsType) => {
  const deskTop = Desktop();

  return (
    <Container>
      <div className='background_box'></div>
      <div className='hotdeal_title_box'>
        <p>{data.title}</p>
        <span>{data.sub_title}</span>
      </div>

      <div className='slider_box'>
        <Swiper
          spaceBetween={25}
          slidesPerView={'auto'}
          navigation={
            data.slide_or_bottom > 1
              ? false
              : {
                  prevEl: '.main_slider_prev.type5',
                  nextEl: '.main_slider_next.type5',
                }
          }
          pagination={{
            el: '.hotdeal_slider_pagination',
            type: 'fraction',
          }}
          onInit={swiper => {
            if (data.slide_or_bottom > 1) {
              swiper.destroy(false, true);
            }
          }}
          className={data.slide_or_bottom > 1 ? 'destroy' : ''}
        >
          {data.item_list?.map((item: any) => (
            <SwiperSlide key={item.no} className={data.slide_or_bottom > 1 ? 'destroy' : ''}>
              <div className='hotdeal_slider_item'>
                {item.item_status === 'coming' ? (
                  <div className={data?.coming_soon_type > 0 ? 'hotdeal_coming_soon_box opacity' : 'hotdeal_coming_soon_box'}>
                    <div className='coming_soon_text'>
                      <p>
                        COMING
                        <br />
                        SOON
                      </p>
                      <span>{getDateTimeSS(item.time_start)} OPEN</span>
                    </div>
                  </div>
                ) : null}
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
                <a href={item.url.includes('https://') ? item.url : `https://www.iwedding.co.kr${item.url}`} target={item.target}>
                  <div className='item_top_box'>
                    {item.floating.icon_type > 0 && (
                      <span className={`badge_type_label ${item.floating.icon_type === 1 ? 'red' : 'blue'}`}>
                        {item.floating.icon_text}
                      </span>
                    )}
                    <Image
                      unoptimized
                      layout='fill'
                      alt='hotdeal img'
                      src={!deskTop ? urlReplace(item.img_mobile) : urlReplace(item.img_pc)}
                    />

                    <div className='shadow_box'></div>
                    <div className='hotdeal_time_text'>
                      {item.product_info.discount_rate > 0 && item.product_info.discount_rate !== '' && (
                        <p className='sale_per'>{item.product_info.discount_rate}% Sale</p>
                      )}

                      {/* 카운트 다운 */}
                      {item.remain_type === '1' && item.item_status !== 'end' && (
                        <div className='remaining_time countdown'>
                          <Countdown daysInHours={true} date={getDateTimeSST(item.time_end)} />
                        </div>
                      )}

                      {/* 잔여수량 */}
                      {item.type === 'product' && item.remain_type === '2' && (
                        <div className='remaining_time'>
                          <span>{item.remain_quantity}개 남음</span>
                        </div>
                      )}
                      {/* {item.type === 'product' && item.product_info.length > 0 && item.remain_type === '2' && (
                        <div className='remaining_time'>
                          <span>{item.item.product_info.limited_sales_cnt}개 남음</span>
                        </div>
                      )} */}
                    </div>
                  </div>
                  <div className='item_bottom_box'>
                    {item.header !== '' && <span className='company_name'>{item.header}</span>}
                    <p className='hotdeal_title'>{item.title}</p>
                    {item.sub_title !== '' && <span className='hotdeal_description'>{item.sub_title}</span>}
                    {item.product_info.length !== 0 && (
                      <div className='hotdeal_price_box'>
                        {item.product_info.product_price === '' ? (
                          <span className='current_price'>{showPrice(item.product_info.discount_price)}</span>
                        ) : (
                          <>
                            <span className='prev_price'>{showPrice(item.product_info.product_price)}</span>
                            <span className='sale_per'>{item.product_info.discount_rate}%</span>
                            <span className='current_price'>{showPrice(item.product_info.discount_price)}</span>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </a>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        {data.slide_or_bottom < 2 && (
          <>
            <button className='main_slider_prev type5'>
              <IconSlideBtn type='slideLeft' />
            </button>
            <button className='main_slider_next type5'>
              <IconSlideBtn type='slideRight' />
            </button>
          </>
        )}
        {!deskTop && data.slide_or_bottom < 2 ? <span className='hotdeal_slider_pagination'></span> : null}
      </div>
      {data.more_btn_view_flag > 0 ? (
        <div className='hotdeal_btn_box'>
          {/* pc 일 때 1/3 텍스트 fraction으로 바꿔야함 */}
          <a href={!deskTop ? data.more_btn_mobile_url : data.more_btn_pc_url}>
            타임 핫딜 더 보기
            {/* {!deskTop && <span>{!deskTop ? '' : '1/3'}</span>} */}
          </a>
        </div>
      ) : null}
    </Container>
  );
};

export default MainType5;
const Container = styled.div`
  position: relative;
  min-width: 1280px;
  margin: 0 auto 80px auto;
  overflow: hidden;
  padding-top: 100px;
  @media all and (max-width: 1280px) {
    width: 100%;
    min-width: auto;
    padding-top: 40px;
    margin: 0 auto 44px auto;
  }
  .background_box {
    width: 100%;
    height: 526px;
    background-color: rgb(129, 174, 219);
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    @media all and (max-width: 1280px) {
      height: 300px;
    }
  }
  .hotdeal_title_box {
    width: 100%;
    text-align: center;
    color: #fff;
    margin-bottom: 68px;
    @media all and (max-width: 1280px) {
      margin-bottom: 33px;
    }
    > p {
      font-family: 'Poppins', sans-serif;
      font-size: 60px;
      font-weight: 700;
      line-height: 30px;
      letter-spacing: 15px;
      margin-bottom: 28px;
      @media all and (max-width: 1280px) {
        font-size: 30px;
        letter-spacing: 2px;
        margin-bottom: 12px;
      }
    }
    > span {
      display: block;
      font-size: 24px;
      line-height: 36px;
      @media all and (max-width: 1280px) {
        font-size: 13px;
        line-height: 19px;
      }
    }
  }
  .slider_box {
    width: 1280px;
    min-width: 1280px;
    margin: 0 auto;
    position: relative;
    @media all and (max-width: 1280px) {
      width: 100%;
      min-width: auto;
    }
    .swiper-container.destroy {
      > .swiper-wrapper {
        display: block;
        @media all and (max-width: 1280px) {
          flex-direction: column;
        }
        > .swiper-slide.destroy {
          display: inline-block;
          margin-right: 25px;
          margin-bottom: 30px;
          vertical-align: top;
          &:nth-child(3n) {
            margin-right: 0;
          }
          @media all and (max-width: 1280px) {
            width: 100%;
          }
          > .hotdeal_slider_item {
            @media all and (max-width: 1280px) {
              height: auto;
            }
            > a {
              > .item_top_box {
                @media all and (max-width: 1280px) {
                  width: 100%;
                  height: auto;
                }
              }
            }
          }
        }
      }
    }
    .swiper-container {
      width: 1220px;
      min-width: 1220px;
      margin: 0 auto;
      @media all and (max-width: 1280px) {
        width: 100%;
        min-width: auto;
        padding: 0 15px;
      }
      .swiper-slide {
        width: 390px;
        @media all and (max-width: 1280px) {
          width: 260px;
        }
        .hotdeal_slider_item {
          width: 100%;
          height: 530px;
          border: 1px solid #262626;
          padding: 56px 55px 0 55px;
          /* margin-right: 20px; */
          background-color: #fff;
          position: relative;
          @media all and (max-width: 1280px) {
            height: 390px;
            padding: 30px 34px 34px 34px;
          }
          > a {
            display: block;
            width: 100%;
            height: 100%;
            cursor: pointer;
            .item_top_box {
              width: 100%;
              height: 278px;
              position: relative;
              @media all and (max-width: 1280px) {
                width: 180px;
                height: 180px;
              }
              > img {
                width: 100%;
              }
              .shadow_box {
                width: 100%;
                height: 145px;
                position: absolute;
                bottom: 0;
                background: linear-gradient(
                  to bottom,
                  rgba(255, 255, 255, 0) 10%,
                  rgba(255, 255, 255, 0.2) 25%,
                  rgba(255, 255, 255, 0.5) 50%,
                  rgba(255, 255, 255, 0.75) 75%,
                  rgba(255, 255, 255, 1) 100%
                );
                @media all and (max-width: 1280px) {
                  height: 90px;
                }
              }
              .hotdeal_time_text {
                width: 100%;
                text-align: center;
                font-family: 'Poppins', sans-serif;
                font-weight: 700;
                position: absolute;
                bottom: -30px;
                @media all and (max-width: 1280px) {
                  bottom: -22px;
                }
                > .sale_per {
                  font-size: 36px;
                  line-height: 30px;
                  color: #fd4381;
                  @media all and (max-width: 1280px) {
                    font-size: 24px;
                  }
                }
                > .remaining_time {
                  height: 66px;
                  font-size: 46px;
                  color: #262626;
                  font-family: 'Poppins', sans-serif;
                  position: relative;
                  @media all and (max-width: 1280px) {
                    height: 32px;
                    font-size: 32px;
                    margin-top: 3px;
                  }
                  > span {
                    display: inline-block;
                    font-family: 'Poppins', sans-serif;
                    vertical-align: top;
                    padding-top: 7px;
                    &:last-child {
                      margin-right: 0;
                    }
                    @media all and (max-width: 1280px) {
                      padding-top: 0;
                    }
                  }
                  > span.time_colon {
                    display: inline-block;
                    font-family: 'Poppins', sans-serif;
                    font-weight: 400;
                    vertical-align: top;
                    padding-top: 3px;
                    margin: 0 5px;
                    @media all and (max-width: 1280px) {
                      padding-top: 0;
                    }
                  }
                }
                > .remaining_time.countdown {
                  letter-spacing: 3px;
                }
              }
            }
            .item_bottom_box {
              width: 100%;
              margin-top: 50px;
              text-align: center;
              @media all and (max-width: 1280px) {
                margin-top: 35px;
              }
              .company_name {
                display: block;
                margin-bottom: 7px;
                font-size: 15px;
                line-height: 22px;
                color: #8c8c8c;
                @media all and (max-width: 1280px) {
                  margin-bottom: 5px;
                  font-size: 13px;
                  line-height: 19px;
                }
              }
              .hotdeal_title {
                font-size: 17px;
                color: #262626;
                line-height: 22px;
                @media all and (max-width: 1280px) {
                  font-size: 14px;
                }
              }
              .hotdeal_description {
                display: block;
                margin-top: 10px;
                font-size: 15px;
                line-height: 22px;
                color: #8c8c8c;
                @media all and (max-width: 1280px) {
                  margin-top: 5px;
                  font-size: 13px;
                  line-height: 19px;
                }
              }
              .hotdeal_price_box {
                width: 100%;
                text-align: center;
                margin-top: 10px;
                .prev_price {
                  display: block;
                  font-size: 14px;
                  color: #8c8c8c;
                  text-decoration: line-through;
                  margin-bottom: 8px;
                  @media all and (max-width: 1280px) {
                    font-size: 13px;
                  }
                }
                .sale_per {
                  font-size: 16px;
                  font-weight: 700;
                  color: #fd4381;
                  margin-right: 4px;
                  @media all and (max-width: 1280px) {
                    font-size: 15px;
                  }
                }
                .current_price {
                  font-size: 16px;
                  font-weight: 700;
                  color: #262626;
                  @media all and (max-width: 1280px) {
                    font-size: 15px;
                  }
                }
              }
            }
          }
        }
      }
    }
    .hotdeal_slider_pagination {
      display: block;
      width: 100%;
      margin: 25px 0;
      font-size: 15px;
      text-align: center;
    }
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
      font-family: 'Poppins', sans-serif;
      position: absolute;
      text-align: center;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
      > p {
        font-size: 40px;
        font-weight: 700;
        line-height: 39px;
        color: #fff;
        @media all and (max-width: 1280px) {
          font-size: 34px;
          line-height: 33px;
        }
      }
      > span {
        display: block;
        font-size: 18px;
        color: #fff;
        margin-top: 20px;
        @media all and (max-width: 1280px) {
          font-size: 16px;
          margin-top: 10px;
        }
      }
    }
  }
  .hotdeal_coming_soon_box.opacity {
    background-color: rgba(237, 181, 56, 0.9);
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
      font-family: 'Poppins', sans-serif;
      position: absolute;
      text-align: center;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
      > p {
        font-family: 'Poppins', sans-serif;
        font-size: 40px;
        font-weight: 700;
        @media all and (max-width: 1280px) {
          font-size: 32px;
        }
      }
      > span {
        display: block;
        font-size: 18px;
        margin-top: 25px;
      }
    }
    .prd_end_text {
      > p {
        @media all and (max-width: 1280px) {
          font-size: 20px;
        }
      }
    }
    .event_end_text {
      > span {
        font-size: 15px;
        margin-top: 20px;
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
    z-index: 1;
  }
  .badge_type_label.red {
    background-color: #fd4381;
  }
  .badge_type_label.blue {
    font-family: 'Poppins', sans-serif;
    letter-spacing: 1px;
    background-color: #4866e4;
  }
  .main_slider_next.type5,
  .main_slider_prev.type5 {
    position: absolute;
    top: 236px;
    width: 60px;
    height: 60px;
    background-color: #fff;
    border: 1px solid #262626;
    z-index: 1;
    @media all and (max-width: 1280px) {
      display: none;
    }
  }
  .main_slider_prev {
    left: 0;
  }
  .main_slider_next {
    right: 0;
  }
  .hotdeal_btn_box {
    margin-top: 60px;
    display: block;
    @media all and (max-width: 1280px) {
      width: 100%;
      padding: 0 15px;
      margin-top: 30px;
    }
    > a {
      display: block;
      width: 375px;
      height: 60px;
      border: 1px solid #262626;
      text-align: center;
      font-size: 16px;
      font-weight: 400;
      line-height: 58px;
      margin: 0 auto;
      @media all and (max-width: 1280px) {
        width: 100%;
        height: 46px;
        font-size: 14px;
        line-height: 44px;
      }
    }
  }
`;

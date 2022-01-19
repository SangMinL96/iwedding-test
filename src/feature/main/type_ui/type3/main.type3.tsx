import TypeTitle from '@feature/main/type_common/type.title';
import { Desktop } from '@hooks/useDevice';
import { MainDataType } from '@modules/main/interface';
import theme from '@styles/theme';
import IconSlideBtn from '@svgs/icon_Slide_btn';
import { urlReplace } from '@utils/util';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import 'swiper/components/pagination/pagination.min.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import Type3Card from './Type3Card';
import Type3CardMobile from './Type3CardMobile';

SwiperCore.use([Navigation, Pagination]);

type PropsType = {
  data: MainDataType;
  sectionIndex: number;
};

const MainType3 = ({ data, sectionIndex }: PropsType) => {
  const [tabValue, setTabValue] = useState(data?.item_list[0].tag);
  const [divideItem, setDivideItem] = useState<PropsType[]>([]);

  const deskTop = Desktop();
  let rankNum = 0;
  useEffect(() => {
    if (data.item_list[0].tag === undefined) {
      const divided = [];
      for (let i = 0; i < data.item_list.length; i += 4) {
        divided.push(data.item_list.slice(i, i + 4));
      }
      setDivideItem(divided);
    }
  }, []);

  return (
    <Container itemType={data?.item_list.tag !== undefined ? data?.item_list.item_list.type : data?.item_list.type}>
      {/* 섹션 타이틀 부분 */}
      <TypeTitle data={data} isTypeThree />

      {data?.item_list[0].tag !== undefined ? (
        <TabWrapper>
          {data?.item_list?.map((item: any) => (
            <li
              key={data?.idx + '_' + item.tag}
              className={`tab_list ${item.tag === tabValue && 'current'}`}
              onClick={() => setTabValue(item.tag)}
            >
              #{item.tag}
            </li>
          ))}
        </TabWrapper>
      ) : null}
      {/* 슬라이더 부분 */}
      {deskTop ? (
        // =========================================== PC 용 ===========================================
        <>
          {data?.item_list[0].tag !== undefined ? (
            // tab 있는 슬라이더
            <>
              {data?.item_list?.map((itemList: any, index: number) => (
                <Swiper
                  spaceBetween={20}
                  slidesPerView={5}
                  pagination={false}
                  navigation={{
                    prevEl: `.main_slider_prev.type3${sectionIndex}`,
                    nextEl: `.main_slider_next.type3${sectionIndex}`,
                  }}
                  // onInit={swiper => {
                  //   if (data?.slide_or_bottom > 1) {
                  //     swiper.destroy(false, true);
                  //   }
                  // }}
                  // className={data?.slide_or_bottom > 1 ? 'destroy' : ''}
                  key={itemList?.tag + '-' + index}
                >
                  {itemList?.tag === tabValue && (
                    <>
                      {itemList?.item_list?.map((item: any, index: number) => (
                        <SwiperSlide key={item.ids + '-' + index}>
                          {/* 브랜드 타입 아이템 -> 로고 체크 했을 경우 */}
                          {item.type === 'brand' && data?.type11_logo > 0 && item.logo !== undefined && (
                            <div className='brand_logo_box'>
                              <div className='logo_wrapper'>
                                <Image unoptimized layout='fill' objectFit='contain' src={urlReplace(item.logo)} alt='brand logo' />
                              </div>
                            </div>
                          )}
                          <Type3Card
                            item={item}
                            indexNum={index}
                            imgBelowExpose={data?.img_below_expose === '0'}
                            thumbnailRatio={data?.thumbnail_ratio > 0}
                            orderBadgeFlag={data?.order_badge_flag > 0}
                            isLike={item.like != '1'}
                          />
                        </SwiperSlide>
                      ))}
                    </>
                  )}

                  {data?.slide_or_bottom !== 2 && (
                    <>
                      <button
                        className={
                          data?.item_list[0]?.item_list[0]?.type === 'brand' && data?.type11_logo > 0
                            ? `main_slider_prev type3${sectionIndex} brand`
                            : `main_slider_prev type3${sectionIndex}`
                        }
                      >
                        <IconSlideBtn type='slideLeft' />
                      </button>
                      <button
                        className={
                          data?.item_list[0]?.item_list[0]?.type === 'brand' && data?.type11_logo > 0
                            ? `main_slider_next type3${sectionIndex} brand`
                            : `main_slider_next type3${sectionIndex}`
                        }
                      >
                        <IconSlideBtn type='slideRight' />
                      </button>
                    </>
                  )}
                </Swiper>
              ))}
            </>
          ) : (
            <Swiper
              spaceBetween={20}
              slidesPerView={5}
              pagination={false}
              navigation={{
                prevEl: `.main_slider_prev.type3${sectionIndex}`,
                nextEl: `.main_slider_next.type3${sectionIndex}`,
              }}
              onInit={swiper => {
                if (data?.slide_or_bottom > 1) {
                  swiper.destroy(false, true);
                }
              }}
              className={data?.slide_or_bottom > 1 ? 'destroy' : ''}
            >
              {/* // tab 없는 슬라이더 */}
              {data?.item_list?.map((info: any, index: number) => (
                <SwiperSlide key={`${info.ids}_${index}_${info.type}`} className={data?.slide_or_bottom > 1 ? 'destroy' : ''}>
                  {/* 브랜드 타입 아이템 -> 로고 체크 했을 경우 */}
                  {info.type === 'brand' && data?.type11_logo > 0 && info.logo !== undefined && (
                    <div className='brand_logo_box'>
                      <div className='logo_wrapper'>
                        <Image unoptimized layout='fill' objectFit='contain' src={urlReplace(info.logo)} alt='brand logo' />
                      </div>
                    </div>
                  )}
                  <Type3Card
                    item={info}
                    indexNum={index}
                    imgBelowExpose={data?.img_below_expose === '0'}
                    thumbnailRatio={data?.thumbnail_ratio > 0}
                    orderBadgeFlag={data?.order_badge_flag > 0}
                    isLike={info.like != '1'}
                  />
                </SwiperSlide>
              ))}
              {data?.slide_or_bottom !== 2 && (
                <>
                  <button
                    className={
                      data?.item_list[0].type === 'brand' && data?.type11_logo > 0
                        ? `main_slider_prev type3${sectionIndex} brand`
                        : `main_slider_prev type3${sectionIndex}`
                    }
                  >
                    <IconSlideBtn type='slideLeft' />
                  </button>
                  <button
                    className={
                      data?.item_list[0].type === 'brand' && data?.type11_logo > 0
                        ? `main_slider_next type3${sectionIndex} brand`
                        : `main_slider_next type3${sectionIndex}`
                    }
                  >
                    <IconSlideBtn type='slideRight' />
                  </button>
                </>
              )}
            </Swiper>
          )}
        </>
      ) : (
        //  =========================================== mobile 용 ===========================================
        <>
          {data.item_list[0].tag != undefined ? (
            <>
              {data.item_list?.map((itemList: any) => {
                if (itemList.tag === tabValue) {
                  const divideData = [];
                  let k = 0;
                  for (let i = 0; i < itemList.item_list.length; i += 4) {
                    divideData.push(itemList.item_list.slice(i, i + 4));
                  }
                  return (
                    <Swiper spaceBetween={15} slidesPerView={1} grabCursor pagination={{ clickable: true }} key={itemList.tag}>
                      {divideData.map((divideList: any, index: number) => (
                        <SwiperSlide key={`${divideList.ids}_${index}_${divideList.type}`} className='no_tab'>
                          {divideList.map((divideItem: any, index: number) => (
                            <div className='slider_item' key={`${divideItem.no}_${index}`}>
                              {/* 브랜드 타입 아이템 -> 로고 체크 했을 경우 */}
                              {divideItem.type === 'brand' && data?.type11_logo > 0 && divideItem.logo !== undefined && (
                                <div className='brand_logo_box'>
                                  <div className='logo_wrapper'>
                                    <Image
                                      unoptimized
                                      layout='fill'
                                      objectFit='contain'
                                      src={urlReplace(divideItem.logo)}
                                      alt='brand logo'
                                    />
                                  </div>
                                </div>
                              )}
                              <Type3CardMobile
                                item={divideItem}
                                indexNum={index}
                                imgBelowExpose={data?.img_below_expose === '0'}
                                thumbnailRatio={data?.thumbnail_ratio > 0}
                                orderBadgeFlag={data?.order_badge_flag > 0}
                                isLike={divideItem.like != '1'}
                                rankNum={++k}
                              />
                            </div>
                          ))}
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  );
                }
                return;
              })}
            </>
          ) : (
            <Swiper
              spaceBetween={15}
              slidesPerView={1}
              grabCursor
              pagination={{ clickable: true }}
              onInit={swiper => {
                if (data.slide_or_bottom > 1) {
                  swiper.destroy(false, true);
                }
              }}
              className={data.slide_or_bottom > 1 ? 'destroy' : ''}
            >
              {divideItem.map((item: any, index: number) => {
                return (
                  <SwiperSlide key={index} className={data.slide_or_bottom > 1 ? 'no_tab destroy' : 'no_tab'}>
                    {item.map((item: any) => (
                      <div className='slider_item' key={item.no}>
                        {/* 브랜드 타입 아이템 -> 로고 체크 했을 경우 */}
                        {item.type === 'brand' && data?.type11_logo > 0 && item.logo !== undefined && (
                          <div className='brand_logo_box'>
                            <div className='logo_wrapper'>
                              <Image unoptimized layout='fill' objectFit='contain' src={urlReplace(item.logo)} alt='brand logo' />
                            </div>
                          </div>
                        )}
                        <Type3CardMobile
                          item={item}
                          indexNum={index}
                          imgBelowExpose={data?.img_below_expose === '0'}
                          thumbnailRatio={data?.thumbnail_ratio > 0}
                          orderBadgeFlag={data?.order_badge_flag > 0}
                          isLike={item.like != '1'}
                          rankNum={++rankNum}
                        />
                      </div>
                    ))}
                  </SwiperSlide>
                );
              })}
            </Swiper>
          )}
        </>
      )}
    </Container>
  );
};

export default MainType3;

type StyledPropsType = {
  itemType: string;
};
const Container = styled.div<StyledPropsType>`
  position: relative;
  width: 1280px;
  min-width: 1280px;
  margin: 0 auto 80px auto;
  overflow: hidden;
  @media all and (max-width: 1280px) {
    width: 100%;
    min-width: auto;
    padding-right: 15px;
    margin: 0 auto 50px auto;
  }
  .type_title.no_tab {
    margin-bottom: 33px;
    @media all and (max-width: 1280px) {
      margin-bottom: 20px;
    }
  }
  .swiper-container {
    width: 100%;
    position: relative;
    @media all and (max-width: 1280px) {
      padding-left: 15px;
      padding-bottom: 15px;
    }
    .swiper-wrapper {
      width: 100%;
      position: relative;
      .swiper-slide {
        position: relative;
        width: 240px;
        display: inline-block;
        vertical-align: top;
        @media all and (max-width: 1280px) {
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-start;
          align-items: flex-start;
          height: auto;
        }
        > a.minus_margin_bottom {
          margin-bottom: -30px;
        }
        .brand_logo_box {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 69px;
          padding: 9px 0;
          border-top: 1px solid #e4e2e3;
          @media all and (max-width: 1280px) {
            height: 44px;
            padding: 5px 0;
          }
          .logo_wrapper {
            position: relative;
            width: 132px;
            height: 100%;
            margin: 0 auto;
            @media all and (max-width: 1280px) {
              width: 87px;
            }
          }
          /* > div {
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            width: auto;
            height: 50px;
            @media all and (max-width: 1280px) {
              height: 34px;
            }
          } */
        }
        > a {
          position: relative;
          display: block;
          width: 100%;
          height: 100%;
          .img_box {
            position: relative;
            width: 100%;
            height: 240px;
            overflow: hidden;
            > img {
              width: 100%;
              height: 100%;
            }
            > div {
              > img {
                object-fit: cover;
              }
            }
          }
          .img_box.origin {
            width: 100%;
            height: 320px;
            @media all and (max-width: 1280px) {
              height: 320px;
            }
            > img {
              height: auto;
            }
          }
        }
        > .slider_item {
          position: relative;
          display: inline-block;
          width: 47.82%;
          margin-right: 1.2em; //상민이가 바꿈! 제 안드로이드에서 한줄로 보이길래.... 문제가 될라나?!
          margin-bottom: 40px;
          &:nth-child(2n) {
            margin-right: 0;
          }
          > a {
            display: block;
            position: relative;
            width: 100%;
            .img_box {
              position: relative;
              width: 100%;
              overflow: hidden;
              &::after {
                content: '';
                display: block;
                padding-bottom: 100%;
              }
              > img {
                position: absolute;
                height: 100%;
                left: 50%;
                transform: translateX(-50%);
              }
              > div {
                > img {
                  object-fit: cover;
                }
              }
            }
            .img_box.origin {
              height: 230px;
              &::after {
                content: '';
                display: block;
                padding-bottom: 0;
              }
              > img {
                position: relative;
                width: 100%;
                height: 100%;
                left: unset;
                transform: unset;
              }
            }
          }
          > a.minus_margin_bottom {
            margin-bottom: -26px;
          }
        }
        .text_box_2021 {
          margin-top: 20px;
          @media all and (max-width: 1280px) {
            width: 100%;
            margin-top: 11px;
          }
          .company_name {
            display: block;
            font-size: 12px;
            margin-bottom: 3px;
            color: #8c8c8c;
            line-height: 22px;
          }
          .prd_title {
            font-size: 15px;
            line-height: 22px;
            color: #262626;
            padding-right: 15px;
            @media all and (max-width: 1280px) {
              width: 100%;
              font-size: 14px;
              padding-right: 0;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
              word-wrap: break-word;
              line-height: 20px;
            }
          }
          .sub_description,
          .prd_sub_title {
            display: block;
            font-size: 14px;
            color: #8c8c8c;
            margin-top: 4px;
            @media all and (max-width: 1280px) {
              font-size: 12px;
            }
          }
          .event_date {
            display: block;
            font-size: 12px;
            margin-bottom: 5px;
            color: #fd4381;
            line-height: 22px;
          }
          .price_info_box {
            margin-top: 10px;
            @media all and (max-width: 1280px) {
              margin-top: 7px;
            }
            .prev_price {
              display: block;
              font-size: 14px;
              line-height: 20px;
              color: #8c8c8c;
              text-decoration: line-through;
              margin-bottom: 5px;
              @media all and (max-width: 1280px) {
                font-size: 13px;
                line-height: 19px;
                margin-bottom: 2px;
              }
            }
            .sale_per,
            .current_price {
              font-size: 16px;
              font-weight: 700;
              line-height: 24px;
              @media all and (max-width: 1280px) {
                font-size: 15px;
              }
            }
            .sale_per {
              color: #fd4381;
              margin-right: 5px;
            }
            .current_price {
              color: #262626;
            }
          }
        }
        .badge_box_2021 {
          position: relative;
          display: inline-flex;
          align-items: center;
          /* width: 100%; */
          margin-right: 3px;
          margin-top: 13px;
        }
      }
    }
  }
  .remaining_num {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    padding: 0 5px;
    height: 22px;
    font-size: 11px;
    color: #8b8b8b;
    background-color: #ededed;
  }
  .swiper-container.destroy {
    > .swiper-wrapper {
      display: block;
      @media all and (max-width: 1280px) {
        flex-direction: column;
      }
      .swiper-slide.destroy {
        display: inline-block;
        margin-right: 20px;
        margin-bottom: 50px;
        vertical-align: top;
        @media all and (max-width: 1280px) {
          margin-bottom: 0;
        }
        &:nth-child(5n) {
          margin-right: 0;
        }
        > .slider_item {
          vertical-align: top;
        }
      }
    }
    > .swiper-pagination {
      display: none;
    }
  }

  .text_box_2021 .prd_sub_title {
    font-size: 14px;
    color: #8c8c8c;
    @media all and (max-width: 1280px) {
      font-size: 13px;
    }
  }
  .item_badge {
    display: inline-block;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    color: #fff;
    text-align: center;
    vertical-align: middle;
    > span {
      position: absolute;
      top: 5%;
      left: 50%;
      transform: translate(-50%, 50%);
      fill: rgb(255, 255, 255);
      font-size: 16px;
      font-family: Poppins-Bold, Poppins;
      font-weight: 700;
      text-anchor: middle;
      @media all and (max-width: 1280px) {
        top: -4%;
        font-size: 14px;
      }
    }
  }
  .prd_close {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    width: 100%;
    height: 240px;
    z-index: 999;
    background-color: rgba(38, 38, 38, 0.7);
    > span {
      font-family: 'Poppins', sans-serif;
      font-size: 40px;
      font-weight: 700;
      color: white;
    }
    @media all and (max-width: 499px) {
      left: 0;
      height: 42vw;
      > span {
        font-size: 30px;
      }
    }
  }
  .main_slider_prev {
    z-index: 9999;
    position: absolute;
    top: 95px;
    left: 0;
    width: 60px;
    height: 60px;
    background-color: rgba(247, 247, 247, 0.749);
  }
  .main_slider_next {
    z-index: 9999;
    position: absolute;
    top: 95px;
    right: 0;
    width: 60px;
    height: 60px;
    background-color: rgba(247, 247, 247, 0.749);
  }
  .main_slider_prev.brand,
  .main_slider_next.brand {
    top: 150px;
  }
  .swiper-pagination {
    bottom: 0;
  }
  .swiper-pagination-bullet {
    width: 7px;
    height: 7px;
  }
  .swiper-pagination-bullet-active {
    width: 7px;
    height: 7px;
    background: black;
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
`;

// const TypeTitle = styled.div`
//   width: 100%;
//   height: 40px;
//   position: relative;
//     @media all and (max-width: 1280px) {
//     padding-left: 15px;
//     height: auto;
//     min-height: 20px;
//   }
//   .left_side_title {
//     height: 100%;
//     > p {
//       display: inline-block;
//       font-size: 24px;
//       font-weight: 500;
//       color: #262626;
//       margin-right: 14px;
//       line-height: 40px;
//       vertical-align: middle;
//         @media all and (max-width: 1280px) {
//         display: block;
//         line-height: normal;
//         font-size: 20px;
//         font-weight: 700;
//         margin-right: 0;
//         text-overflow: ellipsis;
//         white-space: nowrap;
//         overflow: hidden;
//         width: calc(100% - 60px);
//       }
//     }
//     > span {
//       display: inline-block;
//       font-size: 14px;
//       color: #666666;
//       line-height: 40px;
//       vertical-align: middle;
//         @media all and (max-width: 1280px) {
//         line-height: normal;
//         font-size: 12px;
//       }
//     }
//   }
//   .more_view_btn {
//     position: absolute;
//     top: 50%;
//     right: 0;
//     transform: translateY(-50%);
//       @media all and (max-width: 1280px) {
//       top: 7px;
//       transform: unset;
//     }
//     > a {
//       display: flex;
//       font-size: 15px;
//       font-weight: 700;
//       > div {
//         margin-left: 5px;
//       }
//       @media all and (max-width: 499px) {
//         font-size: 13px;
//       }
//     }
//   }
// `;

const TabWrapper = styled.ul`
  width: 100%;
  margin-top: 25px;
  margin-bottom: 30px;
  overflow-x: scroll;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
  @media all and (max-width: 1280px) {
    display: flex;
    align-items: center;
    margin-top: 18px;
    margin-bottom: 15px;
    padding-left: 15px;
  }
  .tab_list {
    display: inline-block;
    font-size: 17px;
    font-weight: 700;
    color: #8c8c8c;
    line-height: 25px;
    margin-right: 40px;
    cursor: pointer;
    position: relative;
    @media all and (max-width: 1280px) {
      font-size: 14px;
      margin-right: 14px;
      line-height: 20px;
      white-space: nowrap;
    }
  }
  .tab_list::after {
    display: none;
  }
  .tab_list.current {
    color: #4866e4;
  }
  .tab_list.current::after {
    display: block;
    width: 100%;
    height: 12px;
    position: absolute;
    bottom: 0;
    left: 0;
    background-color: #fffc07;
    content: '';
    z-index: -1;
  }
`;

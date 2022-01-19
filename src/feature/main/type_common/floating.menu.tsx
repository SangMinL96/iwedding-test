import { useDeepEffect } from '@hooks/useDeepEffect';
import { Desktop } from '@hooks/useDevice';
import downTriangle from '@images/common/f_sel_ico.png';
import floatSpriteImg from '@images/common/f_sprite.png';
import likeIcon from '@images/common/like_ico02.png';
import { bannerZzimAPI, mainKeys, mainLeftRecentAPI, mainRecentAPI } from '@modules/main/api';
import { getRecentView, setRecentView } from '@service/TokenService';
import { showPrice, urlReplace } from '@utils/util';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import SwiperCore, { Autoplay, Navigation, Pagination } from 'swiper/core';
import { Swiper, SwiperSlide } from 'swiper/react';
import useSWR from 'swr';
// import calcIcon from '@images/common/new_calc_banner.jpg';
// import quoteIcon from '@images/common/new_quotation_banner.jpg';

SwiperCore.use([Navigation, Pagination, Autoplay]);

const sortMenu = [
  { name: '전체', value: '전체' },
  { name: '상품', value: 'product' },
  { name: '브랜드', value: 'brand' },
  { name: '콘텐츠', value: 'content' },
  { name: '스토어', value: 'store' },
  { name: '이벤트', value: 'event' },
];

const FloatingMenu = () => {
  const router = useRouter();
  const isDeskTop = Desktop();
  const [recentData, setRecentData] = useState<any>([]);
  const [sort, setSort] = useState({ name: '전체', value: '전체' });
  const [hideOpen, setHideOpen] = useState<boolean>(false);
  const [fixState, setFixState] = useState<boolean>(false);
  const [isMain, setIsMain] = useState<boolean>(false);
  const [isSearch, setIsSearch] = useState<boolean>(false);
  // const [isRightBelowUrl, setRightBelowUrl] = useState<boolean>(false);
  // const rightbelowRoute = [
  //   isDeskTop && '/product',
  //   isDeskTop && '/brand',
  //   isDeskTop && '/event',
  //   isDeskTop && '/mypage',
  //   isDeskTop && '/quotation',
  //   isDeskTop && '/coupon',
  //   isDeskTop && '/icash',
  //   isDeskTop && '/zzim',
  //   isDeskTop && '/order',
  //   isDeskTop && '/request',
  //   isDeskTop && '/request/form',
  //   isDeskTop && '/rsvcenter',
  //   isDeskTop && '/calculator',
  // ];

  const [sortVisible, setSortVisible] = useState<boolean>(false);
  const { data, mutate } = useSWR(mainKeys.mainRecentData, mainRecentAPI);
  const { data: leftData } = useSWR<any>(mainKeys.mainRecentLeftData, mainLeftRecentAPI);

  const [addedHoverData, setAddedHoverData] = useState<any>([]);

  const onMouseOverItem = useCallback(
    (idx: number) => {
      setAddedHoverData(addedHoverData?.map((item, index) => (index === idx ? { ...item, itemHover: true } : item)));
    },
    [setAddedHoverData, addedHoverData],
  );
  const onMouseLeaveItem = useCallback(
    (idx: number) => {
      setAddedHoverData(addedHoverData?.map((item, index) => (index === idx ? { ...item, itemHover: false } : item)));
    },
    [setAddedHoverData, addedHoverData],
  );

  useEffect(() => {
    setRecentData(getRecentView());
    // if (rightbelowRoute.find(route => router?.asPath.includes(route))) {
    //   setRightBelowUrl(true);
    // }
  }, []);

  useEffect(() => {
    if (router.asPath.includes('/main/index')) {
      setIsMain(true);
      setIsSearch(false);
    } else if (router.asPath.includes('/search')) {
      setIsMain(false);
      setIsSearch(true);
    } else {
      setIsMain(false);
      setIsSearch(false);
    }
  }, [router]);

  // 실서버용
  useEffect(() => {
    setAddedHoverData(
      data?.map(item => ({
        ...item,
        itemHover: false,
      })),
    );
  }, [data]);

  // 테스트용
  // useEffect(() => {
  //   setAddedHoverData(
  //     testSlide?.map(item => ({
  //       ...item,
  //       itemHover,
  //     })),
  //   );
  // }, [testSlide]);

  // 최근 본 아이템 삭제
  const onRemove = useCallback(
    (url: string) => () => {
      if (url === 'all') {
        setRecentData([]);
        setRecentView([]);
        mutate();
      } else {
        const filter = recentData.filter(item => item.url !== url);
        setRecentData(filter);
        setRecentView(filter);
        mutate(mainRecentAPI(), false);
      }
    },
    [setRecentData, mutate, recentData],
  );

  const onSort = useCallback(
    item => () => {
      setSort(item);
      setSortVisible(false);
    },
    [],
  );

  // top 버튼
  const handleTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  // 스크롤 시 날개배너 위로
  const handlFollow = useCallback(() => {
    // setScrollY(window.pageYOffset);
    if (window.scrollY > 40) {
      setFixState(true);
    } else {
      setFixState(false);
    }
  }, []);

  // 스크롤 관련 이벤트
  useEffect(() => {
    window.addEventListener('scroll', handlFollow);
    return () => {
      window.removeEventListener('scroll', handlFollow);
    };
  }, [handlFollow]);

  // 플래닝 툴 열기
  const onPlanningTool = useCallback(() => {
    router.push('/calculator');
  }, []);

  // 견적함 이동
  const onQuoteReplace = useCallback(() => {
    return router.replace('/quotation');
  }, []);

  // 찜하기
  const onZzim = useCallback(
    data => async () => {
      const post_data = {
        no: 0,
        ent_code: 0,
        prd_no: 0,
      };
      switch (data.sort) {
        case 'brand':
          post_data.ent_code = data.ent_code;
          break;
        case 'contents':
          post_data.no = data.bbs.no;
          break;
        case 'product':
          post_data.ent_code = data.ent_code;
          post_data.prd_no = data.product.no;
          break;
        case 'event':
          post_data.no = data.bbs.no;
          break;
        case 'zip':
          post_data.no = data.ibrandplus_product.brandplus_no;
          break;
      }
      const result = await bannerZzimAPI(post_data);
      if (result === 'OK') mutate();
    },
    [mutate],
  );

  return (
    <Container fixState={fixState} isMain={isMain} isSearch={isSearch}>
      <HideContainer hideOpen={hideOpen}>
        <HideTitleBox>
          <span className='text_num'>
            최근 본 콘텐츠 <em>{sort.value === '전체' ? data?.length : data?.filter(item => item.sort === sort.value).length}</em>
          </span>
          <span className='close_btn' onClick={() => setHideOpen(prev => !prev)}>
            <button>
              <span>삭제</span>
            </button>
          </span>
        </HideTitleBox>
        <SortBox sortVisible={sortVisible}>
          <div className='sort_select_box'>
            <button className='select_btn' onClick={() => setSortVisible(!sortVisible)}>
              <span>{sort?.name}</span>
            </button>
            <ul className='select_list'>
              {sortMenu.map(item => (
                <li onClick={onSort(item)} key={item.value} data-ct='all'>
                  <Link href='/main/index' passHref>
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <button onClick={onRemove('all')} className='all_del_btn'>
            <span>전체삭제</span>
          </button>
        </SortBox>
        <RecentListBox>
          {data?.reverse().map(item => {
            {
              if (sort.value === '전체') {
                return (
                  <RecentListItem zzimFlag={item.zzim === '1'} key={item.ent_code}>
                    <div className='left_box'>
                      <a href={item.url}>
                        <div className='thumbnail_box'>
                          {/* {item.sort === 'contents' || item.sort === 'event' ? (
                            <Image unoptimized src={urlReplace(item.bbs.thumbnail)} alt='thumbnail' width={78} height={78} />
                          ) : item.sort === 'product' ? (
                            <Image unoptimized src={`http://ifamily.co.kr${item.thumbanil}`} alt='thumbnail' width={78} height={78} />
                          ) : (
                            <Image unoptimized src={urlReplace(item.thumbnail)} alt='thumbnail' width={78} height={78} />
                          )} */}
                          {item.sort === 'contents' || item.sort === 'event' ? (
                            <Image unoptimized src={urlReplace(item.bbs.thumbnail)} alt='thumbnail' width={78} height={78} />
                          ) : (
                            <Image unoptimized src={urlReplace(item.thumbnail)} alt='thumbnail' width={78} height={78} />
                          )}
                        </div>
                        <div className='content_box'>
                          <div className='text_box'>
                            {item.sort === 'product' ? (
                              <>
                                <p className='content_title'>{item.product.name}</p>
                                <p className='price_box'>
                                  {item.product.event_price === '0' && item.product.product_price === item.product.price ? null : (
                                    <span className='sale'>
                                      {Math.round(
                                        ((Number(item.product.product_price) - Number(item.product.price)) /
                                          Number(item.product.product_price)) *
                                          100,
                                      )}
                                      %
                                    </span>
                                  )}
                                  &nbsp;{item.product.event_price !== '0' ? item.product.event_price : showPrice(item.product.price)}
                                </p>
                              </>
                            ) : item.sort === 'contents' ? (
                              <>
                                <p className='content_title'>{item.bbs.title}</p>
                              </>
                            ) : item.sort === 'event' ? (
                              <>
                                <p className='event_date'>
                                  {item.bbs.startdate} ~ {item.bbs.enddate}
                                </p>
                                <p className='content_title'>{item.bbs.title}</p>
                              </>
                            ) : (
                              <>
                                <p className='content_title'>{item.category}</p>
                                <p className='content_title'>{item.ent_name}</p>
                              </>
                            )}
                          </div>
                        </div>
                      </a>
                    </div>
                    <div className='btn_box'>
                      <button onClick={onZzim(item)} className='rf_like_btn'>
                        <span>좋아요</span>
                      </button>

                      <button onClick={onRemove(item.url)} className='rf_del_btn'>
                        <span>삭제</span>
                      </button>
                    </div>
                  </RecentListItem>
                );
              } else {
                if (item.sort === sort.value) {
                  return (
                    <RecentListItem zzimFlag={item.zzim === '1'} key={item.ent_code}>
                      <div className='left_box'>
                        <a href={item.url}>
                          <div className='thumbnail_box'>
                            {item.sort === 'contents' || item.sort === 'event' ? (
                              <Image unoptimized src={urlReplace(item.bbs.thumbnail)} alt={item.bbs.title} width={78} height={78} />
                            ) : (
                              <Image unoptimized src={urlReplace(item.thumbnail)} alt={item.ent_name} width={78} height={78} />
                            )}
                          </div>
                          <div className='content_box'>
                            <div className='text_box'>
                              {item.sort === 'product' ? (
                                <>
                                  <p className='content_title'>{item.product.name}</p>
                                  <p className='price_box'>
                                    {item.product.event_price === '0' && item.product.product_price === item.product.price ? null : (
                                      <span className='sale'>
                                        {Math.round(
                                          ((Number(item.product.product_price) - Number(item.product.price)) /
                                            Number(item.product.product_price)) *
                                            100,
                                        )}
                                        %
                                      </span>
                                    )}
                                    &nbsp;{item.product.event_price !== '0' ? item.product.event_price : showPrice(item.product.price)}
                                  </p>
                                </>
                              ) : item.sort === 'contents' ? (
                                <>
                                  <p className='content_title'>{item.bbs.title}</p>
                                </>
                              ) : item.sort === 'event' ? (
                                <>
                                  <p className='event_date'>
                                    {item.bbs.startdate} ~ {item.bbs.enddate}
                                  </p>
                                  <p className='content_title'>{item.bbs.title}</p>
                                </>
                              ) : (
                                <>
                                  <p className='content_title'>{item.category}</p>
                                  <p className='content_title'>{item.ent_name}</p>
                                </>
                              )}
                            </div>
                          </div>
                        </a>
                      </div>
                      <div className='btn_box'>
                        <button onClick={onZzim(item)} className='rf_like_btn'>
                          <span>좋아요</span>
                        </button>

                        <button onClick={onRemove(item.url)} className='rf_del_btn'>
                          <span>삭제</span>
                        </button>
                      </div>
                    </RecentListItem>
                  );
                }
              }
            }
          })}
        </RecentListBox>
      </HideContainer>

      <LeftBox>
        <Swiper
          slidesPerView={1}
          loop
          autoplay={{
            delay: 3000,
          }}
          pagination={{
            el: '.left_pagination',
            type: 'fraction',
          }}
          navigation={{
            prevEl: '.left_slider_prev',
            nextEl: '.left_slider_next',
          }}
        >
          {leftData
            ?.filter(item => item.no !== undefined)
            ?.map((item2, index) => (
              <SwiperSlide
                key={`${item2.no}_${index}`}
                onClick={() => {
                  if (item2?.mobile_url === 'http://app.iwedding.co.kr') {
                    window.open('http://app.iwedding.co.kr');
                  } else {
                    window.open(`https://www.iwedding.co.kr${item2.pc_url}`);
                  }
                }}
              >
                <Image
                  priority
                  unoptimized
                  src={`https://www.ifamily.co.kr/image/manage_banner/${item2.pc_img}`}
                  alt='sample'
                  layout='fill'
                />
              </SwiperSlide>
            ))}
        </Swiper>
        <SlideBtn>
          <button className='left_slider_prev'>
            <span>이전</span>
          </button>
          <span className='left_pagination'></span>
          <button className='left_slider_next'>
            <span>다음</span>
          </button>
        </SlideBtn>
      </LeftBox>

      <RightBox>
        <RecentContainer>
          <TitleBox>
            <span>최근 본</span>
            <button className='p_btn' onClick={() => setHideOpen(prev => !prev)}>
              <span>더보기</span>
            </button>
          </TitleBox>
          {data?.length > 0 ? (
            <>
              <Swiper
                slidesPerView={1}
                slidesPerColumn={3}
                spaceBetween={6}
                pagination={{
                  el: '.recent_pagination',
                  type: 'fraction',
                }}
                navigation={{
                  prevEl: '.recent_slider_prev',
                  nextEl: '.recent_slider_next',
                }}
              >
                {addedHoverData?.map((item, index) => (
                  <SwiperSlide key={item.ent_name} onMouseOver={() => onMouseOverItem(index)} onMouseLeave={() => onMouseLeaveItem(index)}>
                    <a href={item.url}>
                      {/* {item.sort === 'contents' || item.sort === 'event' ? (
                        <Image unoptimized src={urlReplace(item.bbs.thumbnail)} alt='thumbnail' width={78} height={78} />
                      ) : item.sort === 'product' ? (
                        <Image unoptimized src={`http://ifamily.co.kr${item.thumbanil}`} alt='thumbnail' width={78} height={78} />
                      ) : (
                        <Image unoptimized src={urlReplace(item.thumbnail)} alt='thumbnail' width={78} height={78} />
                      )} */}
                      {item.sort === 'contents' || item.sort === 'event' ? (
                        <Image unoptimized src={urlReplace(item.bbs.thumbnail)} alt='thumbnail' width={78} height={78} />
                      ) : (
                        <Image unoptimized src={urlReplace(item.thumbnail)} alt='thumbnail' width={78} height={78} />
                      )}
                    </a>
                    <HoverDelBtn onClick={onRemove(item.url)} className={`hover_del_btn ${item.itemHover ? 'on' : ''}`}>
                      <span>삭제</span>
                    </HoverDelBtn>
                  </SwiperSlide>
                ))}
              </Swiper>
              <HoverContentBox>
                <ul className='hover_content_list'>
                  {addedHoverData?.map((item, index) => {
                    const idx = index % 3;
                    return (
                      <li className={`hover_title_box ${item.itemHover ? 'on' : ''}`} key={item.url} style={{ top: `calc(84px * ${idx})` }}>
                        <div className='text_box'>
                          {item.sort === 'product' ? (
                            <>
                              <p className='content_title'>{item.product.name}</p>
                              <p className='price_box'>
                                {item.product.price_txt === '' ? (
                                  <span className='sale'>
                                    {Math.round(
                                      ((Number(item.product.product_price) - Number(item.product.price)) /
                                        Number(item.product.product_price)) *
                                        100,
                                    )}
                                    %
                                  </span>
                                ) : null}
                                &nbsp;{item.product.price_txt === '' ? showPrice(item.product.price) : item.product.price_txt}
                              </p>
                            </>
                          ) : item.sort === 'contents' ? (
                            <>
                              <p className='content_title'>{item.bbs.title}</p>
                            </>
                          ) : item.sort === 'event' ? (
                            <>
                              <p className='event_date'>
                                {item.bbs.startdate} ~ {item.bbs.enddate}
                              </p>
                              <p className='content_title'>{item.bbs.title}</p>
                            </>
                          ) : (
                            <>
                              <p className='content_title'>{item.category}</p>
                              <p className='content_title'>{item.ent_name}</p>
                            </>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </HoverContentBox>
            </>
          ) : (
            <div className='none_item_box'>
              <p>
                최근 본<br />
                콘텐츠가
                <br />
                없습니다.
              </p>
            </div>
          )}

          <SlideBtn>
            <button className='recent_slider_prev'>
              <span>이전</span>
            </button>
            <span className='recent_pagination'></span>
            <button className='recent_slider_next'>
              <span>다음</span>
            </button>
          </SlideBtn>
        </RecentContainer>

        {/* 2021-11-30 오른쪽 날개배너 버튼들 삭제 */}
        {/* <NavBox onClick={onPlanningTool}>
          <Image unoptimized src={calcIcon} alt='calc Icon' />
        </NavBox>
        <NavBox onClick={onQuoteReplace}>
          <Image unoptimized src={quoteIcon} alt='quote Icon' />
        </NavBox>
        <TopNav onClick={handleTop}>TOP</TopNav> */}
      </RightBox>
    </Container>
  );
};

export default FloatingMenu;
type StyledType = {
  hideOpen?: boolean;
  fixState?: boolean;
  isSearch?: boolean;
  isMain?: boolean;
};

const Container = styled.div<StyledType>`
  position: fixed;
  /* top: ${props => (props.fixState ? '120px' : props.isMain ? '610px' : props.isSearch ? '500px' : '190px')}; */
  top: ${props => {
    if (props.fixState) {
      return '120px';
    } else {
      if (props.isMain) {
        return '610px';
      } else if (props.isSearch) {
        return '475px';
      } else {
        return '217px';
      }
    }
  }};
  left: 50%;
  transform: translateX(-50%);
  ${props => props.theme.flexCenter};
  justify-content: flex-start;
  flex-direction: column;
  width: 1280px;
  height: 0;
  z-index: 999;
  button.hover_del_btn.on {
    display: block;
  }
`;

const LeftBox = styled.div`
  position: absolute;
  top: 0;
  left: -120px;
  width: 100px;
  height: 264px;
  border: 1px solid #f0f0f0;
  background-color: #fff;
  .swiper-container {
    position: relative;
    width: 100%;
    height: 221px;
    overflow: hidden;
  }
  .swiper-wrapper {
    display: flex;
  }
  .swiper-slide {
    cursor: pointer;
  }
`;

const RightBox = styled.div`
  position: absolute;
  top: 0;
  right: -120px;
  .none_item_box {
    position: relative;
    width: 100%;
    height: 252px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    > p {
      font-size: 13px;
      color: #8c8c8c;
      line-height: 1.4;
      letter-spacing: 0;
      vertical-align: middle;
    }
  }
`;

const TitleBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    font-size: 13px;
    font-weight: 400;
    color: #262626;
  }
  .p_btn {
    ${props => props.theme.resetBtnStyle};
    padding: 4px;
    border: 1px solid #f0f0f0;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    > span {
      width: 10px;
      height: 10px;
      background: url(${floatSpriteImg.src}) 0 0 no-repeat;
      text-indent: 100%;
      overflow: hidden;
      white-space: nowrap;
      display: inline-block;
      position: relative;
    }
  }
`;

const RecentContainer = styled.div`
  position: relative;
  border: 1px solid #f0f0f0;
  width: 100px;
  height: 340px;
  padding: 11px 10px;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  margin-bottom: 6px;
  > .swiper-container {
    position: relative;
    width: 100%;
    height: 252px;
    margin: 5px auto 10px auto;
    overflow: hidden;
  }
  .swiper-wrapper {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    height: 100%;
  }

  .swiper-slide {
    position: relative;
    display: inline-block;
    text-align: center;
    font-size: 18px;
    width: 78px;
    height: calc((100% - 22px) / 3);
    min-height: 78px;
    border: 1px solid #e1e1e1;
    cursor: pointer;
    a {
      display: flex;
      height: 100%;
      /* &:hover {
        .hover_title_box {
          display: block;
        }
      } */
      > img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }

    .hover_title {
      position: absolute;
      top: 0;
      left: -150px;
      width: 150px;
      height: 78px;
      background: #fff;
      border: 1px solid #f0f0f0;
    }
  }
`;
const HoverContentBox = styled.div`
  position: absolute;
  /* width: 100%; */
  top: 36px;
  right: 88px;
  /* height: 252px; */
  .hover_content_list {
    position: relative;
    > li {
      display: none;
      position: absolute;
      right: 0;
    }
    > li:not(:nth-of-type(3n)) {
      /* margin-bottom: 6px; */
    }
  }
  .hover_title_box {
    width: 178px;
    height: 78px;
    padding: 0 10px;
    background-color: #fff;
    border: 1px solid #e1e1e1;
    border-right: 0;
    .text_box {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 158px;
      word-break: break-all;
      overflow: hidden;
      .content_title {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        word-wrap: break-word;
        line-height: 1.3em;
        max-height: 2.6em;
        font-size: 14px;
        color: #262626;
        letter-spacing: 0;
      }
      .event_date {
        font-size: 11px;
        letter-spacing: 0;
        color: #fd4381;
        margin-bottom: 5px;
      }
      .price_box {
        font-weight: 700;
        font-size: 11px;
        letter-spacing: 0;
        margin-top: 5px;
        .sale {
          color: #fd4381;
          font-weight: 700;
        }
      }
    }
  }
  .hover_title_box.on {
    display: block;
  }
`;

const HoverDelBtn = styled.button`
  ${props => props.theme.resetBtnStyle};
  display: none;
  position: absolute;
  top: -1px;
  right: -1px;
  background-color: #fff;
  z-index: 10;
  font-size: 0;
  padding: 4px;
  border: 1px solid #f0f0f0;
  > span {
    background: url(${floatSpriteImg.src}) -106px 0 no-repeat;
    width: 10px;
    height: 10px;
    display: inline-block;
    overflow: hidden;
    text-indent: 100%;
    white-space: nowrap;
    position: relative;
  }
`;
const SlideBtn = styled.div`
  position: relative;
  width: 78px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  button {
    padding: 5px 7px;
    font-size: 0;
    border: 1px solid #f0f0f0;
    background-color: #fff;
    > span {
      background: url(${floatSpriteImg.src}) 0 0 no-repeat;
      width: 4px;
      height: 7px;
      text-indent: 100%;
      overflow: hidden;
      white-space: nowrap;
      display: inline-block;
      position: relative;
    }
  }
  .recent_slider_prev,
  .left_slider_prev {
    > span {
      background-position: -78px 0;
    }
  }
  .recent_slider_next,
  .left_slider_next {
    > span {
      background-position: -92px 0;
    }
  }
  .recent_pagination,
  .left_pagination {
    position: static;
    transition: initial;
    transform: initial;
    bottom: initial;
    left: initial;
    width: 38px;
    font-size: 13px;
    letter-spacing: 0;
    text-align: center;
    overflow: hidden;
    vertical-align: middle;
    color: #262626;
  }
`;

const HideContainer = styled.div<StyledType>`
  position: absolute;
  right: -120px;
  width: 350px;
  height: 480px;
  z-index: ${props => (props.hideOpen ? '999' : '-999')};
  opacity: ${props => (props.hideOpen ? '1' : '0')};
  display: ${props => (props.hideOpen ? 'block' : 'none')};
  transform: ${props => (props.hideOpen ? 'translateX(px)' : 'translateX(300px)')};
  border: 1px solid #f0f0f0;
  background-color: white;
  transition: all 0.3s;
  overflow-y: hidden;
`;

const HideTitleBox = styled.div`
  width: 100%;
  height: 57px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #f0f0f0;
  padding: 0 15px;
  .text_num {
    font-size: 13px;
    color: #262626;
    letter-spacing: -0.03em;
    font-weight: 400;
    > em {
      font-weight: 700;
    }
  }
  .close_btn {
    display: block;
    > button {
      display: inline-block;
      border: 1px solid #f0f0f0;
      background-color: #fff;
      font-size: 0;
      padding: 4px;
      > span {
        background: url(${floatSpriteImg.src}) -106px 0 no-repeat;
        width: 10px;
        height: 10px;
        display: inline-block;
        overflow: hidden;
        text-indent: 100%;
        white-space: nowrap;
        position: relative;
      }
    }
  }
`;

const SortBox = styled.div<{ sortVisible: boolean }>`
  width: 100%;
  height: 31px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #f0f0f0;
  background-color: #fff;
  z-index: 11;
  .sort_select_box {
    position: relative;
    width: 116px;
    .select_btn {
      width: 100%;
      background: url(${downTriangle.src}) #fff right 10px center no-repeat;
      border-right: 1px solid #f0f0f0;
      height: 30px;
      padding: 0 23px 0 10px;
      > span {
        color: #262626;
        font-size: 13px;
        text-align: left;
        display: block;
        overflow: hidden;
        position: relative;
      }
    }
    .select_list {
      position: absolute;
      display: ${props => (props.sortVisible ? 'block' : 'none')};
      top: 31px;
      left: 0;
      width: 100%;
      border: 1px solid #f0f0f0;
      border-top: 0;
      border-left: 0;
      z-index: 12;
      border-bottom: 0;
      > li {
        border-bottom: 1px solid #f0f0f0;
        > a {
          display: block;
          height: 100%;
          padding: 9px 11px;
          background-color: #fff;
          > span {
            font-size: 13px;
            color: #262626;
          }
        }
      }
    }
  }
  .all_del_btn {
    ${props => props.theme.resetBtnStyle};
    display: block;
    padding: 3px 10px 5px;
    > span {
      border-bottom: 1px solid #262626;
      color: #262626;
      font-size: 12px;
    }
  }
`;
const RecentListBox = styled.ul`
  width: 100%;
  height: 390px;
  padding: 10px 20px 10px 10px;
  overflow-y: scroll;
  position: relative;
  background-color: #fff;
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  li {
    ${props => props.theme.flexCenter};
    justify-content: space-between;
    margin-bottom: 10px;
    & > div {
      ${props => props.theme.flexCenter};
      img {
        width: 80px;
        height: 80px;
      }
      .content {
        margin-left: 10px;
        line-height: 1.5;
      }
    }
  }
`;

const RecentListItem = styled.li<{ zzimFlag?: boolean }>`
  width: 100%;
  height: 78px;
  overflow: hidden;
  display: flex;
  margin-bottom: 5px;
  .left_box {
    width: 265px;
    height: 100%;
    position: relative;
    background-color: powderblue;
    > a {
      display: flex;
      width: 100%;
      height: 100%;
      .thumbnail_box {
        width: 78px;
        height: 100%;
        border: 1px solid #e1e1e1;
        > img {
          width: 100%;
        }
      }
      .content_box {
        position: relative;
        width: calc(100% - 78px);
        height: 100%;
        background-color: #fff;
        padding: 0 13px;
        .text_box {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 161px;
          word-break: break-all;
          overflow: hidden;
          .content_title {
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            word-wrap: break-word;
            line-height: 1.3em;
            max-height: 2.6em;
            font-size: 14px;
            color: #262626;
            letter-spacing: 0;
          }
          .event_date {
            font-size: 11px;
            letter-spacing: 0;
            color: #fd4381;
            margin-bottom: 5px;
          }
          .price_box {
            font-weight: 700;
            font-size: 11px;
            letter-spacing: 0;
            margin-top: 5px;
            .sale {
              color: #fd4381;
              font-weight: 700;
            }
          }
        }
      }
    }
  }
  .btn_box {
    position: relative;
    width: calc(100% - 265px);
    display: flex;
    justify-content: space-between;
    align-items: center;
    > button {
      ${props => props.theme.resetBtnStyle};
    }
    .rf_like_btn {
      width: 23px;
      height: 20px;
      background: url(${likeIcon.src}) 0 0 / auto 20px no-repeat;
      background-position: ${props => (props.zzimFlag ? 'right 0' : 'left 0')};
      > span {
        width: 23px;
        height: 20px;
        display: inline-block;
        text-indent: 100%;
        white-space: nowrap;
        overflow: hidden;
      }
    }
    .rf_del_btn {
      width: 20px;
      height: 20px;
      display: inline-block;
      border: 1px solid #f0f0f0;
      background-color: #fff;
      font-size: 0;
      padding: 4px;
      > span {
        background: url(${floatSpriteImg.src}) -106px 0 no-repeat;
        width: 10px;
        height: 10px;
        display: inline-block;
        overflow: hidden;
        text-indent: 100%;
        white-space: nowrap;
        position: relative;
      }
    }
  }
`;

const ChatBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 6px 0;
  border: 1px solid #f0f0f0;
  width: 100px;
  height: 120px;
  cursor: pointer;
  background-color: #fff;
  .top_img {
    width: 100%;
    position: relative;
    height: 63px;
    text-align: center;
    padding-top: 14px;
    .rf_badge {
      position: absolute;
      top: 13px;
      left: 60px;
      width: 19px;
      height: 19px;
      background-color: #262626;
      border-radius: 50%;
      font-size: 12px;
      font-weight: 700;
      color: #fff;
      text-align: center;
      line-height: 19px;
      vertical-align: middle;
    }
  }
  .bottom_img {
    margin-top: 10px;
    width: 100%;
    text-align: center;
  }
`;
const NavBox = styled.div`
  ${props => props.theme.flexCenter};
  /* margin-top: 6px; */
  background-color: #020202;
  color: white;
  line-height: 1.5;
  width: 100px;
  height: 35px;
  cursor: pointer;
`;
const TopNav = styled.div`
  ${props => props.theme.flexCenter};
  margin-top: 6px;
  border: 1px solid#020202;
  font-weight: bold;
  font-size: 15px;
  line-height: 35px;
  vertical-align: middle;
  width: 100px;
  height: 35px;
  cursor: pointer;
  background-color: #fff;
`;

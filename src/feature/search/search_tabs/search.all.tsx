import { Desktop } from '@hooks/useDevice';
import { useSearchBannerData } from '@modules/search/searchAPI';
import IconRightArrow from '@styles/svgs/icon_right_arrow';
import theme from '@styles/theme';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import styled from 'styled-components';
import BannerSlide from '../components/BannerSlide';
import GridContainer from '../components/GridContainer';
interface SearchTabProps {
  data?: any;
  count?: { brand: number; event: number; product: number; content: number };
}

const SearchAll = ({ data, count }: SearchTabProps) => {
  const { data: bannerList } = useSearchBannerData('99');

  const isDeskTop = Desktop();
  const [sortVisible, setSortVisible] = useState(false);
  const router = useRouter();
  const onRePlace = (id: string) => () => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, tab: id, category: '전체', subCategory: '전체', tag: undefined, page: 1 },
    });
    global.window &&
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
  };
  return (
    <Container sortVisible={sortVisible}>
      {/****** 스토어 *****/}
      {data?.product?.length > 0 && (
        <>
          <SectionTitle>
            <h3>
              {'스토어'} <span>{count?.product}</span>
            </h3>
            {isDeskTop && (
              <div onClick={onRePlace('product')}>
                검색 결과 더 보기 <IconRightArrow />
              </div>
            )}
          </SectionTitle>
          <GridContainer noBanner contentType={'스토어'} list={data?.product ?? []} />
          {!isDeskTop && (
            <RePlaceBox isNotOnTop>
              <button onClick={onRePlace('product')}>스토어 검색 결과 더 보기 </button>
            </RePlaceBox>
          )}
          <BannerSlide data={bannerList?.top} />
        </>
      )}
      {/* <BannerBox data={bannerList[0]} /> */}

      {/****** 브랜드 *****/}
      {data?.brand?.length > 0 && (
        <>
          <SectionTitle isUnderBanner>
            <h3>
              {'브랜드'} <span>{count?.brand}</span>
            </h3>
            {isDeskTop && (
              <div onClick={onRePlace('brand')}>
                검색 결과 더 보기 <IconRightArrow />
              </div>
            )}
          </SectionTitle>
          <GridContainer noBanner contentType={'브랜드'} list={data?.brand ?? []} isAboveBanner />
          {!isDeskTop && (
            <RePlaceBox isNotOnTop={data?.product?.length < 1}>
              <button onClick={onRePlace('brand')}>브랜드 검색 결과 더 보기 </button>
            </RePlaceBox>
          )}
          {data?.product?.length < 1 && <BannerSlide data={bannerList?.top} isSmallList={data?.brand?.length < 2} />}
        </>
      )}

      {/****** 이벤트 *****/}
      {data?.event?.length > 0 && (
        <>
          <SectionTitle>
            <h3>
              {'이벤트'} <span>{count?.event}</span>
            </h3>
            {isDeskTop && (
              <div onClick={onRePlace('event')}>
                검색 결과 더 보기 <IconRightArrow />
              </div>
            )}
          </SectionTitle>
          <GridContainer noBanner contentType={'이벤트'} list={data?.event ?? []} />
          {!isDeskTop && (
            <RePlaceBox isNotOnTop={data?.product?.length < 1 && data?.brand?.length < 1}>
              <button onClick={onRePlace('event')}>이벤트 검색 결과 더 보기 </button>
            </RePlaceBox>
          )}
          {data?.product?.length < 1 && data?.brand?.length < 1 && (
            <BannerSlide data={bannerList?.top} isSmallList={data?.event?.length < 2} />
          )}
        </>
      )}

      {/****** 콘텐츠 *****/}
      {data?.content?.length > 0 && (
        <>
          <SectionTitle>
            <h3>
              {'콘텐츠'}
              <span>{count?.content}</span>
            </h3>{' '}
            {isDeskTop && (
              <div onClick={onRePlace('content')}>
                검색 결과 더 보기 <IconRightArrow />
              </div>
            )}
          </SectionTitle>
          <GridContainer noBanner contentType={'콘텐츠'} list={data?.content ?? []} />
          {!isDeskTop && (
            <RePlaceBox isNotOnTop={data?.product?.length < 1 && data?.brand?.length < 1 && data?.event?.length < 1}>
              <button onClick={onRePlace('content')}>콘텐츠 검색 결과 더 보기 </button>
            </RePlaceBox>
          )}
          {data?.product?.length < 1 && data?.brand?.length < 1 && data?.event?.length < 1 && (
            <BannerSlide data={bannerList?.top} isSmallList={data?.content?.length < 2} />
          )}
        </>
      )}
    </Container>
  );
};

export default React.memo(SearchAll);

const Container = styled.div<{ sortVisible: boolean }>`
  .search_sort_box {
    position: relative;
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 0 15px;
    margin-top: 30px;
    .sort_btn_box {
      display: inline-block;
      .sort_trigger {
        ${props => props.theme.resetBtnStyle};
        width: 120px;
        font-size: 15px;
        font-weight: 700;
        text-align: left;
        > svg {
          margin-left: 5px;
        }
      }
      .sort_menu {
        position: absolute;
        display: ${props => (props.sortVisible ? 'block' : 'none')};
        width: 120px;
        top: 30px;
        border: 1px solid #262626;
        background-color: #fff;
        z-index: 12;
        > ul {
          li {
            width: 100%;
            height: 42px;
            line-height: 42px;
            vertical-align: middle;
            font-size: 15px;
            padding-left: 13px;
            cursor: pointer;
            border-bottom: 1px solid #dfdfdf;
            &:active,
            &:hover {
              background-color: #f7f7f7;
            }
            &:last-child {
              border-bottom: none;
            }
          }
        }
      }
    }
  }
  .swiper-container {
    .swiper-wrapper {
      width: 100%;
      .swiper-slide {
        width: auto;
        button {
          border: 1px solid #dfdfdf;
          padding: 8px 12px;
          border-radius: 7px;
          color: #020202;
        }
        span {
          font-size: 14px;
          color: #020202;
        }
      }
    }
  }
`;

const SectionTitle = styled.section<{ isUnderBanner?: boolean }>`
  display: flex;
  align-items: flex-end;
  width: 100%;
  height: 60px;
  padding: 0 15px;
  margin-top: 0;
  margin-bottom: 20px;
  @media all and (min-width: ${theme.pc}px) {
    justify-content: space-between;
    align-items: center;
    padding: 0;
    height: auto;
    margin-top: ${props => (props.isUnderBanner ? '0' : '70px')};
  }
  &:first-child {
    @media all and (min-width: ${theme.pc}px) {
      margin-top: 0;
    }
  }
  h3 {
    font-size: 24px;
    font-weight: 500;
    line-height: 36px;
    @media all and (max-width: 1280px) {
      font-size: 16px;
      font-weight: 700;
      line-height: 24px;
    }
  }
  span {
    font-size: 24px;
    color: #4866e4;
    font-weight: 400;
    @media all and (max-width: 1280px) {
      font-size: 16px;
      font-weight: 700;
    }
  }
  div {
    ${theme.flexCenter};
    font-size: 15px;
    font-weight: 700;
    cursor: pointer;
    svg {
      margin-left: 8px;
    }
  }
`;

const RePlaceBox = styled.button<{ isUnderBanner?: boolean; isNotOnTop?: boolean }>`
  /* margin-top: 20px; */
  margin: ${props => (props.isUnderBanner ? '0 0 40px 0' : props.isNotOnTop ? '0 0 40px 0' : '0')};
  width: 100%;
  ${theme.flexCenter};
  height: 50px;
  button {
    width: calc(100% - 30px);
    padding: 15px;
    border: 1px solid grey;
    font-size: 15px;
    font-weight: 500;
    color: #262626;
  }
`;

import CardIconBox from '@components/CardIconBox';
import Card from '@components/core/containers/Card';
import BannerSlide from '@feature/search/components/BannerSlide';
import { Desktop } from '@hooks/useDevice';
import { useObserverScrollBbs } from '@hooks/useObserverScroll';
import { useIbrandplusBannerData } from '@modules/ibrandplus/ibrandplusAPI';
import theme from '@styles/theme';
import { calDay, showPrice } from '@utils/util';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';

interface Props {
  list: any[]; // temp
  contents_category?: string;
}

const GridContainer = ({ list, contents_category }: Props) => {
  const isDeskTop = Desktop();
  const pageEnd = useObserverScrollBbs(list, isDeskTop);

  const {
    query: { category },
  } = useRouter();
  const { data: bannerList } = useIbrandplusBannerData('2', category as string);
  return (
    <Container>
      {list?.map((li, index) => {
        const salePrice = parseInt(li?.product_price) - parseInt(li?.price);
        const discount = (salePrice / parseInt(li.product_price)) * 100;
        return (
          <>
            {index === 8 && <BannerSlide searchInner data={bannerList?.top} />}
            {index === 16 && <BannerSlide searchInner data={bannerList?.bottom} />}
            <Card
              key={li?.no}
              thumbnailURL={`${process.env.NEXT_PUBLIC_WEB_HOST}/center/iweddingb/product/500_${li?.thumb}`}
              title={li?.name}
              contentCategory={contents_category}
              category={li?.ent?.enterprise_name}
              trackingURL={`${process.env.NEXT_PUBLIC_WEB_HOST}/enterprise/prd/${li?.ent?.enterprise_code}/${li?.no}`}
              inZzim={li?.zzimCount?.length > 0 ? true : false}
              prdNo={li?.no}
              entCode={li?.enterprise_code !== '' ? li?.enterprise_code : li?.ent?.enterprise_code}
            >
              <>
                <div className='price_info_box'>
                  {li?.price_txt === '' ? (
                    li?.event_price != 0 ? (
                      <>
                        <span className='prev_price'>{showPrice(li?.product_price)}원</span>
                        <span className='sale_per'>
                          {Math.round(((Number(li?.product_price) - Number(li?.event_price)) / Number(li?.product_price)) * 100)}%
                        </span>
                        <span className='current_price'>{showPrice(li?.event_price)}원</span>
                      </>
                    ) : li?.product_price == 0 || li?.product_price === li?.price || li?.product_price < li?.price ? (
                      <>
                        <span className='current_price'>
                          {li?.price_txt === '' && li?.price !== 0 ? `${showPrice(li?.price)} 원` : li?.price_txt}
                        </span>
                      </>
                    ) : li?.price_txt === '' ? (
                      <>
                        <span className='prev_price'>{showPrice(li?.product_price)}원</span>
                        <span className='sale_per'>{Math.round(discount)}%</span>
                        <span className='current_price'>{showPrice(li?.price)}원</span>
                      </>
                    ) : (
                      <span className='current_price'>{li?.price_txt}</span>
                    )
                  ) : (
                    <span className='current_price'>{li?.price_txt}</span>
                  )}
                </div>
                <CardIconBox
                  icon={li?.icon}
                  isNew={new Date(li?.reg_date) >= calDay(-14).toDate()}
                  couponAvailable={li?.couponAvailable}
                  isBest={li?.ent?.bpchk == 1 && true}
                  saleCnt={li?.limited_sales_cnt !== 0 ? li?.limited_sales_cnt : null}
                />
              </>
            </Card>
          </>
        );
      })}
      <div ref={pageEnd} />
      {list?.length < 9 && <BannerSlide searchInner noData={list?.length < 1} data={bannerList?.top} />}
    </Container>
  );
};

export default GridContainer;

const Container = styled.div`
  display: grid;
  place-items: center;
  grid-template-columns: repeat(4, 1fr);
  width: 100%;
  grid-gap: 40px 30px;
  margin-bottom: 80px;
  @media (max-width: ${theme.pc + 1}px) {
    grid-template-columns: repeat(3, 1fr);
    padding: 0 15px;
  }

  @media (max-width: ${theme.tablet}px) {
    grid-template-columns: repeat(2, 1fr);
    padding: 0 15px;
    grid-gap: 40px 15px;
  }
  .price_info_box {
    margin-top: 10px;
    @media all and (max-width: 1280px) {
      margin-top: 7px;
    }
    .ent_name {
      display: block;
      font-size: 14px;
      line-height: 20px;
      color: #8c8c8c;

      margin-bottom: 5px;
      @media all and (max-width: 1280px) {
        font-size: 13px;
        line-height: 19px;
        margin-bottom: 2px;
      }
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
`;

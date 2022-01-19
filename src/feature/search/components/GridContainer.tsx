import CardIconBox from '@components/CardIconBox';
import Card from '@components/core/containers/Card';
import RemainingDays from '@feature/Ibrandplus/RemainingDays';
import { Desktop } from '@hooks/useDevice';
import { useObserverScrollSearch } from '@hooks/useObserverScroll';
import { QnACategory } from '@modules/mypage/QnA/QnAInterface';
import { useSearchBannerData } from '@modules/search/searchAPI';
import theme from '@styles/theme';
import { calDay, showPrice } from '@utils/util';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';
import BannerSlide from './BannerSlide';
interface Props {
  list: any[]; // temp
  contentType: '전체' | '브랜드' | '이벤트' | '스토어' | '콘텐츠';
  noBanner?: boolean;
  totalCount?: string | number;
  isAboveBanner?: boolean;
}
const getDayFromMS = (ms: number) => Math.ceil(ms / (1000 * 60 * 60 * 24));

const GridContainer = ({ list, contentType, noBanner = false, totalCount, isAboveBanner }: Props) => {
  const isDeskTop = Desktop();
  const pageEnd = useObserverScrollSearch(list, isDeskTop, totalCount);

  const {
    query: { category },
  } = useRouter();
  const tabCheck = () => {
    switch (contentType) {
      case '브랜드':
        return '1';
      case '스토어':
        return '2';
      case '이벤트':
        return '3';
      case '콘텐츠':
        return '4';
      default:
        return '0';
    }
  };
  const contentsCategory = () => {
    switch (contentType) {
      case '브랜드':
        return '1';
      case '스토어':
        return 'product';
      case '이벤트':
        return '3';
      case '콘텐츠':
        return '4';
      default:
        return '0';
    }
  };
  const { data: bannerList } = useSearchBannerData(tabCheck(), category as string);
  const RenderContent = data => {
    switch (contentType) {
      case '브랜드':
      case '콘텐츠':
      case '이벤트':
        if (contentType !== '이벤트') {
          return (
            <CardIconBox
              icon={data?.icon}
              couponAvailable={data?.couponAvailable}
              isNew={data?.isNew}
              isBest={
                contentType !== '콘텐츠'
                  ? data?.weddingHall
                    ? data?.weddingHall?.bpchk == '1' && true
                    : data?.enterprise?.bpchk == '1' && true
                  : false
              }
            />
          );
        }

        let remainingDays = -1;
        remainingDays = getDayFromMS(new Date(data?.enddate).getTime() - new Date().getTime());
        return (
          <div className='tagContainer'>
            {data?.always != 1 && (
              <Dates>
                {data?.startdate?.replace(/-/g, '.')} ~ {data?.enddate?.replace(/-/g, '.')}
              </Dates>
            )}

            {/* {remainingDays > 0 && remainingDays < 11 ? <RemainingDays days={remainingDays} /> : null} */}
            <CardIconBox
              icon={data?.icon}
              couponAvailable={data?.couponAvailable}
              isNew={data?.isNew}
              isBest={data?.weddingHall ? data?.weddingHall?.bpchk == '1' && true : data?.enterprise?.bpchk == '1' && true}
              remainDays={remainingDays > 0 && remainingDays < 11 && data?.always != 1 ? remainingDays : null}
            />
          </div>
        );
      case '스토어':
        const salePrice = parseInt(data?.product_price) - parseInt(data?.price);
        const discount = (salePrice / parseInt(data?.product_price)) * 100;
        return (
          <>
            {data.price_txt === '' ? (
              <div className='price_info_box'>
                {data.product_price == 0 || data.product_price === data.price || data?.product_price < data?.price ? (
                  <>
                    <span className='current_price'>
                      {data.price_txt === '' && data.price !== 0 ? `${showPrice(data.price)} 원` : data.price_txt}
                    </span>
                  </>
                ) : data.price_txt === '' ? (
                  <>
                    <span className='prev_price'>{showPrice(data.product_price)}</span>
                    <span className='sale_per'>{Math.round(discount)}%</span>
                    <span className='current_price'>{showPrice(data.price)} 원</span>
                  </>
                ) : (
                  <span className='current_price'>{data.price_txt}</span>
                )}
              </div>
            ) : (
              <span className='current_price'>{data.price_txt}</span>
            )}

            <CardIconBox
              icon={data?.icon}
              isNew={new Date(data?.reg_date) >= calDay(-14).toDate()}
              couponAvailable={data?.couponAvailable}
              isBest={data?.ent?.bpchk == '1' && true}
              saleCnt={data?.limited_sales_cnt !== 0 ? data?.limited_sales_cnt : null}
            />
          </>
        );
      default:
        return null;
    }
  };

  const typeProps = data => {
    switch (contentType) {
      case '브랜드':
        return {
          thumbnailURL: data?.thumbnail,
          title: data?.title,
          category: data?.weddingHall ? '웨딩홀' : data?.enterprise?.category,
          trackingURL: `${process.env.NEXT_PUBLIC_WEB_HOST}/enterprise/info/${data?.enterpriseCode}`,
          companyLogoURL: data?.weddingHall ? data?.weddingHall?.logo : `https://www.iwedding.co.kr/center/logo/${data?.enterprise?.logo}`,
          contentsCategory: QnACategory[1],
          inZzim: data?.zzimCount,
          entCode: data?.enterpriseCode !== '' ? data?.enterpriseCode : data?.enterprise?.enterprise_code,
          bbsNo: data?.no,
        };
      case '이벤트':
        return {
          thumbnailURL: data?.thumbnail,
          title: data?.title,
          noCategory: true,
          noButton: true,
          trackingURL:
            data?.directLink && data?.directLink !== ''
              ? data?.directLink
              : `${process.env.NEXT_PUBLIC_WEB_HOST}/brandplus/brandplus_view/${data?.no}`,
          contentsCategory: QnACategory[3],
          inZzim: data?.zzimCount,
          entCode: data?.enterpriseCode !== '' ? data?.enterpriseCode : data?.enterprise?.enterprise_code,
          bbsNo: data?.no,
          entName: data?.enterpriseName,
        };
      case '스토어':
        return {
          thumbnailURL: `${process.env.NEXT_PUBLIC_WEB_HOST}/center/iweddingb/product/500_${data?.thumb}`,
          title: data?.name,
          category: data?.ent?.enterprise_name,
          contentsCategory: QnACategory[2],
          trackingURL: `${process.env.NEXT_PUBLIC_WEB_HOST}/enterprise/prd/${data?.ent?.enterprise_code}/${data?.no}`,
          inZzim: data?.zzimCount?.length > 0 ? true : false,
          entCode: data?.enterprise_code !== '' ? data?.enterprise_code : data?.ent?.enterprise_code,
          prdNo: data?.no,
          bbsNo: data?.no,
        };

      case '콘텐츠':
        return {
          thumbnailURL: data?.thumbnail,
          title: data?.title,
          noCategory: true,
          trackingURL:
            data?.directLink && data?.directLink !== ''
              ? data?.directLink
              : `${process.env.NEXT_PUBLIC_WEB_HOST}/brandplus/brandplus_view/${data?.no}`,
          noButton: true,
          contentsCategory: QnACategory[4],
          inZzim: data?.zzimCount,
          entCode: data?.enterpriseCode !== '' ? data?.enterpriseCode : data?.enterprise?.enterprise_code,
          bbsNo: data?.no,
          entName: data?.enterpriseName,
        };
      default:
        return null;
    }
  };
  // BannerSlide
  return (
    <Container noBanner={noBanner} isAboveBanner={isAboveBanner} isSmallList={list.length < 2}>
      {list?.map((li, index) => {
        return (
          <>
            {!noBanner && index === 8 && <BannerSlide searchInner data={bannerList?.top} />}
            {!noBanner && index === 16 && <BannerSlide searchInner data={bannerList?.bottom} />}
            <Card isSearch contentCategory={contentsCategory()} key={`${li.no}_${index}`} {...typeProps(li)}>
              {RenderContent(li)}
            </Card>
          </>
        );
      })}
      <div ref={pageEnd} />
      {!noBanner && list?.length < 9 && <BannerSlide noData={list?.length < 1} searchInner data={bannerList?.top} />}
    </Container>
  );
};

export default React.memo(GridContainer);

const Container = styled.div<{ noBanner?: boolean; isAboveBanner?: boolean; isSmallList: boolean }>`
  display: grid;
  place-items: center;
  grid-template-columns: repeat(4, 1fr);
  width: 100%;
  grid-gap: 40px 30px;
  margin-bottom: ${props => (props.isAboveBanner ? '30px' : 0)};
  @media (max-width: ${theme.pc + 1}px) {
    grid-template-columns: repeat(3, 1fr);
    padding: 0 15px;
    margin-bottom: ${props => (props.isSmallList ? '40px' : 0)};
  }
  @media (max-width: ${theme.tablet}px) {
    grid-template-columns: repeat(2, 1fr);
    padding: 0 15px;
    grid-gap: 40px 15px;
    margin-bottom: ${props => (props.isSmallList ? '40px' : 0)};
  }
  .price_info_box {
    margin-top: 10px;
    @media all and (max-width: 1280px) {
      margin-top: 5px;
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
  .tagContainer {
    width: 100%;
    height: auto;
    margin-top: 10px;
  }
`;
const Dates = styled.p`
  font-size: 14px;
  color: ${theme.pink};
  margin-bottom: 12px;
`;

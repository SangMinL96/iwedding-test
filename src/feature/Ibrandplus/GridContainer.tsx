import CardIconBox from '@components/CardIconBox';
import Card from '@components/core/containers/Card';
import BannerSlide from '@feature/search/components/BannerSlide';
import { Desktop } from '@hooks/useDevice';
import { useObserverScrollBbs } from '@hooks/useObserverScroll';
import { useIbrandplusBannerData } from '@modules/ibrandplus/ibrandplusAPI';
import theme from '@styles/theme';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';
import RemainingDays from './RemainingDays';

interface Props {
  list: any[];
  noLogo?: boolean;
  event?: boolean;
  category?: string;
  noCategory?: boolean;
  contents_category: string;
}
const getDayFromMS = (ms: number) => Math.ceil(ms / (1000 * 60 * 60 * 24));
const GridContainer = ({ list, category = '', noLogo = false, event = false, noCategory = false, contents_category }: Props) => {
  const isDeskTop = Desktop();
  const {
    query: { category: queryCategory },
  } = useRouter();
  const { data: bannerList } = useIbrandplusBannerData(contents_category, queryCategory as string);
  const pageEnd = useObserverScrollBbs(list, isDeskTop);

  const trackingReplace = (data: any) => {
    if (contents_category === '1') {
      return `${process.env.NEXT_PUBLIC_WEB_HOST}/enterprise/info/${data?.enterpriseCode}`;
    }
    if (contents_category === '3' || contents_category === '4') {
      if (data?.directLink && data?.directLink !== '') {
        return data?.directLink;
      } else {
        return `${process.env.NEXT_PUBLIC_WEB_HOST}/brandplus/brandplus_view/${data?.no}`;
      }
    }
  };

  return (
    <>
      <Container>
        {list?.map((li, index) => {
          let remainingDays = -1;
          if (event) {
            remainingDays = getDayFromMS(new Date(li?.enddate).getTime() - new Date().getTime());
          }
          return (
            <>
              {index === 8 && <BannerSlide searchInner data={bannerList?.top} />}
              {index === 16 && <BannerSlide searchInner data={bannerList?.bottom} />}
              <Card
                key={`${li.no}_${index}`}
                contentCategory={contents_category}
                thumbnailURL={li.thumbnail}
                companyLogoURL={
                  li?.weddingHall ? li?.weddingHall?.logo : `${process.env.NEXT_PUBLIC_WEB_HOST}/center/logo/${li?.enterprise?.logo}`
                }
                category={category === '전체' ? (li?.weddingHall ? '웨딩홀' : li?.enterprise?.category || '아이웨딩') : category}
                title={li.title}
                couponAvailable={li.couponAvailable}
                noCategory={noCategory}
                trackingURL={trackingReplace(li)}
                inZzim={li?.zzimCount}
                entCode={li?.enterpriseCode !== '' ? li?.enterpriseCode : li?.enterprise?.enterprise_code}
                entName={li?.enterpriseName}
                bbsNo={li?.no}
              >
                {event && li?.always != 1 ? (
                  <Dates>
                    {li?.startdate.replace(/-/g, '.')}~{li?.enddate.replace(/-/g, '.')}
                  </Dates>
                ) : null}
                {/* {event && remainingDays > 0 && remainingDays < 11 && <RemainingDays days={remainingDays} />} */}
                <CardIconBox
                  icon={li.icon}
                  isNew={li.isNew}
                  couponAvailable={li?.couponAvailable}
                  isBest={
                    contents_category !== '4'
                      ? li.weddingHall
                        ? li.weddingHall?.bpchk == '1' && true
                        : li.enterprise?.bpchk == '1' && true
                      : false
                  }
                  remainDays={remainingDays > 0 && remainingDays < 11 && li?.always != 1 ? remainingDays : null}
                />
                {/* {li?.limited_sales ? (
                <div className='remaining_num'>
                  <span>잔여 수량 {li?.limited_sales_cnt}개</span>
                </div>
              ) : null} */}
              </Card>
            </>
          );
        })}
        <div ref={pageEnd} />
        {list?.length < 9 && <BannerSlide searchInner noData={list?.length < 1} data={bannerList?.top} />}
      </Container>
    </>
  );
};

export default React.memo(GridContainer);

const Container = styled.div`
  display: grid;
  place-items: center;
  grid-template-columns: repeat(4, 1fr);
  width: 100%;
  grid-gap: 50px 30px;
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
`;

const Dates = styled.p`
  font-size: 12px;
  color: ${theme.pink};
  margin-top: 4px;
`;

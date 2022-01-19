import React from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';
import 'swiper/components/pagination/pagination.min.css';
import VerticalItem from '../components/VerticalItem';
import theme from '@styles/theme';
import { useMdRecommendData } from '@modules/search/searchAPI';

SwiperCore.use([Navigation]);

const MDRecommendProduct = () => {
  const { data } = useMdRecommendData();
  return (
    <Box>
      <TitleBox>
        <h3>웨딩 MD 추천 패키지</h3>
      </TitleBox>
      <Swiper spaceBetween={10} pagination={false}>
        {data?.map((item, index) => (
          <SwiperSlide key={`${item.no}_${index}`}>
            <VerticalItem data={item} index={index} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default MDRecommendProduct;
const Box = styled.div`
  -webkit-tap-highlight-color: transparent;
  position: relative;
  width: 1280px;
  min-width: 1280px;
  /* height: 460px; */
  padding: 0 15px;
  overflow: hidden;
  margin-bottom: 30px;
  .swiper-container {
    overflow: visible;
    width: 130px;
    display: flex;
    flex-wrap: wrap;
    margin-left: 0;
    .swiper-wrapper {
      img {
        width: 130px;
      }
    }
  }
  @media all and (max-width: ${theme.pc}px) {
    width: 100%;
    min-width: 100%;
  }
`;
const TitleBox = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  width: 100%;
  height: 62px;
  @media all and (max-width: ${theme.pc}px) {
    width: 100%;
    min-width: 100%;
    margin-bottom: 20px;
    > h3 {
      font-size: 18px;
      font-weight: bold;
      color: #262626;
    }
    > span {
      color: #8c8c8c;
      font-size: 13px;
    }
  }
`;

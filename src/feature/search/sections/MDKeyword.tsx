import { searchKeywordLog } from '@modules/log/search/searchLogger';
import { keyWordCount, onMdKeywordCount, useMdKeywordData } from '@modules/search/searchAPI';
import { MdKeywordItf } from '@modules/search/searchInterface';
import theme from '@styles/theme';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
type PropsType = {
  type: 'index' | 'result';
};
const MDKeyword = ({ type }: PropsType) => {
  const router = useRouter();
  const { data } = useMdKeywordData();
  const onMdKeywordClick = (item: MdKeywordItf) => async () => {
    await searchKeywordLog(item.search_word);
    await keyWordCount(item.search_word);
    onMdKeywordCount(item.no);
    router.push(`/search/result?keyword=${encodeURIComponent(item.search_word)}&tab=all`);
  };
  return (
    <Box>
      <TitleBox>
        <h3>웨딩 MD 추천 검색어</h3>
      </TitleBox>
      <Swiper slidesPerView={'auto'} spaceBetween={6}>
        {data?.map((item, index) => {
          return (
            <SwiperSlide key={`${item.no}_${index}`}>
              <button onClick={onMdKeywordClick(item)}># {item.search_word}</button>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Box>
  );
};

export default MDKeyword;

const Box = styled.div`
  width: 100%;
  padding: 0 15px;
  margin-bottom: 10px;
  > p {
    font-size: 32px;
    font-weight: 700;
    margin: 30px 0;
  }
  .swiper-container {
    width: 100%;
    margin-top: 20px;
    overflow: visible;
    .swiper-wrapper {
      width: 100%;
      .swiper-slide {
        width: auto;
        height: 36px;
      }
    }
  }
  button {
    height: 36px;
    border: 1px solid rgba(0, 77, 220, 0.3);
    padding: 8px 12px;
    border-radius: 7px;
    font-weight: bold;
    font-size: 14px;
    color: #004ddc;
    padding: 8px 12px 9px;
  }

  span {
    font-size: 14px;
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

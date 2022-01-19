import { useBbsPageState } from '@feature/Ibrandplus/hooks/useBbsPageState';
import CategoryPC from '@feature/Ibrandplus/pcUI/CategoryPC';
import { Desktop } from '@hooks/useDevice';
import { CategoryProps } from '@modules/sharedData';
import theme from '@styles/theme';
import { allCategory } from '@utils/util';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import shallow from 'zustand/shallow';
interface Props {
  selected: string;
  categoryList: CategoryProps[];
  setSearchText?: any;
  categoryKey?: string;
}
const CategorySwiper = ({ selected, categoryList, setSearchText, categoryKey }: Props) => {
  const {
    query: { category: queryCategory },
  } = useRouter();
  const [swiper, setSwiper] = useState(null);
  useEffect(() => {
    if (swiper) {
      if (categoryKey === 'event' || categoryKey === 'contents') {
        const index = categoryList?.findIndex(item => item.category === (queryCategory as string));
        swiper?.slideTo(index);
      } else {
        swiper?.slideTo(categoryList?.findIndex(item => item.category === (queryCategory as string)));
      }
    }
  }, [swiper, categoryList, queryCategory]);
  return (
    <SwiperContainer>
      {categoryKey === 'event' || categoryKey === 'contents' ? (
        <Swiper slidesPerView={'auto'} onSwiper={setSwiper} spaceBetween={0}>
          {categoryList &&
            [allCategory(categoryKey), ...categoryList]?.map((item: any, index) => (
              <SwiperSlide key={`${item.category}_${index}`}>
                <Slide setSearchText={setSearchText} category={item} active={selected === item.category} />
              </SwiperSlide>
            ))}
        </Swiper>
      ) : (
        <Swiper slidesPerView={'auto'} onSwiper={setSwiper} spaceBetween={0}>
          {categoryList?.map((item: CategoryProps, index) => (
            <SwiperSlide key={`${item.category}_${index}`}>
              <Slide setSearchText={setSearchText} category={item} active={selected === item.category} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </SwiperContainer>
  );
};

export default React.memo(CategorySwiper);

const Slide = ({ category, setSearchText, active = false }: SlideProps) => {
  const router = useRouter();
  const setSelectedCategory = useBbsPageState(state => state.setSelectedCategory);
  const setResetInfinityPage = useBbsPageState(state => state.setResetInfinityPage);
  const onSelectCategory = useCallback(async () => {
    setResetInfinityPage();
    if (category.category === '청첩장' && router.asPath.includes('product'))
      return router.replace('https://www.iwedding.co.kr/main/page/753');
    router.push(
      {
        pathname: router.pathname,
        query: { ...router.query, category: category.category, subCategory: '전체', tag: undefined, keyword: undefined },
      },
      undefined,
      { scroll: false },
    );

    setSelectedCategory(category);
    setSearchText('');
  }, [category, setSelectedCategory, router, setResetInfinityPage, setSearchText]);

  return (
    <SlideContainer active={active} onClick={onSelectCategory}>
      <ImgWrapper active={active}>
        {category.thumbnailURL && <Image src={category.thumbnailURL} width={62} height={62} objectFit='cover' alt='categoryImage' />}
      </ImgWrapper>
      <div>
        {category.displayName.split('/').map((n, i) => {
          if (i === 1)
            return (
              <span key={`${n}_${i}`}>
                <br />
                <span>{n}</span>
              </span>
            );
          return <span key={`${n}_${i}`}>{n}</span>;
        })}
      </div>
    </SlideContainer>
  );
};

const SwiperContainer = styled.div`
  /* max-width: 1280px; */
  -webkit-tap-highlight-color: transparent;
  background: ${theme.lightGray};
  width: 100%;
  height: 138px;
  cursor: pointer;
  margin: auto;
  overflow-x: hidden;
  .swiper-container {
    width: 100%;
    padding: 0 15px;
    .swiper-wrapper {
      height: 138px;
      .swiper-slide {
        ${props => props.theme.flexCenter};
        align-items: flex-start;
        margin-top: 22px;
        width: 80px;
      }
    }
  }
`;

const ImgWrapper = styled.div<{ active: boolean }>`
  position: relative;
  display: grid;
  place-items: center;
  width: 62px;
  height: 62px;
  border-radius: 20px;
  overflow: hidden;
`;
const SlideContainer = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  div:nth-last-child(1) {
    margin-top: 8px;
  }
  > div {
    text-align: center;
    line-height: 15px;

    > span {
      font-size: 13px;
      font-weight: ${({ active }) => (active ? 700 : 400)};
      color: ${({ active }) => (active ? theme.black : 'rgba(38, 38, 38, 0.5)')};
    }
  }
`;

interface SlideProps {
  category: CategoryProps;
  active?: boolean;
  setSearchText?: any;
}

import TmpPageHeader from '@feature/main/type_common/tmp.page.header';
import { Desktop } from '@hooks/useDevice';
import moMainBg from '@images/honeymoon/mo_main_bg.jpg';
import pcMainBg from '@images/honeymoon/pc_main_bg.jpg';
import { honeymoonLogAPI } from '@modules/log/honeymoon/honeymoonLogger';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import CountrySection from './CountrySection';
import HoneymoonPageSEO from './HoneymoonPageSEO';
import KeywordTab from './KeywordTab';
import TabSection from './TabSection';
import TasteBattleTab from './TasteBattleTab';
import TourSpotTab from './TourSpotTab';
import VacationTab from './VacationTab';

const HoneymoonIndex = () => {
  const desktop = Desktop();

  const keywordRef = useRef<HTMLDivElement>(null);
  const tasteRef = useRef<HTMLDivElement>(null);
  const vacationRef = useRef<HTMLDivElement>(null);
  const tourRef = useRef<HTMLDivElement>(null);

  const [keywrodTop, setKeywordTop] = useState(0);
  const [tasteTop, setTasteTop] = useState(0);
  const [vacationTop, setVacationTop] = useState(0);
  const [tourTop, setTourTop] = useState(0);

  useEffect(() => {
    setKeywordTop(keywordRef.current.offsetTop);
    setTasteTop(tasteRef.current.offsetTop);
    setVacationTop(vacationRef.current.offsetTop);
    setTourTop(tourRef.current.offsetTop);
    if (process.env.NODE_ENV !== 'development') {
      honeymoonLogAPI('신혼여행');
    }
  }, []);

  return (
    <Container>
      <TmpPageHeader tmpTitle={`아이웨딩 > 인기 신혼여행지 휴양, 관광별 허니문 추천`} />
      <HoneymoonPageSEO />

      <MainBackground>
        <Image unoptimized src={desktop ? pcMainBg : moMainBg} layout={desktop ? 'fill' : 'responsive'} objectFit='cover' alt='honeymoon' />
      </MainBackground>

      <CountrySection />

      <TabSection bgColor='#00A0F3' activeNum={0} keywordTop={keywrodTop} tasteTop={tasteTop} vacationTop={vacationTop} tourTop={tourTop} />
      <KeywordTab ref={keywordRef} />

      <TabSection bgColor='#200F5C' activeNum={1} keywordTop={keywrodTop} tasteTop={tasteTop} vacationTop={vacationTop} tourTop={tourTop} />
      <TasteBattleTab ref={tasteRef} />

      <TabSection bgColor='#25C7DD' activeNum={2} keywordTop={keywrodTop} tasteTop={tasteTop} vacationTop={vacationTop} tourTop={tourTop} />
      <VacationTab ref={vacationRef} />

      <TabSection bgColor='#535FF5' activeNum={3} keywordTop={keywrodTop} tasteTop={tasteTop} vacationTop={vacationTop} tourTop={tourTop} />
      <TourSpotTab ref={tourRef} />
    </Container>
  );
};

export default HoneymoonIndex;

const Container = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
`;

const MainBackground = styled.div`
  position: relative;
  width: 100%;
  max-width: 1920px;
  height: 1210px;
  margin: 0 auto;
  > span {
    height: 100% !important;
  }
  @media all and (max-width: 1280px) {
    max-width: unset;
    height: auto;
  }
`;

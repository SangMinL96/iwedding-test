import React, { forwardRef, useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { Desktop } from '@hooks/useDevice';
import Bg from '@images/honeymoon/keyword/keyword_bg.jpg';
import mobileBg from '@images/honeymoon/keyword/m_keyword_bg.jpg';
import keywordBg01 from '@images/honeymoon/keyword/keyword01.jpg';
import keywordBg02 from '@images/honeymoon/keyword/keyword02.jpg';
import keywordBg03 from '@images/honeymoon/keyword/keyword03.jpg';
import keywordBg04 from '@images/honeymoon/keyword/keyword04.jpg';
import keywordBg05 from '@images/honeymoon/keyword/keyword05.jpg';
import keywordBg06 from '@images/honeymoon/keyword/keyword06.jpg';
import keywordBg07 from '@images/honeymoon/keyword/keyword07.jpg';
import moKeywordBg01 from '@images/honeymoon/keyword/m_keyword01.jpg';
import moKeywordBg02 from '@images/honeymoon/keyword/m_keyword02.jpg';
import moKeywordBg03 from '@images/honeymoon/keyword/m_keyword03.jpg';
import moKeywordBg04 from '@images/honeymoon/keyword/m_keyword04.jpg';
import moKeywordBg05 from '@images/honeymoon/keyword/m_keyword05.jpg';
import moKeywordBg06 from '@images/honeymoon/keyword/m_keyword06.jpg';
import moKeywordBg07 from '@images/honeymoon/keyword/m_keyword07.jpg';
import spotBg0101 from '@images/honeymoon/keyword/01/0101.jpg';
import spotBg0102 from '@images/honeymoon/keyword/01/0102.jpg';
import spotBg0103 from '@images/honeymoon/keyword/01/0103.jpg';
import spotBg0104 from '@images/honeymoon/keyword/01/0104.jpg';
import spotBg0201 from '@images/honeymoon/keyword/02/0201.jpg';
import spotBg0202 from '@images/honeymoon/keyword/02/0202.jpg';
import spotBg0203 from '@images/honeymoon/keyword/02/0203.jpg';
import spotBg0204 from '@images/honeymoon/keyword/02/0204.jpg';
import spotBg0301 from '@images/honeymoon/keyword/03/0301.jpg';
import spotBg0302 from '@images/honeymoon/keyword/03/0302.jpg';
import spotBg0303 from '@images/honeymoon/keyword/03/0303.jpg';
import spotBg0304 from '@images/honeymoon/keyword/03/0304.jpg';
import spotBg0401 from '@images/honeymoon/keyword/04/0401.jpg';
import spotBg0402 from '@images/honeymoon/keyword/04/0402.jpg';
import spotBg0403 from '@images/honeymoon/keyword/04/0403.jpg';
import spotBg0404 from '@images/honeymoon/keyword/04/0404.jpg';
import spotBg0501 from '@images/honeymoon/keyword/05/0501.jpg';
import spotBg0502 from '@images/honeymoon/keyword/05/0502.jpg';
import spotBg0503 from '@images/honeymoon/keyword/05/0503.jpg';
import spotBg0504 from '@images/honeymoon/keyword/05/0504.jpg';
import spotBg0601 from '@images/honeymoon/keyword/06/0601.jpg';
import spotBg0602 from '@images/honeymoon/keyword/06/0602.jpg';
import spotBg0603 from '@images/honeymoon/keyword/06/0603.jpg';
import spotBg0604 from '@images/honeymoon/keyword/06/0604.jpg';
import spotBg0701 from '@images/honeymoon/keyword/07/0701.jpg';
import spotBg0702 from '@images/honeymoon/keyword/07/0702.jpg';
import spotBg0703 from '@images/honeymoon/keyword/07/0703.jpg';
import spotBg0704 from '@images/honeymoon/keyword/07/0704.jpg';
import { openNewTab } from '@utils/util';

const KeywordTab = (props, ref) => {
  const desktop = Desktop();

  const [activeIndex, setActiveIndex] = useState(0);
  const hashtagArr = [
    {
      tag: '#에메랄드_빛_바다',
      tagSubTitle: '에메랄드 빛 바다',
      bgSrc: keywordBg01,
      moBgSrc: moKeywordBg01,
      spots: [
        {
          spotLink: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42560',
          spotName: '하와이',
          spotBg: spotBg0101,
          icon: 'BEST',
          spotTags: ['와이키키비치', '와이메아베이비치'],
        },
        {
          spotLink: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42633',
          spotName: '몰디브',
          spotBg: spotBg0102,
          icon: 'EVENT',
          spotTags: ['알리마타', '훌후말레비치'],
        },
        {
          spotLink: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42631',
          spotName: '괌',
          spotBg: spotBg0103,
          icon: '',
          spotTags: ['사랑의절벽', '이파오해변'],
        },
        {
          spotLink: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42638',
          spotName: '칸쿤',
          spotBg: spotBg0104,
          icon: '',
          spotTags: ['플라야델피네스', '플라야엑셀'],
        },
      ],
    },
    {
      tag: '#영화씬스팟',
      tagSubTitle: '영화씬 스팟',
      bgSrc: keywordBg02,
      moBgSrc: moKeywordBg02,
      spots: [
        {
          spotLink: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42565',
          spotName: '로스앤젤레스',
          spotBg: spotBg0201,
          icon: '',
          spotTags: ['라라랜드', '500일의 썸머'],
        },
        {
          spotLink: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42566',
          spotName: '영국',
          spotBg: spotBg0202,
          icon: '',
          spotTags: ['어바웃타임', '러브액츄얼리'],
        },
        {
          spotLink: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42611',
          spotName: '크로아티아',
          spotBg: spotBg0203,
          icon: '',
          spotTags: ['맘마미아', '스타워즈'],
        },
        {
          spotLink: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42637',
          spotName: '이탈리아',
          spotBg: spotBg0204,
          icon: 'BEST',
          spotTags: ['로미오와줄리엣', '냉정과열정사이'],
        },
      ],
    },
    {
      tag: '#야경맛집',
      tagSubTitle: '야경 맛집',
      bgSrc: keywordBg03,
      moBgSrc: moKeywordBg03,
      spots: [
        {
          spotLink: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42619',
          spotName: '체코',
          spotBg: spotBg0301,
          icon: 'BEST',
          spotTags: ['프라하', '유럽3대야경'],
        },
        {
          spotLink: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42639',
          spotName: '프랑스',
          spotBg: spotBg0302,
          icon: 'BEST',
          spotTags: ['에펠탑', '개선문'],
        },
        {
          spotLink: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42623',
          spotName: '포르투갈',
          spotBg: spotBg0303,
          icon: '',
          spotTags: ['가든바이더베이', '동루이스다리'],
        },
        {
          spotLink: 'http://www.iwedding.co.kr/brandplus/brandplus_view/42632',
          spotName: '두바이',
          spotBg: spotBg0304,
          icon: 'BEST',
          spotTags: ['부르즈칼리파', '분수쇼'],
        },
      ],
    },
    {
      tag: '#지름신강림_쇼핑천국',
      tagSubTitle: '지름신강림, 쇼핑천국',
      bgSrc: keywordBg04,
      moBgSrc: moKeywordBg04,
      spots: [
        {
          spotLink: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42628',
          spotName: '싱가포르',
          spotBg: spotBg0401,
          icon: '',
          spotTags: ['오차드로드', '마리나베이샌즈'],
        },
        {
          spotLink: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42613',
          spotName: '라스베이거스',
          spotBg: spotBg0402,
          icon: '',
          spotTags: ['크랑카날숍스', '다운타운'],
        },
        {
          spotLink: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42565',
          spotName: '로스앤젤레스',
          spotBg: spotBg0403,
          icon: '',
          spotTags: ['파머스마켓', '버벌리힐즈'],
        },
        {
          spotLink: 'http://www.iwedding.co.kr/brandplus/brandplus_view/42632',
          spotName: '두바이',
          spotBg: spotBg0404,
          icon: 'BEST',
          spotTags: ['두바이몰', '몰오브에미레이트'],
        },
      ],
    },
    {
      tag: '#액티비티',
      tagSubTitle: '액티비티',
      bgSrc: keywordBg05,
      moBgSrc: moKeywordBg05,
      spots: [
        {
          spotLink: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42560',
          spotName: '하와이',
          spotBg: spotBg0501,
          icon: 'BEST',
          spotTags: ['글라이더비행', '스노쿨링'],
        },
        {
          spotLink: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42610',
          spotName: '푸켓',
          spotBg: spotBg0502,
          icon: '',
          spotTags: ['스피드보트', '다이빙'],
        },
        {
          spotLink: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42635',
          spotName: '스위스',
          spotBg: spotBg0503,
          icon: 'BEST',
          spotTags: ['스카이다이빙', '패러글라이딩'],
        },
        {
          spotLink: 'http://www.iwedding.co.kr/brandplus/brandplus_view/42632',
          spotName: '두바이',
          spotBg: spotBg0504,
          icon: 'BEST',
          spotTags: ['사막드라이빙', '벌룬어드벤처'],
        },
      ],
    },
    {
      tag: '#CG와_자연은_한끗차이',
      tagSubTitle: 'CG와 자연은 한끗차이',
      bgSrc: keywordBg06,
      moBgSrc: moKeywordBg06,
      spots: [
        {
          spotLink: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42635',
          spotName: '스위스',
          spotBg: spotBg0601,
          icon: 'BEST',
          spotTags: ['융프라우철도', '만년설'],
        },
        {
          spotLink: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42621',
          spotName: '스웨덴',
          spotBg: spotBg0602,
          icon: '',
          spotTags: ['스톡홀름', '북쪽의베네치아'],
        },
        {
          spotLink: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42616',
          spotName: '오스트리아',
          spotBg: spotBg0603,
          icon: '',
          spotTags: ['할슈타트', '호수마을'],
        },
        {
          spotLink: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42611',
          spotName: '크로아티아',
          spotBg: spotBg0604,
          icon: '',
          spotTags: ['흐바르섬', '영화아바타'],
        },
      ],
    },
    {
      tag: '#인생썬셋',
      tagSubTitle: '인생썬셋',
      bgSrc: keywordBg07,
      moBgSrc: moKeywordBg07,
      spots: [
        {
          spotLink: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42617',
          spotName: '그리스',
          spotBg: spotBg0701,
          icon: 'BEST',
          spotTags: ['산토리니', '3대석양'],
        },
        {
          spotLink: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42623',
          spotName: '포르투갈',
          spotBg: spotBg0702,
          icon: '',
          spotTags: ['음악의도시', '인생노을'],
        },
        {
          spotLink: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42634',
          spotName: '사이판',
          spotBg: spotBg0703,
          icon: '',
          spotTags: ['별빛투어', '선셋크루즈'],
        },
        {
          spotLink: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42639',
          spotName: '프랑스',
          spotBg: spotBg0704,
          icon: 'BEST',
          spotTags: ['에펠탑', '개선문'],
        },
      ],
    },
  ];

  const handleTag = index => {
    setActiveIndex(index);
  };

  return (
    <Container ref={ref}>
      <BackgroundBox>
        <Image
          unoptimized
          src={desktop ? Bg : mobileBg}
          layout={desktop ? 'fill' : 'responsive'}
          width={desktop ? 1920 : 1020}
          height={desktop ? 1654 : 2447}
          alt='bg'
        />
      </BackgroundBox>
      <ContentBox>
        <TabTitle>
          <div className='tab_num'>01</div>
          <div className='tab_title_text'>
            <span>신행지 고민될땐</span>
            <p>추천 키워드</p>
          </div>
        </TabTitle>
        <TagBox>
          {hashtagArr.map((item, index) => (
            <Hashtag isActive={activeIndex === index} onClick={() => handleTag(index)} key={item.tag + '_' + index}>
              {item.tag}
            </Hashtag>
          ))}
        </TagBox>
        <TagContentBox>
          <div className='tag_bg'>
            <div className='bg_filter'></div>
            <Image
              src={desktop ? hashtagArr[activeIndex].bgSrc : hashtagArr[activeIndex].moBgSrc}
              layout='fill'
              width={desktop ? 1280 : 900}
              height={desktop ? 800 : 1452}
              alt='bg'
            />
          </div>
          <div className='tag_content_wrapper'>
            <div className='tag_content_title'>
              <span>{hashtagArr[activeIndex].tagSubTitle}</span>
              <p>여기는 어떤가요?</p>
            </div>
            <div className='tag_content_list'>
              {hashtagArr[activeIndex].spots.map((info, index) => (
                <TagContentCard key={info.spotName + '_' + index} onClick={() => openNewTab(info.spotLink)}>
                  <div className='spot_circle'>
                    <Image src={info.spotBg} layout='fill' alt='spot bg' />
                  </div>
                  <div className='spot_text'>
                    <div className='spot_title'>
                      <p>{info.spotName}</p>
                      {info.icon !== '' && <span className={info.icon === 'BEST' ? 'best' : 'event'}>{info.icon}</span>}
                    </div>
                    <div className='spot_tags'>
                      {info.spotTags.map((text, index) => (
                        <p key={text + '_' + index}>#{text}</p>
                      ))}
                    </div>
                  </div>
                </TagContentCard>
              ))}
            </div>
          </div>
        </TagContentBox>
      </ContentBox>
    </Container>
  );
};

export default React.forwardRef(KeywordTab);

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 1654px;
  max-width: 1920px;
  margin: 0 auto;
  background-color: #00a0f3;
  @media all and (max-width: 1280px) {
    height: 950px;
    max-width: unset;
    padding-bottom: 50px;
  }
`;

const BackgroundBox = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  .tag_bg {
    > span {
      height: 100% !important;
    }
  }
`;

const ContentBox = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  z-index: 1;
  padding-top: 150px;
  @media all and (max-width: 1280px) {
    padding-top: 50px;
  }
`;

const TabTitle = styled.div`
  margin-bottom: 70px;
  @media all and (max-width: 1280px) {
    margin-bottom: 23px;
  }
  .tab_num {
    width: 45px;
    margin: 0 auto 55px auto;
    text-align: center;
    font-family: 'Poppins', sans-serif;
    font-size: 46px;
    font-weight: 500;
    color: #fff;
    border-bottom: 2px solid #fff;
    padding-bottom: 5px;
    @media all and (max-width: 1280px) {
      width: 20px;
      font-size: 20px;
      border-bottom: 1px solid #fff;
      margin: 0 auto 18px auto;
    }
  }
  .tab_title_text {
    text-align: center;
    letter-spacing: 10px;
    color: #fff;
    @media all and (max-width: 1280px) {
      letter-spacing: 5px;
    }
    > span {
      font-size: 34px;
      font-weight: 300;
      @media all and (max-width: 1280px) {
        font-size: 13px;
      }
    }
    > p {
      font-size: 60px;
      font-weight: 700;
      margin-top: 20px;
      @media all and (max-width: 1280px) {
        font-size: 28px;
        margin-top: 8px;
      }
    }
  }
`;

const TagBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 1280px;
  margin: 0 auto 40px auto;
  padding: 0 20px;
  @media all and (max-width: 1280px) {
    width: 100%;
    margin: 0 auto 30px auto;
    padding: 0 30px;
  }
`;

const Hashtag = styled.div<{ isActive: boolean }>`
  padding: 17px 47px;
  border: 3px solid ${props => (props.isActive ? '#ffff66' : '#fff')};
  font-size: 28px;
  font-weight: ${props => (props.isActive ? 700 : 400)};
  border-radius: 40px;
  color: ${props => (props.isActive ? '#ffff66' : '#fff')};
  margin-right: 28px;
  margin-bottom: 30px;
  cursor: pointer;
  @media all and (max-width: 1280px) {
    padding: 9px 10px;
    font-size: 12px;
    border-radius: 18px;
    border: 1.5px solid ${props => (props.isActive ? '#ffff66' : '#fff')};
    margin-right: 10px;
    margin-bottom: 10px;
  }
  &:nth-child(4) {
    margin-right: 0;
    @media all and (max-width: 1280px) {
      margin-right: 10px;
    }
  }
  &:last-child {
    margin-right: 0;
  }
`;

const TagContentBox = styled.div`
  position: relative;
  width: 1280px;
  height: 800px;
  margin: 0 auto;
  @media all and (max-width: 1280px) {
    width: 100%;
    height: 550px;
    padding: 0 20px;
  }
  .tag_bg {
    position: relative;
    width: 100%;
    height: 100%;
    .bg_filter {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 50%;
      background: linear-gradient(
        to top,
        rgba(20, 20, 20, 0) 5%,
        rgba(20, 20, 20, 0) 10%,
        rgba(20, 20, 20, 0.1) 20%,
        rgba(20, 20, 20, 0.2) 40%,
        rgba(20, 20, 20, 0.3) 60%
      );
      z-index: 1;
    }
    > div {
      &:not(.bg_filter) {
        height: 100%;
      }
    }
  }
  .tag_content_wrapper {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    padding: 100px 50px 0 50px;
    z-index: 1;
    @media all and (max-width: 1280px) {
      width: 84%;
      padding: 50px 16px 0 16px;
      left: 50%;
      transform: translateX(-50%);
    }
    .tag_content_title {
      width: 100%;
      > span {
        font-size: 34px;
        font-weight: 300;
        color: #fff;
        line-height: 60px;
        @media all and (max-width: 1280px) {
          display: block;
          width: 100%;
          font-size: 15px;
          line-height: 20px;
          text-align: center;
          margin-bottom: 5px;
        }
      }
      > p {
        font-size: 42px;
        font-weight: 700;
        color: #fff;
        line-height: 56px;
        @media all and (max-width: 1280px) {
          font-size: 17px;
          line-height: 22px;
          text-align: center;
        }
      }
    }
    .tag_content_list {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      width: 100%;
      margin-top: 60px;
      @media all and (max-width: 1280px) {
        margin-top: 20px;
      }
    }
  }
`;

const TagContentCard = styled.div`
  display: flex;
  align-items: center;
  width: 574px;
  height: 210px;
  background-color: #fff;
  margin-bottom: 30px;
  border-radius: 20px;
  padding-left: 40px;
  cursor: pointer;
  @media all and (max-width: 1280px) {
    width: 100%;
    height: 85px;
    padding-left: 13px;
    margin-bottom: 12px;
    border-radius: 7px;
  }
  .spot_circle {
    position: relative;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 30px;
    @media all and (max-width: 1280px) {
      width: 56px;
      height: 56px;
      margin-right: 12px;
    }
  }
  .spot_text {
    .spot_title {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
      @media all and (max-width: 1280px) {
        margin-bottom: 3px;
      }
      > p {
        font-size: 36px;
        font-weight: 700;
        margin-right: 13px;
        @media all and (max-width: 1280px) {
          font-size: 18px;
          margin-right: 6px;
        }
      }
      > span {
        font-size: 20px;
        font-weight: 500;
        @media all and (max-width: 1280px) {
          font-size: 10px;
        }
      }
      > span.best {
        color: #ff3333;
      }
      > span.event {
        color: #ffcc33;
      }
    }
    .spot_tags {
      @media all and (max-width: 1280px) {
        display: flex;
      }
      > p {
        font-size: 24px;
        line-height: 32px;
        color: #333333;
        @media all and (max-width: 1280px) {
          font-size: 12px;
          line-height: normal;
          margin-right: 5px;
        }
      }
    }
  }
`;

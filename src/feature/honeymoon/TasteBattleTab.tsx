import theme from '@styles/theme';
import React, { forwardRef } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Bg from '@images/honeymoon/taste/taste_bg.jpg';
import mobileBg from '@images/honeymoon/taste/m_taste_bg.jpg';
import vacationPeople from '@images/honeymoon/taste/vacation_people.jpg';
import tourPeople from '@images/honeymoon/taste/tour_people.jpg';
import moVacationPeople from '@images/honeymoon/taste/m_vacation_people.jpg';
import moTourPeople from '@images/honeymoon/taste/m_tour_people.jpg';
import vacation01 from '@images/honeymoon/taste/vacation01.jpg';
import vacation02 from '@images/honeymoon/taste/vacation02.jpg';
import vacation03 from '@images/honeymoon/taste/vacation03.jpg';
import moVacation01 from '@images/honeymoon/taste/m_vacation01.jpg';
import moVacation02 from '@images/honeymoon/taste/m_vacation02.jpg';
import moVacation03 from '@images/honeymoon/taste/m_vacation03.jpg';
import tour01 from '@images/honeymoon/taste/tour01.jpg';
import tour02 from '@images/honeymoon/taste/tour02.jpg';
import tour03 from '@images/honeymoon/taste/tour03.jpg';
import moTour01 from '@images/honeymoon/taste/m_tour01.jpg';
import moTour02 from '@images/honeymoon/taste/m_tour02.jpg';
import moTour03 from '@images/honeymoon/taste/m_tour03.jpg';
import tagList from '@images/honeymoon/taste/check_icon.png';
import { Desktop } from '@hooks/useDevice';
import { openNewTab } from '@utils/util';

const TasteBattleTab = (props, ref) => {
  const desktop = Desktop();
  const tasteArr = [
    {
      tasteName: '휴양족',
      spots: [
        {
          spotLink: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42560',
          spotName: '하와이',
          spotBg: vacation01,
          moSpotBg: moVacation01,
          spotNameEN: 'Hawaii',
          spotTags: ['와이키키 비치', '캐어나팔리 비치'],
        },
        {
          spotLink: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42633',
          spotName: '몰디브',
          spotBg: vacation02,
          moSpotBg: moVacation02,
          spotNameEN: 'Maldives',
          spotTags: ['말레', '썬아일랜드'],
        },
        {
          spotLink: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42631',
          spotName: '괌',
          spotBg: vacation03,
          moSpotBg: moVacation03,
          spotNameEN: 'Guam',
          spotTags: ['사랑의 절벽', '피시아이 마린파크'],
        },
      ],
    },
    {
      tasteName: '관광족',
      spots: [
        {
          spotLink: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42639',
          spotName: '프랑스',
          spotBg: tour01,
          moSpotBg: moTour01,
          spotNameEN: 'France',
          spotTags: ['디즈니랜드', '에펠탑&루브르박물관'],
        },
        {
          spotLink: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42566',
          spotName: '영국',
          spotBg: tour02,
          moSpotBg: moTour02,
          spotNameEN: 'United Kingdom',
          spotTags: ['해리포터 스튜디오', '런던아이&타워브릿지'],
        },
        {
          spotLink: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42565',
          spotName: '로스앤젤레스',
          spotBg: tour03,
          moSpotBg: moTour03,
          spotNameEN: 'Los Angeles',
          spotTags: ['스카이스페이스', '그리피스천문대'],
        },
      ],
    },
  ];
  return (
    <Container ref={ref}>
      <BackgroundBox>
        <Image
          unoptimized
          src={desktop ? Bg : mobileBg}
          layout={desktop ? 'fill' : 'responsive'}
          width={desktop ? 1920 : 1020}
          height={desktop ? 2683 : 2645}
          alt='bg'
        />
      </BackgroundBox>
      <ContentBox>
        <TabTitle>
          <div className='tab_num'>02</div>
          <div className='tab_title_text'>
            <span>휴양VS관광</span>
            <p>취향배틀</p>
          </div>
        </TabTitle>

        <div className='topic_box'>
          <Topic>
            <Image src={desktop ? vacationPeople : moVacationPeople} layout='fill' alt='vacation' />
            <div className='topic_title'>
              <p>휴양족</p>
              <span>신행은 역시 쉬는게 최고!</span>
            </div>
          </Topic>
          <Topic>
            <Image src={desktop ? tourPeople : moTourPeople} layout='fill' alt='tour' />
            <div className='topic_title'>
              <p>관광족</p>
              <span>쉬어서 뭐해, 나가서 놀자!</span>
            </div>
          </Topic>
        </div>

        <div className='card_box'>
          {tasteArr.map((item, index) => (
            <SpotCard key={item.tasteName + '_' + index}>
              <div className='card_header'>
                <p>{item.tasteName}을 위한 추천 여행지</p>
              </div>
              <ul className='card_contents'>
                {item.spots.map((info, index) => (
                  <SpotCardItem key={info.spotName + '_' + index} onClick={() => openNewTab(info.spotLink)}>
                    <div className='card_img'>
                      <Image
                        src={desktop ? info.spotBg : info.moSpotBg}
                        layout={desktop ? 'fixed' : 'responsive'}
                        width={desktop ? 530 : 360}
                        height={280}
                        alt='spot bg'
                      />
                      <div className='card_text'>
                        <span>{info.spotNameEN}</span>
                        <p>{info.spotName}</p>
                      </div>
                    </div>

                    <ul className='cart_tags'>
                      {info.spotTags.map((tag, index) => (
                        <li key={tag + '_' + index}>
                          <Image width={desktop ? 30 : 15} height={desktop ? 30 : 15} src={tagList} alt='list' />
                          <p>{tag}</p>
                        </li>
                      ))}
                    </ul>
                  </SpotCardItem>
                ))}
              </ul>
            </SpotCard>
          ))}
        </div>
      </ContentBox>
    </Container>
  );
};

export default React.forwardRef(TasteBattleTab);

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 2683px;
  max-width: 1920px;
  margin: 0 auto;
  background-color: #200f5c;
  @media all and (max-width: 1280px) {
    height: 1062px;
    max-width: unset;
    padding-bottom: 70px;
  }
`;

const BackgroundBox = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  > span {
    height: 100% !important;
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
  .topic_box,
  .card_box {
    width: 1280px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    @media all and (max-width: 1280px) {
      width: 100%;
      padding: 0 20px;
    }
  }
  .topic_box {
    margin-bottom: 60px;
    @media all and (max-width: 1280px) {
      margin-bottom: 20px;
    }
  }
`;

const TabTitle = styled.div`
  margin-bottom: 70px;
  @media all and (max-width: 1280px) {
    margin-bottom: 23px;
  }
  .tab_num {
    width: 56px;
    margin: 0 auto 55px auto;
    text-align: center;
    font-family: 'Poppins', sans-serif;
    font-size: 46px;
    font-weight: 500;
    color: #fff;
    border-bottom: 2px solid #fff;
    padding-bottom: 5px;
    @media all and (max-width: 1280px) {
      width: 25px;
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

const Topic = styled.div`
  ${theme.flexCenter}
  position: relative;
  width: 625px;
  height: 280px;
  border-radius: 30px;
  overflow: hidden;
  @media all and (max-width: 1280px) {
    width: 50%;
    height: 120px;
    padding: 26px 0;
    border-radius: 12px;
  }
  &:first-child {
    margin-right: 30px;
    @media all and (max-width: 1280px) {
      margin-right: 12px;
    }
  }
  > div.topic_title {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    @media all and (max-width: 1280px) {
      width: 100%;
    }
    > p {
      display: block;
      width: 120px;
      margin: 0 auto 33px auto;
      text-align: center;
      font-size: 40px;
      font-weight: 700;
      border-bottom: 2px solid #fff;
      color: #fff;
      padding-bottom: 20px;
      @media all and (max-width: 1280px) {
        width: 35%;
        margin: 0 auto 11px auto;
        font-size: 20px;
        border-bottom: 1px solid #fff;
        padding-bottom: 7px;
      }
    }
    > span {
      font-size: 24px;
      font-weight: 500;
      color: #fff;
      @media all and (max-width: 1280px) {
        display: block;
        width: 100%;
        font-size: 12px;
        text-align: center;
      }
    }
  }
`;

const SpotCard = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 625px;
  background-color: #fff;
  border-radius: 30px;
  overflow: hidden;
  padding-bottom: 10px;
  @media all and (max-width: 1280px) {
    width: 50%;
    border-radius: 15px;
  }
  &:first-child {
    @media all and (max-width: 1280px) {
      margin-right: 12px;
    }
  }
  .card_header {
    ${theme.flexCenter}
    width: 100%;
    height: 130px;
    background-color: #9966ff;
    margin-bottom: 60px;
    @media all and (max-width: 1280px) {
      height: auto;
      padding: 16px 0;
      margin-bottom: 20px;
    }
    > p {
      font-size: 36px;
      font-weight: 700;
      color: #fff;
      @media all and (max-width: 1280px) {
        font-size: 13px;
      }
    }
  }
  &:last-child {
    > .card_header {
      background-color: #66ccff;
    }
  }
  .card_contents {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 0 47px;
    @media all and (max-width: 1280px) {
      padding: 0 12px;
    }
  }
`;

const SpotCardItem = styled.li`
  position: relative;
  width: 100%;
  border-bottom: 2px solid #cccccc;
  margin-bottom: 60px;
  padding-bottom: 60px;
  @media all and (max-width: 1280px) {
    border-bottom: 1px solid #cccccc;
    margin-bottom: 20px;
    padding-bottom: 20px;
  }
  &:last-child {
    margin-bottom: 0;
    border-bottom: 0;
  }
  .card_img {
    position: relative;
    width: 100%;
    height: 280px;
    border-radius: 30px;
    margin-bottom: 43px;
    overflow: hidden;
    cursor: pointer;
    @media all and (max-width: 1280px) {
      height: 107px;
      border-radius: 15px;
      margin-bottom: 18px;
    }
    > span {
      height: 100% !important;
    }
    > div {
      &:not(.card_text) {
        height: 100%;
      }
    }
    .card_text {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 100%;
      > span {
        display: block;
        font-family: 'Poppins', sans-serif;
        font-size: 18px;
        font-weight: 500;
        color: #fff;
        text-align: center;
        @media all and (max-width: 1280px) {
          font-size: 10px;
        }
      }
      > p {
        text-align: center;
        margin-top: 15px;
        font-size: 40px;
        font-weight: 700;
        color: #fff;
        @media all and (max-width: 1280px) {
          font-size: 20px;
          margin-top: 5px;
        }
      }
    }
  }
  .cart_tags {
    position: relative;
    width: 100%;
    padding-left: 36px;
    @media all and (max-width: 1280px) {
      padding-left: 0;
    }
    > li {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
      @media all and (max-width: 1280px) {
        margin-bottom: 10px;
      }
      &:last-child {
        margin-bottom: 0;
      }
      > div {
        width: 30px;
        height: 30px;
        @media all and (max-width: 1280px) {
          width: 15px;
          height: 15px;
        }
      }
      > p {
        font-size: 24px;
        color: #333333;
        margin-left: 14px;
        @media all and (max-width: 1280px) {
          font-size: 12px;
          margin-left: 5px;
        }
      }
    }
  }
`;

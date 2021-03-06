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
      tag: '#????????????_???_??????',
      tagSubTitle: '???????????? ??? ??????',
      bgSrc: keywordBg01,
      moBgSrc: moKeywordBg01,
      spots: [
        {
          spotLink: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42560',
          spotName: '?????????',
          spotBg: spotBg0101,
          icon: 'BEST',
          spotTags: ['??????????????????', '????????????????????????'],
        },
        {
          spotLink: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42633',
          spotName: '?????????',
          spotBg: spotBg0102,
          icon: 'EVENT',
          spotTags: ['????????????', '??????????????????'],
        },
        {
          spotLink: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42631',
          spotName: '???',
          spotBg: spotBg0103,
          icon: '',
          spotTags: ['???????????????', '???????????????'],
        },
        {
          spotLink: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42638',
          spotName: '??????',
          spotBg: spotBg0104,
          icon: '',
          spotTags: ['?????????????????????', '???????????????'],
        },
      ],
    },
    {
      tag: '#???????????????',
      tagSubTitle: '????????? ??????',
      bgSrc: keywordBg02,
      moBgSrc: moKeywordBg02,
      spots: [
        {
          spotLink: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42565',
          spotName: '??????????????????',
          spotBg: spotBg0201,
          icon: '',
          spotTags: ['????????????', '500?????? ??????'],
        },
        {
          spotLink: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42566',
          spotName: '??????',
          spotBg: spotBg0202,
          icon: '',
          spotTags: ['???????????????', '??????????????????'],
        },
        {
          spotLink: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42611',
          spotName: '???????????????',
          spotBg: spotBg0203,
          icon: '',
          spotTags: ['????????????', '????????????'],
        },
        {
          spotLink: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42637',
          spotName: '????????????',
          spotBg: spotBg0204,
          icon: 'BEST',
          spotTags: ['?????????????????????', '?????????????????????'],
        },
      ],
    },
    {
      tag: '#????????????',
      tagSubTitle: '?????? ??????',
      bgSrc: keywordBg03,
      moBgSrc: moKeywordBg03,
      spots: [
        {
          spotLink: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42619',
          spotName: '??????',
          spotBg: spotBg0301,
          icon: 'BEST',
          spotTags: ['?????????', '??????3?????????'],
        },
        {
          spotLink: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42639',
          spotName: '?????????',
          spotBg: spotBg0302,
          icon: 'BEST',
          spotTags: ['?????????', '?????????'],
        },
        {
          spotLink: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42623',
          spotName: '????????????',
          spotBg: spotBg0303,
          icon: '',
          spotTags: ['?????????????????????', '??????????????????'],
        },
        {
          spotLink: 'http://www.iwedding.co.kr/brandplus/brandplus_view/42632',
          spotName: '?????????',
          spotBg: spotBg0304,
          icon: 'BEST',
          spotTags: ['??????????????????', '?????????'],
        },
      ],
    },
    {
      tag: '#???????????????_????????????',
      tagSubTitle: '???????????????, ????????????',
      bgSrc: keywordBg04,
      moBgSrc: moKeywordBg04,
      spots: [
        {
          spotLink: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42628',
          spotName: '????????????',
          spotBg: spotBg0401,
          icon: '',
          spotTags: ['???????????????', '?????????????????????'],
        },
        {
          spotLink: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42613',
          spotName: '??????????????????',
          spotBg: spotBg0402,
          icon: '',
          spotTags: ['??????????????????', '????????????'],
        },
        {
          spotLink: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42565',
          spotName: '??????????????????',
          spotBg: spotBg0403,
          icon: '',
          spotTags: ['???????????????', '???????????????'],
        },
        {
          spotLink: 'http://www.iwedding.co.kr/brandplus/brandplus_view/42632',
          spotName: '?????????',
          spotBg: spotBg0404,
          icon: 'BEST',
          spotTags: ['????????????', '????????????????????????'],
        },
      ],
    },
    {
      tag: '#????????????',
      tagSubTitle: '????????????',
      bgSrc: keywordBg05,
      moBgSrc: moKeywordBg05,
      spots: [
        {
          spotLink: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42560',
          spotName: '?????????',
          spotBg: spotBg0501,
          icon: 'BEST',
          spotTags: ['??????????????????', '????????????'],
        },
        {
          spotLink: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42610',
          spotName: '??????',
          spotBg: spotBg0502,
          icon: '',
          spotTags: ['???????????????', '?????????'],
        },
        {
          spotLink: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42635',
          spotName: '?????????',
          spotBg: spotBg0503,
          icon: 'BEST',
          spotTags: ['??????????????????', '??????????????????'],
        },
        {
          spotLink: 'http://www.iwedding.co.kr/brandplus/brandplus_view/42632',
          spotName: '?????????',
          spotBg: spotBg0504,
          icon: 'BEST',
          spotTags: ['??????????????????', '??????????????????'],
        },
      ],
    },
    {
      tag: '#CG???_?????????_????????????',
      tagSubTitle: 'CG??? ????????? ????????????',
      bgSrc: keywordBg06,
      moBgSrc: moKeywordBg06,
      spots: [
        {
          spotLink: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42635',
          spotName: '?????????',
          spotBg: spotBg0601,
          icon: 'BEST',
          spotTags: ['??????????????????', '?????????'],
        },
        {
          spotLink: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42621',
          spotName: '?????????',
          spotBg: spotBg0602,
          icon: '',
          spotTags: ['????????????', '?????????????????????'],
        },
        {
          spotLink: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42616',
          spotName: '???????????????',
          spotBg: spotBg0603,
          icon: '',
          spotTags: ['????????????', '????????????'],
        },
        {
          spotLink: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42611',
          spotName: '???????????????',
          spotBg: spotBg0604,
          icon: '',
          spotTags: ['????????????', '???????????????'],
        },
      ],
    },
    {
      tag: '#????????????',
      tagSubTitle: '????????????',
      bgSrc: keywordBg07,
      moBgSrc: moKeywordBg07,
      spots: [
        {
          spotLink: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42617',
          spotName: '?????????',
          spotBg: spotBg0701,
          icon: 'BEST',
          spotTags: ['????????????', '3?????????'],
        },
        {
          spotLink: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42623',
          spotName: '????????????',
          spotBg: spotBg0702,
          icon: '',
          spotTags: ['???????????????', '????????????'],
        },
        {
          spotLink: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42634',
          spotName: '?????????',
          spotBg: spotBg0703,
          icon: '',
          spotTags: ['????????????', '???????????????'],
        },
        {
          spotLink: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42639',
          spotName: '?????????',
          spotBg: spotBg0704,
          icon: 'BEST',
          spotTags: ['?????????', '?????????'],
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
            <span>????????? ????????????</span>
            <p>?????? ?????????</p>
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
              <p>????????? ?????????????</p>
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

import { useFormStore } from '@feature/QnA/hooks/useFormStore';
import QnAFormModal from '@feature/QnA/QnAFormModal';
import { Desktop } from '@hooks/useDevice';
import { useModalVisible } from '@hooks/useModalVisible';
import east01 from '@images/honeymoon/tour/east/east01.jpg';
import east02 from '@images/honeymoon/tour/east/east02.jpg';
import east03 from '@images/honeymoon/tour/east/east03.jpg';
import east04 from '@images/honeymoon/tour/east/east04.jpg';
import east05 from '@images/honeymoon/tour/east/east05.jpg';
import etc01 from '@images/honeymoon/tour/etc/etc01.jpg';
import etc02 from '@images/honeymoon/tour/etc/etc02.jpg';
import etc03 from '@images/honeymoon/tour/etc/etc03.jpg';
import etc04 from '@images/honeymoon/tour/etc/etc04.jpg';
import etc05 from '@images/honeymoon/tour/etc/etc05.jpg';
import etc06 from '@images/honeymoon/tour/etc/etc06.jpg';
import etc07 from '@images/honeymoon/tour/etc/etc07.jpg';
import mobileBg from '@images/honeymoon/tour/m_tour_bg.jpg';
import north01 from '@images/honeymoon/tour/north/north01.jpg';
import north02 from '@images/honeymoon/tour/north/north02.jpg';
import north03 from '@images/honeymoon/tour/north/north03.jpg';
import north04 from '@images/honeymoon/tour/north/north04.jpg';
import north05 from '@images/honeymoon/tour/north/north05.jpg';
import north06 from '@images/honeymoon/tour/north/north06.jpg';
import Bg from '@images/honeymoon/tour/tour_inner_bg.jpg';
import west01 from '@images/honeymoon/tour/west/west01.jpg';
import west02 from '@images/honeymoon/tour/west/west02.jpg';
import west03 from '@images/honeymoon/tour/west/west03.jpg';
import west04 from '@images/honeymoon/tour/west/west04.jpg';
import west05 from '@images/honeymoon/tour/west/west05.jpg';
import west06 from '@images/honeymoon/tour/west/west06.jpg';
import west07 from '@images/honeymoon/tour/west/west07.jpg';
import west08 from '@images/honeymoon/tour/west/west08.jpg';
import west09 from '@images/honeymoon/tour/west/west09.jpg';
import west10 from '@images/honeymoon/tour/west/west10.jpg';
import { QnACategory } from '@modules/mypage/QnA/QnAInterface';
import { haveAccessToken } from '@service/TokenService';
import theme from '@styles/theme';
import { QNA_FORM_MODAL } from '@utils/modalKeys';
import { openPopup } from '@utils/util';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import styled from 'styled-components';
import shallow from 'zustand/shallow';
import CountryCardItem from './CountryCardItem';

const TourSpotTab = (props, ref) => {
  const setMainCategory = useFormStore(state => state.setMainCategory, shallow);
  const setCategory = useFormStore(state => state.setCategory, shallow);
  const router = useRouter();
  const { modalVisible: formModalVisible, setModalVisible } = useModalVisible(QNA_FORM_MODAL);
  const desktop = Desktop();
  const isLogin = haveAccessToken();
  const [activeIndex, setActiveIndex] = useState(0);
  const tourArr = [
    {
      tag: '#?????????',
      cards: [
        {
          name: '?????????',
          bgImg: west01,
          isBest: true,
          cardUrl: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42639',
          tags: ['?????????????????????', '?????????'],
        },
        {
          name: '?????????',
          bgImg: west02,
          isBest: true,
          cardUrl: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42635',
          tags: ['??????????????????', 'CG?????? ??????'],
        },
        {
          name: '?????????',
          bgImg: west03,
          isBest: false,
          cardUrl: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42636',
          tags: ['???????????? ?????????', '????????? ?????????'],
        },
        {
          name: '????????????',
          bgImg: west04,
          isBest: true,
          cardUrl: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42637',
          tags: ['????????? ??????', '??????&?????????'],
        },
        {
          name: '??????',
          bgImg: west05,
          isBest: false,
          cardUrl: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42566',
          tags: ['?????? ?????????', '????????????'],
        },
        {
          name: '??????',
          bgImg: west06,
          isBest: false,
          cardUrl: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42620',
          tags: ['??????&????????? ??????', '?????????'],
        },
        {
          name: '????????????',
          bgImg: west07,
          isBest: false,
          cardUrl: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42623',
          tags: ['??????????????? ??????', '????????? ??????'],
        },
        {
          name: '????????????',
          bgImg: west08,
          isBest: false,
          cardUrl: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42622',
          tags: ['??????&????????? ??????', '???????????????'],
        },
        {
          name: '????????????',
          bgImg: west09,
          isBest: false,
          cardUrl: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42618',
          tags: ['????????? ?????????', '?????????'],
        },
        {
          name: '?????????',
          bgImg: west10,
          isBest: true,
          cardUrl: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42617',
          tags: ['????????????', '????????? ????????? CF'],
        },
      ],
    },
    {
      tag: '#?????????',
      cards: [
        {
          name: '??????',
          bgImg: east01,
          isBest: true,
          cardUrl: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42619',
          tags: ['????????? ?????? ??????', '?????????'],
        },
        {
          name: '???????????????',
          bgImg: east02,
          isBest: false,
          cardUrl: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42616',
          tags: ['?????????', '??????????????? ??????'],
        },
        {
          name: '?????????',
          bgImg: east03,
          isBest: false,
          cardUrl: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42624',
          tags: ['??????&??????', '???????????????'],
        },
        {
          name: '???????????????',
          bgImg: east04,
          isBest: false,
          cardUrl: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42611',
          tags: ['????????? ?????????', '???????????? ??????'],
        },
        {
          name: '????????????',
          bgImg: east05,
          isBest: false,
          cardUrl: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42630',
          tags: ['????????? ??????', '????????? ??????'],
        },
      ],
    },
    {
      tag: '#?????????',
      cards: [
        {
          name: '?????????',
          bgImg: north01,
          isBest: false,
          cardUrl: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42627',
          tags: ['????????? ?????????', '???????????? ??????'],
        },
        {
          name: '?????????',
          bgImg: north02,
          isBest: false,
          cardUrl: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42621',
          tags: ['?????? ????????? ??????', '?????????'],
        },
        {
          name: '????????????',
          bgImg: north03,
          isBest: true,
          cardUrl: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42641',
          tags: ['????????? ????????????', '????????????'],
        },
        {
          name: '???????????????',
          bgImg: north04,
          isBest: false,
          cardUrl: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42647',
          tags: ['????????? ??????', '?????????'],
        },
        {
          name: '?????????',
          bgImg: north05,
          isBest: false,
          cardUrl: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42644',
          tags: ['????????? ??????', '????????????'],
        },
        {
          name: '?????????',
          bgImg: north06,
          isBest: false,
          cardUrl: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42643',
          tags: ['???????????? ??????', '????????????'],
        },
      ],
    },
    {
      tag: '#?????? ??? ??????',
      cards: [
        {
          name: '?????????',
          bgImg: etc01,
          isBest: true,
          cardUrl: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42646',
          tags: ['?????????????????????', '?????? ?????????'],
        },
        {
          name: '??????????????????',
          bgImg: etc02,
          isBest: false,
          cardUrl: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42613',
          tags: ['????????? ????????? ??????', '?????? ?????? ??????'],
        },
        {
          name: '??????????????????',
          bgImg: etc03,
          isBest: false,
          cardUrl: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42565',
          tags: ['????????????', '????????????????????? ??????'],
        },
        {
          name: '??????????????????',
          bgImg: etc04,
          isBest: false,
          cardUrl: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42645',
          tags: ['???????????? ??????', '?????????'],
        },
        {
          name: '?????????',
          bgImg: etc05,
          isBest: true,
          cardUrl: 'http://www.iwedding.co.kr/brandplus/brandplus_view/42632',
          tags: ['?????????????????????', '??????????????????'],
        },
        {
          name: '????????????',
          bgImg: etc06,
          isBest: false,
          cardUrl: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42628',
          tags: ['????????? ?????? ??????', '???????????????'],
        },
        {
          name: '??????',
          bgImg: etc07,
          isBest: false,
          cardUrl: 'https://www.iwedding.co.kr/brandplus/brandplus_view/42642',
          tags: ['?????????????????????', '????????????x?????????'],
        },
      ],
    },
  ];
  const handleTag = index => {
    setActiveIndex(index);
  };
  const onQaModal = () => {
    if (!isLogin) {
      return confirmAlert({
        title: '???????????? ?????? ???????????????.',
        buttons: [
          { label: '??????', onClick: () => null },
          {
            label: '??????',
            onClick: () => router.replace(`https://www.iwedding.co.kr/member/login?ret_url=https://www.iwedding.co.kr/honeymoon`),
          },
        ],
      });
    } else {
      if (desktop) {
        global.window && openPopup(`/request/replace?category=????????????&device=pc`, 'form_web');
      } else {
        router.push(`/request/replace?category=????????????`);
      }
    }
  };
  return (
    <Container ref={ref}>
      <BackgroundBox>
        <Image
          unoptimized
          src={desktop ? Bg : mobileBg}
          layout={desktop ? 'fill' : 'responsive'}
          width={desktop ? 1920 : 1020}
          height={desktop ? 2886 : 3364}
          alt='bg'
        />
      </BackgroundBox>
      <ContentBox>
        <TabTitle>
          <div className='tab_num'>04</div>
          <div className='tab_title_text'>
            <span>?????? ????????? ?????????</span>
            <p>????????? ??????</p>
          </div>
        </TabTitle>

        <TagBox>
          {tourArr.map((item, index) => (
            <Hashtag isActive={activeIndex === index} onClick={() => handleTag(index)} key={item.tag + '__' + index}>
              {item.tag}
            </Hashtag>
          ))}
        </TagBox>
        <div className='tag_card_list'>
          {tourArr[activeIndex].cards.map((info, index) => (
            <CountryCardItem
              name={info.name}
              bgImg={info.bgImg}
              isBest={info.isBest}
              cardUrl={info.cardUrl}
              tags={info.tags}
              isThird={false}
              key={info.name + '--' + index}
            />
          ))}
        </div>

        <div className='estimate_btn_box'>
          <span onClick={onQaModal}>1 : 1 ?????? ??????</span>
        </div>
      </ContentBox>

      {formModalVisible && <QnAFormModal />}
    </Container>
  );
};

export default React.forwardRef(TourSpotTab);

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 2886px;
  max-width: 1920px;
  margin: 0 auto;
  background-color: #5d67f8;
  @media all and (max-width: 1280px) {
    height: 1360px;
    max-width: unset;
    padding-bottom: 100px;
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
  .tag_card_list {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    width: 1280px;
    margin: 0 auto;
    @media all and (max-width: 1280px) {
      width: 100%;
      padding: 0 20px;
      justify-content: space-between;
    }
  }
  .estimate_btn_box {
    position: relative;
    width: 600px;
    height: 120px;
    background-color: #333333;
    margin-top: 70px;
    cursor: pointer;
    @media all and (max-width: 1280px) {
      width: 200px;
      height: 40px;
      margin-top: 23px;
    }
    > span {
      ${theme.flexCenter}
      width: 100%;
      height: 100%;
      font-size: 28px;
      font-weight: 500;
      color: #fff;
      @media all and (max-width: 1280px) {
        font-size: 14px;
      }
    }
  }
`;

const TabTitle = styled.div`
  margin-bottom: 70px;
  @media all and (max-width: 1280px) {
    margin-bottom: 23px;
  }
  .tab_num {
    width: 58px;
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

const TagBox = styled.div`
  display: flex;
  justify-content: center;
  width: 1280px;
  margin: 0 auto 40px auto;
  padding: 0 20px;
  @media all and (max-width: 1280px) {
    width: 100%;
    padding: 0 25px;
    margin: 0 auto 35px auto;
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
    margin-right: 9px;
    border: 1.5px solid ${props => (props.isActive ? '#ffff66' : '#fff')};
    margin-bottom: 0;
  }
  &:nth-child(4) {
    margin-right: 0;
  }
  &:last-child {
    margin-right: 0;
  }
`;

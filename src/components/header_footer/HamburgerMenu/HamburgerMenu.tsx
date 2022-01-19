import React, { useState } from 'react';
import theme from '@styles/theme';
import Link from 'next/link';
import Image from 'next/image';
import { Divider } from '@components/core/containers/Divider';
import { useOverflowModal } from '@hooks/useOverflowHidden';
import hallImg from '@images/common/rsvcenter_hall_bg.jpg';
import yebokImg from '@images/common/rsvcenter_yebok_bg.jpg';
import yemulImg from '@images/common/rsvcenter_yemul_bg.jpg';
import hanbokImg from '@images/common/rsvcenter_hanbok_bg.jpg';
import styled, { css } from 'styled-components';
import HamburgerFooter from './HamburgerFooter';
import MenuListItem from './MenuListItem';
import RsvLink from './RsvLink';
import closeIcon from '@images/common/close_icon_x3.png';
import BannerSlide from '@feature/search/components/BannerSlide';
import { useSearchBannerData } from '@modules/search/searchAPI';

// import HamburgerListItem from './HamburgerListItem';

interface MenuProps {
  isOpen: boolean;
  closeMenu?: () => void;
}

const HamburgerMenu = ({ isOpen, closeMenu }: MenuProps) => {
  const { data: bannerList } = useSearchBannerData('99');

  useOverflowModal(isOpen);

  const [clicked, setClicked] = useState(0);
  const handleAccordion = index => {
    if (clicked === index) {
      return setClicked(4);
    }
    setClicked(index);
  };
  const menus = [
    { title: '스토어', categoryKey: 'product' },
    { title: '브랜드', categoryKey: 'brand' },
    { title: '콘텐츠', categoryKey: 'contents' },
    { title: '이벤트', categoryKey: 'event' },
  ];

  return (
    <Wrapper isOpen={isOpen}>
      <Container>
        <div className='menu_close_btn_box'>
          <p>전체 메뉴</p>
          <div onClick={closeMenu}>
            <Image src={closeIcon} width={24} height={24} alt='close_btn' />
          </div>
        </div>
        <Banner>
          <BannerSlide data={bannerList?.top} onlyMobile searchResult={true} />
        </Banner>
        <div className='accordion_box'>
          {menus.map((item, index) => (
            <MenuListItem
              onToggle={() => handleAccordion(index)}
              active={clicked === index}
              closeMenu={closeMenu}
              key={index}
              item={item}
            />
          ))}
        </div>
        <NoMarginDivider />
        <Section>
          <Header>
            <Title>예약센터</Title>
          </Header>
          <RsvBtnBox>
            <RsvLink url='/main/page/517' imgSrc={hallImg} closeMenu={closeMenu}>
              <p>
                <span>웨딩홀</span>
                <br />
                <span>예약</span>
              </p>
            </RsvLink>
            <RsvLink url='/main/page/604' imgSrc={yebokImg} closeMenu={closeMenu}>
              <p>
                <span>예복 예약</span>
              </p>
            </RsvLink>
            <RsvLink url='/main/page/605' imgSrc={yemulImg} closeMenu={closeMenu}>
              <p>
                <span>예물 예약</span>
              </p>
            </RsvLink>
            <RsvLink url='/main/page/545' imgSrc={hanbokImg} closeMenu={closeMenu}>
              <p>
                <span>한복 예약</span>
              </p>
            </RsvLink>
            {/* <RsvLink url='/rsvcenter/robes' imgSrc={yebokImg} closeMenu={closeMenu}>
              <p>
                <span>예복 예약</span>
              </p>
            </RsvLink>
            <RsvLink url='/rsvcenter/gift' imgSrc={yemulImg} closeMenu={closeMenu}>
              <p>
                <span>예물 예약</span>
              </p>
            </RsvLink>
            <RsvLink url='/rsvcenter/hanbok' imgSrc={hanbokImg} closeMenu={closeMenu}>
              <p>
                <span>한복 예약</span>
              </p>
            </RsvLink> */}
          </RsvBtnBox>
        </Section>
        <Link href='/calculator' passHref>
          <SectionTwo onClick={closeMenu}>
            <p>스드메 계산기</p>
            <span className='calc'>최대 혜택가 실시간 바로 확인 &gt;</span>
          </SectionTwo>
        </Link>
        <HamburgerFooter />
      </Container>
    </Wrapper>
  );
};

export default HamburgerMenu;

const Wrapper = styled.div<{ isOpen: boolean }>`
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  background: white;
  z-index: 1001;
  height: calc(100vh - 55px);
  width: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  transition: ${props => props.isOpen && '0.35s ease-in-out'};
  ${theme.hideScroll};
  ${({ isOpen }) =>
    isOpen
      ? css`transform: translateX(0)}`
      : css`
          transform: translateX(-100%);
        `};
  @media all and (min-width: 1024px) {
    width: 375px;
    height: 100vh;
  }
`;
const Container = styled.div`
  padding: 15px 15px 30px 15px;
  .accordion_box {
    -webkit-tap-highlight-color: transparent;
    width: 100%;
    position: relative;
  }
  .menu_close_btn_box {
    display: none;
    @media all and (min-width: 1024px) {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 50px;
    }
    > p {
      display: block;
      font-size: 16px;
      font-weight: 700;
    }
    > div {
      width: 35px;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
  }
`;

const Banner = styled.div`
  ${theme.flexCenter};
  width: 100%;
  height: 138px;
  background: ${theme.lightGray};
  color: ${theme.black};
  margin-bottom: 10px;
  @media all and (max-width: ${theme.pc}px) {
    height: auto;
    /* margin-top: -40px; */
    /* margin-bottom: -30px; */
    background: none;
  }
`;

const NoMarginDivider = styled.div`
  height: 1px;
  width: 100%;
  background-color: #f1f1f1;
  margin: 17px 0 10px 0;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 16px;
  font-weight: bold;
`;
const SectionTwo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 66px;
  border-top: 1px solid #f1f1f1;
  border-bottom: 1px solid #f1f1f1;
  padding: 10px 0;
  margin-top: 25px;
  cursor: pointer;
  > p {
    font-size: 16px;
    font-weight: 700;
    color: ${theme.black};
  }
  > span {
    font-size: 13px;
    color: #aaaaaa;
  }
`;
const RsvBtnBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 85px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
  height: 50px;
  .calc {
    font-size: 13px;
    color: ${theme.blue};
    cursor: pointer;
  }
`;

const Title = styled.span`
  font-weight: bold;
  color: ${theme.black};
`;

import React, { useCallback, useEffect, useState } from 'react';
import theme from '@styles/theme';
import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useBbsPageState } from '@feature/Ibrandplus/hooks/useBbsPageState';
import hamburgerIcon from '@images/common/hamburger_icon_x3.png';
import closeIcon from '@images/common/close_icon_x3.png';
// import SimpleBar from 'simplebar-react';
// import 'simplebar/dist/simplebar.min.css';
import { keyWordCount, usePopularData } from '@modules/search/searchAPI';
import IconPopular from '@styles/svgs/icon_popular';
import dropdownIcon from '@images/common/chevron_down_black_x3.png';
import { searchKeywordLog } from '@modules/log/search/searchLogger';
import { Desktop } from '@hooks/useDevice';

import { getDateTime } from '@utils/util';
interface StickyProps {
  scrollDir: string;
  toggleMenu?: () => void;
  isScrollTop?: boolean;
}

export const navlinks = [
  { to: 'main/index', title: '홈', focusValue: 'main/index' },
  { to: 'product?category=패키지&subCategory=전체&tag=&page=1', focusValue: 'product', title: '스토어' },
  { to: `brand?category=사진&subCategory=전체&tag=&page=1`, focusValue: 'brand', title: '브랜드' },
  { to: 'event?category=전체&subCategory=전체&tag=&page=1', focusValue: 'event', title: '이벤트' },
  { to: 'contents?category=전체&subCategory=전체&tag=&page=1', focusValue: 'contents', title: '콘텐츠' },
];

const MobileNewMenu = ({ scrollDir, toggleMenu, isScrollTop }: StickyProps) => {
  const router = useRouter();
  const { data: popularList } = usePopularData();

  const [isMouseOver, setMouseOver] = useState(false);

  const [autoCount, setAutoCount] = useState(0);

  useEffect(() => {
    const up =
      autoCount === 0 ? setTimeout(() => setAutoCount(prev => prev + 1), 100) : setTimeout(() => setAutoCount(prev => prev + 1), 2000);
    if (autoCount === popularList?.length + 1) {
      setAutoCount(0);
    }
    return () => clearTimeout(up);
  }, [autoCount, setAutoCount]);
  // 스크롤 시 메뉴 감춤

  const onMouseOver = () => {
    setMouseOver(true);
  };
  // 스크롤 관련 이벤트

  const onKeywordClick = (search_word: string) => async () => {
    await searchKeywordLog(search_word);
    await keyWordCount(search_word);
    router.push(`/search/result?keyword=${search_word?.replace(/ /g, '')}&tab=all`);
  };

  return (
    <div>
      <Container scrollDir={scrollDir} isScrollTop={isScrollTop}>
        <div className='pc_all_menu_btn_box' onClick={toggleMenu}>
          <div className='all_menu_wrapper'>
            <Image src={hamburgerIcon} alt='전체 메뉴' width={24} height={24} />
            <p>전체 메뉴</p>
          </div>
          <div className='divide_line'></div>
        </div>
        {/* <SimpleBar className='simplebar_conatiner'> */}
        <div className='menu_header' id='menuHeader'>
          <ul className='menu_list'>
            {navlinks.map(li => (
              <li className={router.pathname.includes(li.focusValue) ? 'on' : ''} key={li.title}>
                <Link href={`/${li.to}`} passHref>
                  <a>{li.title}</a>
                </Link>
              </li>
            ))}
          </ul>
          <div className='divide_line'></div>
          <ul className='menu_list'>
            <li>
              <Link href='https://www.iwedding.co.kr/do/timedeal' passHref>
                <a>오늘의특가</a>
              </Link>
              <span className='new_dot'></span>
            </li>
            <li>
              <Link href='https://www.iwedding.co.kr/do/weeklyspecial' passHref>
                <a>위클리혜택</a>
              </Link>
            </li>
            <li>
              <Link href='https://www.iwedding.co.kr/main/page/517' passHref>
                <a>웨딩홀예약센터</a>
              </Link>
            </li>
          </ul>
          <div className='divide_line last'></div>

          <div className='popular_dropdown'>
            {popularList && (
              <KeywordBox keywordLength={popularList?.length + 1} autoCount={autoCount} onMouseOver={onMouseOver}>
                <ul className='popular_term'>
                  {popularList?.map((item, index) => (
                    <li key={`${item.search_word}_${index}`}>
                      <p>
                        <span>{index + 1}</span>
                        <span>{item.search_word}</span>
                      </p>
                      <div className='icon_box'>
                        <span className='term_icon'>
                          <IconPopular type={item.search_word_status as any} />
                        </span>
                      </div>
                    </li>
                  ))}
                  <li key={`${popularList?.[0]?.search_word}_${11}`}>
                    <p>
                      <span>{1}</span>
                      <span>{popularList?.[0]?.search_word}</span>
                    </p>
                    <div className='icon_box'>
                      <span className='term_icon'>
                        <IconPopular type={popularList?.[0]?.search_word_status as any} />
                      </span>
                    </div>
                  </li>
                </ul>
                <div className='slideDropdown_btn'>
                  <Image src={dropdownIcon} alt='dropdown' width={9} height={6} />
                </div>
              </KeywordBox>
            )}
            <DropdownBox isMouseOver={isMouseOver} onMouseLeave={() => setMouseOver(false)}>
              <div className='down_header'>
                <div className='down_header_text'>
                  <p>인기 검색어</p>
                  <span>최근 업데이트 {popularList && getDateTime(popularList?.[0]?.search_count_date)}</span>
                </div>
                <div className='dropdown_btn'>
                  <Image src={dropdownIcon} alt='dropdown' width={9} height={6} />
                </div>
              </div>
              <ul className='down_contents'>
                {popularList?.map((item, index) => (
                  <li key={`${item.search_word}_${index}`} onClick={onKeywordClick(item.search_word)}>
                    <p>
                      <span>{index + 1}</span>
                      <span>{item.search_word}</span>
                    </p>
                    <span className='term_icon'>
                      <IconPopular type={item.search_word_status as any} />
                    </span>
                  </li>
                ))}
              </ul>
            </DropdownBox>
          </div>
        </div>
        {/* </SimpleBar> */}
      </Container>
    </div>
  );
};

export default MobileNewMenu;

const Container = styled.div<{ scrollDir: string; isScrollTop: boolean }>`
  position: ${props => (props.scrollDir === 'up' ? 'relative' : 'absolute')};
  top: 0;
  width: 100%;
  height: 52px;
  background-color: #fff;
  z-index: 11;
  overflow-y: visible;
  @media all and (min-width: 1280px) {
    position: relative;
    top: 0;
    /* display: ${props => (props.isScrollTop ? 'flex' : 'none')}; */
    display: ${props => (props.isScrollTop ? 'flex' : 'flex')};
    align-items: center;
    width: 1280px;
    height: 56px;
    margin: 0 auto;
    overflow: visible;
    background-color: transparent;
    z-index: 1000;
  }
  /* .simplebar_conatiner {
    width: 100%;
    height: 100%;
    -ms-overflow-style: none;
    ::-webkit-scrollbar {
      display: none;
    }
    @media all and (min-width: 1280px) {
      overflow: hidden;
      width: calc(100% - 175px);
      -ms-overflow-style: none;
      ::-webkit-scrollbar {
        display: none;
      }
    }
    .simplebar-wrapper,
    .simplebar-height-auto-observer-wrapper,
    .simplebar-mask,
    .simplebar-content-wrapper {
      @media all and (min-width: 1280px) {
        overflow: hidden !important;
        -ms-overflow-style: none;
        ::-webkit-scrollbar {
          display: none;
        }
      }
    }
  } */
  .menu_header {
    position: relative;
    width: 100%;
    height: 52px;
    display: flex;
    align-items: center;
    padding-left: 15px;
    overflow-x: scroll;
    -ms-overflow-style: none;
    ::-webkit-scrollbar {
      display: none;
    }
    @media all and (min-width: 1280px) {
      width: calc(100% - 175px);
      height: 56px;
      padding-left: 0;
      overflow: visible;
    }
    .menu_list {
      position: relative;
      display: flex;
      align-items: center;
      height: 100%;
      > li {
        position: relative;
        display: flex;
        height: 100%;
        margin-right: 16px;
        @media all and (min-width: 1280px) {
          justify-content: center;
          align-items: center;
          padding: 0 16px 0 17px;
          margin-right: 0;
        }
        .new_dot {
          position: absolute;
          display: block;
          right: 0px;
          top: 8px;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background-color: #fd4381;
          @media all and (min-width: 1280px) {
            width: 6px;
            height: 6px;
            right: 7px;
            top: 17px;
          }
        }
        > a {
          position: relative;
          display: inline-flex;
          height: 100%;
          align-items: center;
          font-size: 16px;
          color: #111111;
          box-sizing: border-box;
          padding-bottom: 3px;
          white-space: nowrap;
          @media all and (min-width: 1280px) {
            font-size: 17px;
            font-weight: 500;
            line-height: normal;
          }
        }
      }
      > li.on {
        > a {
          font-weight: 700;
          border-bottom: 3px solid #111111;
          padding-bottom: 0;
        }
      }
      > li.hide_on_mobile {
        display: none;
        @media all and (min-width: 1280px) {
          display: flex;
        }
      }
    }
    > .divide_line {
      display: none;
      width: 1px;
      height: 18px;
      background-color: rgb(234, 234, 234);
      @media all and (min-width: 1280px) {
        display: block;
        margin: 0 20px;
      }
    }
    > .divide_line.last {
      position: absolute;
      right: 258px;
      margin: 0;
    }
    .popular_dropdown {
      display: none;
      position: relative;
      @media all and (min-width: 1280px) {
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: absolute;
        right: 0;
        width: 255px;
        height: 44px;
        margin-bottom: 4px;
      }

      .popular_dropdown_box {
        display: none;
      }
      .slideDropdown_btn {
        position: absolute;
        top: 11px;
        right: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 26px;
        height: 26px;
        background-color: #f4f4f4;
        border-radius: 8px;
      }
    }
  }
  .pc_all_menu_btn_box {
    display: none;
    @media all and (min-width: 1280px) {
      position: relative;
      display: inline-flex;
      justify-content: space-between;
      align-items: center;
      width: 155px;
      height: 100%;
      padding-right: 20px;
      margin-right: 20px;
      cursor: pointer;
    }
    .all_menu_wrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 100%;
      > div {
        width: 24px;
        height: 24px;
      }
      > p {
        font-size: 17px;
        font-weight: 500;
        padding-bottom: 2px;
      }
    }
    > div.divide_line {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 1px;
      height: 20px;
      background-color: #eaeaea;
    }
  }
`;

const DropdownBox = styled.div<{ isMouseOver: boolean }>`
  position: absolute;
  top: -5px;
  right: -21px;
  display: ${props => (props.isMouseOver ? 'flex' : 'none')};
  flex-direction: column;
  width: 297px;
  border: 1px solid #262626;
  border-radius: 8px;
  background-color: #fff;
  z-index: 12;
  padding: 6px 20px 20px 20px;
  .down_header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 44px;
    margin-bottom: 7px;
    .down_header_text {
      display: flex;
      align-items: center;
      height: 100%;
      > p {
        display: inline-block;
        font-size: 14px;
        font-weight: 500;
        color: #111111;
        margin-right: 9.5px;
      }
      > span {
        font-size: 10px;
        color: #8c8c8c;
        padding-top: 1px;
      }
    }
    .dropdown_btn {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 26px;
      height: 26px;
      background-color: #f4f4f4;
      border-radius: 8px;
      > div {
        transform: rotate(180deg);
      }
    }
  }
  .down_contents {
    position: relative;
    width: 100%;
    > li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 44px;
      background-color: #f7f7fa;
      margin-bottom: 1px;
      padding-right: 19px;
      cursor: pointer;
      &:hover {
        background-color: #eaeaf2;
      }
      > p {
        position: relative;
        display: flex;
        align-items: center;
        width: calc(100% - 30px);
        height: 100%;
        > span {
          display: flex;
          align-items: center;
          font-size: 14px;
          &:first-child {
            justify-content: center;
            width: 40px;
            height: 100%;
            font-weight: 700;
          }
          &:last-child {
            display: inline-block;
            width: calc(100% - 40px);
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
          }
        }
      }
      > .term_icon {
        ${theme.flexCenter};
        width: 24px;
        height: 100%;
      }
    }
  }
`;

const KeywordBox = styled.div<{ autoCount?: number; keywordLength?: number }>`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  cursor: pointer;
  overflow: hidden;
  .popular_term {
    position: absolute;
    width: 255px;
    height: ${props => props.keywordLength * 50}px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    top: ${props => props.autoCount * -50}px;
    transition: ${props => props.autoCount !== 0 && 'all 1s ease'};
    li {
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 210px;
      height: 100%;
      > p {
        position: relative;
        width: calc(100% - 24px);
        > span {
          display: inline-block;
          vertical-align: top;
          font-size: 14px;
          &:first-child {
            font-family: 'Poppins', sans-serif;
            font-weight: 700;
            margin-right: 15px;
            padding-top: 1px;
          }
          &:last-child {
            /* vertical-align: top; */
            width: 129px;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
          }
        }
      }
      .up_down_icon {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 24px;
        height: 100%;
      }
    }
    .icon_box {
      margin-right: 25px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      width: 24px;
      > .term_icon {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 10px;
      }
    }
    .dropdown_btn {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 26px;
      height: 26px;
      background-color: #f4f4f4;
      border-radius: 8px;
    }
  }
`;

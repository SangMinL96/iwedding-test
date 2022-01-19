import { Desktop } from '@hooks/useDevice';
import bellIcon from '@images/common/bell_icon_x3.png';
import cartIcon from '@images/common/cart_icon_x3.png';
import hamburgerIcon from '@images/common/hamburger_icon_x3.png';
import zzimIcon from '@images/common/heart_icon_x3.png';
import iwdLogo from '@images/common/iwd_logo_m.png';
import searchIcon from '@images/common/search_icon_x3.png';
import userIcon from '@images/common/user_icon_x3.png';
import { useMyQuotationList } from '@modules/mypage/quotation/QuotationAPI';
import { keyWordCount, useMdBasicKeywordData } from '@modules/search/searchAPI';
import { useAlarmCount, useTalkCount } from '@modules/user/user.api';
import { haveAccessToken } from '@service/TokenService';
import theme from '@styles/theme';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { default as React } from 'react';
import styled from 'styled-components';
import MenuSearchInput from './MenuSearchInput';

interface StickyProps {
  scrollDir: string;
  toggleNoti?: () => void;
  toggleMenu?: () => void;
  isScrollTop?: boolean;
  isFixed?: boolean;
}

const MobileNewHeader = ({ scrollDir, toggleNoti, toggleMenu, isScrollTop, isFixed }: StickyProps) => {
  const router = useRouter();
  const { data: alarm } = useAlarmCount();
  const { metadata } = useMyQuotationList();
  const { data: talk } = useTalkCount();
  const { data } = useMdBasicKeywordData();
  // 스크롤 시 메뉴 감춤
  const isDeskTop = Desktop();

  // const [text, setText] = useState<string>('');

  // To Do : 알림갯수 가져오기

  // 알림센터 팝업 띄우기 및 위치
  // const notiWidth = 435 / 2;
  // const notiHeight = 667 / 2;
  // const offsetX = global.window?.screen.width / 2;
  // const offsetY = global.window?.screen.height / 2;
  // const popX = offsetX - notiWidth;
  // const popY = offsetY - notiHeight;
  // const onClickNoti = () => {
  //   if (haveAccessToken()) {
  //     global.window?.open('https://www.iwedding.co.kr/notification', '_blank', `width=435, height=667, top=${popY}, left=${popX}`);
  //   } else {
  //     alert('로그인 이후 이용가능합니다.');
  //   }
  // };
  const onReplace = (to: string) => ev => {
    ev.preventDefault();
    if (haveAccessToken()) {
      router.push(to);
    } else {
      router.push(`https://www.iwedding.co.kr/member/login?ret_url=${encodeURIComponent(`${process.env.NEXT_PUBLIC_WEB_HOST}${to}`)}`);
    }
  };

  const onSearch = async ev => {
    ev.preventDefault();
    ev.stopPropagation();
    await keyWordCount(data?.[0]?.search_word);
    router.push(`/search/result?keyword=${data?.[0]?.search_word}&tab=all`);
  };

  return (
    <div className={isFixed ? 'fixed_header active' : 'fixed_header'}>
      <Container scrollDir={scrollDir} isScrollTop={isScrollTop} isFixed={isFixed}>
        <div className='pc_all_menu_btn' onClick={toggleMenu}>
          <Image src={hamburgerIcon} alt='전체 메뉴' width={24} height={24} />
        </div>

        <div className={isFixed ? 'logo_box scrolling' : 'logo_box'}>
          <Link href={'/main/index'} passHref>
            <a>
              <Image src={iwdLogo} alt='iwedding logo' layout='fill' />
            </a>
          </Link>
        </div>

        <div className='flex_end_align'>
          {isDeskTop ? (
            <MenuSearchInput />
          ) : (
            <Link href='/search' passHref>
              <div className='search_box'>
                <p>{(data && `${data?.[0]?.search_word}`) || ''}</p>
                <span onClick={onSearch}>
                  <Image src={searchIcon} alt='검색' width={24} height={24} />
                </span>
              </div>
            </Link>
          )}
          <div className='pc_link_btns'>
            <Link href='/' passHref>
              <a onClick={onReplace('/zzim')}>
                <span className='link_btn zzim_btn'>
                  <Image src={zzimIcon} alt='찜 아이콘' width={24} height={24} />
                </span>
              </a>
            </Link>
            <Link href='/' passHref>
              <a onClick={onReplace('https://www.iwedding.co.kr/mypage')}>
                <span className='link_btn mypage_btn'>
                  <Image src={userIcon} alt='마이페이지 아이콘' width={24} height={24} />
                  {talk?.count > 0 ? (
                    talk?.count > 99 ? (
                      <span className='badge'>99</span>
                    ) : (
                      <span className='badge'>{talk?.count}</span>
                    )
                  ) : null}
                </span>
              </a>
            </Link>
            <Link href='/' passHref>
              <a onClick={onReplace('/quotation')}>
                <span className='link_btn cart_link_btn'>
                  <Image src={cartIcon} alt='견적함 아이콘' width={24} height={24} />
                  {metadata?.totalItems > 0 ? (
                    metadata?.totalItems > 99 ? (
                      <span className='badge'>99</span>
                    ) : (
                      <span className='badge'>{metadata?.totalItems}</span>
                    )
                  ) : null}
                </span>
              </a>
            </Link>
          </div>

          <div className='noti_box' onClick={toggleNoti}>
            <span>
              <Image src={bellIcon} alt='알림센터' width={24} height={24} />
              {alarm?.count > 0 ? (
                alarm?.count > 99 ? (
                  <span className='badge'>99</span>
                ) : (
                  <span className='badge'>{alarm?.count}</span>
                )
              ) : null}
            </span>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default MobileNewHeader;

const Container = styled.header<{ scrollDir: string; isScrollTop: boolean; isFixed: boolean }>`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
  height: 50px;
  padding: 0 15px;
  background-color: #fff;
  top: ${props => (props.scrollDir === 'up' ? 0 : '-50px')};
  @media all and (min-width: 1280px) {
    width: 1280px;
    margin: 0 auto;
    padding: 0;
    height: 90px;
    align-items: center;
    top: 0;
  }
  .pc_all_menu_btn {
    display: none;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    margin-right: 30px;
    cursor: pointer;
    @media all and (min-width: 1280px) {
      /* display: ${props => (props.isScrollTop ? 'none' : 'flex')}; */
      display: ${props => (props.isFixed ? 'flex' : 'none')};
    }
  }
  .logo_box {
    position: relative;
    width: 58px;
    height: 46px;
    cursor: pointer;
    > a {
      position: relative;
      display: block;
      width: 100%;
      height: 100%;
    }
    @media all and (min-width: 1280px) {
      width: 88px;
      height: 70px;
      > a {
        > span {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  .logo_box.scrolling {
    margin-left: 0;
    @media all and (min-width: 1280px) {
      margin-left: 55px;
    }
  }
  .flex_end_align {
    display: flex;
    width: calc(100% - 89px);
    height: 44px;
    @media all and (min-width: 1280px) {
      width: auto;
      align-items: center;
    }
    .search_box {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: calc(100% - 46px);
      height: 100%;
      background-color: #f4f4f4;
      border-radius: 8px;
      cursor: pointer;
      padding: 0 12px 0 13px;
      @media all and (min-width: 1280px) {
        width: 460px;
        margin-right: 60px;
      }
      > p {
        font-size: 15px;
        color: #8c8c8c;
      }
      > span {
        ${theme.flexCenter}
        width: 24px;
        height: 24px;
      }
    }
    .pc_link_btns {
      display: none;
      @media all and (min-width: 1280px) {
        display: flex;
        align-items: center;
      }
      .link_btn {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 32px;
        height: 32px;
        margin-right: 25px;
        cursor: pointer;
        > span.badge {
          ${theme.flexCenter};
          position: absolute;
          top: -2px;
          right: -5px;
          width: 20px;
          height: 15px;
          background-color: #fd4381;
          font-size: 10px;
          font-weight: 500;
          font-family: 'Poppins', sans-serif;
          color: #fff;
          border-radius: 10px;
          padding-left: 0.5px;
        }
      }
    }
    .noti_box {
      display: block;
      width: 46px;
      height: 44px;
      padding: 10px 7px 10px 15px;
      cursor: pointer;
      @media all and (min-width: 1280px) {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 32px;
        height: 32px;
        padding: 0;
      }
      > span {
        position: relative;
        ${theme.flexCenter}
        width: 24px;
        height: 24px;
        .badge {
          ${theme.flexCenter};
          position: absolute;
          top: -5px;
          right: -8px;
          width: 20px;
          height: 15px;
          background-color: #fd4381;
          font-size: 10px;
          font-weight: 500;
          font-family: 'Poppins', sans-serif;
          color: #fff;
          border-radius: 10px;
          padding-left: 0.5px;
        }
      }
    }
  }
`;

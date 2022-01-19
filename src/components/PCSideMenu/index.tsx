import { Desktop } from '@hooks/useDevice';
import { openChatList } from '@modules/mypage/quotation/QuotationAPI';
import { useTalkCount } from '@modules/user/user.api';
import theme from '@styles/theme';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';

const SideMenu = styled.div`
  width: 160px;
  display: inline-block;
  @media all and (max-width: ${theme.pc}px) {
    display: none;
  }

  .side-menu-list {
    width: 100%;
    font-size: 16px;
    font-weight: 300;
    color: #8c8c8c;

    .side-menu-item {
      cursor: pointer;
      margin-bottom: 15px;
      &:nth-child(1),
      &:nth-child(2),
      &:nth-child(6),
      &:nth-child(9),
      &:nth-child(13) {
        margin-bottom: 35px;
      }
    }
    .talk_count {
      ${theme.flexCenter};
      justify-content: flex-start;
      span {
        padding: 1px 4px 2px;
        border-radius: 10px;
        background-color: #fd4381;
        font-size: 6px;
        color: white;
        margin-left: 3px;
      }
    }
    .side-menu-item.active {
      color: #262626;
      font-weight: 700;
      text-decoration: underline;
      > a {
        color: #262626;
      }
    }
  }

  .banner-box {
    width: 160px;
    margin-top: 25px;

    > a {
      display: block;
      width: 100%;
      height: 100%;
      &:first-child {
        margin-bottom: 15px;
      }
      > img {
        display: block;
        width: 100%;
      }
    }
  }
`;

const PCSideMenu = () => {
  const router = useRouter();
  const isDeskTop = Desktop();
  const { data: talk } = useTalkCount();

  // const isQuotation = useMemo(() => {
  //   if (location.href) {
  //     return location.href.includes('quotation') ? 'active' : '';
  //   }
  // }, [location.href]);

  // const isOrder = useMemo(() => {
  //   if (location.href) {
  //     return location.href.includes('order') ? 'active' : '';
  //   }
  // }, [location.href]);

  // const isIcash = useMemo(() => {
  //   if (location.href) {
  //     return location.href.includes('icash') ? 'active' : '';
  //   }
  // }, []);

  // const isZzim = useMemo(() => {
  //   if (location.href) {
  //     return location.href.includes('zzim') ? 'active' : '';
  //   }
  // }, [location.href]);

  return (
    <SideMenu>
      <ul className='side-menu-list'>
        <li className='side-menu-item'>
          <a href='/mypage'>홈</a>
        </li>
        {/*<li className='side-menu-item'>*/}
        {/*  <Link to='/'>My 웨딩플래닝</Link>*/}
        {/*</li>*/}
        <li className={`side-menu-item ${router.asPath.includes('quotation') && 'active'}`}>
          <Link href='/quotation' passHref>
            <a>견적함</a>
          </Link>
        </li>
        <li className={`side-menu-item ${router.asPath.includes('coupon') && 'active'}`}>
          <Link href='/coupon' passHref>
            <a>쿠폰함</a>
          </Link>
        </li>
        <li className={`side-menu-item ${router.asPath.includes('icash') && 'active'}`}>
          <Link href='/icash' passHref>
            <a>아이캐시</a>
          </Link>
        </li>
        <li className={`side-menu-item ${router.asPath.includes('zzim') && 'active'}`}>
          <Link href='/zzim' passHref>
            <a>찜</a>
          </Link>
        </li>
        <li className={`side-menu-item ${router.asPath.includes('order') && 'active'}`}>
          <Link href='/order' passHref>
            <a>결제내역</a>
          </Link>
        </li>
        {/*<li className='side-menu-item'>*/}
        {/*  <Link to='/'>스케줄</Link>*/}
        {/*</li>*/}
        <li className='side-menu-item'>
          <Link href='/mypage/usage_review'>
            <a>이용후기</a>
          </Link>
        </li>
        <li className={`side-menu-item ${router.asPath.includes('request') && 'active'}`}>
          <Link href='/request'>
            <a>문의내역</a>
          </Link>
        </li>

        <li className={`side-menu-item`}>
          <a className={`talk_count`} onClick={() => openChatList(isDeskTop)}>
            <div>웨딩톡</div> {talk?.count > 0 ? talk?.count > 99 ? 99 : <span>{talk?.count || 0}</span> : null}
          </a>
        </li>
        <li className='side-menu-item'>
          <Link href='/mypage/pw_check'>
            <a>내 정보수정</a>
          </Link>
        </li>

        <li className='side-menu-item'>
          <Link href='/mypage/member_exit'>
            <a>회원탈퇴</a>
          </Link>
        </li>
      </ul>
    </SideMenu>
  );
};
export default React.memo(PCSideMenu);

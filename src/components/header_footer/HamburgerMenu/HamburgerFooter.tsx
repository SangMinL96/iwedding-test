import { haveAccessToken } from '@service/TokenService';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import appInstallImg from '@images/common/iwedding_app_install.jpg';
import theme from '@styles/theme';
import { useUserInfo } from '@modules/user/user.api';

const HamburgerFooter = () => {
  const isLoggedIn = haveAccessToken();
  const { data } = useUserInfo();
  return (
    <Container>
      <div />
      {/* <Link href='http://app.iwedding.co.kr/' passHref>
        <div className='app_down_box'>
          <Image src={appInstallImg} alt='iwedding app install' width={24} height={24} />
          <p>아이웨딩 앱 설치하기</p>
        </div>
      </Link> */}
      {!isLoggedIn ? (
        <div className='login_menu'>
          <Link href='https://www.iwedding.co.kr/member/login'>로그인</Link>
          <VerticalDivider />
          <Link href='https://www.iwedding.co.kr/member/join'>회원가입</Link>
        </div>
      ) : (
        <div className='login_menu'>
          {data?.user_name === 'test1' && <Link href='/chat'>test1계정만------</Link>}

          <Link href='https://www.iwedding.co.kr/member/logout'>로그아웃</Link>
        </div>
      )}
      {/* <VerticalDivider /> */}
      {/* <Link href='/terms'>회원약관</Link> */}
      {/* <VerticalDivider /> */}
      {/* <Link href='/privateinfo'>개인정보처리방침</Link> */}
    </Container>
  );
};

export default HamburgerFooter;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 46px;
  padding-top: 10px;
  .app_down_box {
    display: flex;
    cursor: pointer;
    align-items: center;
    > p {
      font-size: 13px;
      font-weight: 700;
      color: #4866e4;
      margin-left: 8px;
    }
  }
  .login_menu {
    display: flex;
    align-items: center;
    > a {
      font-size: 13px;
      color: ${theme.black};
    }
  }
`;

const VerticalDivider = styled.div`
  width: 1px;
  height: 13px;
  background-color: #eaeaea;
  margin: 0 10px 0 8px;
`;

import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { clearToken, haveAccessToken } from '@service/TokenService';
import router from 'next/router';
import useSWR from 'swr';
import { useUserInfo } from '@modules/user/user.api';
type PropsType = {
  isScrollTop?: boolean;
};
const LoginMenu = ({ isScrollTop }: PropsType) => {
  const { data } = useUserInfo();

  return (
    // <Container className={isScrollTop ? 'login_menu' : 'login_menu hide'}>
    <Container>
      {!haveAccessToken() ? (
        <Link href={`https://www.iwedding.co.kr/member/login?ret_url=${global.window && encodeURIComponent(window.location.href)}`}>
          로그인222
        </Link>
      ) : (
        <>
          <div>{data?.user_name !== '' && data?.user_name ? `${data?.user_name}님, 안녕하세요!` : '안녕하세요!'}</div>
          <Link href={`https://www.iwedding.co.kr/member/logout`}>로그아웃</Link>
        </>
      )}

      {haveAccessToken() ? (
        <Link href='/request'>문의하기</Link>
      ) : (
        <Link href={`https://www.iwedding.co.kr/member/join?ret_url=${global.window && encodeURIComponent(window.location.href)}`}>
          회원가입
        </Link>
      )}
    </Container>
  );
};

export default LoginMenu;

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  width: 1280px;
  height: 30px;
  margin: 0 auto;
  > a {
    display: inline-block;
    font-size: 13px;
    color: #8c8c8c;
    margin-right: 20px;
    &:last-child {
      margin-right: 0;
    }
  }
  > div {
    display: inline-block;
    font-size: 13px;
    color: #8c8c8c;
    margin-right: 20px;
  }
`;

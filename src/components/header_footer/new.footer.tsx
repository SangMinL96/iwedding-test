import ifamilyLogo from '@images/common/ifamily_logo_big.png';
import appDownIcon from '@images/common/iwedding_app_install.jpg';
import kcpLogo from '@images/common/kcp_logo.jpg';
import { openWeb } from '@utils/appOpen';
import { isWebview } from '@utils/isWebview';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';

const NewFooter = () => {
  const router = useRouter();
  const Webview = isWebview();
  if (router.route === '/alarm') return null;
  return (
    <Container>
      <ul className='footer_nav'>
        <li className='hide_on_mobile'>
          <p>(주)아이패밀리SC</p>
        </li>
        <li>
          {Webview ? (
            <div onClick={() => openWeb('https://www.ifamily.co.kr/company')}>회사소개</div>
          ) : (
            <a target='_blank' href='https://www.ifamily.co.kr/company' rel='noreferrer'>
              회사소개
            </a>
          )}
        </li>
        <li>
          {Webview ? (
            <div onClick={() => openWeb('https://www.ifamily.co.kr/company/partner')}>제휴문의</div>
          ) : (
            <a target='_blank' href='https://www.ifamily.co.kr/company/partner' rel='noreferrer'>
              제휴문의
            </a>
          )}
        </li>
        <li>
          {Webview ? (
            <div onClick={() => openWeb('https://www.ifamily.co.kr/sub/member_terms')}>회원약관</div>
          ) : (
            <a target='_blank' href='https://www.ifamily.co.kr/sub/member_terms' rel='noreferrer'>
              회원약관
            </a>
          )}
        </li>
        <li>
          {Webview ? (
            <div onClick={() => openWeb('https://www.ifamily.co.kr/sub/personal_privacy')}>개인정보처리방침</div>
          ) : (
            <a target='_blank' href='https://www.ifamily.co.kr/sub/personal_privacy' rel='noreferrer'>
              개인정보처리방침
            </a>
          )}
        </li>
      </ul>
      <div className='footer_info'>
        <p className='company_name'>(주)아이패밀리SC</p>

        <ul className='company_info_box'>
          <li>
            <span className='info_title'>주소&nbsp;</span>
            <span className='info_content'>서울시 강남구 논현로150길7</span>
          </li>
          <li>
            <div>
              <span className='info_title'>팩스 번호&nbsp;</span>
              <span className='info_content'>02-6910-4111</span>
            </div>
            <div>
              <span className='info_title'>대표전화&nbsp;</span>
              <span className='info_content'>02-540-4112</span>
            </div>
          </li>
          <li>
            <span className='info_title'>이메일&nbsp;</span>
            <span className='info_content'>iweddingplus@iwedding.co.kr</span>
          </li>
          <li>
            <span className='info_title'>사업자 등록번호&nbsp;</span>
            <span className='info_content'>120-86-00633</span>
          </li>
          <li>
            <span className='info_title'>통신판매업 신고번호&nbsp;</span>
            <span className='info_content'>강남 제2927호 대표자 김태욱, 김성현</span>
          </li>
        </ul>

        <p className='copyright_text'>COPYRIGHT ⓒ iFamily sc Co.,Ltd. All Rights Reserved.</p>

        <div className='footer_logo_box'>
          <Link passHref href={'http://app.iwedding.co.kr'}>
            <div className='app_down_btn hide_on_mobile'>
              <Image src={appDownIcon} alt='app download' width={64} height={64} />
              <span>
                아이웨딩
                <br />앱 다운로드
              </span>
            </div>
          </Link>
          <div className='kcp_logo'>
            <Image src={kcpLogo} alt='kcp_logo' width={64} height={64} />
            <span className='hide_on_mobile'>
              NHN KCP 구매안전(에스크로) 서비스
              <br />
              고객님은 안전거래를 위해 현금 등으로 결제 시<br />
              저희 쇼핑몰에 가입한 NHN KCP의 구매 안전 서비스를 이용하실 수 있습니다.
            </span>
          </div>
        </div>

        <div className='ifamily_logo'>
          <Image src={ifamilyLogo} width={130} height={130} alt='ifamily logo' />
        </div>
      </div>
    </Container>
  );
};

export default React.forwardRef(NewFooter);

const Container = styled.footer`
  position: relative;
  width: 100%;
  background-color: #fff;
  padding-bottom: 95px;
  @media all and (min-width: 1024px) {
    padding-top: 35px;
    border-top: 1px solid #eaeaea;
  }
  .footer_nav {
    display: flex;
    width: 100%;
    height: 46px;
    border-top: 1px solid #eaeaea;
    border-bottom: 1px solid #eaeaea;
    padding-left: 15px;
    @media all and (min-width: 1024px) {
      width: 1280px;
      margin: 0 auto 26px auto;
      border-top: 0;
      border-bottom: 0;
      padding-left: 0;
    }
    > li {
      display: flex;
      align-items: center;
      height: 100%;
      margin-right: 10px;
      @media all and (min-width: 1024px) {
        height: auto;
        margin-right: 20px;
      }
      > a {
        display: block;
        border-right: 1px solid #eaeaea;
        font-size: 13px;
        padding-right: 9px;
        @media all and (min-width: 1024px) {
          font-size: 14px;
          padding-right: 20px;
        }
      }
      > div {
        display: block;
        border-right: 1px solid #eaeaea;
        font-size: 13px;
        padding-right: 9px;
        @media all and (min-width: 1024px) {
          font-size: 14px;
          padding-right: 20px;
        }
      }
      &:first-child {
        display: none;
        @media all and (min-width: 1024px) {
          display: flex;
          margin-right: 43px;
        }
        > p {
          font-size: 15px;
          font-weight: 700;
        }
      }
      &:last-child {
        > a {
          border-right: 0;
        }
      }
    }
  }
  .footer_info {
    position: relative;
    width: 100%;
    padding: 25px 0 0 13px;
    @media all and (min-width: 1024px) {
      width: 1280px;
      margin: 0 auto;
      padding: 0;
    }
    .company_name {
      display: block;
      font-size: 12px;
      font-weight: 700;
      color: #444444;
      margin-bottom: 10px;
      @media all and (min-width: 1024px) {
        display: none;
      }
    }
    .copyright_text {
      display: block;
      font-size: 10px;
      color: #aaaaaa;
      @media all and (min-width: 1024px) {
        font-size: 11px;
        letter-spacing: 1px;
      }
    }
    .company_info_box {
      width: 100%;
      margin-bottom: 20px;
      @media all and (min-width: 1024px) {
        width: 720px;
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 5px;
      }
      > li {
        display: flex;
        align-items: center;
        margin-bottom: 5px;
        @media all and (min-width: 1024px) {
          margin-bottom: 10px;
          margin-right: 12px;
        }
        .info_title {
          display: inline-block;
          font-size: 12px;
          @media all and (min-width: 1024px) {
            font-size: 13px;
          }
        }
        .info_content {
          font-size: 12px;
          color: #767676;
          @media all and (min-width: 1024px) {
            font-size: 13px;
          }
        }
        > div {
          display: inline-block;
          margin-right: 5px;
        }
      }
    }
    .footer_logo_box {
      @media all and (min-width: 1024px) {
        position: relative;
        display: flex;
        align-items: center;
        width: 100%;
        height: 64px;
        margin-top: 40px;
      }
      .app_down_btn {
        display: none;
        @media all and (min-width: 1024px) {
          display: flex;
          align-items: center;
          height: 64px;
        }
        > span {
          display: block;
          font-size: 14px;
          line-height: 20px;
          color: #444444;
          font-weight: 700;
          margin-left: 20px;
        }
      }
      .kcp_logo {
        position: absolute;
        top: 45px;
        right: 15px;
        width: 64px;
        height: 64px;
        @media all and (min-width: 1024px) {
          position: relative;
          top: unset;
          right: unset;
          display: flex;
          align-items: center;
          width: auto;
          height: 64px;
          margin-left: 60px;
        }
        > span {
          display: none;
          @media all and (min-width: 1024px) {
            display: inline-block;
            font-size: 12px;
            line-height: 19px;
            margin-left: 20px;
          }
        }
      }
    }
    .ifamily_logo {
      display: none;
      @media all and (min-width: 1024px) {
        display: block;
        position: absolute;
        top: -70px;
        right: 0;
        width: 125px;
        height: 128px;
      }
    }
  }
`;

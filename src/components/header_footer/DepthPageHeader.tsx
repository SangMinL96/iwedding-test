import React from 'react';
import theme from '@styles/theme';
import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import arrow from '@images/common/right_arrow.png';
import homeIcon from '@images/common/home_icon_x3.png';
import cartIcon from '@images/common/cart_icon_x3.png';
import searchIcon from '@images/common/search_icon_x3.png';
import { useRouter } from 'next/router';
import { useMyQuotationList } from '@modules/mypage/quotation/QuotationAPI';

type PropsType = {
  title?: string;
};

const DepthPageHeader = ({ title = '상세정보' }: PropsType) => {
  const router = useRouter();
  const { metadata } = useMyQuotationList();

  return (
    <Container>
      <div className='detail_header_btns'>
        {/* <Link href={'/'} passHref> */}
        <div className='detail_header_btn go_back_btn' onClick={() => router.back()}>
          <Image src={arrow} alt='back' width={20} height={17} />
        </div>
        {/* </Link> */}
        <Link href={'/main/index'} passHref>
          <div className='detail_header_btn go_home_btn'>
            <Image src={homeIcon} alt='home' />
          </div>
        </Link>
      </div>

      <div className='detail_page_title'>
        <p>{title}</p>
      </div>

      <div className='detail_header_btns'>
        <Link href={'/quotation'} passHref>
          <div className='detail_header_btn go_cart_btn'>
            <Image src={cartIcon} alt='cart' />
            {metadata?.totalItems > 0 ? (
              metadata?.totalItems > 99 ? (
                <span className='badge'>99</span>
              ) : (
                <span className='badge'>{metadata?.totalItems}</span>
              )
            ) : null}
          </div>
        </Link>
        <Link href={'/search'} passHref>
          <div className='detail_header_btn go_search_btn'>
            <Image src={searchIcon} alt='search' />
          </div>
        </Link>
      </div>
    </Container>
  );
};

export default DepthPageHeader;

const Container = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 50px;
  padding: 0 15px;
  background-color: #fff;
  z-index: 11;
  .detail_header_btns {
    display: flex;
    align-items: center;
    height: 100%;
    .detail_header_btn {
      ${theme.flexCenter};
      position: relative;
      width: 24px;
      height: 100%;
      /* 뱃지 나중에 컴포넌트로 빼기 */
      .badge {
        ${theme.flexCenter};
        position: absolute;
        top: 8px;
        right: -10px;
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
    .detail_header_btn.go_back_btn {
      justify-content: flex-start;
      margin-right: 15px;
      > span {
        transform: rotate(180deg);
      }
    }
    .detail_header_btn.go_search_btn {
      justify-content: flex-end;
      margin-left: 15px;
    }
  }
  .detail_page_title {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    > p {
      font-size: 16px;
      color: #111111;
    }
  }
`;

import { showPrice } from '@utils/util';
import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import IconRankingMark from '@styles/svgs/icon_ranking_mark';
import { Desktop } from '@hooks/useDevice';

type PropsType = {
  data: any;
  index?: number;
};
const VerticalItem = ({ data, index }: PropsType) => {
  const isDesktop = Desktop();
  const salePrice = parseInt(data?.product_price) - parseInt(data?.price);
  const discount = (salePrice / parseInt(data?.product_price)) * 100;
  return (
    <Link passHref href={`${process.env.NEXT_PUBLIC_WEB_HOST}/enterprise/prd/${data?.enterprise_code}/${data?.no}`}>
      <Item>
        <div className='img_box'>
          <Image src={`${process.env.NEXT_PUBLIC_WEB_HOST}/center/iweddingb/product/500_${data?.thumb}`} alt='sample' layout='fill' />
          <div className='item_badge'>
            <IconRankingMark width={isDesktop ? '40' : '27'} height={isDesktop ? '50' : '33'} />
            <span>{index + 1}</span>
          </div>
        </div>
        <div className='text_box_2021'>
          <span className='company_name'>{data?.category}</span>
          <p className='prd_title'>{data?.name}</p>
          {/* <span className='prd_sub_title'>prd_sub_title</span> */}
          <div className='price_info_box'>
            {data.product_price === data.price ? (
              <>
                <span className='current_price'>{data.price !== 0 ? `${showPrice(data.price)} 원` : data.price_txt}</span>
              </>
            ) : (
              <>
                <span className='prev_price'>{showPrice(data.product_price)}</span>
                <span className='sale_per'>{Math.round(discount)}%</span>
                <span className='current_price'>{showPrice(data.price)} 원</span>
              </>
            )}
          </div>
        </div>
      </Item>
    </Link>
  );
};

export default VerticalItem;
const Item = styled.a`
  position: relative;
  display: block;
  width: 130px;
  height: 100%;
  overflow: hidden;
  .img_box {
    position: relative;
    width: 130px;
    height: 130px;
    > img {
      display: block;
      width: 100%;
      height: 100%;
    }
    .item_badge {
      display: inline-block;
      align-items: center;
      position: absolute;
      top: 0;

      left: 0;
      color: #fff;
      text-align: center;
      vertical-align: middle;
      > span {
        position: absolute;
        top: 5%;
        left: 50%;
        transform: translate(-50%, 50%);
        fill: rgb(255, 255, 255);
        font-size: 16px;
        font-family: Poppins-Bold, Poppins;
        font-weight: 700;
        text-anchor: middle;
        @media all and (max-width: 1280px) {
          top: -4%;
          font-size: 14px;
        }
      }
    }
  }
  .text_box_2021 {
    /* height: 200px; */
    margin-top: 12px;
    .company_name {
      display: block;
      font-size: 12px;
      margin-bottom: 2px;
      color: #8c8c8c;
      line-height: 20px;
    }
    .prd_title {
      font-size: 13px;
      line-height: 20px;
      color: #111111;
      padding-right: 15px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2; /* 라인수 */
      -webkit-box-orient: vertical;
    }
    .price_info_box {
      margin-top: 10px;
      @media all and (max-width: 1280px) {
        margin-top: 7px;
      }
      .prev_price {
        display: block;
        font-size: 14px;
        line-height: 20px;
        color: #8c8c8c;
        text-decoration: line-through;
        margin-bottom: 5px;
        @media all and (max-width: 1280px) {
          font-size: 13px;
          line-height: 19px;
          margin-bottom: 2px;
        }
      }
      .sale_per,
      .current_price {
        font-size: 16px;
        font-weight: 700;
        line-height: 24px;
        @media all and (max-width: 1280px) {
          font-size: 14px;
        }
      }
      .sale_per {
        color: #fd4381;
        margin-right: 5px;
      }
      .current_price {
        color: #262626;
      }
    }
  }
`;

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { isMobile } from 'react-device-detect';
import { MainDataType } from '@modules/main/interface';
import { isWebview } from '@utils/isWebview';
import { openNewTab } from '@utils/util';
import { haveAccessToken } from '@service/TokenService';
import router, { useRouter } from 'next/router';

type PropsType = {
  data: MainDataType;
};

const Container = styled.div`
  position: relative;
  width: 1280px;
  min-width: 1280px;
  margin: 0 auto 80px auto;
  overflow: hidden;
  @media all and (max-width: 1280px) {
    width: 100%;
    min-width: auto;
    margin-bottom: 30px;
    padding: 0 15px;
  }
  .category_list {
    width: 100%;
    height: 100%;
    @media all and (max-width: 1280px) {
      width: 100%;
      height: 100%;
      /* padding-top: 10px; */
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      justify-items: center;
      row-gap: 8px;
    }
  }
  .bottom_divide_line {
    display: none;
    @media all and (max-width: 1280px) {
      display: block;
      width: 100%;
      height: 1px;
      background-color: rgb(234, 234, 234);
      margin-top: 20px;
    }
  }
`;

const Category = styled.li`
  display: inline-block;
  width: 132px;
  height: 100%;
  margin-right: 28px;
  @media all and (max-width: 1280px) {
    display: block;
    width: 86px;
    height: 100%;
    margin-right: 0;
  }
  > a {
    display: block;
    width: 100%;
    height: 100%;
    cursor: pointer;
    .category_img_box {
      width: 100%;
      height: 132px;
      border-radius: 50%;
      overflow: hidden;
      @media all and (max-width: 1280px) {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        overflow: hidden;
        margin: 0 auto;
      }
      > img {
        width: 100%;
      }
    }
    .category_text_box {
      width: 100%;
      margin-top: 14px;
      text-align: center;
      @media all and (max-width: 1280px) {
        width: 100%;
        margin-top: 7px;
        text-align: center;
      }
      > p {
        font-size: 16px;
        color: #262626;
        line-height: 24px;
        margin-bottom: 3px;
        font-weight: 500;
        @media all and (max-width: 1280px) {
          font-size: 12px;
          color: #262626;
          line-height: 14px;
          font-weight: 400;
        }
      }
      > span {
        font-size: 14px;
        line-height: 20px;
        color: #666666;
      }
    }
  }
`;

const MainTypeIcon = ({ data: { item_list } }: PropsType) => {
  const router = useRouter();
  const onClick = (item: any) => {
    if (isMobile) {
      router.push(item.url_mobile);
    } else {
      if (item.popup_width !== '0') {
        window.open(item.url_pc, item.url_target, `width=${item.popup_width} height=${item.popup_height}`);
      } else {
        window.open(item.url_pc, item.url_target === '' ? '_self' : item.url_target);
      }
    }
  };

  // console.log(item_list);
  return (
    <Container>
      <ul className='category_list'>
        {item_list?.map((item: any) => (
          <Category key={item.no}>
            <a onClick={() => onClick(item)}>
              <div className='category_img_box'>
                <img src={isMobile ? item.img_mobile : item.img_pc} />
              </div>
              <div className='category_text_box'>
                <p>{item.title}</p>
                {isMobile ? null : <span>{item.sub_title}</span>}
              </div>
            </a>
          </Category>
        ))}
      </ul>
      <div className='bottom_divide_line'></div>
    </Container>
  );
};

export default MainTypeIcon;

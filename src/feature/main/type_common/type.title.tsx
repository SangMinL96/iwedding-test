import { MainDataType } from '@modules/main/interface';
import IconMainBannerArrow from '@svgs/icon_main_banner_arrow';
import React from 'react';
import { isMobile } from 'react-device-detect';
import styled from 'styled-components';

type PropsType = {
  data: MainDataType;
  isTypeThree?: boolean;
};

const TypeTitle = ({ data, isTypeThree }: PropsType) => {
  return (
    // Container에 className 붙인거는 부모 컴포넌트에서 no_tab 스타일 제어하기 위해 붙인 것
    <Container className={`type_title ${data.item_list[0].tag === undefined ? 'no_tab' : ''}`} isTypeThree={isTypeThree}>
      <div className='left_side_title'>
        <p>{data.title}</p>
        <span>{data.sub_title}</span>
      </div>
      {data.more_btn_view_flag > 0 ? (
        <div className='more_view_btn'>
          <a
            href={isMobile ? data.more_btn_mobile_url : data.more_btn_pc_url}
            target={data.more_btn_url_target}
            // onClick={() => onClick(data)}
          >
            <span>더보기</span>
            <IconMainBannerArrow type='right' color='black' />
          </a>
        </div>
      ) : null}
    </Container>
  );
};

export default TypeTitle;

const Container = styled.div<{ isTypeThree: boolean }>`
  position: relative;
  width: 100%;
  height: 40px;
  margin-bottom: 20px;
  @media all and (max-width: 1280px) {
    padding: 0 0 0 15px;
    height: auto;
    min-height: 20px;
    margin-bottom: 10px;
  }
  .left_side_title {
    height: 100%;
    > p {
      display: inline-block;
      font-size: 24px;
      font-weight: 500;
      color: #262626;
      margin-right: 14px;
      line-height: 40px;
      vertical-align: middle;
      @media all and (max-width: 1280px) {
        font-size: 18px;
        font-weight: 700;
        height: 25px;
        display: block;
      }
    }
    > span {
      display: inline-block;
      font-size: 14px;
      color: #666666;
      line-height: 40px;
      vertical-align: middle;
      @media all and (max-width: 1280px) {
        font-size: 12px;
      }
    }
  }
  .more_view_btn {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    @media all and (max-width: 1280px) {
      right: ${props => (props.isTypeThree ? 0 : '15px')};
    }
    > a {
      display: flex;
      font-size: 15px;
      font-weight: 700;
      cursor: pointer;
      @media all and (max-width: 1280px) {
        font-size: 13px;
      }
      > div {
        margin-left: 5px;
        @media all and (max-width: 1280px) {
          margin-top: 1.5px;
        }
      }
    }
  }
`;

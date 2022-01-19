import React from 'react';
import styled from 'styled-components';
import { isMobile } from 'react-device-detect';
import { MainDataType } from '@modules/main/interface';
import { Desktop } from '@hooks/useDevice';

type PropsType = {
  data: MainDataType;
};

const Container = styled.div`
  position: relative;
  overflow: hidden;
  /* width: 1280px; */
  min-width: 1280px;
  max-width: 1920px;
  margin: 0 auto 80px auto;
  @media all and (max-width: 1280px) {
    width: 100%;
    min-width: auto;
    margin: 0 auto 50px auto;
  }
  > p {
    margin: 0 auto;
    > img {
      display: block;
      margin: 0 auto;
      @media all and (max-width: 1280px) {
        width: 100%;
      }
    }
  }
  > div {
    position: relative;
    margin: 0 auto;
    @media all and (max-width: 1280px) {
      width: 100%;
    }
    > p {
      display: block;
      @media all and (max-width: 1280px) {
        margin: 0 auto;
        width: 100%;
      }
      > img {
        display: block;
        margin: 0 auto;
        @media all and (max-width: 1280px) {
          width: 100%;
        }
      }
      > a {
        margin: 0 auto;
        @media all and (max-width: 1280px) {
          display: block;
          width: 100%;
          > img {
            margin: 0 auto;
            display: block;
            @media all and (max-width: 1280px) {
              width: 100%;
            }
          }
        }
      }
    }
    > a {
      margin: 0 auto;
      display: block;
      @media all and (max-width: 1280px) {
        width: 100%;
      }
      > img {
        margin: 0 auto;
        display: block;
        @media all and (max-width: 1280px) {
          width: 100%;
        }
      }
    }
    > img {
      margin: 0 auto;
      display: block;

      @media all and (max-width: 1280px) {
        width: 100%;
      }
    }
  }
`;

const MainTypeBanner = ({ data: { item_list } }: PropsType) => {
  const type8PcData = item_list.pc_html;
  const type8MoData = item_list.mobile_html;
  const deskTop = Desktop();
  return (
    <Container>
      {deskTop ? (
        <div dangerouslySetInnerHTML={{ __html: type8PcData }}></div>
      ) : (
        <div dangerouslySetInnerHTML={{ __html: type8MoData }}></div>
      )}
    </Container>
  );
};

export default MainTypeBanner;

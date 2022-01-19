import React, { useEffect } from 'react';
import styled from 'styled-components';
import IcashIndexItem from './icash.index.item';
import backBtn from '@images/common/back_btn.png';
import { logIcashClickBanner } from '../../modules/user/UserLogAPI';
import { schemeOrTab } from '@utils/util';
import { IcashBannerURl } from '@feature/icash/icash.index';
import theme from '@styles/theme';
import Image from 'next/image';
import useSWR from 'swr';
import { getMissionCategoryListAPI, icashKeys } from '@modules/mypage/icash/api';
import icash_banner01 from '@images/common/icash_banner01-2.jpg';
import icash_banner01m from '@images/common/icash_banner01_m.jpg';
import { useRouter } from 'next/router';
import Loading from '@components/Loading';
// 비회원도 볼 수 있는 미션 리스트

const IcashNoneLoginIndex = () => {
  const router = useRouter();
  const { data: missionCategoryList, isValidating, mutate: listMutate } = useSWR(icashKeys.getMissionCategoryList, () => null);
  const onSiteLog = async () => {
    try {
      const result = await logIcashClickBanner(`${process.env.NEXT_PUBLIC_WEB_HOST}/icash-public/`);
      console.log(result);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    onSiteLog();
    listMutate(() => getMissionCategoryListAPI(), false);
  }, [listMutate]);
  if (isValidating) return <Loading />;
  return (
    <>
      <Container>
        <div className='m-page-header'>
          <button className='back-btn' onClick={() => router.back()}>
            <Image unoptimized width={9} height={18} src={backBtn} alt='뒤로가기' />
          </button>
          <span>아이캐시 충전소</span>
        </div>
        <div className='logout_list_box'>
          <p className='header_title'>아이캐시 충전소</p>

          <IcashBanner
            onClick={() => {
              schemeOrTab(IcashBannerURl);
            }}
          >
            <div className='banner_link_area' />
          </IcashBanner>

          <div className='mission_list_box'>
            <ul className='mission_list'>
              {missionCategoryList && missionCategoryList.map(item => <IcashIndexItem category={item} key={item.no} />)}
            </ul>
          </div>
        </div>
        {/*<IcashDetail active={isDesktop && selectedMissionCategory != null} />*/}
      </Container>
    </>
  );
};
export default IcashNoneLoginIndex;
const Container = styled.div`
  width: 100%;
  position: relative;
  .m-page-header {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 44px;
    border-bottom: 1px solid #dddddd;
    background-color: #fff;
    justify-content: center;
    align-items: center;
    z-index: 11;
    @media all and (max-width: ${theme.pc}px) {
      display: flex;
    }
    > span {
      font-size: 15px;
    }
    .back-btn {
      ${props => props.theme.resetBtnStyle}
      width: 21px;
      height: 43px;
      ${props => props.theme.flexCenter}
      position: absolute;
      top: 0;
      left: 6px;
      > img {
        width: 9px;
        height: 18px;
      }
    }
  }
  .logout_list_box {
    display: block;
    width: 1280px;
    min-width: 1280px;

    margin: 0 auto;
    background-color: #fff;
    @media all and (max-width: ${theme.pc}px) {
      width: 100%;
      min-width: 375px;
      padding: 70px 15px 0 15px;
    }
    .header_title {
      display: block;
      font-size: 32px;
      font-weight: 700;
      margin: 70px 0 53px 0;
      @media all and (max-width: ${theme.pc}px) {
        display: none;
      }
    }
    .mission_list_box {
      margin-bottom: 100px;
      .mission_list {
        display: flex;
        flex-wrap: wrap;
        > li {
          width: 410px;
          margin-right: 25px;
          @media all and (max-width: ${theme.pc}px) {
            width: 100%;
            margin-right: 0;
          }
          &:nth-child(3n) {
            margin-right: 0;
          }
        }
      }
    }
  }
`;
const IcashBanner = styled.div`
  position: relative;
  width: 100%;
  height: 360px;
  color: #626262;
  cursor: pointer;
  margin-bottom: 50px;
  background: url(${icash_banner01.src}) no-repeat;
  background-size: cover;
  @media all and (max-width: ${theme.pc}px) {
    background: url(${icash_banner01m.src}) no-repeat;
    background-size: contain;
    width: 100%;
    height: 104vw;
  }
  .banner_link_area {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 80px;
    cursor: pointer;
    @media all and (max-width: ${theme.pc}px) {
      height: 14.66vw;
    }
  }
`;

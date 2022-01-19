import React, { useEffect } from 'react';
import styled from 'styled-components';
const ActiveContainer = dynamic(() => import('@components/core/containers/ActiveContainer'));
const IcashIndexItem = dynamic(() => import('../icash.index.item'));
import { schemeOrTab } from '@utils/util';
import banner02 from '@images/common/icash_banner02.jpg';
import banner02m from '@images/common/icash_banner02_m.jpg';
import theme from '@styles/theme';
import useSWR from 'swr';
import { getMissionCategoryListAPI, icashKeys } from '@modules/mypage/icash/api';
import { IcashBannerURl } from '@feature/icash/icash.index';
import dynamic from 'next/dynamic';

// 미션 리스트

interface IcashIndexProps {
  active: boolean;
  icash?: any;
}

const MissionListIndex = ({ active, icash }: IcashIndexProps) => {
  const { data, mutate } = useSWR(icashKeys.getMissionCategoryList, () => getMissionCategoryListAPI());

  const onClickBanner = async () => {
    try {
      schemeOrTab(IcashBannerURl);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    mutate(getMissionCategoryListAPI(), false);
  }, [mutate, icash]);

  return (
    <ActiveContainer active={active}>
      <Container>
        <IcashBanner onClick={onClickBanner}></IcashBanner>

        <div className='mission_list_box'>
          <ul className='mission_list'>{data && data.map(item => <IcashIndexItem category={item} key={item.no} />)}</ul>
        </div>
      </Container>
      {/* to do : 페이지네이션 추가 */}
    </ActiveContainer>
  );
};
export default MissionListIndex;

const Container = styled.div`
  width: 100%;
  position: relative;
  margin-top: 30px;
  @media all and (max-width: ${theme.pc}px) {
    padding: 0 15px;
    margin-top: 25px;
  }
  .mission_list_box {
    width: 100%;
    position: relative;
    margin: 30px auto 100px auto;
    .mission_list {
      > li {
        &:nth-child(2n) {
          margin-right: 0;
        }
      }
    }
  }
`;

const IcashBanner = styled.div`
  position: relative;
  width: 100%;
  height: 146px;
  color: #626262;
  background: url(${banner02.src}) no-repeat;
  background-size: cover;
  cursor: pointer;
  @media all and (max-width: ${theme.pc}px) {
    background: url(${banner02m.src}) no-repeat;
    background-size: contain;
    height: 36.8vw;
  }
`;

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import QuestionMark from '@svgs/question_mark';
import { overFlowVisible, schemeOrTab, showPrice } from '@utils/util';
const IcashDetail = dynamic(() => import('@feature/icash/detail/icash.detail'));
const ModalGuideIcash = dynamic(() => import('@feature/icash/detail/modal/modal.guide.icash'));
const MissionListIndex = dynamic(() => import('@feature/icash/mission_list/mission_list.index'));
const ParticipationListIndex = dynamic(() => import('@feature/icash/participation_list/participation_list.index'));
const UsageListIndex = dynamic(() => import('@feature/icash/usage_list/usage_list.index'));
const MyPageLayout = dynamic(() => import('@components/layout/MyPageLayout'));
import { logIcashIndex, logIcashTabApplyMission, logIcashTabMission, logIcashTabUseICashList } from '@modules/user/UserLogAPI';
import { UserApi } from '@modules/user/user.api';
import { useRouter } from 'next/router';
import theme from '@styles/theme';
import useSWR from 'swr';
import { getMissionCategoryAPI, icashKeys } from '@modules/mypage/icash/api';
import dynamic from 'next/dynamic';
import { Desktop } from '@hooks/useDevice';

//  회원 로그인 후 미션 리스트

interface TabActiveProps {
  tabActive: boolean;
}

export const IcashBannerURl = 'https://www.iwedding.co.kr/main/page/510';

const IcashIndexPage = () => {
  const { data: icash } = useSWR<any>('icashInfo', () => UserApi.getCash());
  const [tabActive, setTabActive] = useState(0);
  const { data: selectedMissionCategory, mutate } = useSWR(icashKeys.getMissionCategory, () => null);
  const { mutate: listMutate } = useSWR(icashKeys.getMissionCategoryList, () => null);
  const { query } = useRouter();
  const router = useRouter();
  const categoryId = global.window && router.asPath?.match(/icash#([0-9]*)/) && global.window && router.asPath?.match(/icash#([0-9]*)/)[1];
  const isDesktop = Desktop();

  // useEffect(() => {
  //   global.window.onhashchange = function () {
  //     if (!router.asPath.includes('public')) {
  //       setTabActive(0);
  //       mutate('false', false);
  //     }
  //     if (!router.asPath.includes('icash#')) {
  //       mutate('false', false);
  //     }
  //   };
  // });
  useEffect(() => {
    if (categoryId !== '' && categoryId) {
      mutate(getMissionCategoryAPI(categoryId), false);
    } else {
      listMutate();
    }
  }, [categoryId, listMutate, mutate]);

  useEffect(() => {
    logIcashIndex();
  }, []);

  useEffect(() => {
    if (query?.tab == 'apply_missions') {
      setTabActive(1);
      mutate(null, false);
      const queryParams = new URLSearchParams(location.search);
      queryParams.delete('tab');
      // history.replace({
      //   search: queryParams.toString(),
      // });
    }
  }, [query, mutate]);

  // useEffect(() => {
  //   if (process.env.NEXT_PUBLIC_STAGING || process.env.NODE_ENV == 'development')
  //     myAxios.get('/test/token').then(r => {
  //       console.log(r);
  //       setAccessToken(r.data.access_token);
  //     });
  // }, []);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const targetId = parseInt((event.target as any).id, 0);
    if (targetId == 0) {
      logIcashTabMission();
      router.push('/icash');
    } else if (targetId == 1) {
      logIcashTabApplyMission();
      router.push('/icash');
    } else {
      logIcashTabUseICashList();
      router.push('/icash');
    }
    setTabActive(targetId);
  };

  // 아이캐시란 모달
  function onCloseFlow(addFunc: any) {
    overFlowVisible();
    return () => addFunc();
  }
  const [guideOpen, setGuideOpen] = useState(false);
  const onClickQuestion = () => {
    setGuideOpen(!guideOpen);
  };

  return (
    <>
      <ModalGuideIcash
        visible={guideOpen}
        onClose={onCloseFlow(() => {
          setGuideOpen(!guideOpen);
        })}
      />

      <MyPageLayout title={'아이캐시'}>
        <div className='icash_main_box'>
          <ICashHeader>
            <div className='cash_content_box'>
              <p className='top_text'>
                나의 아이캐시
                <button className='guide_button' onClick={onClickQuestion}>
                  <QuestionMark />
                </button>
              </p>
              <p className='my_cash_text'>
                <span>{showPrice((icash && icash?.cash) ?? 0)}</span> C
              </p>
              <span className='guide_text'>아이웨딩에서 결제하는 모든 상품에서 현금처럼 사용 가능한 적립금 형태의 포인트입니다.</span>
            </div>
            <a
              style={{ cursor: 'pointer' }}
              className='how_to_use'
              onClick={() => {
                schemeOrTab(IcashBannerURl);
              }}
            >
              아이캐시 사용 방법
            </a>
          </ICashHeader>
          <div className='icash_tab_box'>
            <TabButton onClick={e => handleClick(e)} tabActive={tabActive === 0} id='0'>
              미션 리스트
            </TabButton>
            <TabButton onClick={e => handleClick(e)} tabActive={tabActive === 1} id='1'>
              미션 참여 내역
            </TabButton>
            <TabButton onClick={e => handleClick(e)} tabActive={tabActive === 2} id='2'>
              적립/사용 내역
            </TabButton>
          </div>
          <ICashTabContents>
            {isDesktop && selectedMissionCategory !== 'false' && router.asPath.includes('icash#') ? (
              <IcashDetail active />
            ) : (
              <>
                <MissionListIndex active={tabActive === 0} icash={icash} />
                <ParticipationListIndex active={tabActive === 1} icash={icash} />
                <UsageListIndex active={tabActive === 2} icash={icash} />
              </>
            )}
          </ICashTabContents>
        </div>
      </MyPageLayout>
    </>
  );
};

export default IcashIndexPage;
const ICashHeader = styled.div`
  width: 100%;
  padding: 37px 30px 39px 30px;
  position: relative;
  border-top: 2px solid #262626;
  @media all and (max-width: ${theme.pc}px) {
    padding: 33px 19px 33px 27px;
    border-top: none;
  }
  .cash_content_box {
    display: inline-block;
    .top_text {
      font-size: 16px;
      line-height: 24px;
      > .guide_button {
        ${props => props.theme.resetBtnStyle};
        display: none;
        width: 17px;
        height: 17px;
        vertical-align: bottom;
        margin-bottom: 3px;
        @media all and (max-width: ${theme.pc}px) {
          display: inline-block;
        }
        > img {
          vertical-align: middle;
          width: 17px;
          height: 17px;
        }
      }
    }
    .my_cash_text {
      display: block;
      font-size: 36px;
      font-weight: 200;
      margin: 5px 0 10px 0;
      @media all and (max-width: ${theme.pc}px) {
        margin: 5px 0 0 0;
        font-size: 26px;
      }
      > span {
        font-weight: 700;
      }
    }
    .guide_text {
      display: block;
      font-size: 13px;
      color: #8c8c8c;
      @media all and (max-width: ${theme.pc}px) {
        display: none;
      }
    }
  }
  .how_to_use {
    display: inline-block;
    font-size: 14px;
    font-weight: 500;
    color: ${props => props.theme.blue};
    position: absolute;
    right: 30px;
    bottom: 38px;
    @media all and (max-width: ${theme.pc}px) {
      right: 19px;
      bottom: 33px;
    }
  }
`;

const TabButton = styled.button<TabActiveProps>`
  ${props => props.theme.resetBtnStyle};
  box-sizing: border-box;
  width: 33.33%;
  height: 50px;
  font-size: 14px;
  display: inline-block;
  border: ${({ tabActive }) => (tabActive ? '#none' : '1px solid #dddddd')};
  color: ${({ tabActive }) => (tabActive ? '#fff' : '#262626')};
  font-weight: 700;
  background-color: ${({ tabActive }) => (tabActive ? '#262626' : '#fff')};
  &:nth-child(2) {
    border-left: none;
    border-right: none;
  }
  @media all and (max-width: ${theme.pc}px) {
    font-size: 13px;
  }
`;
const ICashTabContents = styled.div`
  width: 100%;
  position: relative;
`;

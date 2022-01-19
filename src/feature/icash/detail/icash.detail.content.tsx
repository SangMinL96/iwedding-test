import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import coinIconRed from '@images/common/coin_icon_list_red@3x.png';
import coinIconGray from '@images/common/coin_icon_list_gray@3x.png';
import downArrowBlack from '@images/common/up_arrow_black.png';
import downArrowGray from '@images/common/up_arrow_gray.png';
import dot from '@images/common/single_dot.png';
import IcashIndexItem from '../icash.index.item';
import Image from 'next/image';
import { isDesktop, isMobile } from 'react-device-detect';
import ModalApplyMission from './modal/modal.apply.misssion';
import * as _ from 'lodash';
import { IcashAPI } from '../../../modules/mypage/icash/IcashAPI';
import { getAccessToken, haveAccessToken } from '@service/TokenService';
import theme from '@styles/theme';
import { logIcashClickFAQ, logIcashDetailItem } from '@modules/user/UserLogAPI';
import { openNewTab, replaceStringAll, schemeOrTab, showPrice } from '@utils/util';
import { IcashBannerURl } from '@feature/icash/icash.index';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { getMissionCategoryAPI, getMissionCategoryListAPI, icashKeys } from '@modules/mypage/icash/api';
import { IcashMission, MissionCategory, MissionType1, MissionType } from '@modules/mypage/icash/IcashInterface';
import icash_banner01 from '@images/common/icash_banner01-2.jpg';
import icash_banner01m from '@images/common/icash_banner01_m.jpg';
interface DataProps {
  listOpen: boolean;
}
interface FaqProps {
  faqOpen: boolean;
}

const IcashDetailContent = () => {
  // 드롭다운 콘텐츠 관련

  const { data: missionCategoryList, mutate: listMutate } = useSWR(icashKeys.getMissionCategoryList, () => null);
  const { data: selectedMissionCategory, mutate: missionMutate } = useSWR(icashKeys.getMissionCategory, () => null);
  const [selectedMission, setMission] = useState<IcashMission>();
  const {
    query: { id, mission_id },
  } = useRouter();
  const router = useRouter();

  useEffect(() => {
    if (id) missionMutate(getMissionCategoryAPI(id as string), false);
  }, [id, missionMutate]);

  useEffect(() => {
    if (!missionCategoryList?.length) listMutate(getMissionCategoryListAPI(), false);
  }, [missionCategoryList, listMutate]);

  const [missionCategory, setMissionCategory] = useState<MissionCategory>();
  useEffect(() => {
    if (selectedMissionCategory) {
      setMissionCategory(selectedMissionCategory);
    }
  }, [selectedMissionCategory]);

  const onVisibleMissionToggle = (id: string) => {
    if (missionCategory) {
      const mission = missionCategory.missions.find(mission => mission.no === id);
      if (mission) logIcashDetailItem(mission.name);
      setMissionCategory(prev => ({
        ...prev,
        missions: missionCategory.missions.map(mission => (mission.no == id ? { ...mission, listOpen: !mission.listOpen } : mission)),
      }));
    }
  };

  const { data: faqList } = IcashAPI.getFaq();
  const [opendFaqNo, setFaqOpen] = useState<number>();
  const onToggle2 = (id: number) => {
    setFaqOpen(id);
  };
  // 미션 신청하기 모달
  const [applyOpen, setApplyOpen] = useState(false);
  const [type1, setType1] = useState<MissionType1>();

  const [isFirst, setFirst] = useState(true);

  const onClickApply = async (item: IcashMission) => {
    router.push(router.asPath + '#applymodal');
    if (!haveAccessToken()) {
      global.window.location.href = 'https://iwedding.co.kr/member/login?ret_url=' + encodeURI(global.window.location.pathname);
    } else {
      setMission(item);
      if (item.missionType == MissionType.ADMIT) {
        IcashAPI.getType1(item.no)
          .then(r => {
            setApplyOpen(!applyOpen);
            setType1(r.data);
          })
          .catch(err => {
            alert('미션 정보 오류');
            console.log(err);
          });
      } else if (item.missionType == MissionType.DIRECT) {
        IcashAPI.getType2(item.no)
          .then(r => {
            const url = isDesktop ? r.data.pc : r.data.mobile;
            if (item.open_type) {
              openNewTab(url);
            } else {
              location.href = r.data.mobile;
            }
          })
          .catch(err => {
            alert('미션 정보 오류');
            console.log(err);
          });
      }
    }
  };

  useEffect(() => {
    if (isFirst && missionCategory && mission_id) {
      setFirst(false);

      setMissionCategory({
        ...missionCategory,
        missions: missionCategory.missions.map(mission =>
          mission.no == mission_id ? { ...mission, listOpen: !mission.listOpen } : mission,
        ),
      });
    }
  }, [mission_id, missionCategory, isFirst]);

  return missionCategory ? (
    <>
      {type1 && selectedMission && (
        <ModalApplyMission
          title={'미션 신청'}
          visible={applyOpen}
          onClose={() => setApplyOpen(false)}
          type1={type1}
          mission={selectedMission}
          isFullSize={true}
        />
      )}

      <DetailContainer>
        {router.asPath.includes('icash-public') && (
          <div className='public_wrapper'>
            <div className='header_title'>아이캐시 충전소</div>
            <IcashBanner
              onClick={() => {
                schemeOrTab(IcashBannerURl);
              }}
            >
              <div className='banner_link_area' />
            </IcashBanner>
          </div>
        )}
        <DetailHeader>
          <p className='title'>{missionCategory.name}</p>
          <span className='description'>{missionCategory.introduction}</span>
        </DetailHeader>

        <div className='detail_mission_box'>
          <ul className='detail_mission_list'>
            <div className='list_header'>
              <div className='col_group'>
                <div className='col_01'>
                  <p className='th_text'>미션 리스트</p>
                </div>
                <div className='col_02'>
                  <p className='th_text'>적립 캐시(횟수)</p>
                </div>
              </div>
              <div className='col_group second'>
                <div className='col_03'>
                  <p className='th_text'>자세히 보기</p>
                </div>
              </div>
            </div>
            {missionCategory.missions.map(item => (
              <>
                <DetailMissionItem
                  key={item.no}
                  onClick={() => {
                    onVisibleMissionToggle(item.no);
                  }}
                  listOpen={(mission_id !== null && mission_id == item.no) || item.listOpen}
                >
                  <div className='col_group'>
                    <div className='col_01'>
                      <p className={item.listOpen ? 'item_title on' : 'item_title'}>{item.name}</p>
                    </div>
                    <div className='col_02'>
                      <div className='cash_text'>
                        <span className='coin_img'>
                          <Image unoptimized src={item.isCompleted ? coinIconGray : coinIconRed} alt='coin icon' />
                        </span>
                        <p className={`cash_num ${item.isCompleted ? 'completed' : ''}`}>
                          {showPrice(item.cash)} <span>({item.isCompleted ? '참여완료' : item.duplication ? '중복 가능' : '1회만'})</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className='col_group second'>
                    <div className='col_03'>
                      <button className={item.listOpen ? 'view_detail_btn' : 'view_detail_btn on'}>
                        {item.listOpen ? '닫기' : '자세히'}
                        <span>
                          <Image unoptimized src={item.listOpen ? downArrowBlack : downArrowGray} alt='arrow' />
                        </span>
                      </button>
                    </div>
                  </div>
                </DetailMissionItem>
                <DetailMissionContent listOpen={item.listOpen}>
                  {!item.isCompleted && (
                    <div className='btn_box'>
                      <button className='apply_btn' onClick={() => onClickApply(item)}>
                        미션 신청하기
                      </button>
                    </div>
                  )}
                  <div className='guide_text_box'>
                    <p className='guide_title'>참여 방법</p>
                    {item.participationWay.split('\n').map((str, index) => (
                      <p className='guide_contents' key={'way_' + index}>
                        <span>
                          <Image unoptimized src={dot} alt='dot' />
                        </span>
                        {str}
                      </p>
                    ))}
                  </div>
                  <div className='guide_text_box'>
                    <p className='guide_title'>규정</p>
                    {item.regulation.split('\n').map((str, index) => (
                      <p className='guide_contents' key={'regulation_' + index}>
                        <span>
                          <Image unoptimized src={dot} alt='dot' />
                        </span>
                        {str}
                      </p>
                    ))}
                  </div>
                  <a
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      const url = isDesktop ? item.detailUrlPc : item.detailUrlMobile;
                      if (item.open_type) {
                        openNewTab(url);
                      } else {
                        location.href = url;
                      }
                    }}
                    className='link_text'
                  >
                    {item.toButtonName}
                  </a>
                </DetailMissionContent>
              </>
            ))}
          </ul>
        </div>

        <div className='detail_faq_box'>
          <div className='faq_header'>
            <p>자주 묻는 질문</p>
          </div>
          <ul className='detail_faq_list'>
            {faqList?.map(faq => (
              <DetailFaqItem
                onClick={() => {
                  logIcashClickFAQ(faq.question);
                  onToggle2(faq.no);
                }}
                faqOpen={opendFaqNo == faq.no}
                key={faq.no}
              >
                <div className='question_box'>
                  <p className='faq_text'>
                    <span>Q.</span> {faq.question}
                  </p>
                  <span>
                    <Image width={5} height={5} unoptimized src={opendFaqNo == faq.no ? downArrowBlack : downArrowGray} alt='down arrow' />
                  </span>
                  <div className='answer_box'>
                    <span className='a'>A.</span>
                    <p className='answer_text' dangerouslySetInnerHTML={{ __html: replaceStringAll(faq.answer, '\n', '<br/>') }} />
                  </div>
                </div>
              </DetailFaqItem>
            ))}
          </ul>
        </div>

        <div className='other_mission_box'>
          <p className='other_mission_header'>다른 미션 바로가기</p>
          <ul className='mission_list'>
            {_.shuffle(missionCategoryList)
              .filter(category => category.no !== missionCategory?.no)
              .map(category => (
                <IcashIndexItem category={category} key={'other_mission_' + category.no} />
              ))}
          </ul>
        </div>
      </DetailContainer>
    </>
  ) : (
    <></>
  );
};

export default IcashDetailContent;
const DetailContainer = styled.div`
  width: 100%;
  position: relative;
  margin-bottom: 50px;
  padding: ${() => (location.href.includes('icash-public') && isDesktop ? '0' : '')};

  .public_wrapper {
    position: relative;
    width: 1280px;
    margin: 0 auto;
    border-bottom: 1px solid #fff;
    margin-bottom: 45px;
    @media all and (max-width: ${theme.pc}px) {
      display: none;
    }
    .header_title {
      display: block;
      font-size: 32px;
      font-weight: 700;
      margin: 26px 0 53px 0;
      @media all and (max-width: ${theme.pc}px) {
        display: none;
      }
    }
  }
  .detail_mission_box {
    @media all and (max-width: ${theme.pc}px) {
      padding: 0 15px;
    }
    .detail_mission_list {
      width: 100%;
      position: relative;
      .list_header {
        width: 100%;
        height: 60px;
        position: relative;
        border: 1px solid #dfdfdf;
        border-left: none;
        border-right: none;
        @media all and (max-width: ${theme.pc}px) {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-left: 15px;
        }
        > .col_group {
          > div {
            text-align: left;
            line-height: 58px;
            vertical-align: middle;
            @media all and (max-width: ${theme.pc}px) {
              line-height: normal;
            }
            .th_text {
              font-size: 14px;
              font-weight: 700;
              @media all and (max-width: ${theme.pc}px) {
                font-size: 13px;
              }
            }
          }
          > .col_01 {
            padding-left: 20px;
            @media all and (max-width: ${theme.pc}px) {
              padding-left: 0;
            }
          }
          > .col_03 {
            padding-left: 10px;
            @media all and (max-width: ${theme.pc}px) {
              text-align: right;
              padding-right: 30px;
            }
          }
        }
      }
      /* list_header 바깥 */
      .col_group {
        display: inline-block;
        height: 100%;
        @media all and (max-width: ${theme.pc}px) {
          display: inline-flex;
          width: 69.56%;
          flex-direction: column;
          height: auto;
        }
        > div {
          display: inline-block;
          font-size: 15px;
          /* padding-left: 15px; */
        }
        .col_01 {
          width: 463px;
          height: 100%;
          vertical-align: top;
          @media all and (max-width: ${theme.pc}px) {
            width: auto;
          }
        }
        .col_02 {
          width: 218px;
          @media all and (max-width: ${theme.pc}px) {
            width: auto;
          }
        }
        .col_03 {
          width: 107px;
          @media all and (max-width: ${theme.pc}px) {
            width: auto;
            display: flex;
            justify-content: flex-end;
            padding-right: 15px;
          }
        }
      }
      .col_group.second {
        @media all and (max-width: ${theme.pc}px) {
          width: 32%;
        }
        vertical-align: top;
      }
    }
  }

  .detail_faq_box {
    width: 100%;
    position: relative;
    margin-top: 60px;
    @media all and (max-width: ${theme.pc}px) {
      padding: 0 15px;
    }
    .faq_header {
      width: 100%;
      position: relative;
      height: 65px;
      border-bottom: 2px solid #262626;
      font-size: 18px;
      font-weight: 700;
      line-height: 65px;
      vertical-align: middle;
    }
    .detail_faq_list {
      width: 100%;
      position: relative;
    }
  }

  .other_mission_box {
    width: 100%;
    position: relative;
    margin-top: 82px;
    @media all and (max-width: ${theme.pc}px) {
      padding: 0 15px;
    }
    .other_mission_header {
      font-size: 18px;
      font-weight: 700;
      margin-bottom: 30px;
    }
    .mission_list {
      > li {
        &:nth-child(2n) {
          margin-right: 0;
        }
      }
    }
  }
  ${global.window && window.location.href.includes('icash-public')
    ? css`
        .detail_mission_box,
        .detail_faq_box,
        .other_mission_box {
          width: ${isMobile ? '100%' : '790px'};
          margin: 0 auto 50px auto;
        }
      `
    : null}
`;
const DetailHeader = styled.div`
  width: 100%;
  height: 150px;
  text-align: center;
  padding-top: ${() => (location.href.includes('icash-public') ? '0' : '47px')};
  border-top: ${() => (location.href.includes('icash-public') ? '0' : '1px solid #dfdfdf')};

  @media all and (max-width: ${theme.pc}px) {
    width: calc(100% - 30px);
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0 38px;
    border-top: 0;
  }
  .title {
    font-size: 20px;
    font-weight: 700;
  }
  .description {
    display: block;
    margin-top: 10px;
    font-size: 14px;
    line-height: 19px;
    @media all and (max-width: ${theme.pc}px) {
      font-size: 13px;
      word-break: keep-all;
    }
  }
`;
const DetailMissionItem = styled.li<DataProps>`
  width: 100%;
  height: 65px;
  border-bottom: 1px solid #dfdfdf;
  cursor: pointer;
  background-color: ${({ listOpen }) => (listOpen ? '#FAFAFA' : '#fff')};
  @media all and (max-width: ${theme.pc}px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: auto;
  }
  > .col_group {
    @media all and (max-width: ${theme.pc}px) {
      padding: 24px 0;
    }
    > div {
      padding-left: 0;
    }
    .col_01 {
      padding: 23px 0 22px 15px;
      @media all and (max-width: ${theme.pc}px) {
        padding: 0 0 0 15px;
      }
      .item_title.on {
        font-weight: 700;
      }
    }
    .col_02 {
      padding: 23px 0 22px 0;
      @media all and (max-width: ${theme.pc}px) {
        padding: 0 0 0 15px;
      }
      .cash_text {
        @media all and (max-width: ${theme.pc}px) {
          margin-top: 8px;
        }
        > .coin_img {
          display: inline-block;
          width: 16px;
          height: 16px;
          > img {
            width: 16px;
            height: 16px;
          }
        }
        .cash_num {
          display: inline-block;
          margin-left: 5px;
          font-size: 15px;
          font-weight: 700;
          color: #fd4381;
          vertical-align: text-top;
          /* padding-top: 1px; */
          > span {
            font-weight: 400;
          }
        }
        .cash_num.completed {
          color: #8c8c8c;
        }
      }
    }
  }
  > .col_group.second {
    > .col_03 {
      padding: 11px 0 11px 0;
    }
  }
  .view_detail_btn {
    display: block;
    position: relative;
    text-align: left;
    padding-left: 16px;
    width: 90px;
    height: 42px;
    border: 1px solid #dfdfdf;
    font-size: 13px;
    font-weight: 700;
    color: #8c8c8c;

    > span {
      display: inline-block;
      position: absolute;
      right: 15px;
      top: 50%;
      transform: translateY(-50%);
      width: 9.5px;

      img {
        width: 9.5px;
        height: 6px;
        transform: rotate(180deg);
      }
    }
  }
  .view_detail_btn.on {
    border: 1px solid #262626;
    color: #262626;
    > span {
      display: inline-block;
      position: absolute;
      right: 15px;
      top: 50%;
      transform: translateY(-50%);
      width: 9.5px;

      img {
        width: 9.5px;
        height: 6px;
        transform: rotate(0deg);
      }
    }
  }
`;

const DetailMissionContent = styled.div<DataProps>`
  width: 100%;

  max-height: ${({ listOpen }) => (listOpen ? '555px' : 0)};
  transition: all 0.15s ease-in-out;
  overflow: hidden;
  background-color: #fafafa;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: ${({ listOpen }) => (listOpen ? '30px' : 0)};
  padding-bottom: ${({ listOpen }) => (listOpen ? '30px' : 0)};
  border-bottom: ${({ listOpen }) => (listOpen ? '1px solid #dfdfdf;' : 'none')};
  .btn_box {
    display: grid;
    place-items: center;
  }
  .apply_btn {
    justify-self: center;
    width: 315px;
    height: 50px;
    background-color: ${props => props.theme.blue};
    color: #fff;
    font-size: 15px;
    font-weight: 700;
    margin-bottom: 25px;
    @media all and (max-width: ${380}px) {
      width: 100%;
    }
  }
  .guide_text_box {
    width: 100%;
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
    .guide_title {
      font-size: 15px;
      font-weight: 700;
      margin-bottom: 10px;
    }
    .guide_contents {
      font-size: 14px;
      line-height: 20px;

      > span {
        display: inline-block;
        justify-content: center;
        align-items: center;
        width: 5px;
        height: 5px;
        line-height: 1.5;
        margin-right: 5px;
        margin-bottom: 5px;
        > img {
          width: 5px;
          height: 5px;
        }
      }
    }
  }
  .link_text {
    font-size: 15px;
    font-weight: 700;
    color: ${props => props.theme.blue};
  }
`;

const DetailFaqItem = styled.li<FaqProps>`
  width: 100%;
  cursor: pointer;
  position: relative;
  transition: all 0.15s ease-in-out;
  padding-top: 16px;
  padding-bottom: ${({ faqOpen }) => (faqOpen ? '20px' : '15px')};
  padding-left: 6px;
  padding-right: 15px;
  /* faq 슬라이드 기능 추후에 다시 넣을 수도 있어서 남겨놓기 */
  /* cursor: pointer; */
  border-bottom: 1px solid #dfdfdf;
  font-size: 15px;
  font-weight: 700;
  @media all and (max-width: ${theme.pc}px) {
    padding-top: 13px;
    padding-left: 15px;
  }
  .question_box {
    > p {
      @media all and (max-width: ${theme.pc}px) {
        width: calc(100% - 20px);
        display: flex;
        align-items: top;
      }
      > span {
        @media all and (max-width: ${theme.pc}px) {
          display: block;
          margin-right: 5px;
        }
      }
    }
    > span {
      /* faq 슬라이드 기능 추후에 다시 넣을 수도 있어서 남겨놓기 */
      display: inline-block;
      /* display: none; */
      position: absolute;
      right: 13.5px;
      top: 20px;
      width: 9.5px;

      img {
        width: 9.5px;
        height: 6px;
        transform: ${({ faqOpen }) => (faqOpen ? 'rotate(0deg)' : 'rotate(180deg)')};
      }
    }
    .answer_box {
      width: 100%;
      transition: all 0.15s ease-in-out;
      visibility: ${({ faqOpen }) => (faqOpen ? 'visible' : 'hidden')};
      max-height: ${({ faqOpen }) => (faqOpen ? '500px' : 0)};
      margin-top: ${({ faqOpen }) => (faqOpen ? '10px' : 0)};
      > span.a {
        display: inline-block;
        height: 100%;
        vertical-align: top;
        margin-right: 3px;
        padding-top: 2px;
      }
      .answer_text {
        display: inline-block;
        width: calc(100% - 58px);
        font-weight: 400;
        line-height: 22px;
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

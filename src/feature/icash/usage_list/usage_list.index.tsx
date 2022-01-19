import React, { MouseEventHandler, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
const ActiveContainer = dynamic(() => import('@components/core/containers/ActiveContainer'));

import downArrow from '@images/common/down_arrow.png';
import CoinSvgListItem from '@svgs/coin_svg_list_item';
import { IcashAPI } from '../../../modules/mypage/icash/IcashAPI';
import { getDate } from '@utils/util';
import theme from '@styles/theme';
import Image from 'next/image';
import { IcashUseStatus } from '@modules/mypage/icash/IcashInterface';
import useSWR from 'swr';
import dynamic from 'next/dynamic';
// 적립/사용내역

interface IcashIndexProps {
  active: boolean;
  icash?: any;
}

const UsageListIndex = ({ active, icash }: IcashIndexProps) => {
  /**
   * SORT
   */
  const sortDropdownRef = useRef<HTMLDivElement>(null);
  const [isSortVisible, setSortVisible] = useState(false);
  const [currentSort, setCurrentSort] = useState<IcashUseStatus>();
  const [currentSortValue, setCurrentSortValue] = useState('전체');
  const { isValidating: loading, data: cashResponse, mutate } = useSWR('myGetCashList', () => IcashAPI.getCashList(currentSort));
  const onClickSort = (sort?: IcashUseStatus) => {
    setSortVisible(!isSortVisible);
    if (sort !== currentSort) {
      setCurrentSort(sort);
      switch (sort) {
        case IcashUseStatus.SAVE:
          setCurrentSortValue('적립');
          break;
        case IcashUseStatus.USE:
          setCurrentSortValue('사용');
          break;
        default:
          setCurrentSortValue('전체');
          break;
      }
    }
  };
  useEffect(() => {
    mutate(IcashAPI.getCashList(currentSort), false);
  }, [mutate, currentSort, icash]);
  useEffect(() => {
    const pageClickEvent = (e: MouseEventHandler) => {
      // @ts-ignore
      if (sortDropdownRef && sortDropdownRef.current && !sortDropdownRef.current.contains(e.target)) {
        setSortVisible(!isSortVisible);
      }
    };
    if (isSortVisible) {
      // @ts-ignore
      window.addEventListener('click', pageClickEvent);
    }
    return () => {
      // @ts-ignore
      window.removeEventListener('click', pageClickEvent);
    };
  }, [isSortVisible]);
  return (
    <ActiveContainer active={active}>
      <Container>
        <div className='sort-header'>
          <span className='estimate-num'>&nbsp;</span>
          <div className='sort-select-box'>
            <button onClick={() => setSortVisible(!isSortVisible)} className='sort-trigger'>
              {currentSortValue}
              <span>
                <Image unoptimized src={downArrow} alt='down' />
              </span>
            </button>
            <div ref={sortDropdownRef} className={`sort-menu ${isSortVisible ? 'active' : 'inactive'}`}>
              <ul>
                <li onClick={() => onClickSort()}>전체</li>
                <li onClick={() => onClickSort(IcashUseStatus.SAVE)}>적립</li>
                <li onClick={() => onClickSort(IcashUseStatus.USE)}>사용</li>
              </ul>
            </div>
          </div>
        </div>

        <div className='usage_box'>
          <ul className='usage_list'>
            <div className='list_header'>
              <div className='col_group'>
                <div className='col_01'>
                  <p className='th_text'>적립 일자</p>
                </div>
                <div className='col_02'>
                  <p className='th_text'>적립 상세 내역</p>
                </div>
              </div>
              <div className='col_group second'>
                <div className='col_03'>
                  <p className='th_text'>적립/사용 캐시</p>
                </div>
              </div>
            </div>
            {cashResponse && !cashResponse.data.length ? (
              <div className='none_item_box'>
                <p>적립/사용한 아이캐시 내역이 없습니다.</p>
              </div>
            ) : (
              <>
                {!loading &&
                  cashResponse?.data.map(item => (
                    <UsageItem key={item.no}>
                      <div className='col_group'>
                        <div className='col_01'>
                          <p>{getDate(item.regDate)}</p>
                        </div>
                        <div className='col_02'>
                          <p>{item.history}</p>
                        </div>
                      </div>
                      <div className='col_group second'>
                        <div className='col_03'>
                          <div className='cash_text'>
                            <span className='coin_img'>
                              <CoinSvgListItem bgcolor={item.addCash > 0 ? '#fd4381' : '#8C8C8C'} />
                            </span>
                            <span className={`cash_num ${item.addCash < 0 ? 'gray' : ''} `}>{item.addCash}</span>
                          </div>
                        </div>
                      </div>
                    </UsageItem>
                  ))}
              </>
            )}
          </ul>
        </div>
        {cashResponse && !cashResponse.data.length && (
          <IcashBanner>
            <p>iCash Banner Area</p>
          </IcashBanner>
        )}
      </Container>
    </ActiveContainer>
  );
};
export default UsageListIndex;
const Container = styled.div`
  width: 100%;
  position: relative;
  .sort-header {
    width: 100%;
    position: relative;
    z-index: 10;
    margin: 50px 0 15px 0;
    @media all and (max-width: ${theme.pc}px) {
      padding: 0 15px;
      margin: 30px 0 15px 0;
    }
    .estimate-num {
      display: inline-block;
      font-size: 15px;
      color: ${props => props.theme.blue};
    }
    .sort-select-box {
      display: inline-block;
      position: absolute;
      top: 0;
      right: 0;
      @media all and (max-width: ${theme.pc}px) {
        right: 15px;
      }
      .sort-trigger {
        ${props => props.theme.resetBtnStyle};
        font-size: 15px;
        font-weight: 700;
        width: 120px;
        text-align: right;
        > span {
          display: inline-block;
          width: 10px;
          height: 100%;
          margin-left: 5px;
          > img {
            width: 8px;
            height: 7px;
            margin-top: 5px;
          }
        }
      }
      .sort-menu {
        background-color: #fff;
        width: 120px;
        border: 1px solid #262626;
        margin-top: 11px;
        opacity: 0;
        visibility: hidden;
        display: none;
        transform: translateY(-20px);
        transition: opacity 0.4s ease, transform 0.4 ease;
        > ul {
          li {
            width: 100%;
            height: 42px;
            line-height: 42px;
            vertical-align: middle;
            font-size: 15px;
            padding-left: 13px;
            cursor: pointer;
            border-bottom: 1px solid #dfdfdf;
            &:active,
            &:hover {
              background-color: #f7f7f7;
            }
            &:last-child {
              border-bottom: none;
            }
          }
        }
      }
      .sort-menu.active {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
        display: block;
      }
    }
  }

  .usage_box {
    width: 100%;
    position: relative;
    margin-bottom: 50px;
    @media all and (max-width: ${theme.pc}px) {
      padding: 0 15px;
    }
    .usage_list {
      .list_header {
        border: 1px solid #dfdfdf;
        border-left: none;
        border-right: none;
        height: 60px;
        @media all and (max-width: ${theme.pc}px) {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-left: 15px;
          padding-right: 15px;
        }
        > .col_group {
          height: 59px;
          > div {
            height: 59px;
            @media all and (max-width: ${theme.pc}px) {
              height: auto;
            }
          }
        }
      }
      .col_group {
        display: inline-block;
        @media all and (max-width: ${theme.pc}px) {
          width: 70.47%;
          display: inline-flex;
          flex-direction: column;
          height: auto;
          align-items: flex-start;
          justify-content: center;
        }
        > div {
          display: inline-block;
          height: 54px;
          line-height: 54px;
          vertical-align: middle;
          text-align: left;
          @media all and (max-width: ${theme.pc}px) {
            display: block;
            height: auto;
            line-height: 19px;
          }
          .th_text {
            font-size: 13px;
            font-weight: 700;
          }
        }
        .col_01 {
          width: 118px;
          margin-right: 40px;
          @media all and (max-width: ${theme.pc}px) {
            width: auto;
          }
          text-align: center;
        }
        .col_02 {
          width: 510px;
          margin-right: 10px;
          @media all and (max-width: ${theme.pc}px) {
            width: auto;
          }
          > .th_text {
            text-align: center;
          }
          > p {
            width: 410px;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            @media all and (max-width: ${theme.pc}px) {
              width: auto;
              text-overflow: clip;
              white-space: normal;
              overflow: visible;
            }
          }
        }
        .col_03 {
          width: 110px;
          @media all and (max-width: ${theme.pc}px) {
            width: auto;
          }
          > .th_text {
            text-align: left;
          }
        }
      }
      .col_group.second {
        @media all and (max-width: ${theme.pc}px) {
          width: 34.92%;
          align-items: flex-end;
        }
      }
      .none_item_box {
        width: 100%;
        padding: 100px 0;
        text-align: center;
        border-bottom: 1px solid #dfdfdf;
        font-size: 16px;
        line-height: 24px;
        @media all and (max-width: ${theme.pc}px) {
          font-size: 15px;
          line-height: 22px;
          padding: 90px 0;
          text-align: center;
        }
      }
    }
  }
`;

const UsageItem = styled.li`
  width: 100%;
  height: 55px;
  border-bottom: 1px solid #dfdfdf;
  @media all and (max-width: ${theme.pc}px) {
    height: auto;
    padding: 26px 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  > .col_group {
    @media all and (max-width: ${theme.pc}px) {
      height: auto;
    }
    .col_01 {
      font-size: 14px;
      color: #8c8c8c;
      @media all and (max-width: ${theme.pc}px) {
        margin-bottom: 3px;
      }
    }
    .col_02 {
      font-size: 15px;
      @media all and (max-width: ${theme.pc}px) {
        width: 68.42%;
      }
    }
    .col_03 {
      text-align: right;
      padding-left: 3px;
      @media all and (max-width: ${theme.pc}px) {
        order: 2;
      }
      .cash_text {
        height: 100%;
        > .coin_img {
          display: inline-block;
          width: 16px;
          height: 100%;
          @media all and (max-width: ${theme.pc}px) {
            padding-top: 2.5px;
          }
          > svg {
            width: 16px;
            height: 16px;
            margin-top: 20.5px;
            @media all and (max-width: ${theme.pc}px) {
              margin-top: 0;
            }
          }
          > img {
            width: 16px;
            height: 16px;
            margin-top: 18px;
            @media all and (max-width: ${theme.pc}px) {
              margin-top: 1px;
            }
          }
        }
        .cash_num {
          display: inline-block;
          margin-left: 5px;
          font-size: 15px;
          font-weight: 700;
          color: #fd4381;
          /* line-height: 22px; */
          vertical-align: top;
          padding-top: 1px;
          @media all and (max-width: ${theme.pc}px) {
            padding-top: 0.5px;
          }
        }
        .cash_num.black {
          color: #262626;
        }
        .cash_num.gray {
          color: #8c8c8c;
          text-decoration: line-through;
        }
      }
    }
  }
  > .col_group.second {
    @media all and (max-width: ${theme.pc}px) {
      width: 34.92%;
      height: auto;
    }
  }
`;

const IcashBanner = styled.div`
  width: 100%;
  height: 150px;
  background-color: #ffffe6;
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  color: #626262;
  > img {
    width: 100%;
    /* 추후에 이미지 사이즈 및 배너영역 크기 다시 정해야 할 것 */
  }
  @media all and (max-width: ${theme.pc}px) {
    width: calc(100% - 30px);
    margin: 0 auto 50px auto;
  }
`;

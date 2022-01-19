import { Desktop } from '@hooks/useDevice';
import { getMissionCategoryAPI, icashKeys } from '@modules/mypage/icash/api';
import { MissionCategory } from '@modules/mypage/icash/IcashInterface';
import theme from '@styles/theme';
import CoinSvgItem from '@svgs/coin_svg_item';
import { showPrice } from '@utils/util';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';
import useSWR from 'swr';
import { logIcashDetail } from '../../modules/user/UserLogAPI';

// 미션 아이템

export class MissionProps {
  mission_no: number;
  title: string;
  missionItems: MissionItemProps[];
}
export class MissionItemProps {
  mission_item_no: number;
  itemTitle: string;
  isDuplicateParticipation: boolean;
  reward: string;
}

interface Props {
  category: MissionCategory;
}

const IcashIndexItem = ({ category }: Props) => {
  const router = useRouter();
  const { mutate } = useSWR(icashKeys.getMissionCategory, () => null);
  const isDesktop = Desktop();

  const categoryClick = () => {
    return async () => {
      scrollTo(0, 0);
      logIcashDetail(category.name);
      const reuslt = await mutate(getMissionCategoryAPI(category.no), false);
      if (reuslt) {
        if (router.asPath.includes('icash-public')) {
          router.push('/icash-public/' + category.no);
        } else {
          if (!isDesktop) {
            router.push('/icash/' + category.no);
          } else {
            router.push('/icash#' + category.no);
          }
        }
      }
    };
  };

  return (
    <CashItem onClick={categoryClick()}>
      <a>
        <div className='cash_item_title'>
          <p>{category.name}</p>
        </div>
        <ul className='sub_mission_list'>
          <li className='sub_mission_item'>
            <div className='sub_mission_title'>
              <p className='item_title'>{category.cashText1}</p>
              {category.duplicate1 == 1 && <span className='duplicate'>중복 참여 가능</span>}
            </div>
            <div className='reward_box'>
              <span className='reward_num'>{showPrice(category.cash1)}</span>
              <span className='coin_img'>
                <CoinSvgItem />
              </span>
            </div>
          </li>

          {category.cashText2 && category.cash2 > 0 && (
            <li className='sub_mission_item'>
              <div className='sub_mission_title'>
                <p className='item_title'>{category.cashText2}</p>
                {category.duplicate2 == 1 && <span className='duplicate'>중복 참여 가능</span>}
              </div>
              <div className='reward_box'>
                <span className='reward_num'>{showPrice(category.cash2)}</span>
                <span className='coin_img'>
                  <CoinSvgItem />
                </span>
              </div>
            </li>
          )}
        </ul>
      </a>
    </CashItem>
  );
};
export default IcashIndexItem;
const CashItem = styled.li`
  display: inline-block;
  position: relative;
  width: 380px;
  height: 200px;
  border: 1px solid #dfdfdf;
  border-radius: 5px;
  margin-bottom: 30px;
  padding: 27px 21px 11px 21px;
  z-index: 1;
  box-shadow: rgba(50, 50, 93, 8%) 0px 3px 6px -1px, rgba(0, 0, 0, 8%) 0px 1px 3px -1px;
  margin-right: 29px;
  cursor: pointer;
  @media all and (max-width: ${theme.pc}px) {
    width: 100%;
    margin-right: 0;
    margin-bottom: 20px;
  }
  .cash_item_title {
    width: 100%;
    height: 40px;
    border-bottom: 1px solid #dfdfdf;
    > p {
      font-size: 16px;
      font-weight: 700;
      line-height: 24px;
      color: #262626;
    }
  }
  .sub_mission_list {
    width: 100%;
    height: 120px;
    position: relative;
    overflow: hidden;
    .sub_mission_item {
      width: 100%;
      height: 60px;
      border-bottom: 1px solid #dfdfdf;
      background-color: #fff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      &:nth-child(2) {
        border-bottom: none;
      }
      &:last-child {
        border-bottom: none;
      }
      .sub_mission_title {
        .item_title {
          font-size: 15px;
          color: #262626;
          margin-bottom: 5px;
        }
        .duplicate {
          display: block;
          font-size: 11px;
          color: ${props => props.theme.blue};
          font-weight: 700;
          padding-left: 1px;
        }
      }
      .reward_box {
        height: 28px;
        background-color: #fd4381;
        border-radius: 100px;
        line-height: 28px;
        vertical-align: middle;
        padding: 0 37px 0 11px;
        position: relative;
        .reward_num {
          font-size: 13px;
          color: #fff;
          font-weight: 500;
        }
        .coin_img {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          position: absolute;
          right: 0;
          > img {
            width: 28px;
            height: 28px;
          }
        }
      }
    }
    /* &:hover {
      overflow-y: visible;
      .sub_mission_item {
        position: absolute;
        top: 16px;
        width: 380px;
        height: auto;
        border: 1px solid #dfdfdf;
        border-top: none;
      }
    } */
  }
`;

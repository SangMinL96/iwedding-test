import AbstractModal from '@components/core/modal/AbstractModal/AbstractModal';
import { Desktop } from '@hooks/useDevice';
import { CommonModalProps } from '@modules/CommonInterface';
import { easyBookType, WhichEnt } from '@modules/rsvcenter/interface';
import theme from '@styles/theme';
import { getDateTime } from '@utils/util';
import React from 'react';
import styled from 'styled-components';
import { giftList } from '../../util';

interface AvailableProps extends CommonModalProps {
  onConfirm: () => void;
  data?: easyBookType;
}

const GiftModal = ({ visible, onClose, isFullSize, onConfirm, data }: AvailableProps) => {
  const isDeskTop = Desktop();
  const onSection3 = (date: string | undefined, value: string | undefined) => {
    const week = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
    if (data?.when_check === '0') return '아직 정해지지 않았어요.';
    if (date) {
      const today = new Date(date).getDay();
      const todayLabel = week[today];
      let typeValue;
      switch (value) {
        case '1':
          typeValue = '예식';
          break;
        case '2':
          typeValue = '촬영';
          break;
        case '3':
          typeValue = '가족행사';
          break;
        case '4':
          typeValue = '기타';
          break;
        default:
          break;
      }
      return `${date} ${todayLabel || ''} ${typeValue || ''}`;
    }
  };
  const onSection4 = (type: string, value: string | undefined) => {
    if (type === '1') {
      const result = giftList.content4_1.find(item => item.value === value);
      return result?.name;
    }
    if (type === '2') {
      const result = giftList.content4_2.find(item => item.value === value);
      return result?.name;
    }
    if (type === '3') {
      const result = giftList.content4_3.find(item => item.value === value);
      return result?.name;
    }
  };

  const onSection5 = (entList: WhichEnt[] | undefined) => {
    if (entList) {
      const setEntList = entList?.map(item => item.enterprise_name);
      return setEntList?.join(', ');
    } else {
      return '아직 정해지지 않았어요.';
    }
  };
  const onSection6 = (date: string | undefined) => {
    const week = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
    if (date) {
      const today = new Date(date).getDay();
      const todayLabel = week[today];
      const setDate = getDateTime(date);
      if (data?.visit_when_yet === '1') {
        return data?.visit_when_yet_string;
      } else {
        return `${setDate} ${todayLabel || ''}`;
      }
    }
  };
  return (
    <AbstractModal
      noPadding
      visible={visible}
      onClose={onClose}
      title='나의 예물 문의 내역'
      isFullSize={true}
      oneButtonFooter={true}
      onConfirm={onConfirm}
      noFooter={true}
    >
      <Container isDeskTop={isDeskTop}>
        {data?.type === '1' && (
          <>
            <ContentBox>
              <h3>이용 상품</h3>
              <p>{data?.product_string}</p>
            </ContentBox>
            <Divider />
            <ContentBox>
              <h3>전체 예산대</h3>
              {data?.type1_budget_string && (
                <p style={{ marginBottom: 6 }}>{`${data?.type1_budget_string[0]} (${data?.type1_budget_string[1]})`}</p>
              )}
            </ContentBox>
            <Divider />
            <ContentBox>
              <h3>이용일자</h3>
              <p>{`${onSection3(data?.when_date, data?.when_type)}`}</p>
            </ContentBox>
            <Divider />
            <ContentBox>
              <h3>선호 스타일</h3>
              <QcontentBox>
                <h5>Q. 어떤 스타일의 예물을 찾으시나요?</h5>
                <p> - {onSection4('1', data?.which_style)}</p>
              </QcontentBox>
              <QcontentBox>
                <h5>Q. 업체 몇 군데를 비교하고 싶으신가요?</h5>
                <p> - {onSection4('2', data?.cnt)}</p>
              </QcontentBox>
              <QcontentBox>
                <h5>Q. 어떤 예물샵을 방문하고 싶으신가요?</h5>
                {data?.easy_book_which_ent_type?.map(item => (
                  <p key={item.no}>- {item.type_string}</p>
                ))}
              </QcontentBox>
              {data?.info && (
                <QcontentBox>
                  <h5>Q. 업체 추천에 필요한 정보가 있다면 남겨주세요.</h5>
                  <p> - {data?.info}</p>
                </QcontentBox>
              )}
            </ContentBox>
            <Divider />
          </>
        )}

        <ContentBox>
          <h3>방문 희망 업체</h3>
          <p>{onSection5(data?.easy_book_which_ent)}</p>
        </ContentBox>
        <Divider />
        <ContentBox style={{ paddingBottom: 30 }}>
          <h3>방문 희망 일시</h3>
          <p>{`${onSection6(data?.visit_when)}`}</p>
        </ContentBox>
      </Container>
    </AbstractModal>
  );
};

export default GiftModal;
type StyledType = {
  isDeskTop?: boolean;
};
const ContentBox = styled.div`
  h3 {
    font-size: 14px;
    font-weight: bold;
    color: #4866e4;
    margin-bottom: 14px;
  }
  p {
    display: flex;
    line-height: 1.3;
    font-size: 14px;
    color: #262626;
    div {
      display: flex;
      margin-left: 8px;
    }
  }
`;
const QcontentBox = styled.div`
  h5 {
    font-size: 14px;
    font-weight: 400;
    color: #262626;
    margin-top: 18px;
  }

  & > p {
    margin-top: 8px;
    color: #8c8c8c;
    font-size: 14px;
    font-weight: 300;
    div {
      ${props => props.theme.flexCenter};
      p {
        margin-left: 4px;
        color: #8c8c8c;
        font-size: 14px;
        font-weight: 300;
      }
    }
  }
`;
const Divider = styled.div`
  width: 100%;
  height: 2px;
  margin: 30px 0;
  background-color: #4866e4;
`;
const Container = styled.div<StyledType>`
  width: 100%;
  height: 100%;
  padding: ${props => (props.isDeskTop ? '0 30px' : '0 15px')};
  padding-top: ${props => !props.isDeskTop && '30px'};
  .coupon_detail_container {
    width: 100%;
    position: relative;
    .coupon_detail_box {
      width: 100%;
      background-color: white;
      padding: 30px;
      @media all and (max-width: ${theme.pc}px) {
        padding: 30px 15px;
      }
      > div {
        width: 100%;
        margin-right: 0;
        border: 0;
        box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
        .coupon_img_box,
        .text_group {
          cursor: default;
          pointer-events: none;
        }
        .coupon_delete_btn {
          display: none;
        }
      }
      .coupon_description {
        margin-top: 10px;
        font-size: 13px;
        line-height: 22px;
        color: #8c8c8c;
        padding-left: 5px;
        background-color: transparent;
        box-shadow: none;
      }
    }
    .available_coupon_box {
      width: 100%;
      .available_coupon_header {
        padding: 30px;
        @media all and (max-width: ${theme.pc}px) {
          padding: 30px 15px;
        }
        > p {
          font-size: 16px;
          font-weight: 700;
        }
      }
      .available_coupon_items {
        padding: 0 30px;
        @media all and (max-width: ${theme.pc}px) {
          padding: 0 15px;
        }
        .available_coupon_item {
          position: relative;
          width: 100%;
          cursor: pointer;
          .item_img {
            display: inline-block;
            width: 75px;
            height: 75px;
            margin-right: 12px;
            vertical-align: top;
            > img {
              width: 100%;
            }
          }
          .item_text_box {
            display: inline-block;
            width: calc(100% - 117px);
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            .title {
              font-size: 13px;
              line-height: 18px;
              color: #262626;
            }
            .row_price_group {
              > span {
                font-size: 13px;
                font-weight: 500;
                line-height: 19px;
              }
              .normal_price {
                color: #8c8c8c;
                margin-right: 3px;
                text-decoration: line-through;
              }
              .sale_price {
                color: #262626;
              }
            }
            .applied_coupon_price {
              font-size: 13px;
              font-weight: 500;
              line-height: 19px;
              color: #ff3535;
            }
          }
        }
        .divide_line {
          width: 100%;
          height: 1px;
          margin: 20px 0;
          background-color: #d8d8d8;
        }
      }
    }
  }
`;

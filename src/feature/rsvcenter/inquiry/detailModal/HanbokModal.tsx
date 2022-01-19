import AbstractModal from '@components/core/modal/AbstractModal/AbstractModal';
import Loading from '@components/Loading';
import { Desktop } from '@hooks/useDevice';
import { CommonModalProps } from '@modules/CommonInterface';
import { bookWho, easyBookType, WhichEnt } from '@modules/rsvcenter/interface';
import theme from '@styles/theme';
import { getDateTime } from '@utils/util';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { hanbokList } from '../../util';

interface AvailableProps extends CommonModalProps {
  onConfirm: () => void;
  data?: easyBookType;
}

const HanbokModal = ({ visible, onClose, isFullSize, onConfirm, data }: AvailableProps) => {
  const isDeskTop = Desktop();

  const onSection1 = (who: bookWho[] | undefined) => {
    const filterWho = who?.filter(item => Number(item.cnt) > 0);
    const setWho = filterWho?.map(item =>
      item.easy_book_who_type.map((item2, index) => `${item.who_string}${index + 1}(${item2.type === '1' ? '맞춤' : '대여'})`),
    );
    return setWho?.join(', ');
  };

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
      const result = hanbokList.content4_1.find(item => item.value === value);
      return result?.name;
    }
    if (type === '2') {
      const result = hanbokList.content4_2.find(item => item.value === value);
      return result?.name;
    }
    if (type === '3') {
      const result = hanbokList.content4_3.find(item => item.value === value);
      return result?.name;
    }
    if (type === '4') {
      const result = hanbokList.content4_4.find(item => item.value === value);
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
  const onBackButtonEvent = () => {
    window.alert('뒤로가기?');
  };
  useEffect(() => {
    window.addEventListener('popstate', onBackButtonEvent);
    return () => window.removeEventListener('popstate', onBackButtonEvent);
  });
  if (!data) return <Loading />;
  return (
    <AbstractModal
      noPadding
      visible={visible}
      onClose={onClose}
      title='나의 문의 내역'
      isFullSize={true}
      oneButtonFooter={true}
      onConfirm={onConfirm}
      noFooter={true}
    >
      <Container isDeskTop={isDeskTop}>
        {data?.type === '1' && (
          <>
            <ContentBox>
              <h3>이용자/이용방식</h3>
              <p>{onSection1(data?.easy_book_who)}</p>
            </ContentBox>
            <Divider />
            <ContentBox>
              <h3>예산대</h3>
              {data?.type1_budget_string && (
                <p style={{ marginBottom: 6 }}>{`맞춤: ${data?.type1_budget_string[0]} (${data?.type1_budget_string[1]})`}</p>
              )}
              {data?.type2_budget_string && <p>{`대여: ${data?.type2_budget_string[0]} (${data?.type2_budget_string[1]})`}</p>}
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
                <h5>Q. 어떤 스타일의 한복을 찾으시나요?</h5>
                <p> - {onSection4('1', data?.which_style)}</p>
              </QcontentBox>
              <QcontentBox>
                <h5>Q. 업체 몇 군데를 비교하고 싶으신가요?</h5>
                <p> - {onSection4('2', data?.cnt)}</p>
              </QcontentBox>
              {data?.fitting !== '0' && (
                <QcontentBox>
                  <h5>Q. 대여 한복 상담 시, 직접 피팅을 원하시나요?</h5>
                  <p> - {onSection4('3', data?.fitting)}</p>
                </QcontentBox>
              )}

              <QcontentBox>
                <h5>Q. 어떤 한복샵을 방문하고 싶으신가요?</h5>
                {data?.easy_book_which_ent_type?.map(item => (
                  <p key={item.no}> - {item.type_string}</p>
                ))}
              </QcontentBox>
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

export default HanbokModal;
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

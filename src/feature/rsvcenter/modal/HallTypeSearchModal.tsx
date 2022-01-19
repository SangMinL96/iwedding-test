import { Desktop } from '@hooks/useDevice';
import { HallTypeItf } from '@modules/rsvcenter/interface';
import { showPrice } from '@utils/util';
import React, { useState } from 'react';
import styled from 'styled-components';
import useSWR from 'swr';

type PropsType = {
  data?: HallTypeItf[];
  setVisibel: any;
  currentIndex?: string;
  setValues: (item: any) => void;
};

function HallTypeSearchModal({ data, setValues, setVisibel, currentIndex }: PropsType) {
  const isDeskTop = Desktop();

  // 웨딩홀 타입 선택 이벤트 함수
  const onHallTypeClick = (item: HallTypeItf) => () => {
    // 웨딩홀 리스트중 현재 인덱스 번호로 선택값 삽입
    setValues(prev =>
      prev.map(hall => {
        if (hall.id === currentIndex) {
          return { ...hall, hallType: item.weddinghall_code, hallTypeText: `${item.name} / ${item.local}`, checked: false };
        } else {
          return hall;
        }
      }),
    );
    // 모달 모두 닫음
    setVisibel({ parents: false, chlid: false });
  };

  return (
    <Container isDeskTop={isDeskTop}>
      {data?.map(item => (
        <TypeContainer key={item.weddinghall_code}>
          <TitleBox>
            <h5>
              {item.name} / {item.local}
            </h5>
            <div onClick={onHallTypeClick(item)}>선택</div>
          </TitleBox>
          <ContentBox>
            <TableRow>
              <td>
                <div>이미지</div>
                <div>텍스트</div>
              </td>
              <td>
                <div>이미지</div>
                <div>
                  <p>{item.shape_text}예식</p>
                  <p>{item.time_text}</p>
                </div>
              </td>
              <td>
                <div>이미지</div>
                <div>
                  <p>{item.min_person}명</p>
                  <p>{item.seat_person}명</p>
                  <p>{item.max_person}명</p>
                </div>
              </td>
              <td>
                <div>이미지</div>
                <div>
                  {item.food_val_text_arr.map(item => (
                    <p key={item}>{item}</p>
                  ))}
                  <p>{showPrice(Number(item.min_food_fee))}원</p>
                  <p>{showPrice(Number(item.max_food_fee))}원</p>
                </div>
              </td>
            </TableRow>
            <TableRow>
              <td>
                <div>이미지</div>
                <div>텍스트</div>
              </td>
              <td>
                <div>이미지</div>
                <div>
                  <p>{showPrice(Number(item.max_use_fee))}원</p>
                </div>
              </td>
              <td>
                <div>이미지</div>
                <div>
                  <p>{showPrice(Number(item.max_direct_fee))}원</p>
                </div>
              </td>
              <td>
                <div>이미지</div>
                <div>텍스트</div>
              </td>
            </TableRow>
          </ContentBox>
        </TypeContainer>
      ))}
    </Container>
  );
}

export default HallTypeSearchModal;

type StyledProps = {
  floating?: boolean;
  isDeskTop?: boolean;
};

const Container = styled.section<StyledProps>`
  position: relative;
  ${props => props.theme.flexCenter};
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  padding: 0 2em;
  margin-top: ${props => !props.isDeskTop && '1em'};
  background-color: white;
  h3 {
    font-size: 11px;
    font-weight: 400;
    color: '#8C8C8C';
    margin-top: 1.5em;
    margin-bottom: 1em;
    width: 100%;
    text-align: start;
  }
`;
const TypeContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const TitleBox = styled.div`
  width: 100%;
  height: 50px;
  padding: 10px;
  margin-bottom: 4px;
  background-color: #f7f7fa;
  ${props => props.theme.flexCenter};
  justify-content: space-between;

  h5 {
    font-size: 13px;
    font-weight: bold;
  }
  & > div {
    width: 70px;
    height: 35px;
    color: white;
    font-weight: bold;
    font-size: 13px;
    ${props => props.theme.flexCenter};
    background-color: black;
    user-select: none;
    cursor: pointer;
  }
`;

const ContentBox = styled.table`
  width: 100%;
  height: 100%;
  table-layout: fixed;
`;

const TableRow = styled.tr`
  td {
    height: 200px;
    border: 1px solid gray;
    div {
      ${props => props.theme.flexCenter};
      flex-direction: column;
      justify-content: flex-start;
      padding-top: 15px;
      height: 100px;
      &:nth-child(1) {
        background-color: #e4e4e4;
      }
    }
  }
`;

import MyPageLayout from '@components/layout/MyPageLayout';
import PCSideMenu from '@components/PCSideMenu';
import theme from '@styles/theme';
import React from 'react';
import styled from 'styled-components';
import { BackButton } from '@components/core/buttons/BackButton';

const OrderCancelDone = () => {
  return (
    <MyPageLayout title='결제 취소 요청'>
      <Container>
        <div className='cancel_container'>
          <div className='cancel_done_box'>
            <p>선택하신 상품의 취소 요청이 완료 되었습니다.</p>
            <span>
              취소 가능 여부를 확인하여
              <br />
              결제에 사용하신 결제 수단으로 환불 예정입니다.
            </span>
          </div>

          <div className='description_box'>
            <p>1. 업체별 위약금 규정에 의거하여 결제 금액이 환불됩니다.</p>
            <p>2. 할인 쿠폰과 아이캐시 적용 금액을 제외한 금액이 환불됩니다.</p>
            <p>3. 결제 취소한 상품에 적용된 할인 쿠폰과 아이캐시는 고객님께 반환됩니다.</p>
          </div>

          <button className='confirm_btn'>확인</button>
        </div>
      </Container>
    </MyPageLayout>
  );
};

export default OrderCancelDone;
const Container = styled.div`
  width: 789.7px;
  display: inline-block;
  vertical-align: top;
  margin-left: 50px;
  @media all and (max-width: ${theme.pc}px) {
    width: 100%;
    padding-top: 40px;
    margin-left: 0;
    overflow-x: hidden;
  }
  .cancel_container {
    width: 100%;
    position: relative;
    padding-top: 75px;
    text-align: center;
    .cancel_done_box {
      width: 600px;
      margin: 0 auto;
      text-align: center;
      margin-bottom: 40px;
      > p {
        font-size: 20px;
        font-weight: 700;
        line-height: 29px;
        margin-bottom: 5px;
      }
      > span {
        font-size: 16px;
        line-height: 24px;
      }
      @media all and (max-width: ${theme.pc}px) {
        width: 100%;
        padding: 0 20px;
      }
    }
    .description_box {
      width: 600px;
      margin: 0 auto;
      text-align: left;
      border: 1px solid #dfdfdf;
      background-color: #fbfbfb;
      padding: 25px 0 25px 30px;
      margin-bottom: 40px;
      > p {
        font-size: 14px;
        line-height: 20px;
        color: #8c8c8c;
      }
      @media all and (max-width: ${theme.pc}px) {
        width: 100%;
        padding: 0 20px;
      }
    }
    .confirm_btn {
      width: 345px;
      height: 50px;
      background-color: ${props => props.theme.blue};
      color: #fff;
      font-size: 16px;
    }
  }
`;

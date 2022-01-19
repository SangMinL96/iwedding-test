import React from 'react';
import theme from '@styles/theme';
import styled from 'styled-components';

const CancelFinish = () => {
  return (
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
      </div>
    </Container>
  );
};

export default CancelFinish;
const Container = styled.div`
  .cancel_container {
    width: 100%;
    position: relative;
    background-color: #fff;
    padding: 0 30px 10px 30px;
    @media all and (max-width: ${theme.pc}px) {
      padding: 0 15px 10px 15px;
    }
    .cancel_done_box {
      width: 100%;
      text-align: center;
      padding-top: 30px;
      margin-bottom: 30px;
      > p {
        font-size: 16px;
        font-weight: 700;
        line-height: 24px;
        margin-bottom: 10px;
      }
      > span {
        font-size: 14px;
        line-height: 20px;
      }
    }
    .description_box {
      width: 100%;
      border: 1px solid #dfdfdf;
      background-color: #fbfbfb;
      padding: 20px 21px 20px 11px;
      > p {
        font-size: 12px;
        line-height: 18px;
        color: #8c8c8c;
      }
    }
  }
`;

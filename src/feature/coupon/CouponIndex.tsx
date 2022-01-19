import { useIsIOS } from '@hooks/useIsIOS';
import { getEventCoupon, getPaymentCoupon, mypageCouponKeys } from '@modules/mypage/coupon/api';
import { EventCouponType, PaymentCouponType } from '@modules/mypage/coupon/interface';
import theme from '@styles/theme';
import { SORT_BY_EVENT_COUPON, SORT_BY_PAYMENT_COUPON } from '@utils/localSwrKeys';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import useSWR from 'swr';
import { useRouter } from 'next/router';
const CouponEvent = dynamic(() => import('./event/EventTab'));
const CouponPayment = dynamic(() => import('./payment/PaymentTab'));
const FloatingMenu = dynamic(() => import('../main/type_common/floating.menu'));
const MyPageLayout = dynamic(() => import('@components/layout/MyPageLayout'));
const Loading = dynamic(() => import('@components/Loading'));
const Dropdown = dynamic(() => import('@components/Dropdown'));

interface TabProps {
  tabActive: boolean;
}

const CouponIndex = () => {
  const IOS = useIsIOS();
  const {
    query: { type },
  } = useRouter();
  const [eventCategory, setEventCategory] = useState<any>();
  const [paymentCategory, setPaymentCategory] = useState<any>();
  // 탭 관련
  const [tabActive, setTabActive] = useState(0);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const targetId = parseInt((event.target as any).id, 0);
    if (targetId !== tabActive) {
      setTabActive(targetId);
    }
  };

  // sort 관련

  const { data: eventData, isValidating } = useSWR<EventCouponType[]>(mypageCouponKeys.getEventCoupon, () => getEventCoupon());
  const { data: paymentData, isValidating: payLoading } = useSWR<PaymentCouponType[]>(mypageCouponKeys.getPaymentCoupon, () =>
    getPaymentCoupon(),
  );

  useEffect(() => {
    if (type) {
      if (type === '1') {
        setTabActive(1);
      } else {
        setTabActive(0);
      }
    }
  }, [type]);

  useEffect(() => {
    if (eventData && paymentData) {
      //드랍다운 옵션 타입에 맞게 새로운 배열 만듬
      const eventOptions = eventData
        ?.map(item => ({ method: 'category', title: item.category, value: item.category }))
        .filter(item => item.value !== null);
      //옵션안에 중복된 값들 제거하는 리듀서 함수
      const eventOptionsFilter = eventOptions?.reduce(function (acc: any, current) {
        if (acc.findIndex(({ value }) => value === current.value) === -1) {
          acc.push(current);
        }
        return acc;
      }, []);
      setEventCategory(eventOptionsFilter?.concat({ method: 'category', title: '전체', value: '' }).reverse());

      //드랍다운 옵션 타입에 맞게 새로운 배열 만듬
      const paymentOptions = paymentData
        ?.map(item => ({ method: 'category', title: item.category, value: item.category }))
        .filter(item => item.value !== null);
      //옵션안에 중복된 값들 제거하는 리듀서 함수
      const paymentOptionsFilter = paymentOptions?.reduce(function (acc: any, current) {
        if (acc.findIndex(({ value }) => value === current.value) === -1) {
          acc.push(current);
        }
        return acc;
      }, []);
      setPaymentCategory(paymentOptionsFilter?.concat({ method: 'category', title: '전체', value: '' }).reverse());
    }
  }, [paymentData, eventData]);

  const paymentCouponCount = () => {
    if (paymentData) {
      return paymentData?.filter(item => item.category !== null)?.length;
    }
  };
  const eventCouponCount = () => {
    if (paymentData) {
      return eventData?.filter(item => item.category !== null)?.length;
    }
  };
  return isValidating && payLoading && !IOS ? (
    <Loading />
  ) : (
    <MyPageLayout title='쿠폰함'>
      <CouponboxContainer>
        <div className='coupon_header'>
          <div className='coupon_tabbox'>
            <TabBtn onClick={handleClick} tabActive={tabActive === 0} id='0'>
              이벤트 쿠폰&nbsp;
              <span id='0' onClick={handleClick}>
                {eventCouponCount()}
              </span>
            </TabBtn>
            <TabBtn onClick={handleClick} tabActive={tabActive === 1} id='1'>
              결제 쿠폰 &nbsp;
              <span id='1' onClick={handleClick}>
                {paymentCouponCount()}
              </span>
            </TabBtn>
            <a href={'https://www.iwedding.co.kr/event?category=전체&subCategory=전체&tag=&page=1'}>
              <TabBtn tabActive={tabActive === 2} id='2'>
                쿠폰 찾아보기
              </TabBtn>
            </a>
          </div>

          <div className='coupon_description'>
            <span>다운로드 받은 쿠폰을 확인하세요.</span>
            <span>웨딩 서비스 이용 시 다양한 혜택을 받으실 수 있습니다.</span>
          </div>

          <div className='filter_box'>
            <span className='filter_num'>{`전체 ${
              tabActive === 0 ? eventCouponCount() : tabActive === 1 ? paymentCouponCount() : null
            }건`}</span>
            <div className='sort_select_box'>
              {tabActive === 0 && <Dropdown options={eventCategory} swrKey={SORT_BY_EVENT_COUPON} />}
              {tabActive === 1 && <Dropdown options={paymentCategory} swrKey={SORT_BY_PAYMENT_COUPON} />}
            </div>
          </div>
        </div>

        <div className='coupon_tab_contents'>
          <CouponEvent data={eventData} active={tabActive === 0} />
          <CouponPayment data={paymentData} active={tabActive === 1} />
        </div>
      </CouponboxContainer>

      <FloatingMenu />
    </MyPageLayout>
  );
};

export default React.memo(CouponIndex);
const CouponboxContainer = styled.div`
  width: 100%;
  position: relative;
  @media all and (max-width: ${theme.pc}px) {
    /* background-color: #f4f6f8;
    position: fixed;
    top: 44px;
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    padding-bottom: 40px; */
    /* min-height: calc(100vh - 100px); */
  }
  .coupon_header {
    width: 100%;
    position: relative;
    @media all and (max-width: ${theme.pc}px) {
      padding: 30px 15px 0 15px;
      display: flex;
      height: 200px;
      flex-direction: column;
      /* background: rgb(2, 0, 36);
      background: linear-gradient(180deg, rgba(2, 0, 36, 1) 0%, rgba(255, 255, 255, 1) 0%, rgba(244, 246, 248, 1) 100%); */
    }
    .coupon_tabbox {
      width: 100%;
      height: 50px;
      position: relative;
      margin-bottom: 27px;
      @media all and (max-width: ${theme.pc}px) {
        order: 2;
        margin-bottom: 30px;
      }
    }
    .coupon_description {
      display: inline-block;
      font-size: 14px;
      line-height: 20px;
      @media all and (max-width: ${theme.pc}px) {
        order: 1;
        text-align: center;
        margin-bottom: 30px;
      }
      > span {
        display: inline-block;
        &:last-child {
          margin-left: 3px;
        }
        @media all and (max-width: ${theme.pc}px) {
          display: block;
          margin-left: 0px;
        }
      }
    }

    .filter_box {
      @media all and (max-width: ${theme.pc}px) {
        width: 100%;
        height: 22px;
        order: 3;
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .filter_num {
        display: none;
        font-size: 15px;
        color: #4866e4;
        align-self: flex-end;
        @media all and (max-width: ${theme.pc}px) {
          display: block;
        }
      }
      .sort_select_box {
        display: inline-block;
        position: absolute;
        bottom: 0;
        right: 0;
        .sort_trigger {
          ${props => props.theme.resetBtnStyle};
          font-size: 15px;
          font-weight: 700;
          width: 120px;
          text-align: right;
          background-color: transparent;
          > svg {
            margin-left: 5px;
          }
        }
        .sort_menu {
          background-color: #fff;
          width: 120px;
          border: 1px solid #262626;
          margin-top: 11px;
          opacity: 0;
          visibility: hidden;
          display: none;
          transform: translateY(-20px);
          transition: opacity 0.4s ease, transform 0.4 ease;
          position: absolute;
          z-index: 999;
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
        .sort_menu.active {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
          display: block;
        }
      }
    }
  }
  .coupon_tab_contents {
  }
`;

const TabBtn = styled.button<TabProps>`
  ${props => props.theme.resetBtnStyle};
  width: 49.99%;
  height: 50px;
  display: inline-block;
  font-size: 14px;
  font-weight: 700;
  text-align: center;
  color: ${props => (props.tabActive ? '#fff' : '#262626')};
  background-color: ${props => (props.tabActive ? '#262626' : '#fff')};
  border: ${props => (props.tabActive ? '0' : '1px solid #dfdfdf')};
  > span {
    color: #fd4381;
  }
  &:nth-child(2) {
    border-left: 0;
  }
  &:last-child {
    display: none;
  }
  @media all and (max-width: ${theme.pc}px) {
    font-size: 13px;
    &:last-child {
      display: inline-block;
    }
    width: 33.33%;
    &:nth-child(2) {
      border-left: 0;
      border-right: 0;
    }
  }
`;

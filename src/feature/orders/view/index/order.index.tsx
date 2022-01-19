import { isWebview } from '@utils/isWebview';
import MyPageLayout from '@components/layout/MyPageLayout';
import Loading from '@components/Loading';
import { useIsIOS } from '@hooks/useIsIOS';
import { getOrders } from '@modules/mypage/order/order.api';
import theme from '@styles/theme';
import { schemeOpenCard } from '@utils/util';
import React, { useCallback } from 'react';
import styled from 'styled-components';
import useSWR from 'swr';
// import { order } from '../../order.slice';
import OrderListItem from './order.list.item';

const OrderIndex = () => {
  const { data: orders, isValidating } = useSWR('mypage/orders', () => getOrders());
  const IOS = useIsIOS();
  const redirectProductPage = useCallback(() => {
    global.window && window.location.replace('https://www.iwedding.co.kr/product');
  }, []);

  // useEffect(() => {
  //   if (process.env.NEXT_PUBLIC_STAGING)
  //     myAxios.get('/test/token').then(r => {
  //       setAccessToken(r.data.access_token);
  //     });
  // }, []);
  if (isValidating && !IOS) return <Loading />;
  return (
    <MyPageLayout title='결제내역'>
      {orders && (
        <OrderContainer>
          {orders?.length == 0 ? (
            <OrderItemNonContainer>
              <span>결제하신 내역이 없습니다.</span>
              <a className='prd-link-btn pointer' onClick={redirectProductPage}>
                상품 보러 가기
              </a>
            </OrderItemNonContainer>
          ) : (
            orders?.map(item => (
              <OrderListItem key={item.order_no + (item.is_free_order ? 'free_order_no ' : 'order_no_') + item.order_no} order={item} />
            ))
          )}
        </OrderContainer>
      )}
    </MyPageLayout>
  );
};

export default OrderIndex;
const OrderContainer = styled.div`
  @media all and (max-width: ${theme.pc}px) {
    padding-top: 40px;
  }
`;

const OrderItemNonContainer = styled.div`
  width: 100%;
  text-align: center;
  padding-top: 80px;
  font-size: 16px;
  @media all and (max-width: ${theme.pc}px) {
    padding-top: 7vw;
  }
  > span {
    display: block;
  }
  .prd-link-btn {
    display: inline-block;
    width: 345px;
    height: 50px;
    border: 1px solid #dfdfdf;
    margin: 66px auto 0 auto;
    line-height: 50px;
    vertical-align: middle;
    @media all and (max-width: ${theme.pc}px) {
      width: 92%;
      height: 13.3vw;
    }
  }
`;

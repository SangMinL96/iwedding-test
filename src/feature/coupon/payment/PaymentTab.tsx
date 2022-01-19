import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import findCouponImg from '@images/common/coupon_find_img.png';
import { mutate } from 'swr';
import PaymentTabItem from './PaymentTabItem';
import Pagination from 'react-js-pagination';
import backBtn from '@images/common/back_btn.png';
import { PaymentCouponType } from '@modules/mypage/coupon/interface';
import { Desktop } from '@hooks/useDevice';
import { SORT_BY_PAYMENT_COUPON } from '@utils/localSwrKeys';
import { useSort } from '@hooks/useSort';
import { delPaymentCoupon, mypageCouponKeys } from '@modules/mypage/coupon/api';
import ActiveContainer from '@components/core/containers/ActiveContainer';
import { localPaginate } from '@utils/localPaginate';
import Image from 'next/image';
import theme from '@styles/theme';
import { useConponLogAPI } from '../hooks/useConponLogAPI';
import { webViewReplace } from '@utils/util';

interface CouponTabsProps {
  active: boolean;
  data?: PaymentCouponType[];
}

const PaymentTab = ({ active, data }: CouponTabsProps) => {
  useConponLogAPI('결제', active);
  const isDeskTop = Desktop();
  const [couponData, setCouponData] = useState<PaymentCouponType[]>();
  const { currentSort } = useSort(SORT_BY_PAYMENT_COUPON);
  const [page, setPage] = useState(1);
  useEffect(() => {
    if (currentSort === undefined || currentSort.value === '') {
      if (data) {
        setCouponData(data);
      }
    } else {
      if (data) {
        const filter = data.filter(item => item.category === currentSort.value);
        setCouponData(filter);
      }
    }
  }, [data, currentSort]);

  const onDelete = (id: string) => async () => {
    const confirm = window.confirm('정말 삭제하시겠습니까?');
    if (confirm) {
      const result = await mutate(mypageCouponKeys.delPaymentCoupon, () => delPaymentCoupon([Number(id)]));
      if (result === 'OK') {
        setCouponData(prev => prev?.filter(item => item.mc_coupon_no !== id));
        mutate(mypageCouponKeys.getPaymentCoupon, couponData);
      }
    }
  };

  const handlePageChange = page => {
    setPage(page);
  };

  return (
    <ActiveContainer active={active}>
      <Container>
        <div className='payment_coupon_box'>
          {data && data.length === 0 ? (
            <div className='coupon_none_box'>
              <p>
                쿠폰함이 비어있습니다.
                <br />
                어떤 쿠폰들이 있는지 보러 가실래요?
              </p>
            </div>
          ) : isDeskTop ? (
            <>
              {couponData &&
                localPaginate(couponData, 10, page)?.map((item, index) => (
                  <PaymentTabItem onDelete={onDelete(item.mc_coupon_no)} key={`orderno_${item.order_no}_${index}`} data={item} />
                ))}
            </>
          ) : (
            <>
              {couponData &&
                couponData?.map((item, index) => (
                  <PaymentTabItem onDelete={onDelete(item.mc_coupon_no)} key={`orderno_${item.order_no}_${index}`} data={item} />
                ))}
            </>
          )}
        </div>
        {couponData && isDeskTop && couponData.length > 0 && (
          <Pagination
            activePage={page}
            itemsCountPerPage={10}
            totalItemsCount={couponData.length}
            pageRangeDisplayed={5}
            prevPageText={<Image unoptimized alt='prevImg' width={10} height={10} src={backBtn} />}
            nextPageText={<Image unoptimized alt='nextImg' width={10} height={10} src={backBtn} />}
            onChange={handlePageChange}
          />
        )}
        <FindCouponItem
          onClick={() => webViewReplace(`${process.env.NEXT_PUBLIC_WEB_HOST}/event?category=전체&subCategory=전체&tag=&page=1`)}
        >
          <div className='find_img'>
            <Image unoptimized src={findCouponImg} alt='find_coupon' />
          </div>
          <div className='find_text'>
            <p>더 많은 쿠폰 찾기</p>
            <span>무료+업그레이드+추가 할인</span>
          </div>
          <button className='find_btn'>
            바로
            <br />
            가기
          </button>
        </FindCouponItem>
      </Container>
    </ActiveContainer>
  );
};

export default React.memo(PaymentTab);
const Container = styled.div`
  width: 100%;
  position: relative;
  padding-top: 30px;
  @media all and (max-width: ${theme.pc}px) {
    padding: 30px 15px 15px 15px;
    /* background-color: #f4f6f8; */
  }
  .payment_coupon_box {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    .coupon_none_box {
      width: 100%;
      text-align: center;
      padding: 56px 0;
      @media all and (max-width: ${theme.pc}px) {
        padding: 95px 0;
      }
      > p {
        font-size: 16px;
        color: #262626;
        line-height: 24px;
        @media all and (max-width: ${theme.pc}px) {
          font-size: 15px;
          line-height: 22px;
        }
      }
    }
  }
`;

const FindCouponItem = styled.div`
  position: relative;
  display: block;
  width: 380px;
  height: 90px;
  border-radius: 12px;
  background-color: #f06392;
  margin: 20px auto;
  padding: 18px;
  cursor: pointer;
  @media all and (max-width: ${theme.pc}px) {
    width: 100%;
  }
  .find_img {
    display: inline-block;
    width: 54px;
    height: 54px;
    border-radius: 50%;
    margin-right: 8px;
    vertical-align: top;
    > img {
      width: 100%;
    }
  }
  .find_text {
    display: inline-block;
    color: #fff;
    padding-top: 3px;
    > p {
      font-size: 17px;
      font-weight: 700;
      line-height: 25px;
    }
    > span {
      font-size: 15px;
      font-weight: 300;
      line-height: 22px;
    }
  }
  .find_btn {
    ${props => props.theme.resetBtnStyle};
    display: inline-block;
    position: absolute;
    right: 22px;
    top: 20px;
    width: 50px;
    height: 50px;
    background-color: #f06392;
    border: 1px solid #d84b7a;
    border-radius: 6px;
    font-size: 13px;
    line-height: 14px;
    color: #fff;
  }
`;

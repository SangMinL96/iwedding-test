import React, { useCallback } from 'react';
import theme from '@styles/theme';
import { getDate, getScrollY } from '@utils/util';
import styled from 'styled-components';
import rightArrow from '@images/common/right_arrow.png';
import { QuotationListItemDto } from '@modules/mypage/quotation/QuotationInterface';
import PriceBox from '../PriceBox';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useLastQuoteMetadata } from '@feature/quotation/hooks/useLastQuoteMetadata';
import {
  REALTIME_LAST_QUOTE_META,
  MY_QUOTE_METADATA,
  REALTIME_PAGINATION,
  MY_QUOTE_PAGINATION,
} from '@modules/mypage/quotation/QuotationAPI';
import { usePagination } from '@hooks/usePagination';

interface Props {
  quotation: QuotationListItemDto;
  isRealtime?: boolean;
}

const QuotationListItem = ({ quotation, isRealtime }: Props) => {
  const router = useRouter();
  const { setLastQuoteMetadata } = useLastQuoteMetadata(isRealtime ? REALTIME_LAST_QUOTE_META : MY_QUOTE_METADATA);
  const { page } = usePagination(isRealtime ? REALTIME_PAGINATION : MY_QUOTE_PAGINATION);

  const onClickItem = useCallback(
    (quotation: QuotationListItemDto) => () => {
      setLastQuoteMetadata({ scroll: getScrollY(), page });
      router.push(`/quotation/${quotation.group_no}${isRealtime ? '?is_realtime=true' : ''}`);
    },
    [router, setLastQuoteMetadata, isRealtime, page],
  );

  return (
    <Container className='pointer' onClick={onClickItem(quotation)}>
      {quotation && (
        <a>
          <div className='top-info-box'>
            <div className='title-text'>
              {isRealtime && quotation.user_name ? <span className='creator'>{quotation.user_name}의 견적</span> : ''}

              <p>{quotation.group_name}</p>
              <span>
                {/* 담긴 상품 ~개 뒤에 띄어쓰기 꼭 */}
                <em>담긴 상품 {quotation?.cart_cnt ?? 0}개 </em>
                (최근 수정 {getDate(quotation.group_modified_at)})
              </span>
            </div>
            <span className='link-arrow'>
              <Image unoptimized src={rightArrow} alt='link' />
            </span>
          </div>
          <div className='divide-line' />
          <div className='bottom-info-box'>
            <div className='thumb-box'>
              {/*아무것도 없어도 빈 공간은 있어야함*/}
              {quotation?.carts.length === 0 ? (
                <ThumbCircle bgImg={''} />
              ) : (
                <>
                  {quotation.carts?.map(item => (
                    <ThumbCircle bgImg={item.thumbnail} key={item.cart_no} />
                  ))}
                </>
              )}

              <span className='thumb-circle'>&nbsp;</span>
            </div>
            <PriceBox coupon={quotation.group_total_coupon_price} total={quotation.group_total_price} />
          </div>
        </a>
      )}
    </Container>
  );
};

export default React.memo(QuotationListItem);

const Container = styled.li`
  display: inline-block;
  width: 380px;
  /* height: 180px; */
  /* 실시간 견적에 견적 만든 유저 이름 추가되면 height: 193px */
  height: auto;
  border: 1px solid #dfdfdf;
  margin-bottom: 30px;
  padding: 25px 21px 25px 21px;
  z-index: 1;
  box-shadow: rgba(0, 0, 0, 0.13) 1px 2px 8px;
  @media all and (max-width: ${theme.pc}px) {
    width: 100%;
  }
  .top-info-box {
    width: 100%;
    position: relative;
    .title-text {
      width: 266px;
      display: inline-block;
      margin-left: -1px;
      .creator {
        font-size: 12px;
        font-weight: 700;
        color: ${props => props.theme.blue};
        display: block;
        margin-bottom: 7px;
      }
      > p {
        display: block;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        font-size: 18px;
        font-weight: 700;
        margin-bottom: 8px;
        color: #262626;
      }
      > span {
        > em {
          font-weight: 700;
        }
        font-size: 13px;
        color: #8c8c8c;
      }
    }
    .link-arrow {
      position: absolute;
      /* top: 10px; */
      top: 50%;
      transform: translateY(-50%);
      right: 0;
      width: 16px;
      height: 13.5px;
      > img {
        width: 16px;
        height: 13.5px;
      }
      > svg {
        width: 16px;
        height: 13.5px;
      }
    }
  }
  .bottom-info-box {
    width: 100%;
    position: relative;
    .thumb-box {
      display: inline-block;
      height: 42px;
    }
    .price-box {
      display: block;
      position: absolute;
      top: 0;
      right: 0;
      text-align: right;
      font-weight: 700;
      font-size: 15px;
      @media all and (max-width: ${theme.pc}px) {
        font-size: 14px;
      }
      .sum-price {
        display: block;
        color: #262626;
      }
      .sum-price.single-line {
        margin-top: 13px;
      }
      .coupon-price {
        display: block;
        margin-top: 6px;
        color: #ff3535;
      }
    }
  }
  .divide-line {
    width: 100%;
    height: 1px;
    background-color: #dfdfdf;
    margin: 20px 0;
  }
`;

const ThumbCircle = styled.span<{ bgImg: string }>`
  display: inline-block;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 2px solid #fff;
  overflow: hidden;
  background: url(${props => props.bgImg}) no-repeat;
  background-size: cover;
  background-position: center;
  &:not(:first-child) {
    margin-left: -15px;
  }
`;

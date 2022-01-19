import theme from '@styles/theme';
import styled from 'styled-components';
import Image from 'next/image';
import ZzimBtnSVG from '@styles/svgs/ZzimBtnSVG';
import IconRankingMark from '@svgs/icon_ranking_mark';
import { Desktop } from '@hooks/useDevice';
import { getDateTimeSST, showPrice, urlReplace } from '@utils/util';
import { bannerZzimAPI } from '@modules/main/api';
import { confirmAlert } from 'react-confirm-alert';
import { haveAccessToken } from '@service/TokenService';
import { useState } from 'react';
import Countdown from 'react-countdown';

interface PropsType {
  item: any;
  imgBelowExpose?: boolean;
  thumbnailRatio?: boolean;
  orderBadgeFlag?: boolean;
  indexNum?: number;
  isLike?: boolean;
}

const CountdownEndSpan = () => <span>마감</span>;

const Type4Card = ({ item, imgBelowExpose, thumbnailRatio, orderBadgeFlag, indexNum, isLike = false }: PropsType) => {
  const [isInZzim, setInZzim] = useState(isLike);

  const zzimItem = async (ev, itemData) => {
    ev.preventDefault();
    ev.stopPropagation();
    if (!haveAccessToken()) {
      return confirmAlert({
        title: '로그인시 이용 가능합니다.',
        buttons: [
          {
            label: '확인',
            onClick: () => null,
          },
        ],
      });
    }
    const post_data = {
      no: '',
      ent_code: '',
      prd_no: '',
    };
    switch (itemData.type) {
      case 'brand':
        post_data.ent_code = itemData.ent_code;
        break;
      case 'product':
        post_data.prd_no = itemData.no;
        break;
      case 'content':
        post_data.no = itemData.no;
        break;
      case 'event':
        post_data.no = itemData.no;
        break;
    }
    const result = await bannerZzimAPI(post_data);
    console.log(result);
    if (result === 'OK') {
      setInZzim(!isInZzim);
    }
  };

  return (
    <Container href={item.url.includes('https://') ? item.url : `https://www.iwedding.co.kr${item.url}`} target={item.target}>
      <div className='img_box'>
        <Image unoptimized layout='fill' alt='productImg' src={urlReplace(item.img_pc)} />

        <ZzimBtn onClick={ev => zzimItem(ev, item)}>
          <ZzimBtnSVG fillColor={isInZzim ? 'rgba(46,46,46,0.5)' : theme.pink} border={isInZzim ? true : false} />
        </ZzimBtn>

        {item.remain_type === '1' && (
          <div className='hotdeal_bar time_bar'>
            <Countdown daysInHours={true} date={getDateTimeSST(item.time_end)}>
              <CountdownEndSpan />
            </Countdown>
          </div>
        )}
        {item.type === 'product' && item.remain_type === '2' && (
          <div className='hotdeal_bar time_bar'>
            <span>{item.remain_quantity}개 남음</span>
          </div>
        )}
      </div>
      <div className='text_box_2021 prd_info_box'>
        {item.header !== '' && <span className='company_name'>{item.header}</span>}
        {/* 이벤트 타입일 경우 날짜 체크해서 해당 값으로 넣기 */}
        {item.type === 'event' && <span className='event_period'>{item.time_start}</span>}
        <p className='prd_title'>{item.title}</p>
        {item.sub_title !== '' && (
          <span className={item.type === 'content' ? 'prd_sub_title content' : 'prd_sub_title'}>{item.sub_title}</span>
        )}
        {item.product_info.length !== 0 && (
          <div className='price_info_box'>
            {item.product_info.product_price === '' ? (
              <span className='current_price'>{showPrice(item.product_info.discount_price)}</span>
            ) : (
              <>
                <span className='prev_price'>{showPrice(item.product_info.product_price)}</span>
                <span className='sale_per'>{item.product_info.discount_rate}%</span>
                <span className='current_price'>{showPrice(item.product_info.discount_price)}</span>
              </>
            )}
          </div>
        )}
        {/* {item.type === 'product' && item.product_info.length !== 0 && item.product_info.limited_sales !== '0' ? (
              <div className='remaining_num'>
                <span>잔여 수량 {item.product_info.limited_sales_cnt}개</span>
              </div>
            ) : null} */}
      </div>
      {item.floating.icon_type > 0 && (
        <div className='badge_box_2021'>
          <span className={`badge_type_box ${item.floating.icon_type === 1 ? 'red' : 'blue'}`}>{item.floating.icon_text}</span>
          {item.type === 'product' && item.product_info.length !== '0' && item.product_info.limited_sales !== '0' ? (
            <div className='remaining_num'>
              <span>잔여 수량 {item.product_info.limited_sales_cnt}개</span>
            </div>
          ) : null}
        </div>
      )}
    </Container>
  );
};

export default Type4Card;

const Container = styled.a``;

const ZzimBtn = styled.span`
  position: absolute;
  cursor: pointer;
  user-select: none;
  top: 0;
  right: 0;
  display: grid;
  place-items: center;
  width: 41px;
  height: 41px;
  background: transparent;
  border-radius: 5px;
  z-index: 1;
  @media (max-width: ${theme.tablet}px) {
    width: 34px;
    height: 34px;
    font-size: 12px;
    padding: 5px 8px;
  }
`;

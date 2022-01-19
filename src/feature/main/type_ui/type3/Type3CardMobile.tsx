import { MainDataType } from '@modules/main/interface';
import theme from '@styles/theme';
import styled from 'styled-components';
import Image from 'next/image';
import ZzimBtnSVG from '@styles/svgs/ZzimBtnSVG';
import IconRankingMark from '@svgs/icon_ranking_mark';
import { Desktop } from '@hooks/useDevice';
import { showPrice, urlReplace } from '@utils/util';
import { bannerZzimAPI } from '@modules/main/api';
import { confirmAlert } from 'react-confirm-alert';
import { haveAccessToken } from '@service/TokenService';
import { useState } from 'react';

interface PropsType {
  item: any;
  imgBelowExpose?: boolean;
  thumbnailRatio?: boolean;
  orderBadgeFlag?: boolean;
  indexNum?: number;
  isLike?: boolean;
  rankNum?: number;
  // sectionIndex?: number;
}

const Type3CardMobile = ({ item, imgBelowExpose, thumbnailRatio, orderBadgeFlag, indexNum, isLike = false, rankNum }: any) => {
  const deskTop = Desktop();
  const [isInZzim, setInZzim] = useState(isLike);

  const zzimItem = async (ev, itemData) => {
    console.log('clicked');
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
        post_data.ent_code = itemData.entCode;
        break;
      case 'product':
        post_data.prd_no = itemData.no;
        break;
    }
    const result = await bannerZzimAPI(post_data);
    console.log(result);
    if (result === 'OK') {
      setInZzim(!isInZzim);
      // console.log(itemData.like);
    }
  };
  return (
    <Container
      href={item.url?.includes('https://') ? item.url : `https://www.iwedding.co.kr${item.url}`}
      className={imgBelowExpose ? 'minus_margin_bottom' : ''}
    >
      <div className={thumbnailRatio ? 'img_box origin' : 'img_box'}>
        <Image
          unoptimized
          layout='fill'
          objectFit='cover'
          objectPosition='center top'
          alt='type3'
          src={!deskTop ? urlReplace(item.img_mobile) : urlReplace(item.img_pc)}
        />
        {orderBadgeFlag > 0 && (
          <div className='item_badge'>
            <IconRankingMark width={deskTop ? '40' : '27'} height={deskTop ? '50' : '33'} />
            <span>{rankNum}</span>
          </div>
        )}
        <ZzimBtn onClick={ev => zzimItem(ev, item)}>
          <ZzimBtnSVG fillColor={isInZzim ? 'rgba(46,46,46,0.5)' : theme.pink} border={isInZzim ? true : false} />
        </ZzimBtn>
      </div>
      {imgBelowExpose ? null : (
        <>
          <div className='text_box_2021 prd_info_box'>
            {item.header !== '' ? <span className='company_name'>{item.header}</span> : null}
            <p className='prd_title'>{item.title}</p>
            {item.sub_title !== '' && <span className='prd_sub_title'>{item.sub_title}</span>}
            {item.product_info.length !== 0 && (
              <>
                <div className='price_info_box'>
                  {item.product_info.product_price === '' ? (
                    <>
                      <span className='current_price'>{showPrice(item.product_info.discount_price)}</span>
                    </>
                  ) : (
                    <>
                      <span className='prev_price'>{showPrice(item.product_info.product_price)}</span>
                      <span className='sale_per'>{item.product_info.discount_rate}%</span>
                      <span className='current_price'>{showPrice(item.product_info.discount_price)}</span>
                    </>
                  )}
                </div>
              </>
            )}
          </div>
          {orderBadgeFlag < 1 && item.floating_icon && item.floating_icon > 0 && (
            <div className='badge_box_2021'>
              <span className={`badge_type_box ${item.floating_icon > 7 ? 'blue' : 'red'}`}>
                {item.floating_icon === '1'
                  ? '1+1'
                  : item.floating_icon === '2'
                  ? '타임핫딜'
                  : item.floating_icon === '3'
                  ? '묶음할인'
                  : item.floating_icon === '4'
                  ? '일일특가'
                  : item.floating_icon === '5'
                  ? '긴급공수'
                  : item.floating_icon === '6'
                  ? '히트상품'
                  : item.floating_icon === '7'
                  ? '위클리'
                  : item.floating_icon === '8'
                  ? 'BEST'
                  : item.floating_icon === '9'
                  ? 'EVENT'
                  : item.floating_icon === '10'
                  ? 'HOT'
                  : item.floating_icon === '11'
                  ? 'NEW'
                  : null}
              </span>
            </div>
          )}
          {item.type === 'product' && item.product_info.length !== '0' && item.product_info.limited_sales !== '0' ? (
            <div className='remaining_num'>
              <span>잔여 수량 {item.product_info.limited_sales_cnt}개</span>
            </div>
          ) : null}
        </>
      )}
    </Container>
  );
};

export default Type3CardMobile;

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
    font-size: 12px;
    padding: 5px 8px;
  }
`;

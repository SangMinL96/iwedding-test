import { getProductCategoryName, ProductCategoryValue } from '@modules/product/product.interface';
import { onZzimDelApi } from '@modules/zzim/zzimAPI';
import theme from '@styles/theme';
import IconHeart from '@svgs/icon_heart';
import { goToBrandPage, goToEntPage, goToProductPage, showPrice } from '@utils/util';
import Image from 'next/image';
import React, { useCallback } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import styled from 'styled-components';
import { ZzimApi } from '../zzim.api';
import { IbrandCountEntity, ZzimListType } from '../zzim.interface';
interface ZzimItemProps {
  type: ZzimListType;
  item: IbrandCountEntity;
  zzimCancel: () => void;
}

const ZzimItem = ({ item, zzimCancel, type }: ZzimItemProps) => {
  const onClickItem = useCallback(() => {
    if (type == ZzimListType.PRODUCT) {
      if (item.product) goToProductPage(item.product.enterprise_code, item.product.no);
    } else if (type == ZzimListType.BRAND) {
      if (item.ent) goToEntPage(item.ent.enterprise_code);
    } else {
      goToBrandPage(item.bbsNo);
    }
  }, [type, item]);

  const cancelClick = (zzim_id: number) => (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    confirmAlert({
      title: '삭제하시겠습니까?',
      buttons: [
        {
          label: '취소',
          onClick: () => null,
        },
        {
          label: '확인',
          onClick: () =>
            onZzimDelApi(zzim_id)
              .then(r => {
                if (r.status === 200) setTimeout(() => zzimCancel(), 0);
              })
              .catch(err => {
                console.log(err);
              }),
        },
      ],
    });
  };

  return (
    <>
      {item && (
        <Container onClick={onClickItem}>
          <div className='thumb_img'>
            {type === ZzimListType.PRODUCT && item.product && item.product.limited_sales && item.product.limited_sales_cnt < 1 && (
              <div className='prd_end_box'>
                <div className='prd_end_text'>
                  <p>마감</p>
                </div>
              </div>
            )}
            <Image
              unoptimized
              src={type == ZzimListType.PRODUCT ? item.product?.thumb : item.bbs?.thumbnail ?? ''}
              layout='fill'
              alt='thumbnail'
            />
          </div>
          {type === ZzimListType.BRAND && (
            <>
              <div className='text_area'>
                <span className='category'>{getProductCategoryName(item.ent?.category as ProductCategoryValue)}</span>
                <p className='title'>{item.bbs?.title}</p>
                <div className='tag_box'>{'#' + item.bbs?.hashtag?.split(',').join('#')}</div>
              </div>
            </>
          )}
          {type === ZzimListType.CONTENT && (
            <>
              <div className='text_area'>
                <p className='title'>{item.bbs.title}</p>
                <div className='tag_box contents_tags'>{'#' + item.bbs?.hashtag?.split(',').join('#')}</div>
              </div>
            </>
          )}
          {type === ZzimListType.PRODUCT && item.product && (
            <>
              <div className='text_area'>
                <p className='title ent_name'>
                  {item.ent.enterprise_name == '(주)아이패밀리SC_4F' ? '아이웨딩' : item.ent.enterprise_name}
                </p>
                <p className='title one_line'>{item.product.name}</p>
                <div className='price_area'>
                  {item.product.price_txt == '' && item.product.event_price ? (
                    <p className='sale_price'>
                      {Math.floor(((item.product.price - item.product.event_price) / item.product.price) * 100)}%
                    </p>
                  ) : null}

                  {item.product.price_txt ? (
                    <span className='current_price'>{item.product.price_txt}</span>
                  ) : (
                    // <span className='current_price'>{showPrice(item.product.event_price)}원</span>
                    <>
                      <span className='current_price'>
                        {showPrice(item.product.event_price ? item.product.event_price : item.product.price)}원
                      </span>
                      {item.product.event_price || (item.product.price < item.product.product_price && item.product.product_price != 0) ? (
                        <span className='default_price'>{showPrice(item.product.product_price)}원</span>
                      ) : null}
                    </>
                  )}
                </div>

                {item.product.limited_sales && <div className='remaining_box'>남은수량 {item.product.limited_sales_cnt}개</div>}
                {/* <div className='remaining_box'>남은수량 {item.product.limited_sales_cnt}개</div> */}
              </div>
            </>
          )}
          {type === ZzimListType.EVENT && (
            <>
              <div className='text_area'>
                <div className='event_text_area'>
                  <div className='top_text'>
                    <div>
                      {item.tciv.map((item, index, row) => {
                        if (item.typicalType === 'main_category') {
                          if (index + 1 === row.length) {
                            return `${item.typicalValue}`;
                          } else {
                            return `${item.typicalValue}, `; 
                          }
                        }
                      })}
                    </div>
                  </div>
                  <p className='title'>{item.bbs.title}</p>
                  {item.bbs.always == '0' && (
                    <span className='date'>
                      {item.bbs.startdate} ~ {item.bbs.enddate}
                    </span>
                  )}
                </div>
              </div>
            </>
          )}
          <div className='zzim_btn_box' onClick={cancelClick(item.no)}>
            <button>
              <IconHeart heartColor={!item.liked ? '#FD4381' : '#BEBEBE'} />
            </button>
          </div>
        </Container>
      )}
    </>
  );
};
export default ZzimItem;
const Container = styled.div`
  display: inline-block;
  position: relative;
  width: 385px;
  padding-bottom: 15px;
  border-bottom: 1px solid #dfdfdf;
  margin-right: 19px;
  margin-bottom: 15px;
  cursor: pointer;
  @media all and (max-width: ${theme.pc}px) {
    width: 100%;
  }
  &:nth-child(2n) {
    margin-right: 0;
  }
  .prd_end_box {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(38, 38, 38, 0.7);
    color: #fff;
    z-index: 1;
    .prd_end_text {
      position: absolute;
      text-align: center;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      > p {
        font-size: 18px;
        font-weight: 700;
      }
    }
  }
  .thumb_img {
    display: inline-block;
    width: 80px;
    height: 80px;
    margin-right: 13px;
    vertical-align: top;
    overflow: hidden;
    position: relative;
    > img {
      height: 100%;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }
  }
  .text_area {
    display: inline-block;
    position: relative;
    width: calc(100% - 145px);
    height: 80px;
    vertical-align: top;
    padding: 0;
    overflow: hidden;
    .category {
      display: block;
      font-size: 13px;
      line-height: 19px;
      color: #262626;
      margin-bottom: 2px;
    }
    .title {
      width: 100%;
      font-size: 14px;
      font-weight: 700;
      line-height: 18px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2; /* 라인수 */
      -webkit-box-orient: vertical;
      word-wrap: break-word;
      @media all and(max-width: ${theme.pc}px) {
        font-size: 13px;
      }
    }
    .title.one_line {
      display: block;
      font-size: 13px;
      -webkit-line-clamp: 1;
      white-space: nowrap;
      font-weight: 400;
    }
    .title.ent_name {
      font-size: 11px;
      font-weight: 400;
      color: #8c8c8c;
    }
    .tag_box {
      font-size: 12px;
      color: #8c8c8c;
      line-height: 18px;
      position: absolute;
      left: 0;
      bottom: 1px;
      word-break: keep-all;
      white-space: nowrap;
    }
    .tag_box.contents_tags {
      white-space: normal;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2; /* 라인수 */
      -webkit-box-orient: vertical;
      word-wrap: break-word;
    }

    .price_area {
      font-size: 13px;
      font-weight: 500;
      line-height: 19px;
      @media all and(max-width: ${theme.pc}px) {
        font-size: 12px;
      }
      .default_price {
        font-size: 12px;
        font-weight: 400;
        color: #8c8c8c;
        text-decoration: line-through;
        @media all and(max-width: ${theme.pc}px) {
          font-size: 11px;
        }
      }
      .current_price {
        margin-right: 5px;
        color: #262626;
        font-weight: 700;
      }
      .sale_price {
        display: inline-block;
        color: #fd4381;
        font-size: 13px;
        font-weight: 700;
        margin-right: 3px;
        @media all and(max-width: ${theme.pc}px) {
          font-size: 12px;
        }
      }
    }
    .event_text_area {
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      height: auto;
      .top_text {
        width: 80%;
        overflow: hidden;
        text-overflow: ellipsis;
        line-clamp: 2;
        white-space: nowrap;
        -webkit-line-clamp: 2; /* 라인수 */
        -webkit-box-orient: vertical;
        height: 19px;
        line-height: 19px;
        vertical-align: middle;
        > div {
          overflow: hidden;
          text-overflow: ellipsis;
          line-clamp: 2;
          white-space: nowrap;
          -webkit-line-clamp: 2; /* 라인수 */
          -webkit-box-orient: vertical;
        }
        > span {
          font-size: 13px;
          color: #262626;
          &:nth-child(2) {
            display: inline-block;
            width: 1px;
            height: 10px;
            background-color: #e6e6ea;
            margin: 0 5px;
          }
        }
      }
      > .title {
        margin: 2px 0 5px 0;
      }
      .date {
        font-size: 12px;
        font-weight: 18px;
        color: #8c8c8c;
      }
    }
    .remaining_box {
      position: absolute;
      bottom: 0px;
      left: 0;
      padding: 0 5px;
      height: 20px;
      border: 1px solid #262626;
      text-align: center;
      font-size: 11px;
      line-height: 18px;
    }
  }

  .zzim_btn_box {
    display: inline-block;
    width: 40px;
    height: 80px;
    vertical-align: top;
    margin-left: 12px;
    > button {
      width: 100%;
      height: 100%;
    }
  }
`;

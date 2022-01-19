import { useSelectedQuotation } from '@feature/quotation/hooks/useSelectedQuotation';
import { openChat } from '@modules/mypage/quotation/QuotationAPI';
import { WmProductEntity } from '@modules/product/product.interface';
import { chatLog } from '@modules/user/UserLogAPI';
import { showPrice } from '@utils/util';
import React from 'react';
import Image from 'next/image';

interface Props {
  product: WmProductEntity;
  onClickProduct: (product: WmProductEntity) => () => void;
  isSelectedProduct: (product: WmProductEntity) => () => boolean;
  onSelectProduct: (product: WmProductEntity) => () => void;
}

const ProductItem = ({ product, onClickProduct, isSelectedProduct, onSelectProduct }: Props) => {
  const { selectedQuotation } = useSelectedQuotation();

  return (
    <li className='product_item'>
      <div className='info-box'>
        <a>
          <div className='info-text-box'>
            <span className='category-text'>{product.ent_name}</span>
            <p className='title-text pointer' onClick={onClickProduct(product)}>
              {product.name}
            </p>
          </div>
          {product.thumb && (
            <div className='info-img pointer' onClick={onClickProduct(product)}>
              <span>
                <Image unoptimized src={product.thumb} alt='product thumbnail' />
              </span>
            </div>
          )}
        </a>

        {product.limited_sales && (
          <div className='remaining_box'>
            <span className='remaining_num'>남은 수량 : {product.limited_sales_cnt}개</span>
          </div>
        )}
        <div className='price_box'>
          {product.price_txt ? (
            <div className='row-group'>
              <span className='price-title'>{''}</span>
              <span className='price-num'>{product.price_txt}</span>
            </div>
          ) : (
            <>
              <div className='row-group normal'>
                <span className='price-title'>정상가</span>
                <span className='price-num'>{showPrice(product.product_price)}원</span>
              </div>
              <div className='row-group'>
                <span className='price-title'>판매가</span>
                <span className='price-num sale-price'>{showPrice(product.price)}원</span>
              </div>

              {product.event_price > 0 && (
                <div className='row-group coupon'>
                  <span className='price-title'>쿠폰 적용가</span>
                  <span className='price-num sale-price'>{showPrice(product.event_price)}원</span>
                </div>
              )}
            </>
          )}
        </div>
        <div className='option_summary'>
          <p>{product.cmt}</p>
        </div>

        <div className='product_btn_box'>
          <button
            className='product_btn inquiry_btn'
            onClick={() => {
              openChat(process.env.NEXT_PUBLIC_WEB_HOST + '/enterprise/prd/' + product.enterprise_code + '/' + product.no);
              if (selectedQuotation) {
                chatLog({
                  is_realtime: false,
                  target_quotation_name: selectedQuotation.group_name,
                  add_product: true,
                  enterprise_name: product.ent_name,
                  product_name: product.name,
                  product_no: product.no,
                });
              }
            }}
          >
            1:1채팅문의
          </button>
          {/*상품 선택 버튼*/}
          <button
            className={`product_btn select_prd_btn ${isSelectedProduct(product) ? 'no-click' : 'on'}`}
            onClick={onSelectProduct(product)}
          >
            {isSelectedProduct(product) ? '선택 완료' : '상품 선택'}
          </button>
        </div>
      </div>
      <div className='prd_item_divide_line' />
    </li>
  );
};

export default ProductItem;

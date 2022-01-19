import Price from '@components/Price/CommonPrice';
import { ButtonBox, Divider, ProductInfo, ProductSummary, ProductThumbnail, SelectBtn } from '@feature/Calculator/components/ProductItem';
import QnAButton from '@feature/Calculator/components/ProductItem/QnAButton';
import ProductPriceBox from '@feature/Calculator/components/ProductPriceBox';
import { Desktop } from '@hooks/useDevice';
import { QnACategory } from '@modules/mypage/QnA/QnAInterface';
import { WmProductEntity } from '@modules/product/product.interface';
import { goToProductPage, openPopup } from '@utils/util';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';
interface Props {
  product: WmProductEntity;
  onClickAdd: (product: WmProductEntity) => () => void;
  disabled?: boolean;
}

const ProductItem = ({ product, onClickAdd, disabled = false }: Props) => {
  const isDeskTop = Desktop();
  const router = useRouter();
  const onClickProduct = () => {
    goToProductPage(product.enterprise_code, product.no);
  };
  const onQaModal = (product_no: string, enterprise_code: string, category: string) => () => {
    if (isDeskTop) {
      global.window &&
        openPopup(
          `/request/replace?product_no=${product_no}&enterprise_code=${enterprise_code}&category=${category}&device=pc`,
          'form_web',
        );
    } else {
      router.push(`/request/replace?product_no=${product_no}&enterprise_code=${enterprise_code}&category=${category}`);
    }
  };
  return (
    <li>
      <Container>
        <Info>
          <ProductInfo companyName={product.ent_name} productName={product.name} onClick={onClickProduct} />
          {product.thumb && <ProductThumbnail onClick={onClickProduct} thumbnail={product.thumb} />}
        </Info>

        {product.limited_sales && (
          <Remainings>
            <span>남은 수량 : {product.limited_sales_cnt}개</span>
          </Remainings>
        )}
        <PriceContainer>
          {product.price_txt ? (
            <Price title={''} price={product.price_txt} />
          ) : (
            <ProductPriceBox regularPrice={product.product_price} iWeddingPrice={product.price} bestPrice={product.event_price} coupon />
          )}
        </PriceContainer>
        <ProductSummary summary={product.cmt} />
        <ButtonBox>
          <button className='qaBtn' onClick={onQaModal(String(product.no), product.enterprise_code, QnACategory[2].title)}>
            문의하기
          </button>
          <SelectBtn onClick={onClickAdd(product)} disabled={disabled} />
        </ButtonBox>
      </Container>
      <Divider />
    </li>
  );
};

export default React.memo(ProductItem);

const Container = styled.div`
  padding: 20px 15px;
`;

const Info = styled.a`
  display: block;
  width: 100%;
  margin-bottom: 10px;
`;

const Remainings = styled.div`
  display: block;
  font-size: 13px;
  font-weight: 700;
  margin-bottom: 12px;
`;

const PriceContainer = styled.div`
  width: 100%auto;
  padding: 20px 0px;
  border: none;
  background: transparent;
`;

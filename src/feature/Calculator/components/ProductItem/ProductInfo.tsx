import React from 'react';
import styled from 'styled-components';

interface Props {
  companyName: string;
  productName: string;
  onClick: () => void;
}

const ProductInfo = ({ companyName, productName, onClick }: Props) => {
  return (
    <Container>
      <CompanyName>{companyName}</CompanyName>
      <Title onClick={onClick}>{productName}</Title>
    </Container>
  );
};

export default React.memo(ProductInfo);

const Container = styled.div`
  display: inline-block;
  width: 667px;
  vertical-align: top;
  padding-top: 10px;
  @media all and (max-width: 1000px) {
    width: 64%;
  }
  width: calc(100% - 92px);
  padding: 0;
`;

const CompanyName = styled.span`
  color: #8c8c8c;
  font-size: 14px;
  line-height: 30px;
`;

const Title = styled.p`
  display: block;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  font-size: 15px;
  line-height: 22px;
  @media all and (max-width: 1000px) {
    white-space: normal;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    line-height: 22px;
    height: 44px;
  }
  cursor: pointer;
`;

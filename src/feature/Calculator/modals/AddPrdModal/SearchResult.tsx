import closeBtnGray from '@images/common/close_btn_gray.png';
import theme from '@styles/theme';
import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';
import { useInfiniteProductList, useSearchKeyword } from '../../hooks';

const SearchResult = () => {
  const { metadata } = useInfiniteProductList();
  const { searchKeyword, setSearchKeyword } = useSearchKeyword();

  const handleCancel = () => {
    setSearchKeyword('');
  };

  return (
    <Container>
      <Result>
        <span>#{searchKeyword}</span> 상품 검색 결과({metadata?.totalItems || 0})
      </Result>
      <CancelBtn>
        <Image src={closeBtnGray} alt='cancel search button' onClick={handleCancel} />
      </CancelBtn>
    </Container>
  );
};

export default SearchResult;

const Container = styled.div`
  width: 100%;
  min-height: 45px;
  border-bottom: 1px solid #dddddd;
  background-color: #f5f5f5;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;

  @media (max-width: ${theme.tablet}px) {
    top: 100px;
  }
`;

const Result = styled.p`
  font-size: 13px;

  > span {
    font-size: 15px;
    font-weight: 700;
  }
`;
const CancelBtn = styled.button`
  width: 12px;
  height: 12px;
  background-color: #f5f5f5;
`;

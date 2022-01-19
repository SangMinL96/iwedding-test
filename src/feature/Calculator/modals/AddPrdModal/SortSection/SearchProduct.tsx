import Button from '@components/core/buttons/CommonButton';
import { useModalVisible } from '@hooks/useModalVisible';
import theme from '@styles/theme';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';
import { SEARCH_MODAL } from '../../SearchModal';

export const SearchProduct = () => {
  const router = useRouter();
  const { setModalVisible: setSearchModalVisible } = useModalVisible(SEARCH_MODAL);
  const handleSearchClick = () => {
    router.push(router.asPath + '#SearchModal');
    setSearchModalVisible(true);
  };
  return <SearchButton onClick={handleSearchClick}>상품 검색</SearchButton>;
};

const SearchButton = styled(Button)`
  display: inline-block;
  width: 70px;
  height: 34px;
  color: ${theme.black};
`;

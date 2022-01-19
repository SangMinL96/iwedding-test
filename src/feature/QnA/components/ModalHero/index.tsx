import { useFormStore } from '@feature/QnA/hooks/useFormStore';
import React, { useCallback } from 'react';
import styled from 'styled-components';

const ModalHero = () => {
  const formTitle = useFormStore(useCallback(state => state.formTitle, []));

  return (
    <Container>
      <Company>{formTitle}</Company>에 대해 무엇이 궁금하세요?
    </Container>
  );
};

export default ModalHero;

const Container = styled.div`
  padding: 30px 8px 30px 3px;
  font-size: 15px;
  line-height: 22px;
`;

const Company = styled.span`
  font-weight: bold;
`;

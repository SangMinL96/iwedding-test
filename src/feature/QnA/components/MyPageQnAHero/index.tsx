import { useFormStore } from '@feature/QnA/hooks/useFormStore';
import { WhiteButton } from '@feature/quotation/components/buttons/WhiteButton';
import { Desktop } from '@hooks/useDevice';
import { useModalVisible } from '@hooks/useModalVisible';
import { QnACategory } from '@modules/mypage/QnA/QnAInterface';
import theme from '@styles/theme';
import { QNA_FORM_MODAL } from '@utils/modalKeys';
import { openPopup } from '@utils/util';
import { useRouter } from 'next/router';
import React, { useCallback } from 'react';
import styled from 'styled-components';

const QnAHero = () => {
  const isDeskTop = Desktop();
  const { setModalVisible } = useModalVisible(QNA_FORM_MODAL);
  const [setCategory, setMainCategory] = useFormStore(useCallback(state => [state.setCategory, state.setMainCategory], []));
  const router = useRouter();
  const openQnA = () => {
    if (isDeskTop) {
      global.window && openPopup(`/request/replace?category=기타&device=pc`, 'form_web');
    } else {
      router.push(`/request/replace?category=기타`);
    }
  };

  return (
    <Container>
      <Msg>
        답변이 등록중인 문의 내용은 수정/삭제가 어렵습니다.
        <br />
        추가 문의 사항은 문의하기 버튼을 눌러 남겨주세요.
      </Msg>
      <AskBtn onClick={openQnA}>문의하기</AskBtn>
    </Container>
  );
};

export default React.memo(QnAHero);

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  min-height: 80px;
  background-color: #f7f7f7;
  margin-bottom: 40px;
  line-height: 19px;
  border-top: 2px solid #262626;

  @media (max-width: ${theme.tablet}px) {
    flex-direction: column;
    padding: 30px;
    line-height: 20px;
    border: none;
  }
`;

const Msg = styled.p`
  font-size: 13px;

  @media (max-width: ${theme.tablet}px) {
    margin-bottom: 15px;
    text-align: center;
  }
`;

const AskBtn = styled(WhiteButton)`
  height: 40px;
  min-height: 40px;
  width: 120px;
  border-color: #dfdfdf;
  font-size: 14px;
  font-weight: 700;
  color: #262626;

  @media (max-width: ${theme.tablet}px) {
    min-height: 42px;
    height: 42px;
  }
`;

import Button from '@components/core/buttons/CommonButton';
import { useFormStore } from '@feature/QnA/hooks/useFormStore';
import { useModalVisible } from '@hooks/useModalVisible';
import { IdTitle } from '@modules/mypage/QnA/QnAInterface';
import { haveAccessToken } from '@service/TokenService';
import theme from '@styles/theme';
import { QNA_FORM_MODAL } from '@utils/modalKeys';
import { useRouter } from 'next/router';
import React from 'react';
import { confirmAlert } from 'react-confirm-alert';
import styled from 'styled-components';

interface Props {
  category: IdTitle;
  enterprise_code?: string;
  product_no?: number;
  brandplus_no?: number;
}

const QnAButton = ({ category, enterprise_code, product_no, brandplus_no = 0, ...rest }: any) => {
  const isLoggedIn = haveAccessToken();
  const router = useRouter();
  const { setModalVisible } = useModalVisible(QNA_FORM_MODAL);
  const [setCategory, setParams, setMainCategory] = useFormStore(state => [state.setCategory, state.setParams, state.setMainCategory]);
  const handleOpenModal = () => {
    if (isLoggedIn) {
      setCategory(category);
      if (category.id === 0) {
        setMainCategory('패키지');
      } else {
        if (brandplus_no != 0) {
          setParams({ brandNo: String(brandplus_no) });
        } else {
          setParams({ enterCode: String(enterprise_code), productNo: product_no });
        }
      }
      if (router.asPath.includes('quotation')) {
        const { is_realtime, id } = router.query;
      }
      setModalVisible(true);
      router.push(router.asPath + '#QnAModal');
    } else {
      confirmAlert({
        message: '로그인 후에 이용해주시기 바랍니다.',
        buttons: [
          { label: '로그인', onClick: () => router.replace(`/login?ret_url=${router.asPath}`) },
          { label: '확인', onClick: null },
        ],
      });
    }
  };

  return (
    <StyledButton onClick={handleOpenModal} {...rest}>
      문의하기
    </StyledButton>
  );
};

export default React.memo(QnAButton);
const StyledButton = styled(Button)`
  color: ${theme.black};
`;

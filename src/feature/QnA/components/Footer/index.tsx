import theme from '@styles/theme';
import React from 'react';
import styled from 'styled-components';

const ModalFooter = () => {
  return (
    <Footer>
      문의 내용에 대한 답변은 <br />
      <Link href='/request'>마이페이지 {`>`} 나의 문의내역</Link>에서 확인 가능합니다.
    </Footer>
  );
};

export default ModalFooter;
const Footer = styled.div`
  padding: 25px 0 50px 0;
  font-size: 14px;
  line-height: 22px;
`;
const Link = styled.a`
  color: ${theme.blue};
`;

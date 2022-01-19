import React from 'react';
import closeBtn from '@images/common/close_btn.png';
import styled from 'styled-components';
import Image from 'next/image';

interface Props {
  headerTitle: string;
  onClose: () => void;
}
const SubPageHeader = ({ headerTitle, onClose }: Props) => {
  return (
    <Container>
      <Title>{headerTitle}</Title>
      <CloseButton onClick={onClose}>
        <Image unoptimized src={closeBtn} alt='close' />
      </CloseButton>
    </Container>
  );
};

export default React.memo(SubPageHeader);

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 20px;
  width: 100%;
  height: 50px;
  border-bottom: 1px solid #dddddd;
  background: whitesmoke;
  position: sticky;
  flex: 1;
  top: 0;
  left: 0;
  z-index: 2;
`;

const Title = styled.span`
  display: inline-block;
  font-size: 20px;
  font-weight: 700;
`;

const CloseButton = styled.span`
  display: block;
  width: 20px;
  height: 20px;
  cursor: pointer;

  > img {
    width: 100%;
    margin-top: 1px;
  }
`;

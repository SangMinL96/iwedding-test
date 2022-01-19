import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';
import closeBtn from '@images/common/close_btn.png';

interface Props {
  title: string;
  onClose: () => void;
  headerNoBottom?: boolean;
}

const PCModalHeader = ({ title, onClose, headerNoBottom = false }: Props) => {
  return (
    <Container headerNoBottom={headerNoBottom}>
      <span className='title'>{title}</span>
      <button className='close-btn' onClick={onClose}>
        <Image unoptimized src={closeBtn} alt='close-btn' />
      </button>
    </Container>
  );
};

export default React.memo(PCModalHeader);

const Container = styled.div<{ headerNoBottom: boolean }>`
  width: 100%;
  height: 100px;
  border-bottom: 1px solid #dddddd;
  padding: 45px 30px 30px 30px;
  position: relative;

  ${({ headerNoBottom }) => headerNoBottom && `border-bottom: none;`}
  > .title {
    display: block;
    font-size: 20px;
    font-weight: 700;
  }

  > .close-btn {
    display: block;
    position: absolute;
    right: 30px;
    bottom: 32px;
    width: 20px;
    height: 20px;
    cursor: pointer;
    top: unset;
    > img {
      width: 100%;
    }
  }
`;

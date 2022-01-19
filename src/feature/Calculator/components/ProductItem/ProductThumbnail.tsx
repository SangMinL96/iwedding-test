import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';

interface Props {
  onClick: () => void;
  thumbnail: string;
}

const ProductThumbnail = ({ onClick, thumbnail }: Props) => {
  return (
    <Container onClick={onClick}>
      <Image src={thumbnail} alt='product thumbnail' layout='fill' />
    </Container>
  );
};

export default React.memo(ProductThumbnail);

const Container = styled.div`
  cursor: pointer;
  float: right;
  display: block;
  width: 75px;
  height: 75px;
  position: relative;
  object-fit: cover;
`;

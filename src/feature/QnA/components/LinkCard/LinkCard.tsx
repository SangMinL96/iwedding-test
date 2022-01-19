import theme from '@styles/theme';
import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';

interface Props {
  itemTitle: string;
  thumbnail: string;
  url: string;
}

const LinkCard = ({ url, itemTitle, thumbnail }: Props) => {
  return (
    <Container>
      <Image src={thumbnail} width={60} height={60} objectFit='contain' layout='fixed' alt='thumbnail' />
      <Title target='_blank' href={`${url}`}>
        {itemTitle}
      </Title>
    </Container>
  );
};

export default React.memo(LinkCard);

const Container = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  height: 60px;
  margin-bottom: 30px;
  margin-left: 154px;

  @media (max-width: ${theme.pc}px) {
    margin-left: 0;
    width: 100%;
  }
`;
const Title = styled.a`
  width: 65%;
  margin-left: 15px;
  line-height: 21px;
  font-weight: bold;
  font-size: 15px;
  text-decoration: underline;
  @media (max-width: ${theme.pc}px) {
    margin-left: 50px;
  }
`;

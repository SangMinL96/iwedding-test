import theme from '@styles/theme';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';

interface Props {
  header: string;
  mainText: string;
  img: string;
  to: string;
  color: string;
}

const LinkBox = ({ img, color, header, mainText, to }: Props) => {
  const router = useRouter();
  const handleClick = () => {
    if (to === 'realtime') {
      router.push('/quotation?t=2');
    } else {
      router.push('/quotation');
    }
  };

  return (
    <Container>
      <LinkImage src={img} width={54} height={54} />
      <TextContainer>
        <Header>{header}</Header>
        <Main>{mainText}</Main>
      </TextContainer>
      <Button onClick={handleClick} bg={color}>
        바로
        <br />
        가기
      </Button>
    </Container>
  );
};

export default React.memo(LinkBox);

const Container = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  width: 100%;
  border-radius: 10px;
  margin-bottom: 10px;
  margin: auto;

  @media screen and (min-width: ${theme.pc}px) {
    width: 400px;
  }
`;

const LinkImage = styled(Image)`
  height: 54px;
  width: 54px;
  border-radius: 100%;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 47px;
  margin-left: 9px;
`;
const Header = styled.p`
  font-size: 15px;
  font-weight: bold;
`;

const Main = styled.p`
  font-size: 13px;
  font-weight: lighter;
  color: ${theme.gray};
`;

const Button = styled.button<{ bg: string }>`
  display: grid;
  place-items: center;
  height: 50px;
  width: 50px;
  background-color: ${({ bg }) => `${bg}`};
  color: white;
  border-radius: 10px;
  position: absolute;
  right: 0;
`;

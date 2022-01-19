import React, { ReactNode } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';

interface Props {
  url: string;
  imgSrc: StaticImageData;
  children: ReactNode;
  closeMenu?: () => void;
}

const RsvLink = ({ url, imgSrc, children, closeMenu }: Props) => {
  return (
    <Link href={url} passHref>
      <RsvBtn onClick={closeMenu}>
        {children}
        <BGWrapper />
        <Image src={imgSrc} layout='fill' alt='' />
      </RsvBtn>
    </Link>
  );
};

export default RsvLink;

const RsvBtn = styled.div`
  cursor: pointer;
  position: relative;
  display: grid;
  place-items: center;
  width: 76px;
  height: 76px;
  > span {
    border-radius: 50%;
  }
  > p {
    text-align: center;
    font-size: 13px;
    z-index: 2;
    color: white;
  }
`;

const BGWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: black;
  opacity: 0.25;
  z-index: 1;
  border-radius: 50%;
`;

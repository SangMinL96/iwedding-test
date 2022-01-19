import React, { SyntheticEvent } from 'react';
import IconPlus from '@svgs/icon_plus';
import { ImageContainer_76 } from '@components/core/containers/ImageContainer_76';
import { ImageProps } from '@modules/mypage/QnA/QnAInterface';
import Image from 'next/image';
import styled from 'styled-components';
import theme from '@styles/theme';

interface Props {
  image?: ImageProps;
  src?: string;
  onRemove: (e: SyntheticEvent) => void;
}

// 첨부된 이미지
export const AttachedImage = ({ image, src, onRemove }: Props) => {
  return (
    <ImageContainer_76>
      <Image src={image?.preview || src} alt={''} width={76} height={76} />
      <DeleteButton onClick={onRemove}>
        <IconPlus rotation={45} color='white' width={12} height={12} thin />
      </DeleteButton>
    </ImageContainer_76>
  );
};

const DeleteButton = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 26px;
  height: 26px;
  background-color: ${theme.black};
  cursor: pointer;
  z-index: 2;
  display: grid;
  place-items: center;
  cursor: pointer;
`;

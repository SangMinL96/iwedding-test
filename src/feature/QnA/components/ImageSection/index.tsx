import SectionContainer from '@components/core/containers/SectionContainer';
import { useFormStore } from '@feature/QnA/hooks/useFormStore';
import { IdTitle, ImageProps } from '@modules/mypage/QnA/QnAInterface';
import React, { SyntheticEvent, useCallback } from 'react';
import styled from 'styled-components';
import shallow from 'zustand/shallow';
import { AttachedImage } from './AttachedImage';
import { AttachImage } from './AttachImage';

const ImageSection = () => {
  const [dbImages, images, removeImage, removeDBImage] = useFormStore(
    useCallback(state => [state.dbImages, state.images, state.removeImage, state.removeDBImage], []),
    shallow,
  );

  const handleRemove = (image: ImageProps) => (e: SyntheticEvent) => {
    e.preventDefault();
    removeImage(image);
  };

  const handleDBRemove = (image: IdTitle) => (e: SyntheticEvent) => {
    e.preventDefault();
    removeDBImage(image);
  };

  return (
    <SectionContainer title='이미지 (10MB 미만의 파일, 최대 4개까지 첨부 가능)'>
      <ImageContainer>
        {dbImages.map((image: IdTitle) => (
          <AttachedImage src={image.title} key={image.id} onRemove={handleDBRemove(image)} />
        ))}
        {images.map((image: ImageProps) => (
          <AttachedImage image={image} key={image.preview} onRemove={handleRemove(image)} />
        ))}
        {dbImages.length + images.length < 4 && <AttachImage />}
      </ImageContainer>
    </SectionContainer>
  );
};

export default ImageSection;

const ImageContainer = styled.div`
  width: 322px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 6px;
`;

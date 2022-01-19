import { ImageContainer_76 } from '@components/core/containers/ImageContainer_76';
import { useFormStore } from '@feature/QnA/hooks/useFormStore';
import { useQnAFormContext } from '@feature/QnA/utils/context';
import { useIsAndroid } from '@hooks/useIsAndroid';
import IconPlus from '@svgs/icon_plus';
import { ImageFileTypes } from '@utils/Regex';
import React, { ChangeEvent, SyntheticEvent, useCallback } from 'react';
import { useRef } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import styled from 'styled-components';
import shallow from 'zustand/shallow';

const INPUT_ID = 'QnAModal_Attach_Image';
const MAX_FILE_SIZE = 10 * 1000 * 1000;

// 이미지 첨부하기 컴포넌트
export const AttachImage = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [images, addImage] = useFormStore(
    useCallback(state => [state.images, state.addImage], []),
    shallow,
  );

  const handleFocusBack = () => {
    console.log('back');
    window.removeEventListener('focus', () => handleFocusBack);
  };

  const handleClick = e => {
    e.stopPropagation();
    window.addEventListener('focus', () => handleFocusBack);
    inputRef.current.click();
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.currentTarget.files?.[0];
    if (file?.name) {
      if (!ImageFileTypes.test(file.name)) {
        return confirmAlert({ title: `JPG, JPEG, PNG만 첨부하실 수 있습니다.`, buttons: [{ label: '확인', onClick: null }] });
      } else if (file.name !== 'image.jpg' && images.map(i => i.image.name).includes(file.name)) {
        return confirmAlert({
          title: `이미 포함된 파일입니다.`,
          buttons: [{ label: '확인', onClick: null }],
        });
      } else if (file.size >= MAX_FILE_SIZE) {
        return confirmAlert({
          title: `10MB 미만의 파일만 첨부하실 수 있습니다.`,
          buttons: [{ label: '확인', onClick: null }],
        });
      } else {
        const preview = URL.createObjectURL(file);
        addImage({ image: file, preview });
      }
    }
  };

  const isAndroid = useIsAndroid();

  return (
    <IC onClick={handleClick}>
      <IconPlus width={12} height={12} color='white' thin />
      <InnerText>파일첨부</InnerText>
      {isAndroid ? (
        <ImageInput ref={inputRef} type='file' onChange={handleImageChange} id={INPUT_ID} accept='image/*' />
      ) : (
        <ImageInput ref={inputRef} type='file' onChange={handleImageChange} id={INPUT_ID} accept='image/*' />
      )}
    </IC>
  );
};

const IC = styled(ImageContainer_76)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid #262626;
  background-color: #262626;
  color: white;
  cursor: pointer;
`;

const InnerText = styled.span`
  margin-top: 5px;
  font-size: 13px;
  font-weight: lighter;
`;

const ImageInput = styled.input`
  display: none;
`;

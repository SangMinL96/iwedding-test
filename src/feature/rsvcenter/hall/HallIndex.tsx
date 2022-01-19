import React, { useState } from 'react';
import styled from 'styled-components';
import InputModal from './InputModal';
import { useForm, FormProvider } from 'react-hook-form';
import mainImgPc from '@images/common/rsvcenter_hanbok_pc.jpg';
import mainImgMobile from '@images/common/rsvcenter_hanbok_mobile.jpg';
import { mutate } from 'swr';
import { easyBookProcAPI, rsvCenterKeys } from '@modules/rsvcenter/api';
import { Desktop } from '@hooks/useDevice';
import theme from '@styles/theme';

type PropsType = {
  category?: string;
};
function HallIndex({ category }: PropsType) {
  const isDeskTop = Desktop();
  const methods = useForm();
  const [isComplete, setIsComplete] = useState<boolean>(false);

  const onSubmit = async data => {
    const setBookWho = data.easy_book_who.map(item => ({ who: item.value, cnt: item.cnt, easy_book_who_type: item.easy_book_who_type }));
    const result = await mutate(
      rsvCenterKeys.procResult,
      easyBookProcAPI({
        easy_book: { ...data.easy_book, type: '1', category: '한복' },
        easy_book_which_ent_type: data.easy_book_which_ent_type,
        easy_book_which_ent: data.easy_book_which_ent,
        easy_book_who: setBookWho,
      }),
    );
    if (result === 'OK') {
      setIsComplete(true);
    }
  };
  return (
    <FormProvider {...methods}>
      <Container onSubmit={methods.handleSubmit(onSubmit)} isDeskTop={isDeskTop}>
        {isDeskTop ? <ImgPc src={mainImgPc.src}></ImgPc> : <ImgMobile src={mainImgMobile.src} />}
        <InputModal isComplete={isComplete} category={category} />
      </Container>
    </FormProvider>
  );
}

export default React.memo(HallIndex);

type StyledProps = {
  isDeskTop: boolean;
};
const Container = styled.form<StyledProps>`
  width: 100%;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  width: 1280px;
  min-width: 1280px;
  height: 750px;
  overflow: hidden;
  background-color: #776bbe;
  @media all and (max-width: ${theme.pc}px) {
    height: 100%;
    flex-direction: column;
    width: 100%;
    min-width: 100%;
    
  }
`;
const ImgPc = styled.img`
  width: 50%;
  height: 100%;
  object-fit: contain;
  img {
    width: 100%;
    height: 100%;
  }
`;
const ImgMobile = styled.img`
  height: 210px;
  width: 100%;
  object-fit: contain;
  img {
    width: 100%;
    height: 100%;
  }
`;

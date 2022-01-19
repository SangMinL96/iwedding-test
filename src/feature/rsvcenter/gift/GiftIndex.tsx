import { Desktop } from '@hooks/useDevice';
import { useIsIOS } from '@hooks/useIsIOS';
import mainImgMobile from '@images/common/rsvcenter_gift_mobile.jpg';
import mainImgPc from '@images/common/rsvcenter_gift_pc02.jpg';
import { easyBookProcAPI, rsvCenterKeys } from '@modules/rsvcenter/api';
import theme from '@styles/theme';
import moment from 'moment';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import styled from 'styled-components';
import { mutate } from 'swr';
import InputModal from './InputModal';
function GiftIndex() {
  const isDeskTop = Desktop();
  const methods = useForm();
  const ios = useIsIOS();
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [isDone, setIsDone] = useState<boolean>(false);
  const {
    query: { from, product_no, code },
  } = useRouter();
  const onSubmit = async data => {
    setIsDone(true);
    if (!from) {
      const setBookWhichProduct = data.easy_book_which_product.map(item => ({
        type: item,
      }));
      const result = await mutate(
        rsvCenterKeys.procResult,
        easyBookProcAPI({
          easy_book: {
            ...data.easy_book,
            when_date: moment(data.easy_book.when_date).format('YYYY-MM-DD'),
            visit_when: moment(data.easy_book.visit_when).format('YYYY-MM-DD HH:mm'),
            type: '1',
            category: '예물',
          },
          easy_book_which_ent_type: data.easy_book_which_ent_type,
          easy_book_which_ent: data.easy_book_which_ent,
          easy_book_which_product: setBookWhichProduct,
        }),
      );
      if (result === 'OK') {
        setIsComplete(true);
        setIsDone(false);
      }
    } else {
      const brand = [{ enterprise_code: code }];
      const product = [{ enterprise_code: code, product_no }];
      const type = from === '브랜드' ? '2' : from === '상품' ? '3' : null;
      const result = await mutate(
        rsvCenterKeys.procResult,
        easyBookProcAPI({
          easy_book: { ...data.easy_book, type3: '1', type, category: '예물' },
          easy_book_which_ent: from === '브랜드' ? brand : from === '상품' ? product : null,
        }),
      );
      if (result === 'OK') {
        setIsComplete(true);
        setIsDone(false);
      }
    }
  };
  return (
    <FormProvider {...methods}>
      <Container ios={ios} onSubmit={methods.handleSubmit(onSubmit)} isDeskTop={isDeskTop}>
        {isDeskTop ? (
          <ImgPc unoptimized src={mainImgPc}></ImgPc>
        ) : (
          <Image unoptimized layout='responsive' width={375} height={210} src={mainImgMobile} alt='배너' />
        )}
        <InputModal isComplete={isComplete} isDone={isDone} />
      </Container>
    </FormProvider>
  );
}

export default React.memo(GiftIndex);

type StyledProps = {
  isDeskTop: boolean;
  ios?: boolean;
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
  background-color: ${props => props.isDeskTop && '#776bbe'};
  @media all and (max-width: ${theme.pc}px) {
    height: 100%;
    flex-direction: column;
    width: 100%;
    min-width: 100%;
    padding-top: ${props => props.isDeskTop && '44px'};
    padding-bottom: ${props => !props.isDeskTop && '44px'};
    > span {
      min-width: 100%;
      height: 100%;
    }
  }
`;
const ImgPc = styled(Image)`
  width: 50%;
  height: 100%;
  object-fit: contain;
  img {
    width: 100%;
    height: 100%;
  }
`;
const ImgMobile = styled(Image)`
  height: 210px;
  width: 100%;
  object-fit: contain;
  img {
    width: 100%;
    height: 100%;
  }
`;

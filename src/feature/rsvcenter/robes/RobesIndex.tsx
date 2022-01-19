import { Desktop } from '@hooks/useDevice';
import mainImgMobile from '@images/common/rsvcenter_robes_mobile.jpg';
import mainImgPc from '@images/common/rsvcenter_robes_pc.jpg';
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

function RobesIndex() {
  const isDeskTop = Desktop();
  const methods = useForm();

  const [isDone, setIsDone] = useState<boolean>(false);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const {
    query: { from, product_no, code },
  } = useRouter();
  const onSubmit = async data => {
    setIsDone(true);
    if (!from) {
      const setBookWho = data.easy_book_who.map(item => ({ who: item.value, cnt: item.cnt, easy_book_who_type: item.easy_book_who_type }));
      const result = await mutate(
        rsvCenterKeys.procResult,
        easyBookProcAPI({
          easy_book: {
            ...data.easy_book,
            when_date: moment(data.easy_book.when_date).format('YYYY-MM-DD'),
            visit_when: moment(data.easy_book.visit_when).format('YYYY-MM-DD HH:mm'),
            type: '1',
            category: '예복',
          },
          easy_book_which_ent_type: data.easy_book_which_ent_type,
          easy_book_which_ent: data.easy_book_which_ent,
          easy_book_who: setBookWho,
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
          easy_book: { ...data.easy_book, type3: '1', type, category: '예복' },
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
      <Container onSubmit={methods.handleSubmit(onSubmit)} isDeskTop={isDeskTop}>
        {isDeskTop ? (
          <ImgPc unoptimized src={mainImgPc} />
        ) : (
          <Image unoptimized layout='responsive' width={375} height={210} src={mainImgMobile} alt='배너' />
        )}
        <InputModal isComplete={isComplete} isDone={isDone} />
      </Container>
    </FormProvider>
  );
}

export default React.memo(RobesIndex);

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
  background-color: ${props => props.isDeskTop && '#4774da'};
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
`;
// const ImgMobile = styled(Image)`
//   position: relative;
//   height: 210px;
//   width: 100%;
//   img {
//     width: 100%;
//     height: 100%;
//   }
// `;

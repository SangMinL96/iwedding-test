import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import InputModal from './InputModal';
import hanbokImgPc from '@images/common/rsvcenter_hanbok_pc.jpg';
import hanbokImgMobile from '@images/common/rsvcenter_hanbok_mobile.jpg';
import robesImgPc from '@images/common/rsvcenter_robes_pc.jpg';
import robesImgMobile from '@images/common/rsvcenter_robes_mobile.jpg';
import giftImgPc from '@images/common/rsvcenter_gift_pc.jpg';
import giftImgMobile from '@images/common/rsvcenter_gift_mobile.jpg';
import useSWR from 'swr';
import { Desktop } from '@hooks/useDevice';
import { useRouter } from 'next/router';
import { useSwrLocal } from '@hooks/useSwrLocal';
import { getInquiryDetailAPI, rsvCenterKeys } from '@modules/rsvcenter/api';
import { InquiryDetailItf } from '@modules/rsvcenter/interface';
import Loading from '@components/Loading';
import theme from '@styles/theme';
import Image from 'next/image';

function InquiryIndex() {
  const [img, setImg] = useState<any>({
    pc: hanbokImgPc,
    mobile: hanbokImgMobile,
    color: '#ff8b74',
  });
  const [imgLoading, setImgLoading] = useState<boolean>(false);
  const isDeskTop = Desktop();
  const {
    query: { no },
  } = useRouter();

  const { mutation } = useSwrLocal<string>(rsvCenterKeys.inquiryCategory);
  const { data } = useSWR<InquiryDetailItf>(rsvCenterKeys.inquiryHanbokDetailData, () => getInquiryDetailAPI(no as string));

  useEffect(() => {
    if (data?.easy_book?.easy_book?.category === '한복') {
      setImg(prev => ({ ...prev, pc: hanbokImgPc }));
      setImg(prev => ({ ...prev, mobile: hanbokImgMobile }));
      setImg(prev => ({ ...prev, color: '#ff8b74' }));
    }
    if (data?.easy_book?.easy_book?.category === '예복') {
      setImg(prev => ({ ...prev, pc: robesImgPc }));
      setImg(prev => ({ ...prev, mobile: robesImgMobile }));
      setImg(prev => ({ ...prev, color: '#4774DB' }));
    }
    if (data?.easy_book?.easy_book?.category === '예물') {
      setImg(prev => ({ ...prev, pc: giftImgPc }));
      setImg(prev => ({ ...prev, mobile: giftImgMobile }));
      setImg(prev => ({ ...prev, color: '#776BBD' }));
    }
    mutation(data?.easy_book?.easy_book?.category);
  }, [data]);

  useEffect(() => {
    setImgLoading(true);
  }, [img]);

  if (!imgLoading) return <Loading />;
  return (
    <Container bgColor={img.color} isDeskTop={isDeskTop}>
      {/* {img.color && img.mobile && img.pc && isDeskTop ? <ImgPc src={img.pc}></ImgPc> : <ImgMobile src={img.mobile} />} */}
      <InputModal data={data} />
    </Container>
  );
}

export default React.memo(InquiryIndex);

type StyledProps = {
  isDeskTop: boolean;
  bgColor?: string;
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
  background-color: ${props => props.bgColor};
  @media all and (max-width: ${theme.pc}px) {
    height: 100%;
    flex-direction: column;
    width: 100%;
    min-width: 100%;
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

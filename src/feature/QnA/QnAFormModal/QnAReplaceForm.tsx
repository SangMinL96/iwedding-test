import { Divider } from '@components/core/containers/Divider';
import useCrossTabState from '@hooks/useCrossTabState';
import { usePrivatePage } from '@hooks/usePrivatePage';
import { requestQnA, useTalkType } from '@modules/mypage/QnA/QnAApi';
import { QnACategory } from '@modules/mypage/QnA/QnAInterface';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { isMobile } from 'react-device-detect';
import styled from 'styled-components';
import shallow from 'zustand/shallow';
import { useFormStore, useIsFormValid } from '../hooks/useFormStore';

const PCModalHeader = dynamic(() => import('@components/core/modal/AbstractModal/PCModalHeader'));
const Loading = dynamic(() => import('@components/Loading'));
const ProductCategorySection = dynamic(() => import('../components/ProductCategorySection'));
const TalkTypeSection = dynamic(() => import('../components/TalkTypeSection'));
const ModalLikeInner = dynamic(() => import('@components/core/containers/ModalLikeInner'));
const ModalFooter = dynamic(() => import('../components/Footer'));
const ImageSection = dynamic(() => import('../components/ImageSection'));
const QnABottomBtnBox = dynamic(() => import('../components/QnABottomBtnBox'));
const RequestBody = dynamic(() => import('../components/RequestBody'));
const RequestTitle = dynamic(() => import('../components/RequestTitle'));

const QnAReplaceForm = () => {
  const authenticated = usePrivatePage();
  const [category, mainCategory, talkType, params, title, body, images, resetForm, setParams, setCategory, setMainCategory] = useFormStore(
    state => [
      state.category,
      state.mainCategory,
      state.talkType,
      state.params,
      state.title,
      state.body,
      state.images,
      state.resetForm,
      state.setParams,
      state.setCategory,
      state.setMainCategory,
    ],
    shallow,
  );
  const isFormValid = useIsFormValid();
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const isFromReplace = /replace/.test(router.pathname);
  const { list } = useTalkType();
  const { query } = useRouter();
  const [_, setTableRefetch] = useCrossTabState('tableRefetch', false);
  useEffect(() => {
    if (router.isReady) {
      setParams({
        productNo: query.product_no as string,
        brandNo: query.brandplus_no as string,
        enterCode: query.enterprise_code as string,
        quotation_no: query.quotation_no as string,
        list_no: query.list_no as string,
        order_no: query.order_no as string,
        goods_no: query.goods_no as string,
        is_realtime: query.is_realtime as string,
        rsvcenter: query.rsvcenter as string,
      });
      if (query.category == '알림센터') {
        setCategory(QnACategory[7]);
        setMainCategory('알림센터');
      } else if (query.category == '결제내역') {
        setCategory(QnACategory[8]);
        setMainCategory('결제내역');
      } else if (query.category == '견적함') {
        setCategory(QnACategory[5]);
      } else if (query.category == '상품') {
        setCategory(QnACategory[2]);
      } else if (query.category == '신혼여행') {
        setCategory(QnACategory[6]);
      } else if (query.category == '기타') {
        setCategory(QnACategory[0]);
        setMainCategory('패키지');
      } else if (query.category == '예약센터') {
        setCategory(QnACategory[9]);
        setMainCategory(query.main_category as string);
      }
    }
  }, [query]);

  useEffect(() => {
    if (loading && list?.length) setLoading(false);
  }, [loading, setLoading, list?.length]);

  const onClose = useCallback(() => {
    if (query.device === 'pc') {
      global.window && window.close();
    } else {
      resetForm();
      router.back();
    }
  }, [query, router]);

  const handleConfirm = async () => {
    if (isFormValid) {
      setUploading(true);
      const result = await requestQnA({ mainCategory, params, category, talkType, title, body, images });
      if (result) {
        confirmAlert({
          title: `문의가 등록되었습니다.`,
          message: `문의 내역과 답변은 마이페이지 > 문의내역에서 확인하실 수 있습니다.`,
          buttons: [
            {
              label: '확인',
              onClick: () => {
                setTableRefetch(true);
                resetForm();
                onClose();
              },
            },
          ],
        });
      }
    }
  };
  if (!router.isReady) return null;
  return authenticated ? (
    <>
      {<PCModalHeader title={category?.title ? `${category?.title} 문의하기` : '문의하기'} onClose={onClose} />}
      {uploading ? (
        <Loading title='등록 중 입니다.' body='이미지 사이즈가 클 경우 오래걸릴 수 있습니다.' />
      ) : (
        <Container isMobile={isMobile} isFromForm={isFromReplace}>
          <ModalLikeInner>
            <>
              {category?.id === 0 && <ProductCategorySection />}
              {category?.id === 0 && <Divider />}
              {query.category === '견적함' && <ProductCategorySection />}
              {query.category === '견적함' && <Divider />}

              {list.length > 0 && (
                <>
                  <TalkTypeSection list={list} />
                  <Divider />
                </>
              )}
              <RequestTitle />
              <RequestBody />
              <ImageSection />
              <ModalFooter />
            </>
          </ModalLikeInner>
          <QnABottomBtnBox handleClose={onClose} handleConfirm={handleConfirm} confirmTitle='확인' />
        </Container>
      )}
    </>
  ) : (
    <Loading />
  );
};

export default QnAReplaceForm;

const Container = styled.div<{ isMobile: boolean; isFromForm: boolean }>`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  position: relative;
  padding-bottom: var(--ios-bottom);
`;

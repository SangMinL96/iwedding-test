import { Divider } from '@components/core/containers/Divider';
import { useIsIOS } from '@hooks/useIsIOS';
import { usePrivatePage } from '@hooks/usePrivatePage';
import { requestQnA, useQnAList, useTalkType } from '@modules/mypage/QnA/QnAApi';
import { overFlowHidden, overFlowVisible } from '@utils/util';
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
const ModalHero = dynamic(() => import('../components/ModalHero'));
const QnABottomBtnBox = dynamic(() => import('../components/QnABottomBtnBox'));
const RequestBody = dynamic(() => import('../components/RequestBody'));
const RequestTitle = dynamic(() => import('../components/RequestTitle'));

const QnAForm = ({ handleClose }: { handleClose: () => void }) => {
  const authenticated = usePrivatePage();
  const [category, mainCategory, talkType, params, title, body, images, resetForm, setParams] = useFormStore(
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
    ],
    shallow,
  );
  const isFormValid = useIsFormValid();
  const isIos = useIsIOS();
  const { mutateList } = useQnAList(true);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const isFromForm = /form/.test(router.pathname);
  const { list } = useTalkType();
  const { query } = useRouter();
  useEffect(() => {
    if (router.isReady) {
      setParams({
        productNo: query.product_no as string,
        brandNo: query.brandplus_no as string,
        enterCode: query.enterprise_code as string,
        quotation_no: query.quotation_no as string,
        rsvcenter: query.rsvcenter as string,
      });
    }
  }, [query]);

  useEffect(() => {
    if (loading && list?.length) setLoading(false);
  }, [loading, setLoading, list?.length]);

  if (!handleClose && typeof window != 'undefined') {
    // iFrame에서 닫는 경우
    handleClose = () => {
      window.parent.wedding_talk_close();
      overFlowHidden();
    };
  }

  const onClose = useCallback(() => {
    if (isFromForm) {
      if (isIos) {
        return router.back();
      } else {
        return handleClose();
      }
    } else {
      router.back();
    }
    resetForm();
  }, [handleClose, resetForm, router, isFromForm]);

  const handleConfirm = async () => {
    if (isFormValid) {
      setUploading(true);
      const result = await requestQnA({ mainCategory, params, category, talkType, title, body, images });
      if (result) {
        if (isFromForm) {
          confirmAlert({
            title: `문의가 등록되었습니다.`,
            message: `문의 내역과 답변은 마이페이지 > 문의내역에서 확인하실 수 있습니다.`,
            buttons: [
              {
                label: '확인',
                onClick: () => {
                  if (isIos) {
                    return router.back();
                  } else {
                    return handleClose();
                  }
                },
              },
            ],
          });
        } else {
          confirmAlert({
            title: `문의가 등록되었습니다.`,
            message: `문의 내역과 답변은 마이페이지 > 문의내역에서 확인하실 수 있습니다.`,
            buttons: [
              {
                label: '확인',
                onClick: () => {
                  onClose();
                  mutateList();
                },
              },
            ],
          });
        }
      }
    }
  };

  if (isFromForm) {
    overFlowVisible();
  }

  return authenticated ? (
    <>
      {isFromForm && <PCModalHeader title={category?.title ? `${category?.title} 문의하기` : '문의하기'} onClose={onClose} />}
      {uploading ? (
        <Loading title='등록 중 입니다.' body='이미지 사이즈가 클 경우 오래걸릴 수 있습니다.' />
      ) : (
        <Container isMobile={isMobile} isFromForm={isFromForm}>
          <ModalLikeInner>
            {loading ? (
              <Loading body='문의하기를 불러오는 중 입니다.' />
            ) : (
              <>
                {category?.id !== 0 ? <ModalHero /> : <ProductCategorySection />}
                <Divider noMT={category?.id !== 0} />
                <TalkTypeSection list={list} />
                <Divider />
                <RequestTitle />
                <RequestBody />
                <ImageSection />
                <ModalFooter />
              </>
            )}
          </ModalLikeInner>
          <QnABottomBtnBox handleClose={onClose} handleConfirm={handleConfirm} confirmTitle='확인' />
        </Container>
      )}
    </>
  ) : (
    <Loading />
  );
};

export default QnAForm;

const Container = styled.div<{ isMobile: boolean; isFromForm: boolean }>`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  position: relative;
  padding-bottom: var(--ios-bottom);
`;

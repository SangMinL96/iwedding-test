import { Divider } from '@components/core/containers/Divider';
import ModalLikeInner from '@components/core/containers/ModalLikeInner';
import AbstractModal from '@components/core/modal/AbstractModal/AbstractModal';
import Loading from '@components/Loading';
import { useModalVisible } from '@hooks/useModalVisible';
import { updateQnA, useQnAList, useTalkType } from '@modules/mypage/QnA/QnAApi';
import { QNA_EDIT_MODAL } from '@utils/modalKeys';
import router from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import styled from 'styled-components';
import shallow from 'zustand/shallow';
import ModalFooter from '../components/Footer';
import ImageSection from '../components/ImageSection';
import ModalHero from '../components/ModalHero';
import ProductCategorySection from '../components/ProductCategorySection';
import QnABottomBtnBox from '../components/QnABottomBtnBox';
import RequestBody from '../components/RequestBody';
import RequestTitle from '../components/RequestTitle';
import TalkTypeSection from '../components/TalkTypeSection';
import { useFormStore } from '../hooks/useFormStore';

const QnAEditPage = () => {
  const [id, category, resetForm, mainCategory, talkType, params, title, body, images, deletedDBImages] = useFormStore(
    state => [
      state.id,
      state.category,
      state.resetForm,
      state.mainCategory,
      state.talkType,
      state.params,
      state.title,
      state.body,
      state.images,
      state.deletedDBImages,
    ],
    shallow,
  );
  const [loading, setLoading] = useState(true);

  const { list } = useTalkType();

  useEffect(() => {
    if (loading && list?.length) setLoading(false);
  }, [loading, setLoading, list?.length]);

  const { setModalVisible } = useModalVisible(QNA_EDIT_MODAL);
  const { mutateList } = useQnAList(true);
  const handleConfirm = async () => {
    const response = await updateQnA({
      id,
      category,
      mainCategory,
      params,
      talkType,
      title,
      body,
      images,
      deletedDBImages,
    });

    if (response) {
      confirmAlert({
        title: `문의사항이 수정되었습니다.`,
        buttons: [
          {
            label: '확인',
            onClick: () => {
              resetForm();
              mutateList();
            },
          },
        ],
      });
      router.back();
    }
    setModalVisible(false);
  };

  const handleClose = useCallback(async () => {
    resetForm();
    setModalVisible(false);
  }, [setModalVisible, resetForm]);

  const closeWithRouter = useCallback(() => {
    handleClose();
    router.back();
  }, [handleClose]);
  return (
    <AbstractModal title={`${category?.title} 문의 수정하기`} onClose={handleClose} isFullSize noFooter noPadding>
      <Container>
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
        <QnABottomBtnBox handleClose={closeWithRouter} handleConfirm={handleConfirm} confirmTitle='수정완료' />
      </Container>
    </AbstractModal>
  );
};

export default React.memo(QnAEditPage);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`;

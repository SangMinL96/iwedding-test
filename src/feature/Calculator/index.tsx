import Loading from '@components/Loading';
import { useCalculatorState, useSelectedItems } from '@feature/Calculator/store/calcStore';
import { useDeepEffect } from '@hooks/useDeepEffect';
import { useModalVisible } from '@hooks/useModalVisible';
import { usePrivatePage } from '@hooks/usePrivatePage';
import { logCalcOpen } from '@modules/log/calculator/calcLogger';
import theme from '@styles/theme';
import { ADD_PRODUCT_MODAL, ADD_QUOTE_MODAL, COPY_QUOTE_MODAL, QNA_FORM_MODAL } from '@utils/modalKeys';
import dynamic from 'next/dynamic';
import React, { useCallback } from 'react';
import styled from 'styled-components';
import BottomButton from './components/BottomButton';
import Hero from './components/Hero';
import SDMSelector from './components/SDMSelector';

const QnAFormModal = dynamic(() => import('@feature/QnA/QnAFormModal'));
const MobileSingleHeader = dynamic(() => import('@components/core/containers/MobileSingleHeader'));
const AddPrdModal = dynamic(() => import('@feature/Calculator/modals/AddPrdModal'));
const AddQuoteModal = dynamic(() => import('@feature/Calculator/modals/AddQuoteModal'));
const ModalCopyQuotation = dynamic(() => import('@feature/quotation/components/modals/ModalCopyQuotation'));
const Estimation = dynamic(() => import('@feature/Calculator/components/Estimation'));
const QuoteLinks = dynamic(() => import('@feature/Calculator/components/QuoteLinks'));

const Calculator = () => {
  const authenticated = usePrivatePage();
  const showEstimation = useCalculatorState(state => state.showEstimation);
  const selectedItems = useSelectedItems();
  /**
   * 로그인 되어있을 경우에만 로그 발송
   * 확인안할 시 useEffect가 로그인여부 확인 전에 발동되어
   * 로그인 컨펌이 뜨고 바로 main/index로 리다이렉트 됨
   */
  useDeepEffect(() => {
    if (authenticated) {
      logCalcOpen();
    }
  }, []);

  // 모달 상태관리
  const { modalVisible: prdModalVisible } = useModalVisible(ADD_PRODUCT_MODAL);
  const { modalVisible: addModalVisible, setModalVisible: setAddModalVisible } = useModalVisible(ADD_QUOTE_MODAL);
  const { modalVisible: copyModalVisible, setModalVisible: setCopyModalVisible } = useModalVisible(COPY_QUOTE_MODAL);
  const { modalVisible: requestFormVisible } = useModalVisible(QNA_FORM_MODAL);

  const handleCopyClose = useCallback(() => setCopyModalVisible(false), [setCopyModalVisible]);
  const toggleAddModal = useCallback(() => setAddModalVisible(!addModalVisible), [addModalVisible, setAddModalVisible]);

  return authenticated ? (
    <Wrapper>
      <MobileSingleHeader title='견적 계산기' />
      <Hero />
      <Container full={!showEstimation}>
        <SDMSelector />
        {showEstimation && <Estimation />}
        <BottomButton />
      </Container>
      {showEstimation && <QuoteLinks />}
      {copyModalVisible && (
        <ModalCopyQuotation
          selectedItems={selectedItems.map(item => item.no)}
          visible={copyModalVisible}
          onClose={handleCopyClose}
          is_realtime={false}
          onComplete={toggleAddModal}
        />
      )}
      {prdModalVisible && <AddPrdModal />}
      {requestFormVisible && <QnAFormModal visible={requestFormVisible} isDuplicated />}
      {addModalVisible && <AddQuoteModal onClose={toggleAddModal} />}
    </Wrapper>
  ) : (
    <Loading />
  );
};

export default Calculator;

const Wrapper = styled.div`
  max-width: 1280px;
  margin: auto;
  margin-bottom: 100px;
  @media screen and (max-width: ${theme.pc}px) {
    margin-bottom: 0;
  }
`;
const Container = styled.div<{ full: boolean }>`
  /* display: flex;
  flex-direction: column; */
  position: relative;
  width: 100%;
  padding: 50px 15px;
  margin: 0 auto;
  background: rgba(244, 246, 248, 1);

  @media screen and (max-width: ${theme.pc}px) {
    height: ${({ full }) => (full ? 'calc(100vh - 150px)' : '100%')};
    padding-top: 0;
  }

  > div {
    max-width: 560px;
    margin: auto;
  }
`;

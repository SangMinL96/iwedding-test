import { CommonCheckBox } from '@components/core/checkboxes';
import AbstractModal from '@components/core/modal/AbstractModal/AbstractModal';
import HalfModalHeader from '@components/core/modal/AbstractModal/HalfModalHeader';
import Loading from '@components/Loading';
import { Desktop } from '@hooks/useDevice';
import { useModalVisible } from '@hooks/useModalVisible';
import { useOverflowModal } from '@hooks/useOverflowHidden';
import { CommonModalProps } from '@modules/CommonInterface';
import { addItemsToQuotation, copyQuotationItem, useGetMyAllQuotationList } from '@modules/mypage/quotation/QuotationAPI';
import theme from '@styles/theme';
import IconPlus from '@svgs/icon_plus';
import { CREATE_QUOTE_MODAL } from '@utils/modalKeys';
import { useCopiedQuote } from 'feature/Calculator/hooks/useCopiedQuote';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useCallback, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import styled from 'styled-components';
import { useSelectedCart } from '../../hooks/useSelectedCart';
import { WhiteButton } from '../buttons/WhiteButton';
const ModalCreateQuotation = dynamic(() => import('./ModalCreateQuotation'));

interface CopyProps extends CommonModalProps {
  selectedItems?: number[]; // 스드메계산기에서 보낼 경우(cart가 없음)
  selectedCartNo?: number[]; // 견적함 내에서 복사할 경우
  onComplete?: () => void;
  is_realtime: boolean;
}

const ModalCopyQuotation = ({ visible, onClose, selectedCartNo, selectedItems = [], onComplete, is_realtime }: CopyProps) => {
  const router = useRouter();
  const { id: quotation_id } = router.query;
  const { setLastCopiedQuote } = useCopiedQuote();
  const [copying, setCopying] = useState(false);

  // 선택한 단일상품
  const { selectedCart, clearSelectedCart } = useSelectedCart();

  //견적함 새 생성모달
  const { modalVisible, setModalVisible } = useModalVisible(CREATE_QUOTE_MODAL);

  //견적함 리스트 FETCH
  const { data: quotationAllList, mutate, isValidating } = useGetMyAllQuotationList();

  //유저가 선택한 견적함 리스트
  const [selectedQuotationNo, setSelectedQuotation] = useState<string[]>([]);
  const onselectQuotation = (checked: boolean, value: string) => {
    if (checked) {
      setSelectedQuotation(selectedQuotationNo.concat(value));
    } else {
      setSelectedQuotation(selectedQuotationNo.filter(sc => !sc.includes(value)));
    }
  };
  //견적함 상품 복사
  const onConfirm = async () => {
    setCopying(true);
    setLastCopiedQuote(selectedQuotationNo[0]);

    if (!selectedCart && !selectedItems.length && !selectedCartNo.length) {
      confirmAlert({ title: '상품을 선택해주세요' });
    }

    try {
      let response: any;
      // 스드메 계산기 복사
      if (selectedItems?.length > 0) {
        response = await Promise.all(
          selectedQuotationNo.map(q => {
            addItemsToQuotation(q, selectedItems); // 보겸신이 만들어준 API. product_no기준으로 상품 복사(사실상 추가가 맞음)
          }),
        );
        closeModal();
        onComplete();
        router.back();
      } else {
        if (selectedQuotationNo.length) {
          // 주영좌가 만든 API. cartNo기준으로 기존 견적함에서 다른 견적함으로 복사할 경우
          response = await copyQuotationItem(selectedQuotationNo, selectedCart ? [selectedCart.cart_no] : selectedCartNo, is_realtime);
          if (response?.data) {
            confirmAlert({
              title: `복사를 완료했어요.${response?.data.isDuplicated ? ' 중복된 상품은 제외되었습니다.' : ''}`,
              buttons: [
                {
                  label: '확인',
                  onClick: () => {
                    closeModal();
                    router.back();
                  },
                },
              ],
            });
          }
        } else {
          confirmAlert({ title: '견적함을 선택해주세요.', buttons: [{ label: '확인', onClick: () => router.back() }] });
        }
      }
      setCopying(false);
    } catch (error) {
      console.log(`error`, error);
      setCopying(false);
      closeModal();
    }
  };

  //모달 닫으면서 초기화
  const closeModal = async () => {
    await clearSelectedCart();
    onClose();
  };
  const closeCreateModal = useCallback(() => {
    setModalVisible(false);
    mutate();
  }, [setModalVisible, mutate]);
  const openModal = useCallback(() => {
    router.push(router.asPath + '#CreateModal');
    setModalVisible(true);
  }, [setModalVisible, router]);
  const isDesktop = Desktop();
  return (
    <>
      <AbstractModal
        title='상품을 복사할 견적함을 선택하세요.'
        visible={visible}
        confirmText='선택완료'
        onClose={closeModal}
        onConfirm={onConfirm}
        canConfirm={selectedQuotationNo.length > 0}
      >
        <Inner>
          {isDesktop ? (
            <NewQuoteBtn onClick={openModal}>
              <span>
                <IconPlus />
              </span>{' '}
              새 견적함 만들기
            </NewQuoteBtn>
          ) : (
            <HalfModalHeader title='상품을 복사할 견적함을 선택하세요.'>
              <NewQuoteBtn onClick={openModal} smallBtn>
                <span>
                  <IconPlus />
                </span>{' '}
                새 견적함
              </NewQuoteBtn>
            </HalfModalHeader>
          )}
          <div className='estimate_list_box'>
            {isValidating ? (
              <Loading body='견적함을 불러오는 중 입니다.' />
            ) : copying ? (
              <Loading body='선택한 견적함에 상품을 복사하는 중입니다.' />
            ) : (
              <ul className='estimate_list'>
                {quotationAllList
                  ?.filter(quotation => quotation.group_no.toString() != quotation_id)
                  .map(quotation => (
                    <li
                      className='estimate_list_item'
                      key={'quotation_all_id_' + quotation.group_no}
                      onClick={e => {
                        document.getElementById(`checkbox` + quotation.group_no.toString())?.click();
                      }}
                    >
                      <CommonCheckBox
                        id={'checkbox' + quotation.group_no.toString()}
                        name={quotation.group_no.toString()}
                        onChange={onselectQuotation}
                      />
                      <div className='label_box'>
                        <label>
                          {quotation.group_name}
                          <span className='prd_num'>담긴 상품 {quotation.cart_cnt}개</span>
                        </label>
                      </div>
                    </li>
                  ))}
              </ul>
            )}
          </div>
        </Inner>
      </AbstractModal>
      {modalVisible && <ModalCreateQuotation visible={modalVisible} onClose={closeCreateModal} inCopyView={true} />}
    </>
  );
};

export default ModalCopyQuotation;
const NewQuoteBtn = styled(WhiteButton)`
  flex-direction: row;
  align-items: center;
  height: 50px;
  > span {
    &:first-child {
      margin-bottom: 0;
      margin-right: 5px;
    }
  }

  ${({ smallBtn }) => smallBtn && `min-height: 34px; height: 34px; width: 86px;`}
`;
const Inner = styled.div`
  width: 100%;

  .estimate_list_box {
    width: 100%;
    height: 303px;
    .estimate_list {
      width: 100%;
      height: 100%;
      overflow-y: scroll;
      ${theme.hideScroll};
      padding-bottom: var(--ios-bottom);

      .estimate_list_item {
        display: block;
        width: 100%;
        height: 75px;
        border-bottom: 1px solid #d8d8d8;
        padding-top: 16px;
        @media all and (max-width: ${theme.pc}px) {
          padding-left: 15px;
        }
        &:last-child {
          border-bottom: none;
        }
        div {
          &:first-child {
            width: auto;
            display: inline-block;
            vertical-align: top;
            padding-top: 3px;
          }
        }
        .label_box {
          ${theme.textEllipsis};
          width: 80%;
          margin-left: 18px;
          label {
            font-size: 15px;
            font-weight: 500;
          }
          .prd_num {
            display: block;
            margin-top: 6px;
            font-size: 14px;
            color: ${props => props.theme.gray};
          }
        }
      }
    }
    @media all and (min-width: ${theme.pc}px) {
      height: 100%;
    }
  }
`;

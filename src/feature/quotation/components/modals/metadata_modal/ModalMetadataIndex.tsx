import AbstractModal from '@components/core/modal/AbstractModal/AbstractModal';
import { useDeepEffect } from '@hooks/useDeepEffect';
import { Desktop } from '@hooks/useDevice';
import { useModalVisible } from '@hooks/useModalVisible';
import { CommonModalProps } from '@modules/CommonInterface';
import { selectUpdateMetadata } from '@modules/mypage/quotation/QuotationAPI';
import { getModalType, GroupMetadataDto, MetadataValue, QuotationModalType } from '@modules/mypage/quotation/QuotationInterface';
import theme from '@styles/theme';
import { QUOTE_META_MODAL } from '@utils/modalKeys';
import { overFlowVisible } from '@utils/util';
import cloneDeep from 'lodash/cloneDeep';
import { useRouter } from 'next/router';
import React, { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useSelectedMetadata } from '../../../hooks/useSelectedMetadata';
import ModalMetaAddress from './ModalMetaAddress';
import ModalMetaDatetime from './ModalMetaDatetime';
import ModalMetaEvent from './ModalMetaEvent';
import ModalMetaTargetUser from './ModalMetaTargetUser';
import ModalSearchAddress from './ModalSearchAddress';
import { useSelectedCart } from '../../../hooks/useSelectedCart';
interface MetadataIndexProps extends CommonModalProps {
  onComplete: () => void;
}

const ModalMetadataIndex = ({ onComplete }: MetadataIndexProps) => {
  const { modalVisible, setModalVisible } = useModalVisible(QUOTE_META_MODAL);
  const { selectedCart } = useSelectedCart();
  const isShoes = selectedCart?.product?.category === '웨딩슈즈';

  const router = useRouter();
  // 현재 인덱스
  const [currentIndex, setCurrentIndex] = useState(0);

  // 메타데이터 전체리스트
  const { selectedMetadataList, setSelectedMetadata } = useSelectedMetadata();

  // 현재 메타데이터
  const [currentMetadata, setCurrentMetadata] = useState<GroupMetadataDto>();
  console.log(`currentMetadata`, currentMetadata);

  //변경된 메타데이터 임시저장
  const [changedMetadata, setChangedMetadata] = useState<GroupMetadataDto[]>([]);

  // 현재 메타데이터의 타입
  const type = useMemo(() => {
    if (currentMetadata) return currentMetadata.template.code;
    return null;
  }, [currentMetadata]);

  // 현재 메타데이터 가져오기
  useDeepEffect(() => {
    if (selectedMetadataList?.length) {
      setCurrentMetadata(selectedMetadataList[currentIndex]);
    }
  }, [selectedMetadataList, currentIndex]);

  //기존 메타데이터 임시저장
  useDeepEffect(() => {
    if (selectedMetadataList) {
      if (!changedMetadata.length) {
        setChangedMetadata(cloneDeep(selectedMetadataList));
      }
    }
  }, [selectedMetadataList, changedMetadata?.length]);

  const onChangedMetadata = useCallback(
    (metadata: MetadataValue) => {
      if (currentMetadata) {
        setChangedMetadata(prev => {
          return prev.map(meta => {
            if (meta.id === currentMetadata.id) {
              meta.metadata = metadata;
            }
            return meta;
          });
        });
      }
    },
    [currentMetadata],
  );

  const onCloseModal = useCallback(async () => {
    await setSelectedMetadata(undefined);
    overFlowVisible();
    setCurrentIndex(0);
    setCurrentMetadata(undefined);
    setChangedMetadata([]);
    setModalVisible(false);
  }, [setSelectedMetadata, setModalVisible]);
  //이전
  const mPrev = useCallback(() => {
    if (currentIndex === 0) {
      onCloseModal();
      router.back();
    } else {
      setCurrentIndex(currentIndex - 1);
    }
  }, [currentIndex, router, onCloseModal]);

  //다음
  const onClickCompleteUpdateMetadata = useCallback(async () => {
    const metadata_list = changedMetadata.map(metadata => {
      const metadata_id = metadata.id;
      return { metadata_id, metadata: metadata.metadata };
    });
    await onCloseModal();
    await selectUpdateMetadata({ metadata_list });
    console.log(`metadata_list`, metadata_list);
    try {
      onComplete();
    } catch (error) {
      console.log(error);
    }
    router.back();
  }, [onComplete, router, onCloseModal, changedMetadata]);
  //모달 닫기

  /**
   * 다음단계 Validate
   */
  const canNext = useCallback(() => {
    if (changedMetadata != null && currentMetadata != null) {
      const changed = changedMetadata[currentIndex];
      const templates = changed?.template.metadata_template.split(',');
      if (changed && templates) {
        const type = getModalType(changed.template.code);
        switch (type) {
          case 'event':
          case 'target_user':
            return changed.metadata.selected_answer_value.length || changed.metadata.value.length;
          case 'date_time':
            return changed.metadata.value.time && changed.metadata.value.date;
          case 'address':
            return changed.metadata.value || changed.metadata.selected_answer_value;
          default:
            return false;
        }
      }
      return false;
    }

    return false;
  }, [changedMetadata, currentIndex, currentMetadata]);
  const mNext = useCallback(() => {
    if (selectedMetadataList?.length && canNext()) {
      if (currentIndex < selectedMetadataList.length - 1) {
        setCurrentIndex(currentIndex + 1);
      }
    }
  }, [selectedMetadataList, canNext, currentIndex, setCurrentIndex]);

  const isDesktop = Desktop();
  return (
    <AbstractModal
      visible={modalVisible}
      title={currentMetadata?.template?.modal_title}
      onClose={onCloseModal}
      noFooter
      isFullSize
      noPadding={!isDesktop}
    >
      <MetadataBox>
        {/*행사구분 */}
        {type === QuotationModalType.META_EVENT && <ModalMetaEvent onChanged={onChangedMetadata} selectedMetadata={currentMetadata} />}

        {/*일자 정보 */}
        {(type === QuotationModalType.META_EVENT_DATE ||
          type === QuotationModalType.META_WANTED_VISIT_DATE ||
          type === QuotationModalType.META_WANTED_EVENT_DATE) && (
          <ModalMetaDatetime onChangedMetadata={onChangedMetadata} selectedMetadata={currentMetadata} />
        )}

        {/*이용자*/}
        {(type === QuotationModalType.META_TARGET_USER || type === QuotationModalType.META_TARGET_USER2) && (
          <ModalMetaTargetUser onChangedMetadata={onChangedMetadata} selectedMetadata={currentMetadata} />
        )}

        {/* 웨딩슈즈 */}
        {/* {type === QuotationModalType.META_DELIVERY_ADDRESS3 && isShoes && (
          <ModalSearchAddress isShoes onChangedMetadata={null} selectedMetadata={currentMetadata} />
        )} */}

        {/*주소*/}
        {getModalType(currentMetadata?.template?.code) == 'address' && (
          <ModalMetaAddress onChangedMetadata={onChangedMetadata} selectedMetadata={currentMetadata} />
        )}
      </MetadataBox>
      <Footer>
        <button className={`cancel_btn`} onClick={mPrev}>
          {currentIndex == 0 ? '닫기' : '이전'}
        </button>
        {currentIndex == selectedMetadataList.length - 1 ? (
          <button className={`confirm_btn ${canNext() ? 'on' : ''}`} onClick={onClickCompleteUpdateMetadata}>
            완료
          </button>
        ) : (
          <button className={`confirm_btn ${canNext() ? 'on' : ''}`} onClick={mNext}>
            다음
          </button>
        )}
      </Footer>
    </AbstractModal>
  );
};

export default ModalMetadataIndex;

const MetadataBox = styled.div`
  width: 100%;
  height: 100%;
  @media all and (max-width: ${theme.pc}px) {
    height: 100%;
    padding: 0;
  }
  .new_quotation_btn.pc {
    width: 100%;
    height: 50px;
    border: 1px solid ${props => props.theme.blue};
    font-size: 15px;
    font-weight: 700;
    color: ${props => props.theme.blue};
    @media all and (max-width: ${theme.pc}px) {
      display: none;
    }
    > span {
      display: inline-block;
      font-weight: 100;
      font-size: 17px;
    }
  }
  .estimate_list_box,
  .event_radio_box,
  .user_check_box,
  .address_check_box {
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    ${theme.hideScroll};
    .estimate_list,
    .event_radio_list,
    .user_check_list,
    .address_check_list {
      width: 100%;
      height: 100%;
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
          display: inline-block;
          margin-left: 18px;
          label {
            font-size: 15px;
          }
          .prd_num {
            display: block;
            margin-top: 5px;
            font-size: 14px;
            color: ${props => props.theme.gray};
          }
        }
      }
    }
    .event_radio_list {
      .event_radio_item {
        position: relative;
        &:last-child {
          > div {
            .radio_container {
              padding: 27.5px 0;
              @media all and (max-width: ${theme.pc}px) {
                padding: 27.5px 15px;
              }
            }
            &:last-child {
              top: 12px;
              @media all and (max-width: ${theme.pc}px) {
                right: 15px;
              }
            }
          }
        }
      }
    }
  }
  .user_check_box,
  .address_check_box {
    .user_check_list,
    .address_check_list {
      padding-bottom: 25px;
    }
  }
  .datetime_box {
    width: 100%;
    height: 100%;
    position: relative;
    overflow-y: scroll;
    .datetime_list {
      width: 100%;
      height: 100%;
      .datetime_item {
        width: 100%;
        height: 75px;
        position: relative;
        border-bottom: 1px solid #dfdfdf;
        font-size: 15px;
        font-weight: 500;
        line-height: 22px;
        @media all and (max-width: ${theme.pc}px) {
          padding-left: 15px;
        }
        > span {
          display: inline-block;
          line-height: 75px;
          vertical-align: middle;
        }
        .datetime_input {
          display: inline-block;
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          @media all and (max-width: ${theme.pc}px) {
            right: 15px;
          }
        }
      }
    }
  }
`;

const Footer = styled.div`
  width: 100%;
  height: 91px;
  background-color: #fbfbfb;
  border-top: 1px solid #d8d8d8;
  padding: 20px 30px;
  position: absolute;
  bottom: var(--ios-bottom);
  @media all and (max-width: ${theme.pc}px) {
    padding: 20px 15px;
  }

  > button {
    width: 170px;
    height: 50px;
    font-size: 16px;
    @media all and (max-width: ${theme.pc}px) {
      width: 49.2%;
    }
  }
  .cancel_btn {
    border: 1px solid #d8d8d8;
    color: ${theme.black};
    background-color: #fff;
    margin-right: 5px;
  }
  .confirm_btn {
    background-color: #8c8c8c;
    color: #fff;
  }
  .confirm_btn.on {
    background-color: #262626;
    color: #fff;
  }
`;

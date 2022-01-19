import AbstractModal from '@components/core/modal/AbstractModal/AbstractModal';
import { useSelectedMetadata } from '@feature/quotation/hooks/useSelectedMetadata';
import { useDeepEffect } from '@hooks/useDeepEffect';
import { useModalVisible } from '@hooks/useModalVisible';
import { useOverflowHidden } from '@hooks/useOverflowHidden';
import { CommonModalProps } from '@modules/CommonInterface';
import { selectUpdateMetadata } from '@modules/mypage/quotation/QuotationAPI';
import { QUOTE_WEDDING_SHOES_MODAL } from '@utils/modalKeys';
import { overFlowVisible } from '@utils/util';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
const DaumAddressWebView = dynamic(() => import('@components/DaumAddressWebview/DaumAddressWebview'));

const ModalShoesAddress = ({ visible }: CommonModalProps) => {
  useOverflowHidden(visible);
  const router = useRouter();
  const { selectedMetadataList } = useSelectedMetadata();
  const { setModalVisible } = useModalVisible(QUOTE_WEDDING_SHOES_MODAL);
  const selectedMetadata = selectedMetadataList[0];
  const [daumAddress, setDaumAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const onChangeDetailAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDetailAddress(e.target.value);
  };

  //기존값 가져와서 로컬 임시저장하기
  useEffect(() => {
    if (selectedMetadata) {
      const { metadata } = selectedMetadata;
      //선택 템플릿 값
      const { value } = metadata;
      const originalAddr = value.ent_address.trim().split(/\|/); //기존 기본,상세주소 임시저장
      setDaumAddress(originalAddr[0]);
      setDetailAddress(originalAddr[1]);
    }
  }, [selectedMetadata]);

  //확인
  const onConfirm = async () => {
    if (daumAddress && detailAddress) {
      const newAddress = daumAddress + '|' + detailAddress;

      await selectUpdateMetadata({
        metadata_list: [
          {
            metadata_id: selectedMetadata.id,
            metadata: {
              ...selectedMetadata.metadata,
              selected_answer_value: '직접입력',
              value: { ent_address: newAddress, ent_name: '' },
            },
          },
        ],
      });
      router.back();
      router.reload();
    }
  };

  //다음 주소검색 api
  const [visibleDaumAddressForWebview, setVisibleDaumaddress] = useState(false);
  const showDaumAddressView = () => setVisibleDaumaddress(true);

  //모달 닫기
  const closeModal = () => {
    overFlowVisible();
    setModalVisible(false);
  };

  return (
    <AbstractModal
      visible={visible}
      onClose={closeModal}
      title='주소 검색'
      canConfirm={daumAddress && !!detailAddress}
      onConfirm={onConfirm}
      isFullSize
    >
      {visibleDaumAddressForWebview ? (
        <DaumAddressWebView
          onConfirm={address => {
            setDaumAddress(address);
            setVisibleDaumaddress(false);
          }}
        />
      ) : (
        <Inner>
          <div className='input-box'>
            <p className='info-title'>주소</p>
            <div className={daumAddress.length > 0 ? 'title-input-box on' : 'title-input-box'}>
              <input type='text' placeholder='주소를 입력하세요.' onClick={showDaumAddressView} value={daumAddress} readOnly={true} />
              <button className='change_address_btn' onClick={showDaumAddressView}>
                주소 검색
              </button>
            </div>
          </div>

          {daumAddress && daumAddress.length > 0 && (
            <div className='input-box'>
              <p className='info-title'>상세 주소 입력</p>
              <div className={detailAddress && detailAddress.length > 0 ? 'title-input-box on' : 'title-input-box'}>
                <input type='text' placeholder='상세주소를 입력해주세요' value={detailAddress} onChange={onChangeDetailAddress} />
              </div>
            </div>
          )}
        </Inner>
      )}
    </AbstractModal>
  );
};
export default ModalShoesAddress;

const Inner = styled.div`
  width: 100%;

  .input-box {
    width: 100%;
    position: relative;
    &:nth-child(2) {
      margin-bottom: 50px;
      > .title-input-box {
        > input {
          padding-right: 15px;
          width: 100%;
        }
      }
    }
    .info-title {
      font-size: 14px;
      font-weight: 500;
      display: block;
      margin-bottom: 14px;
    }
    .title-input-box {
      width: 100%;
      height: 50px;
      border: 2px solid #262626;
      position: relative;
      margin-bottom: 20px;
      > input {
        ${props => props.theme.resetBtnStyle}
        width: calc(100% - 66px);
        padding-left: 15px;
        height: 48px;
        font-size: 15px;
        background-color: transparent;
      }
      > button {
        ${props => props.theme.resetBtnStyle}
        background-color: #fff;
        position: absolute;
        top: -2px;
        right: -2px;
        cursor: pointer;
      }
      .change_address_btn {
        width: 70px;
        height: 50px;
        background-color: #262626;
        color: #fff;
        font-weight: 700;
      }
    }
    .title-input-box.on {
      border: 2px solid #262626;
    }
    .info-btn-box {
      width: 100%;
      position: relative;
      margin-bottom: 24px;
      .half-size-btn {
        ${props => props.theme.resetBtnStyle}
        text-align: left;
        display: inline-block;
        width: 48.7%;
        height: 40px;
        line-height: 38px;
        vertical-align: middle;
        border-radius: 8px;
        background-color: #f5f5f5;
        border: 1px solid #dfdfdf;
        padding-left: 11px;
        font-size: 14px;
        font-weight: 700;
        margin-bottom: 9px;
        margin-right: 5px;
        &:active {
          background-color: #dfdfdf;
        }
        &:nth-child(2n) {
          margin-right: 0;
        }
      }
      .half-size-btn.on {
        border: 1px solid #262626;
      }
    }
  }
  .place_input_box {
    width: 100%;
    position: relative;
    padding-top: 13px;
    padding-bottom: 10px;
    .place_input_title {
      width: 100%;
      height: 43px;
      border-bottom: 2px solid #262626;
      font-size: 16px;
      font-weight: 700;
    }
    .place_input_list {
      .place_input_item {
        position: relative;
        height: 60px;
        > div {
          &:last-child {
            width: 180px;
            height: 42px;
            top: 6px;
            .input_box {
              width: 100%;
              height: 100%;
              .title-input-box {
                > input {
                  height: 40px;
                }
              }
            }
          }
        }
        &:last-child {
          > div {
            &:last-child {
              width: 100%;
              height: 100%;
            }
            > .radio_container.more_padding {
              padding: 17.5px 0;
            }
          }
        }
      }
    }
  }
`;

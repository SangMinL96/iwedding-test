import { RadioboxItem } from '@components/core/checkboxes';
import { InputWithClear } from '@components/core/inputs';
import AbstractModal from '@components/core/modal/AbstractModal/AbstractModal';
import DaumAddressWebView2 from '@components/DaumAddressWebview/DaumAddressWebview2';
import { useIsIOS } from '@hooks/useIsIOS';
import { useOverflowHidden } from '@hooks/useOverflowHidden';
import { CommonModalProps } from '@modules/CommonInterface';
import { AddressMetadata, GroupMetadataDto, template_input_title } from '@modules/mypage/quotation/QuotationInterface';
import { overFlowVisible } from '@utils/util';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
const DaumAddressWebView = dynamic(() => import('@components/DaumAddressWebview/DaumAddressWebview'));

interface ModalProps extends CommonModalProps {
  onChangedMetadata: (addressMetadata: AddressMetadata) => void;
  selectedMetadata?: GroupMetadataDto;
}

const ModalSearchAddress = ({ visible, onClose, onChangedMetadata, selectedMetadata }: ModalProps) => {
  useOverflowHidden(visible);
  const isIos = useIsIOS();
  const [defaultAddress, setDefaultAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const onChangeDetailAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDetailAddress(e.target.value);
  };

  //기존 값 로컬 임시저장
  const [tmpAddressState, setTmpAddressState] = useState<{
    value: AddressMetadata;
    selected_answer_value: string;
  }>({
    value: { ent_address: '', ent_code: '', ent_name: '', ent_no: 0, template_title: '' },
    selected_answer_value: '',
  });

  const [entName, setEntName] = useState({ title: '', entName: '' });

  //기존값 가져와서 로컬 임시저장하기
  useEffect(() => {
    if (selectedMetadata) {
      const { metadata } = selectedMetadata;
      //주소 값
      const value = metadata.value as AddressMetadata;
      //선택 템플릿 값
      const { selected_answer_value } = metadata;
      const [defaultAddress, detailAddress] = value.ent_address.trim().split('|'); //기존 기본,상세주소 임시저장
      setDefaultAddress(defaultAddress);
      setDetailAddress(detailAddress);
      setTmpAddressState({ selected_answer_value, value });
      setEntName({ title: metadata.value.template_title, entName: metadata.value.ent_name });
    }
  }, [selectedMetadata, setEntName]);

  //주소 데이터 validation check
  const validateOnConfirm = () => {
    if (defaultAddress && detailAddress && entName.title) {
      return !(entName.title != '자택' && !entName.entName);
    } else {
      return false;
    }
  };

  //확인
  const onConfirm = () => {
    if (validateOnConfirm()) {
      onChangedMetadata({
        ...tmpAddressState.value,
        ent_address: defaultAddress + '|' + detailAddress,
        template_title: entName.title,
        ent_name: entName.entName,
      });
      closeModal();
    }
  };

  //다음 주소검색 api
  const [visibleDaumAddressForWebview, setVisibleDaumaddress] = useState(false);
  const onVisibleDaumAddress = () => {
    setVisibleDaumaddress(true);
  };

  //모달 닫기
  const closeModal = () => {
    overFlowVisible();
    onClose();
  };

  //change entname
  const onChangeEntNameInput = (title: string, ent_name: string) => {
    const radio = global.document && (document.getElementById(`${title}_2`) as HTMLInputElement);
    if (radio) radio.checked = true;
    setEntName({ ...entName, entName: ent_name, title: title });
  };

  //change radio
  const onSelectRadioEnt = (template_title: string) => {
    setEntName({ ...entName, title: template_title, entName: '' });
  };

  const templates = ['리허설 스튜디오', '메이크업샵', '웨딩홀', template_input_title, '자택'];
  return (
    <AbstractModal
      isDuplicated
      visible={visible}
      onClose={closeModal}
      title='주소 검색'
      canConfirm={validateOnConfirm()}
      onConfirm={onConfirm}
      isFullSize
    >
      {visibleDaumAddressForWebview ? (
        <DaumAddressWebView2
          onConfirm={address => {
            setDefaultAddress(address);
            setVisibleDaumaddress(false);
          }}
        />
      ) : (
        <Inner isIos={isIos}>
          <div className='input-box'>
            <p className='info-title'>주소</p>
            <div className={defaultAddress.length > 0 ? 'title-input-box on' : 'title-input-box'}>
              <input type='text' placeholder='주소를 입력하세요.' onClick={onVisibleDaumAddress} value={defaultAddress} readOnly={true} />
              <button className='change_address_btn' onClick={onVisibleDaumAddress}>
                주소 검색
              </button>
            </div>
          </div>

          {defaultAddress && defaultAddress.length > 0 && (
            <div className='input-box'>
              <p className='info-title'>상세 주소 입력</p>
              <div className={detailAddress && detailAddress.length > 0 ? 'title-input-box on' : 'title-input-box'}>
                <input type='text' placeholder='상세주소를 입력해주세요' value={detailAddress} onChange={onChangeDetailAddress} />
              </div>
            </div>
          )}

          <div className='place_input_box'>
            <div className='place_input_title'>
              <p>업체명/장소명</p>
            </div>
            <ul className='place_input_list'>
              {templates.map(title => (
                <li className='place_input_item' key={title}>
                  <RadioboxItem
                    title={title}
                    id={`${title}_2`}
                    name='placeInput'
                    onSelect={title => onSelectRadioEnt(title)}
                    onChangeText={ent_name => onChangeEntNameInput(title, ent_name)}
                    defaultCheck={title === entName.title}
                    placeholder='업체명'
                  />
                  {title !== '자택' && (
                    <InputWithClear
                      name={title}
                      onChangeText={text => onChangeEntNameInput(title, text)}
                      defaultText={entName.title == title ? entName.entName : ''}
                    />
                  )}
                </li>
              ))}
            </ul>
          </div>
        </Inner>
      )}
    </AbstractModal>
  );
};
export default ModalSearchAddress;

const Inner = styled.div<{ isIos?: boolean }>`
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
    /* height: 100%; */
    width: 100%;
    position: relative;
    padding-top: 13px;
    padding-bottom: ${props => (props.isIos ? '100px' : '10px')};

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

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { AddressMetadata, GroupMetadataDto, MetadataValue, template_input_title } from '@modules/mypage/quotation/QuotationInterface';
import { RadioboxItem } from '@components/core/checkboxes';
import dynamic from 'next/dynamic';
import { useDeepEffect } from '@hooks/useDeepEffect';
import { useRouter } from 'next/router';
const ModalSearchEnterprise = dynamic(() => import('./ModalSearchEnterprise'));
const ModalSearchAddress = dynamic(() => import('./ModalSearchAddress'));

interface MetaAddressProps {
  onChangedMetadata: (metadata: MetadataValue) => void;
  selectedMetadata: GroupMetadataDto;
}

const ModalMetaAddress = ({ onChangedMetadata, selectedMetadata }: MetaAddressProps) => {
  const router = useRouter();
  // 선택지
  const templates = useMemo(() => {
    if (selectedMetadata) {
      return selectedMetadata.template.metadata_template.replace('[t]', '').split(',');
    }
    return [];
  }, [selectedMetadata]);

  //기존 값 로컬 임시저장
  const [tmpAddressState, setTmpAddressState] = useState<{
    value: AddressMetadata;
    selected_answer_value: string;
  }>({
    value: { ent_address: '', ent_code: '', ent_name: '', ent_no: 0, template_title: '' },
    selected_answer_value: '',
  });

  //기존값 가져와서 로컬 임시저장하기
  useDeepEffect(() => {
    if (selectedMetadata) {
      const { metadata } = selectedMetadata;
      //주소 값
      const value = metadata.value as AddressMetadata;
      //선택 값
      const { selected_answer_value } = metadata;
      setTmpAddressState({ selected_answer_value, value });
    }
  }, [selectedMetadata]);

  // 임시저장한 실 주소 값 형변환
  const meta_address = useMemo(() => {
    if (tmpAddressState) {
      return tmpAddressState.value as AddressMetadata;
    }
  }, [tmpAddressState]);

  // 기존 주소에서 선택한 템플릿인지 체크
  const checkSelected = useCallback(
    (title: string) => {
      if (tmpAddressState && tmpAddressState.selected_answer_value) {
        return tmpAddressState.selected_answer_value == title;
      }
      return false;
    },
    [tmpAddressState],
  );

  const checkHaveAddress = useCallback((meta_address?: AddressMetadata) => {
    return meta_address;
  }, []);

  //임시저장된 주소가 바뀔때마다 업데이트
  useDeepEffect(() => {
    onChangedMetadata(tmpAddressState);
  }, [tmpAddressState, onChangedMetadata]);

  //Search Enterprise Modal
  const [searchEntModalData, setSearchModalDate] = useState({ is_input: false, title: '', visible: false });

  //라디오 아이템들 버튼 클릭
  const onClickAddressItem = useCallback(
    (title: string) => {
      (global.document && (document.getElementById(title) as HTMLInputElement)).checked = true;
      setSearchModalDate({ ...searchEntModalData, is_input: template_input_title == title, title, visible: true });
      router.push(router.asPath + '#AddressModal');
    },
    [setSearchModalDate, searchEntModalData, router],
  );

  return (
    <>
      {/*업체검색*/}
      {!searchEntModalData.is_input && searchEntModalData.visible && (
        <ModalSearchEnterprise
          title={searchEntModalData.title}
          visible
          onClose={() => setSearchModalDate({ ...searchEntModalData, is_input: false, visible: false })}
          onSelectEnterprise={entMetadata => {
            setTmpAddressState({ ...tmpAddressState, selected_answer_value: searchEntModalData.title, value: entMetadata });
          }}
        />
      )}

      {/*직접주소검색*/}
      {searchEntModalData.is_input && searchEntModalData.visible && (
        <ModalSearchAddress
          visible
          onClose={() => setSearchModalDate({ ...searchEntModalData, visible: false })}
          onChangedMetadata={addressMetadata => {
            setTmpAddressState({ ...tmpAddressState, selected_answer_value: template_input_title, value: addressMetadata });
            setSearchModalDate({ ...searchEntModalData, is_input: false, visible: false });
          }}
          selectedMetadata={template_input_title == selectedMetadata.metadata.selected_answer_value ? selectedMetadata : undefined}
        />
      )}

      <div className='address_check_box'>
        <ul className='address_check_list'>
          {templates.map((title, index) => (
            <li className='address_check_item' key={`address_template_${index}`}>
              <RadioboxItem
                id={title}
                name={'address_template'}
                title={title}
                defaultCheck={checkSelected(title)}
                meta_address={tmpAddressState.selected_answer_value === title ? meta_address : undefined}
                address_btn_txt={title === template_input_title ? '주소검색' : checkHaveAddress(meta_address) ? '업체 변경' : '업체 선택'}
                is_address={true}
                onSelect={title => onClickAddressItem(title)}
                onClickSearchAddressBtn={title => onClickAddressItem(title)}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default React.memo(ModalMetaAddress);

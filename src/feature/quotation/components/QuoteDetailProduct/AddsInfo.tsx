import { useSelectedCart } from '@feature/quotation/hooks/useSelectedCart';
import { useSelectedMetadata } from '@feature/quotation/hooks/useSelectedMetadata';
import { useModalVisible } from '@hooks/useModalVisible';
import { CartDto, GroupMetadataDto, showMetaValueByType } from '@modules/mypage/quotation/QuotationInterface';
import { QUOTE_META_MODAL, QUOTE_WEDDING_SHOES_MODAL } from '@utils/modalKeys';
import cloneDeep from 'lodash/cloneDeep';
import { useRouter } from 'next/router';
import React, { useCallback } from 'react';

const AddsInfo = ({ cart }: { cart: CartDto }) => {
  const { setSelectedMetadata } = useSelectedMetadata();
  const { setModalVisible } = useModalVisible(QUOTE_META_MODAL);
  const { setModalVisible: setWSVisible } = useModalVisible(QUOTE_WEDDING_SHOES_MODAL);
  const router = useRouter();

  const onClickMetaModal = useCallback(
    (metadata: GroupMetadataDto[]) => {
      setSelectedMetadata(cloneDeep(metadata));
      router.push(router.asPath + '#MetadataModal');

      if (cart?.product?.category === '웨딩슈즈') {
        setWSVisible(true);
      } else {
        setModalVisible(true);
      }
    },
    [setSelectedMetadata, setModalVisible, router, setWSVisible, cart?.product?.category],
  );

  return (
    <div className='metadata_container'>
      <div className='option-header'>
        <p>
          상품 이용 정보 <span>(필수)</span>
        </p>
      </div>
      {cart.metadata.map(meta => (
        <div className='row-group default-option' key={'meta_' + meta.id}>
          <span className='price-title'>{meta.template.name}</span>
          <span className={`price-num ${!meta.metadata.selected_answer_value && !meta.metadata.value ? 'default' : ''}`}>
            {showMetaValueByType(meta.template.code, meta.metadata)
              ? showMetaValueByType(meta.template.code, meta.metadata, cart?.product?.category === '웨딩슈즈')
              : '정보를 추가해주세요'}
          </span>
        </div>
      ))}
      <div className='add-option-btn-box change-info'>
        <button className='add-option-btn' onClick={() => onClickMetaModal(cart.metadata)}>
          정보 입력/변경
        </button>
      </div>
    </div>
  );
};

export default React.memo(AddsInfo);

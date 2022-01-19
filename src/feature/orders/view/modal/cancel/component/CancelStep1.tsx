import React, { useCallback, useState } from 'react';
import sample from '@common/style/images/img_sample01.jpg';
import { WeddingOrderGoods } from '@modules/mypage/order/order.interface';
import ModalExtraTerms from '../../modal.extra.terms';
import { useModalVisible } from '@hooks/useModalVisible';
import CancelProductItem from './CancelProductItem';
import { showPrice } from '@utils/util';

interface CancelStep1Interface {
  goods: WeddingOrderGoods;
  canNext: () => void;
}

const CancelStep1 = ({ goods, canNext }: CancelStep1Interface) => {
  const { modalVisible, setModalVisible } = useModalVisible('ORDER_CANCEL_STEP1');
  const handleClose = useCallback(() => {
    setModalVisible(false);
    canNext();
  }, [canNext, setModalVisible]);

  const handleConfirm = useCallback(() => {
    setModalVisible(false);
  }, [setModalVisible]);

  return (
    <>
      {/* 위약금 규정 모달 */}
      {goods.enterprise_rule && (
        <ModalExtraTerms
          visible={modalVisible}
          onClose={handleClose}
          onConfirm={handleConfirm}
          oneButtonFooter
          enterprise_rule={goods.enterprise_rule}
          isDuplicated
        />
      )}

      <div className='cancel_container'>
        <div className='cancel_header'>
          <p>상품의 위약금 규정을 확인해 주세요.</p>
          <span className='description'>
            결제 취소 요청 시 업체별 위약금 규정에 의거하여
            <br />
            결제 금액이 환불됩니다.
          </span>
        </div>

        <div className='item_area'>
          <div className='info-item-box'>
            <div className='info-box'>
              <a>
                <CancelProductItem goods={goods} />
                <div className='bottom_info_box'>
                  <div className='row_group'>
                    <span className='info_title'>최종 결제 금액</span>
                    <span className='info_content'>{showPrice(goods.goods_price)}원</span>
                  </div>
                  <button className='view_penalty_btn' onClick={handleConfirm}>
                    {goods.decodedProduct.ent_name} 위약금 내용 보기
                  </button>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CancelStep1;

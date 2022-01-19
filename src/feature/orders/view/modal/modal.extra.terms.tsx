import React from 'react';
import theme from '@styles/theme';
import styled from 'styled-components';
import { CommonModalProps } from '@modules/CommonInterface';
import { getDate } from '@utils/util';
import { EnterpriseRule } from '@modules/mypage/order/order.interface';
import AbstractModal from '@components/core/modal/AbstractModal/AbstractModal';

interface AvailableProps extends CommonModalProps {
  onConfirm: () => void;
  regDate?: any;
  enterprise_rule: EnterpriseRule;
}

const ModalExtraTerms = ({ enterprise_rule, visible, onClose, isDuplicated, regDate }: AvailableProps) => {
  return (
    <AbstractModal
      noPadding
      visible={visible}
      title={'추가비용 및 위약금'}
      onClose={onClose}
      oneButtonFooter
      isFullSize
      isReturnButton={false}
      isDuplicated={isDuplicated}
    >
      <Container>
        <div className='company_header'>
          <p className='company_name'>{enterprise_rule.ent_name}</p>
          <p className='modal_title'>추가비용 및 위약금 규정</p>
        </div>
        <div className='terms_content'>
          <p className='base_date'>{getDate(regDate)} 기준</p>
          <div dangerouslySetInnerHTML={{ __html: enterprise_rule.content }} />
        </div>
      </Container>
    </AbstractModal>
  );
};

export default ModalExtraTerms;
const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  background-color: #fff;
  padding: 0 30px;
  @media all and (max-width: ${theme.pc}px) {
    padding: 0;
  }
  .company_header {
    width: 100%;
    height: 80px;
    background-color: #f7f7f7;
    font-size: 15px;
    font-weight: 700;
    line-height: 22px;
    text-align: center;
    padding: 18px 0;
    .company_name {
      color: ${props => props.theme.blue};
    }
  }
  .terms_content {
    width: 100%;
    background-color: #fff;
    margin-top: 30px;
    overflow-y: scroll;
    ${theme.hideScroll};
    @media all and (max-width: ${theme.pc}px) {
      padding: 0 15px;
    }
    .base_date {
      font-size: 15px;
      color: ${props => props.theme.blue};
      line-height: 22px;
      margin-bottom: 15px;
    }
    .content_title {
      font-size: 13px;
      margin-bottom: 25px;
    }
    .inner_contents {
      font-size: 13px;
      margin-bottom: 25px;
      line-height: 20px;
    }
  }
`;

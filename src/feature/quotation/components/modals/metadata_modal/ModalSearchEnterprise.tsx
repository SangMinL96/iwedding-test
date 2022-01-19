import { InputSearch } from '@components/core/inputs';
import AbstractModal from '@components/core/modal/AbstractModal/AbstractModal';
import EnterItem from '@components/EnterpriseList/EnterItem';
import { CommonModalProps } from '@modules/CommonInterface';
import { EnterpriseDto } from '@modules/enterprise/enterprise.interface';
import { fetchEnterpriseByName, fetchWeddingHallByName } from '@modules/enterprise/EnterpriseAPI';
import { AddressMetadata } from '@modules/mypage/quotation/QuotationInterface';
import { ProductCategoryValue } from '@modules/product/product.interface';
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

interface ModalProps extends CommonModalProps {
  title: string;
  onSelectEnterprise: (ent: AddressMetadata) => void;
}

const ModalSearchEnterprise = ({ visible, onClose, title, onSelectEnterprise }: ModalProps) => {
  const [entName, setEntName] = useState('');
  const [entList, setEntList] = useState<EnterpriseDto[]>([]);

  const closeModal = useCallback(() => {
    setEntName('');
    onClose();
  }, [setEntName, onClose]);

  const fetchEnterprise = useCallback(async (entName: string, title: string) => {
    let category = '';

    if (title.includes('메이크업')) {
      category = ProductCategoryValue.MAKEUP;
    } else if (title.includes('스튜디오')) {
      category = ProductCategoryValue.STUDIO;
    }

    if (category) {
      const res = await fetchEnterpriseByName(entName, category);
      try {
        setEntList(res.data);
      } catch (error) {
        console.log('Error setEntList in ModalMetaSearchEnterprise', error);
      }
    } else if (title.includes('웨딩홀')) {
      const res = await fetchWeddingHallByName(entName);
      try {
        setEntList(res.data);
      } catch (error) {
        console.log('Error setEntList in ModalMetaSearchEnterprise', error);
      }
    }
  }, []);

  //업체명 입력하면 debounce 검색
  useEffect(() => {
    if (entName && title) fetchEnterprise(entName, title);
  }, [entName, title, fetchEnterprise]);

  const selectEnterprise = useCallback(
    (ent: EnterpriseDto) => () => {
      const entMetadata = {
        template_title: title,
        ent_name: ent.enterprise_name,
        ent_no: ent.no,
        ent_code: ent.enterprise_code,
        ent_address: ent.addr,
      } as AddressMetadata;
      onSelectEnterprise(entMetadata);
      closeModal();
    },
    [onSelectEnterprise, closeModal, title],
  );

  return (
    <AbstractModal title='업체 선택' onClose={closeModal} visible={visible} noFooter isDuplicated isFullSize>
      <Inner>
        <div className='input-box'>
          <p className='info-title'>{title}</p>
          <InputSearch onChangeText={setEntName} placeHolder={'업체명을 입력하세요'} />
        </div>

        <div className='search_enterprise_box'>
          {entList.length ? (
            <ul className='search_enterprise_list'>
              {entList.map(ent => (
                <EnterItem item={ent} onClickAdd={ent => selectEnterprise(ent)} key={`ent_${ent.enterprise_name}`} />
              ))}
            </ul>
          ) : (
            <p className='default_msg_text'>검색결과가 없습니다.</p>
          )}
        </div>
      </Inner>
    </AbstractModal>
  );
};
export default ModalSearchEnterprise;
const Inner = styled.div`
  width: 100%;
  .input-box {
    width: 100%;
    position: relative;
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
        width: 20px;
        height: 20px;
        position: absolute;
        top: 13px;
        right: 13px;
        cursor: pointer;
        > img {
          width: 20px;
          height: 20px;
        }
      }
      > .delete-text-btn {
        right: 42px;
        background-color: transparent;
      }
      > .search-btn {
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
  .search_enterprise_box {
    width: 100%;
    position: relative;
    .default_msg_text {
      padding-top: 20px;
      text-align: center;
      font-size: 15px;
      color: #8c8c8c;
    }
    .search_enterprise_list {
      width: 100%;
      position: relative;
      .search_enterprise_item {
        width: 100%;
        padding: 16px 0 16px 15px;
        background-color: #f7f7fa;
        margin-bottom: 2px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .text_area {
          width: calc(100% - 105px);
          font-size: 13px;
          .title {
            font-weight: 700;
            margin-bottom: 5px;
          }
          .address {
            line-height: 17px;
          }
        }
        .button_area {
          width: 100px;
          display: flex;
          justify-content: center;
          .select_btn {
            width: 70px;
            height: 35px;
            background-color: #262626;
            color: #fff;
            font-weight: 700;
          }
        }
      }
    }
  }
`;

import { InputSearch } from '@components/core/inputs';
import AbstractModal from '@components/core/modal/AbstractModal/AbstractModal';
import FloatingSection from '@components/core/modal/FloatingSection';
import EnterpriseListWithCategory, { EnterpriseListGroupByCategory } from '@components/EnterpriseList';
import { useModalVisible } from '@hooks/useModalVisible';
import { CommonModalProps } from '@modules/CommonInterface';
import { EnterpriseDto } from '@modules/enterprise/enterprise.interface';
import { fetchEnterpriseByName } from '@modules/enterprise/EnterpriseAPI';
import theme from '@styles/theme';
import { FLOATING_BUTTON } from '@utils/modalKeys';
import router from 'next/router';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

interface EnterpriseProps extends CommonModalProps {
  selectedEnterprise?: EnterpriseDto[];
  onConfirmEnterprise: (entList: EnterpriseDto[]) => void;
}

const ModalRealEnterPrise = ({ onClose, selectedEnterprise, onConfirmEnterprise }: EnterpriseProps) => {
  const [entName, setEntName] = useState<string>('');
  const [entList, setEntList] = useState<EnterpriseListGroupByCategory[]>([]);

  useEffect(() => {
    const fetchEnterprise = async (entName: string) => {
      const res = await fetchEnterpriseByName(entName);

      try {
        const tmpList = [];
        res?.data.forEach(ent => {
          const category = tmpList.find(categorizedList => categorizedList.category === ent.category);
          if (category) {
            category.list.push(ent);
          } else {
            const item = { category: ent.category, list: [ent] };
            tmpList.push(item);
          }
        });
        setEntList(tmpList);
      } catch (error) {
        console.error(error);
      }
    };

    // 업체 이름을 입력할 경우 fetch
    if (entName) fetchEnterprise(entName);
  }, [entName]);

  const [tmpSelectedEnterprise, setTmpSelectedEnterprise] = useState<EnterpriseDto[]>([]);
  const { modalVisible, setModalVisible } = useModalVisible(FLOATING_BUTTON);
  useEffect(() => {
    if (selectedEnterprise) {
      setTmpSelectedEnterprise(selectedEnterprise);
    }
  }, [selectedEnterprise]);

  //업체선택
  const selectEnterprise = (ent: EnterpriseDto) => () => {
    if (!tmpSelectedEnterprise.find(sc => sc.no == ent.no)) {
      setTmpSelectedEnterprise(tmpSelectedEnterprise.concat(ent));
      setModalVisible(true);
    }
  };

  //업체 제거
  const removeEnterprise = (selected: EnterpriseDto) => () => {
    setTmpSelectedEnterprise(tmpSelectedEnterprise.filter(ent => ent.no !== selected.no));
  };

  useEffect(() => {
    if (tmpSelectedEnterprise.length === 0) {
      setModalVisible(false);
    }
  }, [tmpSelectedEnterprise, setModalVisible]);

  const mOnConfirmEnterprise = () => {
    onConfirmEnterprise(tmpSelectedEnterprise);
    router.back();
  };

  return (
    <AbstractModal
      isDuplicated
      title='포함 업체 선택'
      onClose={onClose}
      confirmText='선택 완료'
      canConfirm={tmpSelectedEnterprise.length > 0}
      onConfirm={mOnConfirmEnterprise}
      isFullSize
      stepFooter
    >
      <Container floaterVisible={modalVisible}>
        <InputSearch onSearch={() => {}} onChangeText={setEntName} placeHolder={'업체명을 입력하세요'} />
        <EnterpriseListWithCategory list={entList} onClickAdd={selectEnterprise} selectedList={tmpSelectedEnterprise} />
      </Container>
      <FloatingSection
        title='선택한 업체'
        list={tmpSelectedEnterprise}
        onDeleteProduct={removeEnterprise}
        onConfirm={mOnConfirmEnterprise}
        noFooter
      />
    </AbstractModal>
  );
};

export default ModalRealEnterPrise;
const Container = styled.div<{ floaterVisible: boolean }>`
  width: 100%;
  overflow: hidden;
  overflow-y: scroll;
  ${theme.hideScroll};
  position: relative;
  > div {
    > .radio_container {
      border-bottom: none;
      @media all and (max-width: ${theme.pc}px) {
        padding-left: 0;
      }
    }
  }
`;

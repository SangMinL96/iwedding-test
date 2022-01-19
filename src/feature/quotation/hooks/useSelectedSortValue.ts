import { WmProductEntity } from './../../../modules/product/product.interface';
import { EnterpriseDto } from '@modules/enterprise/enterprise.interface';
import { useDeepEffect } from '@hooks/useDeepEffect';
import { detailSortRealtimeClear } from '@modules/user/UserLogAPI';
import { useCallback, useEffect } from 'react';
import useSWR from 'swr';
import { DetailSortType, DetailSortValue } from '../components/modals/detail_sort_modal/ModalRealSortIndex';

export const useSelectedSortValue = () => {
  const { data: selectedSortValue, mutate } = useSWR<Record<DetailSortType, any[]>>('SELECTED_SORT_VALUE', null);
  const setSelectedSortValue = useCallback((sv: Record<DetailSortType, any[]>) => mutate(sv, false), [mutate]);

  const clearAllSortValue = () => {
    setSelectedSortValue(null);
    detailSortRealtimeClear();
  };

  const setSortValue = (category: DetailSortType, value: DetailSortValue) => {
    if (category === DetailSortType.PRICE_RANGE || category === DetailSortType.UPDATED_AT_RANGE) {
      if (value) {
        setSelectedSortValue({ ...selectedSortValue, [category]: [value] });
      }
    } else {
      if ((value as any[]).length) {
        setSelectedSortValue({ ...selectedSortValue, [category]: value });
      }
    }
  };

  const removeSortValue = (category: DetailSortType, item: DetailSortValue) => () => {
    const sv = { ...selectedSortValue };
    if (category === DetailSortType.PRICE_RANGE || category === DetailSortType.UPDATED_AT_RANGE) {
      delete sv[category];
    } else {
      if (category === DetailSortType.ENT_CODE || category === DetailSortType.PRODUCT_NO) {
        sv[category] = sv[category].filter((v: EnterpriseDto | WmProductEntity) => v.no !== (item as EnterpriseDto | WmProductEntity).no);
      } else {
        sv[category] = sv[category].filter(v => v !== item);
      }
      if (sv[category].length < 1) delete sv[category];
    }
    setSelectedSortValue(sv);
  };

  const isSelectedSort = (sv: DetailSortType) => selectedSortValue && Object.keys(selectedSortValue).length && sv in selectedSortValue;

  return {
    isSelectedSort,
    selectedSortValue,
    setSortValue,
    removeSortValue,
    clearAllSortValue,
  };
};

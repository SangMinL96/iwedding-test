import { EnterpriseDto } from '@modules/enterprise/enterprise.interface';
import { getProductCategoryName, ProductCategoryValue, WmProductEntity } from '@modules/product/product.interface';
import IconDeleteCircle from '@svgs/icon_delete_circle';
import React, { useCallback, useState } from 'react';
import { Latest } from '../modals/detail_sort_modal/ModalRealLatest';
import { DetailSortType } from '../modals/detail_sort_modal/ModalRealSortIndex';
import { Range } from 'react-input-range';
import { useLastQuoteMetadata } from '@feature/quotation/hooks/useLastQuoteMetadata';
import { REALTIME_LAST_QUOTE_META } from '@modules/mypage/quotation/QuotationAPI';

interface Props {
  sortValue: DetailSortType;
}

const DetailSortValue = ({ sortValue }: Props) => {
  const { lastQuoteMetadata, setLastQuoteMetadata } = useLastQuoteMetadata(REALTIME_LAST_QUOTE_META);

  const getSelectedSortValue = useCallback(
    (sort_value: DetailSortType) => {
      const selectedSort = lastQuoteMetadata?.detailSort.find(sort => sort.sort_value == sort_value);
      if (selectedSort) {
        return selectedSort.selectedSort;
      }
    },
    [lastQuoteMetadata],
  );

  const removeSelectedSortValue = useCallback(
    (sort_value: DetailSortType, value: any) => () => {
      if (lastQuoteMetadata) {
        const filtered = lastQuoteMetadata.detailSort.map(selected => {
          if (selected.sort_value == sort_value) {
            let selectedSort;
            if (sort_value == DetailSortType.PRICE_RANGE) {
              selectedSort = undefined;
            } else if (sort_value === DetailSortType.CATEGORY) {
              selectedSort = (selected.selectedSort as ProductCategoryValue[]).filter(cate => cate != value);
            } else if (sort_value === DetailSortType.ENT_CODE) {
              selectedSort = (selected.selectedSort as EnterpriseDto[]).filter(ent => ent.no != Number(value.no));
            } else if (sort_value === DetailSortType.PRODUCT_NO) {
              selectedSort = (selected.selectedSort as WmProductEntity[]).filter(pro => pro.no != Number(value.no));
            } else if (sort_value === DetailSortType.UPDATED_AT_RANGE) {
              selectedSort = undefined;
            }
            return { ...selected, selectedSort };
          }
          return selected;
        });
        setLastQuoteMetadata({ ...lastQuoteMetadata, detailSort: filtered });
      }
    },
    [lastQuoteMetadata, setLastQuoteMetadata],
  );

  const showSortValue = useCallback((type: DetailSortType, selectedValue: any) => {
    if (selectedValue) {
      if (type == DetailSortType.PRICE_RANGE) {
        const range = selectedValue as Range;
        const { min, max } = range;
        return `${min == 0 ? '0' : min + '만'}원 이상 ${max}만원 이하`;
      } else if (type == DetailSortType.CATEGORY) {
        return getProductCategoryName(selectedValue);
      } else if (type == DetailSortType.ENT_CODE) {
        return selectedValue.enterprise_name;
      } else if (type == DetailSortType.PRODUCT_NO) {
        return selectedValue.name;
      } else if (type == DetailSortType.UPDATED_AT_RANGE) {
        const { start, end } = selectedValue as Latest;
        return `${start} ~ ${end}`;
      }
    } else {
      return '';
    }
  }, []);

  if (getSelectedSortValue(sortValue)) {
    const selectedSort =
      sortValue == DetailSortType.PRICE_RANGE || sortValue == DetailSortType.UPDATED_AT_RANGE
        ? [getSelectedSortValue(sortValue)]
        : (getSelectedSortValue(sortValue) as any[]);

    return selectedSort?.map((sortValue, index) => (
      <li className='condition_detail_item' key={index}>
        <div className='delete_btn_box'>
          <button className='delete_btn' onClick={removeSelectedSortValue(sortValue, sortValue)}>
            <IconDeleteCircle />
          </button>
        </div>
        <div className='detail_text_box'>
          {sortValue == DetailSortType.ENT_CODE && <span className='ent_text'>{sortValue.category || ''}</span>}
          {sortValue == DetailSortType.PRODUCT_NO && <span className='ent_text'>{(sortValue as WmProductEntity).ent_name || ''}</span>}
          <p className='prd_text'>{showSortValue(sortValue, sortValue)}</p>
        </div>
      </li>
    ));
  }
  return <div></div>;
};

export default DetailSortValue;

import { useSelectedSortValue } from '@feature/quotation/hooks/useSelectedSortValue';
import { getProductCategoryName, WmProductEntity } from '@modules/product/product.interface';
import IconDeleteCircle from '@svgs/icon_delete_circle';
import React, { useCallback } from 'react';
import { Range } from 'react-input-range';
import styled from 'styled-components';
import { Latest } from './ModalRealLatest';
import { DetailSortType } from './ModalRealSortIndex';

const SortValueList = ({ sortValue, sort }: { sortValue: DetailSortType; sort: any[] }) => {
  const { removeSortValue } = useSelectedSortValue();

  const sortValueTemplate = useCallback((type: DetailSortType, selectedValue: any) => {
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

  return (
    <SortValueUL>
      {sort?.map(item => (
        <li className='condition_detail_item' key={`${sortValue}_${JSON.stringify(item)}`}>
          <div className='delete_btn_box'>
            <button className='delete_btn' onClick={removeSortValue(sortValue, item)}>
              <IconDeleteCircle />
            </button>
          </div>
          <div className='detail_text_box'>
            {sortValue == DetailSortType.ENT_CODE && <span className='ent_text'>{item.category || ''}</span>}
            {sortValue == DetailSortType.PRODUCT_NO && <span className='ent_text'>{(item as WmProductEntity).ent_name || ''}</span>}
            <p className='prd_text'>{sortValueTemplate(sortValue, item)}</p>
          </div>
        </li>
      ))}
    </SortValueUL>
  );
};

export default React.memo(SortValueList);

const SortValueUL = styled.ul`
  .condition_detail_item {
    width: 100%;
    display: flex;
    align-items: center;
    margin-bottom: 14px;

    &:last-child {
      margin-bottom: 0;
    }

    .delete_btn_box {
      width: 25px;
      height: 25px;
      margin-right: 10px;

      > .delete_btn {
        width: 25px;
        height: 25px;

        > img {
          width: 25px;
          height: 25px;
        }
      }
    }

    .detail_text_box {
      width: calc(100% - 35px);

      .ent_text {
        display: block;
        font-size: 11px;
        color: #8c8c8c;
        margin-bottom: 5px;
      }

      .prd_text {
        font-size: 15px;
        font-weight: 700;
        display: block;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
    }
  }
`;

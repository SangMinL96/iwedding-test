import { EnterpriseDto } from '@modules/enterprise/enterprise.interface';
import { ProductCategoryValue } from '@modules/product/product.interface';
import theme from '@styles/theme';
import React from 'react';
import styled from 'styled-components';
import EnterCategory from './EnterCategory';
import EnterItem from './EnterItem';

export interface EnterpriseListGroupByCategory {
  category: string;
  list: EnterpriseDto[];
}
interface Props {
  list: EnterpriseListGroupByCategory[];
  onClickAdd: (ent: EnterpriseDto) => () => void;
  selectedList: EnterpriseDto[];
}
const EnterpriseListWithCategory = ({ list, selectedList, onClickAdd }: Props) => {
  return (
    <EnterPriseList>
      {list?.length > 0 ? (
        list?.map(entL => (
          <EnterpriseItem key={'ent_item' + entL.category}>
            <EnterCategory category={entL.category as ProductCategoryValue} />
            {entL.list.map(ent => (
              <EnterItem
                item={ent}
                onClickAdd={ent => onClickAdd(ent)}
                key={`ent_${ent.no}`}
                disabled={(selectedList || []).includes(ent)}
              />
            ))}
          </EnterpriseItem>
        ))
      ) : (
        <div className='none_item_text'>검색결과가 없습니다.</div>
      )}
    </EnterPriseList>
  );
};

export default EnterpriseListWithCategory;

const EnterpriseContainer = styled.div`
  width: 100%;
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
const EnterPriseList = styled.div`
  width: 100%;
  height: 318px;
  position: relative;
  margin-top: 20px;
  overflow-x: hidden;
  overflow: scroll;
  ${theme.hideScroll};
  @media all and (max-width: ${theme.pc}px) {
    height: auto;
  }
  .none_item_text {
    width: 100%;
    padding-top: 20px;
    font-size: 15px;
    color: #8c8c8c;
    text-align: center;
  }
`;
const EnterpriseItem = styled.div`
  width: 100%;
  margin-bottom: 20px;
  .category {
    margin-bottom: 9px;
    font-size: 11px;
    color: #8c8c8c;
  }
  .ent_item {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px 0 15px;
    background-color: #f7f7fa;
    margin-bottom: 2px;
    .item_title {
      font-size: 13px;
      font-weight: 700;
    }
    .item_select_btn {
      width: 70px;
      height: 35px;
      background-color: #262626;
      color: #fff;
      font-size: 13px;
      font-weight: 700;
    }
    .item_select_btn.on {
      background-color: #d9d9de;
    }
  }
`;

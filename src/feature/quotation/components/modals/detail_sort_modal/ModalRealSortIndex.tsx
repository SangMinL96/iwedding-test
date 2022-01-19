import AbstractModal from '@core/modal/AbstractModal/AbstractModal';
import { useLastQuoteMetadata } from '@feature/quotation/hooks/useLastQuoteMetadata';
import { useSelectedSortValue } from '@feature/quotation/hooks/useSelectedSortValue';
import { Desktop } from '@hooks/useDevice';
import backBtn from '@images/common/back_btn.png';
import { CommonModalProps } from '@modules/CommonInterface';
import { EnterpriseDto } from '@modules/enterprise/enterprise.interface';
import { detailSortLog, REALTIME_LAST_QUOTE_META } from '@modules/mypage/quotation/QuotationAPI';
import { ProductCategoryValue, WmProductEntity } from '@modules/product/product.interface';
import { detailSortRealtime } from '@modules/user/UserLogAPI';
import theme from '@styles/theme';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useCallback, useState } from 'react';
import { Range } from 'react-input-range';
import styled, { css } from 'styled-components';
import { Latest } from './ModalRealLatest';
import SortValueList from './SortValueList';

const ModalRealCategory = dynamic(() => import('./ModalRealCategory'));
const ModalRealEnterprise = dynamic(() => import('./ModalRealEnterprise'));
const ModalRealLatest = dynamic(() => import('./ModalRealLatest'));
const ModalRealPriceRange = dynamic(() => import('./ModalRealPriceRange'));
const ModalAddProduct = dynamic(() => import('../ModalAddProduct'));

export enum DetailSortType {
  PRICE_RANGE = 'price_range',
  CATEGORY = 'category',
  ENT_CODE = 'ent_code',
  PRODUCT_NO = 'product_no',
  UPDATED_AT_RANGE = 'updated_at_range',
}
interface ConditionValue {
  id: number;
  listOpen: boolean;
  title: string;
  sort_value: DetailSortType;
  visible: boolean;
}

export type DetailSortValue = Range | ProductCategoryValue[] | EnterpriseDto[] | WmProductEntity[] | Latest;
export interface DetailSort {
  sort_value: DetailSortType;
  selectedSort: DetailSortValue;
}

const ModalRealDetailSortIndex = ({ onClose }: CommonModalProps) => {
  const { selectedSortValue, isSelectedSort, setSortValue, clearAllSortValue } = useSelectedSortValue();
  const { lastQuoteMetadata } = useLastQuoteMetadata(REALTIME_LAST_QUOTE_META);
  const router = useRouter();
  const [category, setCategory] = useState<ConditionValue[]>([
    { id: 0, listOpen: true, title: '금액대', sort_value: DetailSortType.PRICE_RANGE, visible: false },
    { id: 1, listOpen: true, title: '포함 업종', sort_value: DetailSortType.CATEGORY, visible: false },
    { id: 2, listOpen: true, title: '포함 업체', sort_value: DetailSortType.ENT_CODE, visible: false },
    { id: 3, listOpen: true, title: '포함 상품', sort_value: DetailSortType.PRODUCT_NO, visible: false },
    { id: 4, listOpen: true, title: '최종 수정일', sort_value: DetailSortType.UPDATED_AT_RANGE, visible: false },
  ]);

  const showSortModal = useCallback(
    (type: DetailSortType) => () => {
      setCategory(category.map(cate => ({ ...cate, visible: cate.sort_value == type })));
      router.push(router.asPath + `#${type}`);
    },
    [setCategory, category, router],
  );

  const hideSortModal = useCallback(
    (type: DetailSortType) => () => {
      setCategory(category.map(cate => (cate.sort_value == type ? { ...cate, visible: false } : cate)));
    },
    [category, setCategory],
  );

  const isVisible = useCallback(
    (type: DetailSortType) => {
      return category.find(cate => cate.sort_value == type)?.visible ?? false;
    },
    [category],
  );

  const mOnConfirm = () => {
    if (selectedSortValue && Object.keys(selectedSortValue).length) {
      detailSortRealtime(detailSortLog(selectedSortValue));
    }
    onClose();
    router.back();
  };

  const isDesktop = Desktop();
  return (
    <>
      <AbstractModal
        title='상세 조건 설정'
        onClose={onClose}
        onBack={clearAllSortValue}
        onConfirm={mOnConfirm}
        canConfirm
        isFullSize
        stepFooter
        cancelText='초기화'
        confirmText={`견적 보기 ${lastQuoteMetadata?.totalItems || 0}건`}
        noPaddingTop={!isDesktop}
      >
        <Container>
          {category.map((item: ConditionValue) => (
            <div key={`${item.sort_value}`}>
              <ConditionCtgItem onClick={showSortModal(item.sort_value)}>
                <span className={isSelectedSort(item.sort_value) ? 'item_title' : 'item_title on'}>{item.title}</span>
                <span className='right_arrow'>
                  <Image unoptimized src={backBtn} alt='right_arrow' />
                </span>
              </ConditionCtgItem>
              {selectedSortValue && item.sort_value in selectedSortValue && (
                <ConditionDetailBox selected={isSelectedSort(item.sort_value)}>
                  <SortValueList sortValue={item.sort_value} sort={selectedSortValue[item.sort_value]} />
                </ConditionDetailBox>
              )}
            </div>
          ))}
        </Container>
      </AbstractModal>
      {/* 금액대 모달 */}
      {isVisible(DetailSortType.PRICE_RANGE) && (
        <ModalRealPriceRange
          onClose={hideSortModal(DetailSortType.PRICE_RANGE)}
          onSelectPriceRange={range => {
            setSortValue(DetailSortType.PRICE_RANGE, range);
            router.back();
          }}
          selectedPriceRange={selectedSortValue?.[DetailSortType.PRICE_RANGE]?.[0] as Range}
        />
      )}

      {/*업종별 모달*/}
      {isVisible(DetailSortType.CATEGORY) && (
        <ModalRealCategory
          onClose={hideSortModal(DetailSortType.CATEGORY)}
          onConfirmCategory={selectedCategory => {
            setSortValue(DetailSortType.CATEGORY, selectedCategory);
          }}
          selectedCategory={selectedSortValue?.[DetailSortType.CATEGORY] as ProductCategoryValue[]}
        />
      )}

      {/*포함 업체*/}
      {isVisible(DetailSortType.ENT_CODE) && (
        <ModalRealEnterprise
          onClose={hideSortModal(DetailSortType.ENT_CODE)}
          onConfirmEnterprise={entList => {
            setSortValue(DetailSortType.ENT_CODE, entList);
          }}
          selectedEnterprise={selectedSortValue?.[DetailSortType.ENT_CODE] as EnterpriseDto[]}
        />
      )}

      {/*상품 추가하기*/}
      {isVisible(DetailSortType.PRODUCT_NO) && (
        <ModalAddProduct
          onClose={hideSortModal(DetailSortType.PRODUCT_NO)}
          onConfirm={selectedProduct => {
            setSortValue(DetailSortType.PRODUCT_NO, selectedProduct);
          }}
          selectedProduct={selectedSortValue?.[DetailSortType.PRODUCT_NO] as WmProductEntity[]}
          isDupe
        />
      )}

      {/*latest*/}
      {isVisible(DetailSortType.UPDATED_AT_RANGE) && (
        <ModalRealLatest
          onClose={hideSortModal(DetailSortType.UPDATED_AT_RANGE)}
          onConfirm={latest => {
            setSortValue(DetailSortType.UPDATED_AT_RANGE, latest);
          }}
          selectedLatest={selectedSortValue?.[DetailSortType.UPDATED_AT_RANGE] as Latest}
        />
      )}
    </>
  );
};

export default ModalRealDetailSortIndex;

const Container = styled.ul`
  width: 100%;
  height: 100%;
  position: relative;
  overflow-x: hidden;
  overflow-y: scroll;
  ${theme.hideScroll};
  padding-bottom: var(--ios-bottom);

  .condition_detail_box {
    width: 100%;
    max-height: 0;
    transition: all 0.15s ease-out;
    overflow: hidden;
    background-color: #fff;
    margin-top: -2px;

    .condition_detail_list {
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
    }

    .condition_detail_box {
      max-height: 500px;
      transition: all 0.15s ease-in;
    }

    .condition_detail_box.have_item {
      max-height: 500px;
      transition: all 0.15s ease-in;
      border-bottom: 1px solid #dfdfdf;
      padding-bottom: 25px;
    }
  }
`;
const ConditionCtgItem = styled.li`
  width: 100%;
  height: 62px;
  border-bottom: 1px solid #dfdfdf;
  font-size: 15px;
  font-weight: 700;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  .item_title.on {
    color: #262626;
  }

  .right_arrow {
    display: block;
    width: 7.5px;
    height: 13.5px;
    margin-right: 4px;

    > img {
      width: 7.5px;
      height: 13.5px;
      transform: rotate(180deg);
    }
  }
`;

const ConditionDetailBox = styled.div<{ selected: boolean }>`
  width: 100%;
  max-height: 0;
  transition: all 0.15s ease-out;
  overflow: hidden;
  background-color: #fff;
  margin-top: -2px;

  ${({ selected }) =>
    selected &&
    css`
      max-height: 500px;
      transition: all 0.15s ease-in;
      border-bottom: 1px solid #dfdfdf;
      padding-bottom: 25px;
    `}
  .condition_detail_list {
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
  }

  .condition_detail_box {
    max-height: 500px;
    transition: all 0.15s ease-in;
  }
`;

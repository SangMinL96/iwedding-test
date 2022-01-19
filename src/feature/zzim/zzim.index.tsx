import Loading from '@components/Loading';
import { usePagination } from '@hooks/usePagination';
import { onZzimDelAllApi, useGetZzimAllCount, useGetZzimList } from '@modules/zzim/zzimAPI';
import theme from '@styles/theme';
import IconDownTriangle from '@svgs/icon_down_triangle';
import { ISort, zzimBrandSortOptions, zzimContentsSortOptions, zzimEventSortOptions, zzimStoreSortOptions } from '@utils/sortOptions';
import React, { useRef, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import styled from 'styled-components';
import { getProductCategoryName, ProductCategoryValue } from '../../modules/product/product.interface';
import { ZzimListType } from './zzim.interface';
import ZzimBrand from './zzim_tabs/zzim.brand';
import ZzimContents from './zzim_tabs/zzim.contents';
import ZzimEvent from './zzim_tabs/zzim.event';
import ZzimStore from './zzim_tabs/zzim.store';

interface TabProps {
  tabActive: boolean;
}

const ZzimIndex = () => {
  const { page: brandPage, setPage: brandSetPage } = usePagination('zzim_brand_pagination');
  const { page: contentPage, setPage: contentSetPage } = usePagination('zzim_contents_pagination');
  const { page: storePage, setPage: storeSetPage } = usePagination('zzim_store_pagination');
  const { page: eventPage, setPage: eventSetPage } = usePagination('zzim_event_pagination');
  // sort 관련
  const sortDropdownRef = useRef<HTMLDivElement>(null);
  const [isFilter, setIsFilter] = useState(false);
  const [isZzimSort, setZzimSort] = useState(false);
  const [currentSort, setCurrentSort] = useState('전체');
  const [currentZzimSort, setCurrentZzimSort] = useState<ISort>({ method: 'latest_zzim', title: '최근 찜한순' });
  const [tabActive, setTabActive] = useState<ZzimListType>(ZzimListType.BRAND);
  const { data: count, mutate: countMutate } = useGetZzimAllCount();
  const { data, mutate, isValidating } = useGetZzimList({ type: tabActive, device: 'mobile', sort: currentZzimSort.method });

  const handleClick = (type: ZzimListType) => {
    setPageFirst();
    setCurrentZzimSort({ method: 'latest_zzim', title: '최근 찜한순' });
    setCurrentSort('전체');
    if (type !== tabActive) {
      setTabActive(type);
    }
    setIsFilter(false);
  };

  const sortingValue = () => {
    if (tabActive && data?.items) {
      if (data?.items) {
        return ['전체', ...new Set(data?.items?.map(item => item?.ent?.category).filter(category => category !== '' && category))];
      }
    }
    return ['전체'];
  };

  const onFilterClick = () => {
    setIsFilter(prev => !prev);
    setZzimSort(false);
  };
  const onSortClick = () => {
    setZzimSort(prev => !prev);
    setIsFilter(false);
  };

  const onClickSort = (sort: string) => {
    setPageFirst();

    setCurrentSort(sort);
  };

  const onDataSort = async (sort: ISort) => {
    setPageFirst();
    setCurrentZzimSort(sort);
  };

  const setPageFirst = () => {
    setIsFilter(false);
    setZzimSort(false);
    brandSetPage(1);
    contentSetPage(1);
    storeSetPage(1);
    eventSetPage(1);
  };

  const dataRefresh = () => {
    countMutate();
    mutate();
  };

  const deleteAll = () => {
    confirmAlert({
      title: '삭제하시겠습니까?',
      buttons: [
        {
          label: '취소',
          onClick: () => null,
        },
        {
          label: '확인',
          onClick: () =>
            onZzimDelAllApi(tabActive).then(r => {
              if (r.status === 200) {
                dataRefresh();
              }
            }),
        },
      ],
    });
  };
  const onSortRender = () => {
    if (tabActive === ZzimListType.BRAND) {
      return zzimBrandSortOptions;
    }
    if (tabActive === ZzimListType.CONTENT) {
      return zzimContentsSortOptions;
    }
    if (tabActive === ZzimListType.PRODUCT) {
      return zzimStoreSortOptions;
    }
    if (tabActive === ZzimListType.EVENT) {
      return zzimEventSortOptions;
    }
  };

  return (
    <ZzimContainer>
      <div className='zzim_tabbox'>
        <TabBtn onClick={() => handleClick(ZzimListType.BRAND)} tabActive={tabActive === ZzimListType.BRAND}>
          브랜드 <span>{count?.brandCount || 0}</span>
        </TabBtn>
        <TabBtn onClick={() => handleClick(ZzimListType.CONTENT)} tabActive={tabActive === ZzimListType.CONTENT}>
          콘텐츠 <span>{count?.contentCount || 0}</span>
        </TabBtn>
        <TabBtn onClick={() => handleClick(ZzimListType.PRODUCT)} tabActive={tabActive === ZzimListType.PRODUCT}>
          스토어 <span>{count?.productCount || 0}</span>
        </TabBtn>
        <TabBtn onClick={() => handleClick(ZzimListType.EVENT)} tabActive={tabActive === ZzimListType.EVENT}>
          이벤트 <span>{count?.eventCount || 0}</span>
        </TabBtn>
      </div>
      <div className='filter_box'>
        <div className='sort_select_box'>
          {
            <>
              <button onClick={onFilterClick} className='sort_trigger'>
                {currentSort == '전체' ? currentSort : getProductCategoryName(currentSort as ProductCategoryValue)} <IconDownTriangle />
              </button>
              <div ref={sortDropdownRef} className={`sort_menu ${isFilter ? 'active' : 'inactive'}`}>
                <ul>
                  {sortingValue().map((str, index) => (
                    <li key={'sort_str' + str + index} onClick={() => onClickSort(str as string)}>
                      {str == '전체' ? str : getProductCategoryName(str as ProductCategoryValue)}
                    </li>
                  ))}
                </ul>
              </div>
            </>
          }
        </div>

        <div className='sort_select_box'>
          <button onClick={onSortClick} className='sort_trigger'>
            {currentZzimSort.title} <IconDownTriangle />
          </button>
          <div ref={sortDropdownRef} className={`sort_menu ${isZzimSort ? 'active' : 'inactive'}`}>
            <ul>
              {onSortRender()?.map((data, index) => (
                <li key={'sort_str' + data.title + index} onClick={() => onDataSort(data)}>
                  {data.title}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <span className='delete_all' onClick={deleteAll}>
          전체 삭제
        </span>
      </div>
      {isValidating ? (
        <Loading />
      ) : (
        <div className='zzim_contents'>
          {tabActive === ZzimListType.BRAND && (
            <ZzimBrand
              page={brandPage}
              active={tabActive === ZzimListType.BRAND}
              content={data?.items || []}
              refetch={dataRefresh}
              category={currentSort}
            />
          )}
          {tabActive === ZzimListType.CONTENT && (
            <ZzimContents
              page={contentPage}
              active={tabActive === ZzimListType.CONTENT}
              content={data?.items || []}
              refetch={dataRefresh}
              category={currentSort}
            />
          )}
          {tabActive === ZzimListType.PRODUCT && (
            <ZzimStore
              page={storePage}
              active={tabActive === ZzimListType.PRODUCT}
              content={data?.items || []}
              refetch={dataRefresh}
              category={currentSort}
            />
          )}
          {tabActive === ZzimListType.EVENT && (
            <ZzimEvent
              page={eventPage}
              active={tabActive === ZzimListType.EVENT}
              content={data?.items || []}
              refetch={dataRefresh}
              category={currentSort}
            />
          )}
        </div>
      )}
      ;
    </ZzimContainer>
  );
};

export default ZzimIndex;
const ZzimContainer = styled.div`
  width: 100%;
  position: relative;
  .zzim_tabbox {
    width: 100%;
    /* height: 50px; */
    position: relative;
    margin-bottom: 27px;
    @media all and (max-width: ${theme.pc}px) {
      margin-bottom: 30px;
      padding: 30px 15px 0 15px;
    }
  }

  .filter_box {
    width: 100%;
    position: relative;
    margin-bottom: 30px;
    @media all and (max-width: ${theme.pc}px) {
      margin: 30px 0 18px 0;
      padding: 0 15px;
    }
    .sort_select_box {
      display: inline-block;
      .sort_trigger {
        ${props => props.theme.resetBtnStyle};
        width: 120px;
        font-size: 15px;
        font-weight: 700;
        text-align: left;
        > svg {
          margin-left: 5px;
        }
      }
      .sort_menu {
        width: 120px;
        background-color: #fff;
        border: 1px solid #262626;
        margin-top: 10px;
        opacity: 0;
        visibility: hidden;
        display: none;
        transform: translateY(-20px);
        transition: opacity 0.4s ease, transform 0.4 ease;
        position: absolute;
        z-index: 999;
        > ul {
          li {
            width: 100%;
            height: 42px;
            line-height: 42px;
            vertical-align: middle;
            font-size: 15px;
            padding-left: 13px;
            cursor: pointer;
            border-bottom: 1px solid #dfdfdf;
            &:active,
            &:hover {
              background-color: #f7f7f7;
            }
            &:last-child {
              border-bottom: none;
            }
          }
        }
      }
      .sort_menu.active {
        display: block;
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
      }
    }
    .delete_all {
      display: block;
      position: absolute;
      top: 0;
      right: 0;
      font-size: 15px;
      cursor: pointer;
      @media all and (max-width: ${theme.pc}px) {
        right: 15px;
      }
    }
  }
`;

const TabBtn = styled.button<TabProps>`
  ${props => props.theme.resetBtnStyle};
  display: inline-block;
  width: 24.99%;
  height: 50px;
  font-size: 13px;
  font-weight: 700;
  text-align: center;
  color: ${props => (props.tabActive ? '#fff' : '#262626')};
  border: ${props => (props.tabActive ? '0' : '1px solid #dfdfdf')};
  background-color: ${props => (props.tabActive ? '#262626' : '#fff')};
  > span {
    color: #fd4381;
  }
  &:nth-child(2) {
    border-left: 0;
    border-right: 0;
  }
  &:nth-child(3) {
    border-right: 0;
  }
`;

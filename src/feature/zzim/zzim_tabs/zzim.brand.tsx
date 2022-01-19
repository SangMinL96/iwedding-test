import ActiveContainer from '@components/core/containers/ActiveContainer';
import Pagination from '@components/Pagination';
import { Desktop } from '@hooks/useDevice';
import theme from '@styles/theme';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';
import { ZzimListType, ZzimTabsProps } from '../zzim.interface';
import ZzimItem from './zzim.item';

const Container = styled.div`
  width: 100%;
  position: relative;
  height: 540px;
  margin-bottom: 80px;
  @media all and (max-width: ${theme.pc}px) {
    height: auto;
    padding: 0 15px;
  }
  .brand_box {
    width: 100%;
    position: relative;
    .zzim_none_box {
      width: 100%;
      text-align: center;
      padding-top: 60px;
      > p {
        font-size: 16px;
        color: #262626;
        line-height: 24px;
        @media all and (max-width: ${theme.pc}px) {
          font-size: 15px;
        }
      }
      .to_page_btn {
        ${props => props.theme.resetBtnStyle};
        display: block;
        margin: 66px auto 0 auto;
        width: 345px;
        height: 50px;
        border: 1px solid #dfdfdf;
        font-size: 16px;
        color: #262626;
        @media all and (max-width: ${theme.pc}px) {
          width: 100%;
        }
      }
    }
  }
`;

const ZzimBrand = ({ active, content, refetch, category, page }: ZzimTabsProps) => {
  const router = useRouter();
  const isDeskTop = Desktop();
  const goToBrandPage = () => {
    //Search_brand
    router.push('/brand?category=사진&tag=&page=1&keyword=');
  };

  const onDataListFilter = () => {
    return content?.filter(item => {
      if (category == undefined || category == '전체') {
        return true;
      } else {
        return item?.ent?.category == category;
      }
    });
  };

  return (
    <ActiveContainer active={active}>
      <Container>
        <div className='brand_box'>
          {content.length === 0 ? (
            <div className='zzim_none_box'>
              <p>찜한 내역이 없습니다.</p>
              <button className='to_page_btn' onClick={goToBrandPage}>
                브랜드 보러가기
              </button>
            </div>
          ) : (
            <>
              {isDeskTop
                ? onDataListFilter()
                    .slice((page - 1) * 6, page * 6)
                    .map(item => <ZzimItem type={ZzimListType.BRAND} key={item.no} item={item} zzimCancel={() => refetch()} />)
                : onDataListFilter().map(item => (
                    <ZzimItem type={ZzimListType.BRAND} key={item.no} item={item} zzimCancel={() => refetch()} />
                  ))}
              {isDeskTop && (
                <Pagination itemsPP={6} totalItems={onDataListFilter().length} pageRange={5} paginationKey={'zzim_brand_pagination'} />
              )}
            </>
          )}
        </div>
      </Container>
    </ActiveContainer>
  );
};

export default ZzimBrand;

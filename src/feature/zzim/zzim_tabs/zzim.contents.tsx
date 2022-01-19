import ActiveContainer from '@components/core/containers/ActiveContainer';
import Pagination from '@components/Pagination';
import { Desktop } from '@hooks/useDevice';
import theme from '@styles/theme';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';
import { ZzimListType, ZzimTabsProps } from '../zzim.interface';
import ZzimItem from './zzim.item';

const ZZIM_CONTENTS_PAGINATION = 'zzim_contents_pagination';
const ZzimContents = ({ active, content, refetch, category, page }: ZzimTabsProps) => {
  const isDeskTop = Desktop();
  const router = useRouter();
  const goToContentsPage = () => {
    router.push('/contents?category=전체&tag=&page=1&keyword=');
  };
  const filterDataList = () => {
    return content?.filter(item => category == undefined || category == '전체' || item?.ent?.category == category);
  };
  console.log(page);
  return (
    <ActiveContainer active={active}>
      <Container>
        <div className='contents_box'>
          {filterDataList().length === 0 ? (
            <div className='zzim_none_box'>
              <p>찜한 내역이 없습니다.</p>
              <button className='to_page_btn' onClick={goToContentsPage}>
                컨텐츠 보러가기
              </button>
            </div>
          ) : (
            <>
              {isDeskTop
                ? filterDataList()
                    .slice((page - 1) * 6, page * 6)
                    .map(item => <ZzimItem type={ZzimListType.CONTENT} key={item.no} item={item} zzimCancel={() => refetch()} />)
                : filterDataList().map(item => (
                    <ZzimItem type={ZzimListType.CONTENT} key={item.no} item={item} zzimCancel={() => refetch()} />
                  ))}
              {isDeskTop && (
                <Pagination itemsPP={6} totalItems={filterDataList().length} pageRange={5} paginationKey={ZZIM_CONTENTS_PAGINATION} />
              )}
            </>
          )}
        </div>
      </Container>
    </ActiveContainer>
  );
};

export default ZzimContents;
const Container = styled.div`
  width: 100%;
  position: relative;
  height: 540px;
  margin-bottom: 80px;
  @media all and (max-width: ${theme.pc}px) {
    height: auto;
    padding: 0 15px;
  }
  .contents_box {
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

import { useBbsPageState } from '@feature/Ibrandplus/hooks/useBbsPageState';
import { bbsFilterReset } from '@modules/log/bbs/bbsLogger';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';
import shallow from 'zustand/shallow';
function NoListDataBox({ isSearch = false }) {
  const router = useRouter();
  const [setResetInfinityPage] = useBbsPageState(state => [state.setResetInfinityPage], shallow);
  const onReset = async () => {
    await bbsFilterReset(isSearch);
    setResetInfinityPage();
    if (isSearch) {
      router.push({
        pathname: router.pathname,
        query: { ...router.query, tag: undefined, subCategory: '전체', page: 1 },
      });
    } else {
      router.push({
        pathname: router.pathname,
        query: { ...router.query, tag: undefined, subCategory: '전체', page: 1, keyword: undefined },
      });
    }
  };
  return (
    <Container>
      <p>
        {router.query.keyword
          ? `입력하신 '${router.query.keyword}'에 대한 검색 결과가 없습니다.`
          : '설정한 필터에 대한 검색 결과가 없습니다.'}
      </p>
      <button onClick={onReset}>필터 초기화</button>
    </Container>
  );
}

export default React.memo(NoListDataBox);

const Container = styled.section`
  ${props => props.theme.flexCenter};
  padding: 0 59px;
  flex-direction: column;
  width: 100%;
  height: 180px;
  color: #8c8c8c;
  font-size: 15px;
  text-align: center;
  margin-bottom: -50px;
  @media all and (min-width: 1280px) {
    height: 300px;
    margin-bottom: 0;
  }
  button {
    margin-top: 19px;
    width: 100%;
    height: 40px;
    border: 1px solid #dfdfdf;
    color: #262626;
    font-size: 14px;
    @media all and (min-width: 1280px) {
      width: 265px;
    }
  }
  > p {
    line-height: 22px;
  }
`;

import React, { useMemo } from 'react';
import Dropdown from '@components/Dropdown';
import { useQnAList } from '@modules/mypage/QnA/QnAApi';
import { answerFilter, productCategoryFilter } from '@utils/dropdownOptions';
import { FILTER_BY_BRAND, FILTER_BY_STATUS } from '@utils/localSwrKeys';
import styled from 'styled-components';

const FilterSection = () => {
  const { list } = useQnAList();
  const userQnAListCategory = useMemo(() => new Set(list?.map(li => li.mainCategory)), [list]);
  const category = useMemo(
    () => [
      productCategoryFilter[0],
      ...productCategoryFilter.filter(pcf => userQnAListCategory.has(pcf.title)), // 유저가 질문한 업종만 추출하여 필터옵션리스트를 만듦
      productCategoryFilter[productCategoryFilter.length - 1],
    ],
    [userQnAListCategory],
  );

  return (
    <Container>
      <Total>총 {list?.length ?? 0}건의 문의 내역</Total>
      <DropdownContainer>
        <Dropdown options={answerFilter} swrKey={FILTER_BY_STATUS} />
        <RightFilter>
          <Dropdown options={category} swrKey={FILTER_BY_BRAND} />
        </RightFilter>
      </DropdownContainer>
    </Container>
  );
};

export default React.memo(FilterSection);

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  padding: 15px;
`;

const DropdownContainer = styled.div`
  display: flex;
`;

const RightFilter = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 127px;
`;

const Total = styled.span`
  display: inline-block;
  font-size: 15px;
  color: ${props => props.theme.blue};
`;

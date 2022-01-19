import React, { SyntheticEvent, useCallback } from 'react';
import Loading from '@components/Loading';
import SectionContainer from '@components/core/containers/SectionContainer';
import { useMainCategory } from '@modules/mypage/QnA/QnAApi';
import styled from 'styled-components';
import { TypeButton } from '../TalkTypeSection/TypeButton';
import { useFormStore } from '@feature/QnA/hooks/useFormStore';
import shallow from 'zustand/shallow';
import { useRouter } from 'next/router';

const ProductCategorySection = () => {
  const [mainCategory, setMainCategory, setTalkType] = useFormStore(
    useCallback(state => [state.mainCategory, state.setMainCategory, state.setTalkType], []),
    shallow,
  );

  const { query } = useRouter();

  const handleChange = useCallback(
    (newCategory: string) => (e: SyntheticEvent) => {
      e.preventDefault();
      setMainCategory(newCategory);
      setTalkType(null);
    },
    [setMainCategory, setTalkType],
  );

  const { categoryList, isValidating } = useMainCategory(query);

  return (
    <SectionContainer title='문의 업종'>
      {isValidating ? (
        <Loading body='업종 목록을 불러오는 중 입니다.' />
      ) : (
        <Body>
          {categoryList?.map(({ category, categoryName }) => (
            <TypeButton active={category == mainCategory} title={categoryName} onClick={handleChange(category)} key={category} />
          ))}
        </Body>
      )}
    </SectionContainer>
  );
};

export default React.memo(ProductCategorySection);

const Body = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 7px;
`;

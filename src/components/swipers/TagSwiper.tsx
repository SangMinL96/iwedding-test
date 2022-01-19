import { useBbsPageState } from '@feature/Ibrandplus/hooks/useBbsPageState';
import { BBSTag, TagProps } from '@modules/ibrandplus/ibrandplusInterface';
import theme from '@styles/theme';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect } from 'react';
import styled from 'styled-components';
import shallow from 'zustand/shallow';

interface TagSwiperProps {
  title: string;
  tagList: any;
  selectedCategory?: BBSTag;
  onTagLog?: any;
}

const TagSwiper = ({ title, tagList, onTagLog }: TagSwiperProps) => {
  const {
    query: { tag: queryTag },
  } = useRouter();
  const queryTagArray =
    String(queryTag)
      .split(',')
      .map(item => item.split('::').map(item2 => item2))
      .map(item => item[1]) || [];

  return (
    <TagSection>
      <p className='title'>{title}</p>
      <TagContainer>
        {tagList?.tags?.map((tag: string, index) => (
          <Tag onTagLog={onTagLog} key={`${index}_${tag}`} tagGroup={tagList.group} tagName={tag} active={queryTagArray?.includes(tag)} />
        ))}
      </TagContainer>
    </TagSection>
  );
};

export default TagSwiper;

// eslint-disable-next-line react/display-name
const Tag = React.memo(({ tagName, active, onTagLog, tagGroup }: { tagName: string; active: boolean; onTagLog: any; tagGroup: any }) => {
  const router = useRouter();
  const {
    query: { tag: queryTag },
  } = useRouter();
  const setResetInfinityPage = useBbsPageState(state => state.setResetInfinityPage, shallow);

  const onSelectTag = () => {
    setResetInfinityPage();
    if (active) {
      router.push(
        {
          pathname: router.pathname,
          query: {
            ...router.query,
            tag: String(queryTag)
              ?.split(',')
              ?.filter(item => item !== `${tagGroup}::${tagName}`)
              ?.toString(),
          },
        },
        undefined,
        { scroll: false },
      );
    } else {
      onTagLog(tagName);
      router.push(
        {
          pathname: router.pathname,
          query: {
            ...router.query,
            tag: String(queryTag)?.split(',')?.concat(`${tagGroup}::${tagName}`).toString(),
          },
        },
        undefined,
        { scroll: false },
      );
    }
  };

  return (
    <StyledTag active={active} onClick={onSelectTag}>
      {tagName}
    </StyledTag>
  );
});

const TagSection = styled.section`
  display: flex;
  width: 100%;
  max-width: 1280px;
  min-height: 44px;
  max-height: 44px;
  font-size: 14px;
  background: white;
  padding: 12px 0 12px 15px;
  border-bottom: 1px solid #f0f0f0;
  .title {
    color: ${theme.black};
    font-weight: 700;
    width: 120px;
  }
`;

const TagContainer = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  overflow: hidden;
  overflow-x: scroll;
  ${theme.hideScroll};
  .swiper-container {
    width: 100%;
    .swiper-wrapper {
      width: 100%;
    }
  }
`;

const StyledTag = styled.span<{ active: boolean }>`
  cursor: pointer;
  margin-right: 10px;
  color: ${({ active }) => (active ? theme.blue : '#777777')};
  font-weight: 400;
  font-size: 14px;
  letter-spacing: 0;
  white-space: nowrap;
`;

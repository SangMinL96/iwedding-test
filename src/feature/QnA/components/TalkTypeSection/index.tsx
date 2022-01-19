import SectionContainer from '@components/core/containers/SectionContainer';
import { useFormStore } from '@feature/QnA/hooks/useFormStore';
import { IdTitle } from '@modules/mypage/QnA/QnAInterface';
import React, { SyntheticEvent, useCallback } from 'react';
import styled from 'styled-components';
import shallow from 'zustand/shallow';
import { TypeButton } from './TypeButton';

const TalkTypeSection = ({ list }: { list: IdTitle[] }) => {
  const [talkType, setTalkType] = useFormStore(state => [state.talkType, state.setTalkType], shallow);
  const handleTalkTypeChange = useCallback(
    (newType: IdTitle) => (e: SyntheticEvent) => {
      e.preventDefault();
      setTalkType(newType);
    },
    [setTalkType],
  );

  return (
    <SectionContainer title='문의 유형' pb>
      <Body>
        {list?.map((req: IdTitle) => (
          <TypeButton
            title={req.title}
            key={req.id}
            onClick={handleTalkTypeChange(req)}
            active={req.title === talkType?.title || req.id === talkType?.id}
          />
        ))}
      </Body>
    </SectionContainer>
  );
};

export default React.memo(TalkTypeSection);

const Body = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 9px;
  > button {
    font-size: 14px;
  }
`;

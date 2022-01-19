import SectionContainer from '@components/core/containers/SectionContainer';
import { useFormStore } from '@feature/QnA/hooks/useFormStore';
import theme from '@styles/theme';
import { useRouter } from 'next/router';
import { ChangeEvent, default as React, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import DeleteButton from '../DeleteButton';

const RequestTitle = () => {
  const [title, setTitle] = useFormStore(useCallback(state => [state.title, state.setTitle], []));
  const {
    query: { title: queryTitle },
  } = useRouter();

  const handleTitleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      setTitle(e.currentTarget.value);
    },
    [setTitle],
  );

  useEffect(() => {
    if (queryTitle) {
      setTitle(queryTitle as string);
    }
  }, [queryTitle]);

  const onResetTitle = useCallback(() => setTitle(''), [setTitle]);
  return (
    <SectionContainer title='제목'>
      <TitleInput placeholder='제목을 입력하세요.' value={title} onChange={handleTitleChange} />
      {title.length > 0 && <DeleteButton onClick={onResetTitle} />}
    </SectionContainer>
  );
};

export default React.memo(RequestTitle);

const TitleInput = styled.input`
  border: 1px solid #dfdfdf;
  height: 50px;
  padding: 15px;
  font-size: 15px;
  color: ${theme.black};
  font-weight: regular;
  font-family: 'Noto Sans CJK KR', sans-serif;
`;

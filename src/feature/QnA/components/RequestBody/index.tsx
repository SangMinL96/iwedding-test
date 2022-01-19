import SectionContainer from '@components/core/containers/SectionContainer';
import { useFormStore } from '@feature/QnA/hooks/useFormStore';
import theme from '@styles/theme';
import React, { ChangeEvent, useCallback } from 'react';
import styled from 'styled-components';
import DeleteButton from '../DeleteButton';

const RequestBody = () => {
  const [body, setBody] = useFormStore(useCallback(state => [state.body, state.setBody], []));
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      e.preventDefault();
      setBody(e.currentTarget.value);
    },
    [setBody],
  );
  const onResetRequest = useCallback(() => setBody(''), [setBody]);
  return (
    <SectionContainer title='내용'>
      <BodyInput placeholder='문의 내용을 입력하세요.' value={body} onChange={handleChange} />
      {body.length > 0 && <DeleteButton onClick={onResetRequest} />}
    </SectionContainer>
  );
};

export default React.memo(RequestBody);

const BodyInput = styled.textarea`
  padding: 15px;
  min-height: 150px;
  border: 1px solid #dfdfdf;
  font-family: 'Noto Sans CJK KR', sans-serif;
  color: ${theme.black};
  font-weight: regular;
  font-size: 15px;
`;

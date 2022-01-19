import React from 'react';
import styled from 'styled-components';

interface Props {
  tag: string;
}

const Hashtag = ({ tag }: Props) => {
  return <Tag>#{tag}</Tag>;
};

export default React.memo(Hashtag);

const Tag = styled.span`
  margin-right: 5px;
`;

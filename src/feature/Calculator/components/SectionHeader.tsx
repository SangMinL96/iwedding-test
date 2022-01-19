import React from 'react';
import styled from 'styled-components';

interface Props {
  title: string;
}

const SectionHeader = ({ title }: Props) => {
  return <Title>{title}</Title>;
};

export default React.memo(SectionHeader);

const Title = styled.p`
  padding-left: 11px;
  margin-top: 40px;
  margin-bottom: 23px;
  font-size: 16px;
  font-weight: bold;
`;

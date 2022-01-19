import theme from '@styles/theme';
import React from 'react';
import styled from 'styled-components';

interface Props {
  days: number;
}

const RemainingDays = ({ days }: Props) => {
  return <Day>{days}일 남음</Day>;
};

export default React.memo(RemainingDays);

const Day = styled.div`
  ${theme.flexCenter}
  width: 50px;
  height: 22px;
  font-size: 11px;
  color: #8b8b8b;
  background: #ededed;
  text-align: center;
  margin-top: 13px;
  margin-right: 3px;
`;

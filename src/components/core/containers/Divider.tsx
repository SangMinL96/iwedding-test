import styled from 'styled-components';

export const Divider = styled.div<{ noMT?: boolean; full?: boolean }>`
  height: 1px;
  width: ${({ full }) => (full ? '404px' : '100%')};
  border-top: 1px solid #d8d8d8;
  margin-top: ${({ noMT }) => (noMT ? '0' : '24px')};
  align-self: center;
`;

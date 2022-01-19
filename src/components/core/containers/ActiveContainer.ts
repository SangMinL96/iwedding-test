import styled from 'styled-components';

const ActiveContainer = styled.div<{ active: boolean }>`
  display: ${({ active }) => (active ? 'block' : 'none')};
`;

export default ActiveContainer;

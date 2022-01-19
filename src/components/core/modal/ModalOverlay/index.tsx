import React from 'react';
import styled from 'styled-components';

interface Props {
  isDuplicated?: boolean;
  disableMaskClick?: boolean;
  onClose: () => void;
}

const ModalOverlay = ({ onClose, isDuplicated = false, disableMaskClick = false }: Props) => {
  const maskClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disableMaskClick) return;

    if (e.target == e.currentTarget) {
      onClose();
    }
  };
  return <Overlay isDuplicated={isDuplicated} onClick={maskClick} />;
};

export default React.memo(ModalOverlay);

const Overlay = styled.div<{ isDuplicated: boolean }>`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${({ isDuplicated }) => (isDuplicated ? '' : 'rgba(0, 0, 0, 0.8)')};
  z-index: 200000;
`;

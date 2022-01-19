import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface ModalPortalProps {
  children: ReactNode;
}

export const ModalPortal = ({ children }: ModalPortalProps): React.ReactPortal => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);

    return () => setMounted(false);
  }, []);

  return mounted ? createPortal(children, document.getElementById('modal-root')) : null;
};

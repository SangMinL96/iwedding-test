import { useEffect } from 'react';
import { overFlowHidden, overFlowVisible } from '@utils/util';

export const useOverflowHidden = (visible: boolean) => {
  useEffect(() => {
    if (visible)
      setTimeout(() => {
        overFlowHidden();
      }, 50);
  }, [visible]);
};

export const useOverflowVisible = () => {
  useEffect(() => {
    overFlowVisible();
  }, []);
};

export const useOverflowModal = (visible: boolean, isDuplicated = false) => {
  useEffect(() => {
    if (visible) overFlowHidden();
    return () => {
      if (!isDuplicated) overFlowVisible();
    };
  }, [visible, isDuplicated]);
};

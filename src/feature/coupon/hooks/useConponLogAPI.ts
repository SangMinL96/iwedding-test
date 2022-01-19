import { couponJoinAPI } from '@modules/log/coupon/rsv/couponLogger';
import { isWebview } from '@utils/isWebview';
import { useEffect } from 'react';

export const useConponLogAPI = (category, active) => {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development' && active) {
      couponJoinAPI(category);
    }
  }, [active]);
  return null;
};

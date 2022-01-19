import { useState, useEffect } from 'react';

export const useIsMobileApp = () => {
  const ua = global.navigator && navigator?.userAgent;

  const [isMobileApp, setIsMobileAPP] = useState(false);
  useEffect(() => {
    if (ua.indexOf('iWeddingApp') > -1) {
      setIsMobileAPP(true);
    }
  }, [ua]);
  return isMobileApp;
};

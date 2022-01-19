import { useState, useEffect } from 'react';

export const useIsAndroid = () => {
  const [isAndroid, setIsAndroid] = useState(false);
  const UA = global.window && navigator.userAgent;

  useEffect(() => {
    if (UA.indexOf('iWeddingApp') > -1 && UA.indexOf('Android') > -1) {
      setIsAndroid(true);
    }
  }, [UA]);

  return isAndroid;
};

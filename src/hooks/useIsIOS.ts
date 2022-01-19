import { useState, useEffect } from 'react';

export const useIsIOS = () => {
  const [isIOS, setIsIOS] = useState(false);
  const UA = global?.window?.navigator.userAgent;

  useEffect(() => {
    if (UA && (UA.indexOf('iPhone') > -1 || UA.indexOf('iPad') > -1)) {
      setIsIOS(true);
    }
  }, [UA]);

  return isIOS;
};

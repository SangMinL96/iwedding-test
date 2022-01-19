import { useEffect, useState } from 'react';

export const useScrollProgress = isDeskTop => {
  const [scrollValue, setScrollValue] = useState(0);
  const [stickyValue, setStickyValue] = useState(0);
  const handleScroll = (): void => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    setStickyValue(scrollTop);
    const setScrollHeight = scrollHeight - clientHeight;
    const scrollPercent = Math.abs((scrollTop / setScrollHeight) * 100);
    if (scrollPercent > 100) {
      return setScrollValue(100);
    } else {
      return setScrollValue(scrollPercent);
    }
  };
  useEffect(() => {
    if (!isDeskTop) {
      window.addEventListener('scroll', handleScroll, true);
      return () => {
        window.removeEventListener('scroll', handleScroll, true);
      };
    }
  }, [handleScroll, isDeskTop]);

  return { scrollValue, stickyValue };
};

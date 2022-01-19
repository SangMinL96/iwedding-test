import { useCallback, useEffect } from 'react';

export interface InfinityProps {
  isMobile: boolean;
  onNextPage: () => void;
  canNext: boolean;
  isFetching: boolean;
  paddingScroll?: number;
}
export function useInfinityScroll({ isMobile, canNext, onNextPage, isFetching = false, paddingScroll = 70 }: InfinityProps) {
  const handleScroll = useCallback(() => {
    const innerEl = document.getElementById('scrollable-modal-inner');
    const scrollHeight = innerEl ? innerEl.scrollHeight : document.documentElement.scrollHeight; // 요소 콘텐츠의 총 높이
    const scrollTop = innerEl ? innerEl.scrollTop : document.documentElement.scrollTop; // 유저가 스크롤한 top value
    const clientHeight = document.documentElement.clientHeight; // 유저한테 보여지는 height
    if (canNext && !isFetching && scrollTop + clientHeight >= scrollHeight - paddingScroll) {
      onNextPage();
    }
  }, [canNext, onNextPage, isFetching, paddingScroll]);

  useEffect(() => {
    if (typeof window !== 'undefined' && isMobile) {
      const innerEl = document.getElementById('scrollable-modal-inner');
      if (innerEl) {
        innerEl.addEventListener('scroll', handleScroll);
      } else {
        window.addEventListener('scroll', handleScroll);
      }
      return () => {
        if (innerEl) {
          innerEl.removeEventListener('scroll', handleScroll);
        } else {
          window.removeEventListener('scroll', handleScroll);
        }
      };
    }
  }, [isMobile, handleScroll]);
}

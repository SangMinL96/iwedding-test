import { useBbsPageState } from '@feature/Ibrandplus/hooks/useBbsPageState';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import shallow from 'zustand/shallow';
import { Desktop } from './useDevice';

export function useObserverScrollBbs(list: any, isDeskTop: boolean) {
  const [loading, setLoading] = useState(false);
  const setInfinityPage = useBbsPageState(state => state.setInfinityPage);
  const pageEnd = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // fetchFeed 함수에서 loading 값이 true로 바뀐다면
    if (list && !isDeskTop && !loading) {
      // new 생성자로 IntersectionObserver 객체를 활용해서 observer를 생성하고
      const observer = new IntersectionObserver(
        // entries를 인자로 받는 콜백함수에서
        entries => {
          // 인스턴스의 배열의 첫번째 값이 IntersectionObserverEntry
          // 관찰 대상의 교차 상태가 true라면
          if (entries[0].isIntersecting) {
            // loadMore함수 호출
            setInfinityPage();
          }
        },
        // threshold는 옵저버가 실행되기 위해 타겟의 가시성이 얼마나 필요한지 백분율로 표시
        // 100%일 때 옵저버 실행
        { threshold: 1 },
      );
      if (observer) {
        observer?.observe(pageEnd.current);
      }
      // 관찰할 대상 등록
    }
  }, [isDeskTop]);

  return pageEnd;
}

export function useObserverScrollSearch(list: any, isDeskTop: boolean, totalCount?: any) {
  const [loading, setLoading] = useState(false);
  const setInfinityPage = useBbsPageState(state => state.setInfinityPage);
  const pageEnd = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // fetchFeed 함수에서 loading 값이 true로 바뀐다면
    if (list && !isDeskTop && !loading) {
      // new 생성자로 IntersectionObserver 객체를 활용해서 observer를 생성하고
      const observer = new IntersectionObserver(
        // entries를 인자로 받는 콜백함수에서
        entries => {
          // 인스턴스의 배열의 첫번째 값이 IntersectionObserverEntry
          // 관찰 대상의 교차 상태가 true라면
          if (entries[0].isIntersecting) {
            if (totalCount > 40) {
              // loadMore함수 호출
              setInfinityPage();
            }
          }
        },
        // threshold는 옵저버가 실행되기 위해 타겟의 가시성이 얼마나 필요한지 백분율로 표시
        // 100%일 때 옵저버 실행
        { threshold: 1 },
      );
      if (observer) {
        observer?.observe(pageEnd.current);
      }
      // 관찰할 대상 등록
    }
  }, [isDeskTop]);

  return pageEnd;
}

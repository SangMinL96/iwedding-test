import { useIsIOS } from '@hooks/useIsIOS';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

// dependency가 객체 타입일 경우의 useEffect
// https://stackoverflow.com/questions/55808749/use-object-in-useeffect-2nd-param-without-having-to-stringify-it-to-json
export const usePushScrollTop = () => {
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      if (JSON.parse(sessionStorage.getItem('pushScrollTop'))) {
        console.log('asdf');
        window.scroll({
          top: JSON.parse(sessionStorage.getItem('pushScrollTop')),
        });
        console.log('ddd');
        setTimeout(() => sessionStorage.removeItem('pushScrollTop'), 1000);
      } else {
        setTimeout(() => sessionStorage.removeItem('pushScrollTop'), 1000);
      }
    }
  }, [router]);
};

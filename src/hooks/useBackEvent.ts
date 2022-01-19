import { isEqual } from 'lodash';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';

// dependency가 객체 타입일 경우의 useEffect
// https://stackoverflow.com/questions/55808749/use-object-in-useeffect-2nd-param-without-having-to-stringify-it-to-json
export const useBackEvent = () => {
  // const router = useRouter();
  // const modalCheck = ['#openNotice', '#openMenu'];
  // if (!modalCheck.find(item => router.asPath.includes(item))) {
  //   if (router.isReady) {
  //     router.beforePopState(() => {
  //       router.reload();
  //       return null;
  //     });
  //   }
  // }
};

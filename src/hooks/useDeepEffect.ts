import { isEqual } from 'lodash';
import { useEffect, useRef } from 'react';

// dependency가 객체 타입일 경우의 useEffect
// https://stackoverflow.com/questions/55808749/use-object-in-useeffect-2nd-param-without-having-to-stringify-it-to-json
export const useDeepEffect = (fn: any, deps: any[]) => {
  const isFirst = useRef(true);
  const prevDeps = useRef(deps);

  useEffect(() => {
    const isFirstEffect = isFirst.current;
    const isSame = prevDeps.current.every((obj, index) => isEqual(obj, deps[index]));

    isFirst.current = false;
    prevDeps.current = deps;

    if (isFirstEffect || !isSame) {
      return fn();
    }
  }, [deps, fn]);
};

import { useCallback } from 'react';
import { debounce } from 'lodash';

export const useDebounce = (fn: any, delay = 1000, deps?: any[]) => useCallback(debounce(fn, delay), deps?.length ? deps : []);

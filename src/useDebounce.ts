import { useCallback, useRef } from 'react';
import { useEventHandler } from './useEventHandler';
import { Fn } from './utils/Fn';

/**
 * Create a debounced function.
 * Uses @see useEventHandler so no need for useCallback even when using state/props inside
 * @param fn - the function to debounce
 * @param ms - number of milliseconds to delay each call
 * @returns new debounced function
 */
export const useDebounce = <In extends unknown[]>(
    fn: Fn<In, void>,
    ms: number,
): Fn<In, void> => {
    const callback = useEventHandler(fn);
    const timeRef = useRef(0);

    return useCallback((...args: In) => {
        timeRef.current && window.clearTimeout(timeRef.current);
        timeRef.current = setTimeout(() => callback(...args), ms);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
};

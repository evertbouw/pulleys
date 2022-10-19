import { useCallback, useRef } from 'react';
import { useEventHandler } from './useEventHandler';

/**
 * Create a debounced function.
 * Uses @see useEventHandler so no need for useCallback even when using state/props inside
 * @param fn - the function to debounce
 * @param ms - number of milliseconds to delay each call
 * @returns new debounced function
 */
export const useDebounce = <Fn extends (...args: unknown[]) => unknown>(
    fn: Fn,
    ms: number,
): Fn => {
    const callback = useEventHandler(fn);
    const timeRef = useRef(0);

    return useCallback((...args: Parameters<Fn>) => {
        timeRef.current && window.clearTimeout(timeRef.current);
        timeRef.current = setTimeout(() => callback(...args), ms);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []) as Fn;
};

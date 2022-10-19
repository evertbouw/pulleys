import { useCallback, useRef } from 'react';
import { useEventHandler } from './useEventHandler';

/**
 * Create a throttled function.
 * Uses @see useEventHandler so no need for useCallback even when using state/props inside
 * @param fn - the function to throttle
 * @param ms - number of milliseconds between each call
 * @returns new throttled function
 */
export const useThrottle = <Fn extends (...args: unknown[]) => unknown>(
    fn: Fn,
    ms: number,
): Fn => {
    const callback = useEventHandler(fn);
    const timeRef = useRef(0);

    return useCallback((...args: Parameters<Fn>) => {
        const now = Date.now();
        if (now > timeRef.current) {
            callback(...args);
            timeRef.current = now + ms;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []) as Fn;
};

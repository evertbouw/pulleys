import { useCallback, useRef } from 'react';
import { useEventHandler } from './useEventHandler';
import { Fn } from './utils/Fn';

/**
 * Create a throttled function.
 * Uses @see useEventHandler so no need for useCallback even when using state/props inside
 * @param fn - the function to throttle
 * @param ms - number of milliseconds between each call
 * @returns new throttled function
 */
export const useThrottle = <In extends unknown[]>(
    fn: Fn<In, void | Promise<void>>,
    ms: number,
): Fn<In, void> => {
    const callback = useEventHandler(fn);
    const timeRef = useRef(0);

    return useCallback((...args: In) => {
        const now = Date.now();
        if (now > timeRef.current) {
            callback(...args);
            timeRef.current = now + ms;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
};

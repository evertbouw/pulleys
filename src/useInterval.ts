import { useEffect } from 'react';
import { useEventHandler } from './useEventHandler';

/** you can return a function that'll run after clearing the interval */
export type Cleanup = void | (() => void);

/**
 * It's Dan Abramov's declarative setInterval hook
 * but the callback function can return a cleanup function
 * that gets called when the interval stops
 *
 * https://overreacted.io/making-setinterval-declarative-with-react-hooks/
 *
 * @param callback - function to be called. Can return another function that runs as cleanup when `delay` changes or component unmounts
 * @param delay - number of milliseconds between calls
 */
export const useInterval = (
    callback: () => Cleanup,
    delay: number | null,
): void => {
    const savedCallback = useEventHandler(callback);

    useEffect(() => {
        if (delay === null) {
            return;
        }

        let cleanup: Cleanup;

        const tick = () => {
            cleanup = savedCallback();
        };

        const id = setInterval(tick, delay);

        return () => {
            clearInterval(id);
            if (cleanup) {
                cleanup();
            }
        };
    }, [savedCallback, delay]);
};

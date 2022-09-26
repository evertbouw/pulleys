import { useEffect } from 'react';
import { useGetter } from './useGetter';

type Cleanup = void | (() => void);

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
    const savedCallback = useGetter(callback);

    useEffect(() => {
        if (delay === null) {
            return;
        }

        let cleanup: Cleanup;

        const tick = () => {
            cleanup = savedCallback()();
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

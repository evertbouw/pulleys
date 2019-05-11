import { useEffect, useRef } from "react";

type Cleanup = void | (() => void);

/**
 * It's Dan Abramov's declarative setInterval hook
 * but the callback function can return a cleanup function
 * that gets called when the interval stops
 * 
 * https://overreacted.io/making-setinterval-declarative-with-react-hooks/
 * 
 * @param {function} callback 
 * @param {number|null} delay 
 * @returns {void}
 */
export const useInterval = (callback: () => Cleanup, delay: number | null): void => {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay !== null) {
      let cleanup: Cleanup;

      const tick = () => {
        cleanup = savedCallback.current();
      };

      const id = setInterval(tick, delay);

      return () => {
        clearInterval(id);
        if (cleanup) {
          cleanup();
        }
      };
    }

    return;
  }, [callback, delay]);
};

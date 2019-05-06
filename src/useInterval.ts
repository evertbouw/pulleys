import { useEffect, useRef } from "react";

type Cleanup = void | (() => void);

export const useInterval = (callback: () => Cleanup, delay: number | null) => {
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

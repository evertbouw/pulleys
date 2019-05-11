import { useEffect, useRef } from "react";

/**
 * its the useEffect hook but it skips the first render, making this work like componentDidUpdate
 * taken from the FAQ https://reactjs.org/docs/hooks-faq.html#can-i-run-an-effect-only-on-updates
 * 
 * @param {function} effect 
 * @param {array} inputs 
 * @returns {void}
 */
export const useUpdateEffect: typeof useEffect = (effect, inputs): void => {
  const ref = useRef(false);

  useEffect(() => {
    if (ref.current) {
      effect();
    } else {
      ref.current = true;
    }
  }, inputs); // eslint-disable-line react-hooks/exhaustive-deps
};

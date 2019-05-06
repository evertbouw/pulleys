import { useEffect, useRef } from "react";

// this hook does not run the effect on first render
// as described in the faq
// https://reactjs.org/docs/hooks-faq.html#can-i-run-an-effect-only-on-updates

export const useUpdateEffect: typeof useEffect = (effect, inputs) => {
  const ref = useRef(false);

  useEffect(() => {
    if (ref.current) {
      effect();
    } else {
      ref.current = true;
    }
  }, inputs); // eslint-disable-line react-hooks/exhaustive-deps
};

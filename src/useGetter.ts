import { useRef, useLayoutEffect, useCallback } from "react";

export const useGetter = <Value>(value: Value) => {
  const ref = useRef(value);

  useLayoutEffect(() => {
    ref.current = value;
  }, [value]);

  return useCallback(() => ref.current, []);
};

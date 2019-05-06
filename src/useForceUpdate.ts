import { useReducer, Reducer, useCallback } from "react";

const reducer: Reducer<number, void> = x => (x += 1);

export const useForceUpdate = () => {
  const [, dispatch] = useReducer(reducer, 0);

  return useCallback(() => {
    dispatch();
  }, []);
};

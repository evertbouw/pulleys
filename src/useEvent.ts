import { useCallback, useState } from "react";
import { useEventListener } from "./useEventListener";

interface UseEvent {
  <
    Elem extends MediaQueryList,
    K extends keyof MediaQueryListEventMap,
    Value
  >(args: {
    eventName: K;
    getValue: (event: MediaQueryListEventMap[K]) => Value;
    initialState: Value;
    element: Elem;
  }): Value;
  <Elem extends HTMLElement, K extends keyof HTMLElementEventMap, Value>(args: {
    eventName: K;
    getValue: (event: HTMLElementEventMap[K]) => Value;
    initialState: Value;
    element: Elem;
  }): Value;
  <Elem extends Window, K extends keyof WindowEventMap, Value>(args: {
    eventName: K;
    getValue: (event: WindowEventMap[K]) => Value;
    initialState: Value;
    element: Elem;
  }): Value;
  <K extends keyof WindowEventMap, Value>(args: {
    eventName: K;
    getValue: (event: WindowEventMap[K]) => Value;
    initialState: Value;
  }): Value;
}

export const useEvent: UseEvent = <
  Elem extends Window | undefined,
  K extends keyof WindowEventMap,
  Value
>({
  eventName,
  getValue,
  initialState,
  element = window
}: {
  eventName: K;
  getValue: (event: WindowEventMap[K]) => Value;
  initialState: Value;
  element?: Elem;
}): Value => {
  const [value, setValue] = useState(initialState);

  const listener = useCallback(
    event => {
      setValue(getValue(event));
    },
    [getValue]
  );

  useEventListener({ eventName, listener, element });

  return value;
};

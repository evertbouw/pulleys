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

/**
 * @typedef UseEventParams
 * @property {object} [element=window] the element to attach the listener to
 * @property {string} eventName the name of the event
 * @property {function} getValue function that receives the event and returns a value
 * @property {*} initialState the return value before any events fired
 */

/**
 * Listen to events and turn these into a value
 * 
 * @param {object} UseEventParams
 * @return {*} value
 * @example
 * const getValue = event => event.target.tagName;
 * const SomeComponent = () => {
 *   const tagName = useEvent({
 *     eventName: "click",
 *     getValue,
 *     initialState: "nothing yet"
 *   });
 * 
 *   return <div>You've clicked on a {tagName}</div>;
 * }
 */
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

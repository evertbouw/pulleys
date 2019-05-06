import { useEvent } from "./useEvent";

export const getWindowSize = () => [window.innerWidth, window.innerHeight];

export const useWindowSize = () =>
  useEvent({
    eventName: "resize",
    getValue: getWindowSize,
    initialState: getWindowSize()
  });

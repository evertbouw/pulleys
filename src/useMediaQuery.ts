import { useMemo } from "react";
import { useEvent } from "./useEvent";

const getValue = (listOrEvent: MediaQueryList | MediaQueryListEvent) =>
  listOrEvent.matches;

export const useMediaQuery = (query: string): boolean => {
  const element = useMemo(() => window.matchMedia(query), [query]);

  return useEvent({
    eventName: "change",
    getValue,
    element,
    initialState: getValue(element)
  });
};

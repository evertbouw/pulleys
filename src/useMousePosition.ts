import { useEvent } from "./useEvent";

const getValue = ({ clientX, clientY }: MouseEvent) => [clientX, clientY];

export const useMousePosition = () =>
  useEvent({
    eventName: "mousemove",
    getValue,
    initialState: [0, 0]
  });

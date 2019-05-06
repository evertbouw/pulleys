import { useEventListener } from "./useEventListener";

const listener = (event: BeforeUnloadEvent) => {
  event.preventDefault();
  event.returnValue = "";
};

export const usePrompt = (active: boolean) =>
  useEventListener({
    eventName: "beforeunload",
    listener,
    active
  });

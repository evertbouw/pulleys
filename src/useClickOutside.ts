import { useCallback, RefObject } from "react";
import { useEventListener } from "./useEventListener";

export const useClickOutside = ({
    innerElementRef,
    outerElementRef,
    active = true,
    callback,
}: {
    innerElementRef: RefObject<HTMLElement>,
    outerElementRef?: RefObject<HTMLElement>,
    active?: boolean,
    callback: () => void,
}) => {
    const listener = useCallback((event: Event) => {
        if (innerElementRef.current !== null && !innerElementRef.current.contains(event.target as Node)) {
            callback();
        }
    }, [innerElementRef, callback]);

    useEventListener({
        eventName: "click",
        element: outerElementRef !== undefined ? outerElementRef.current : window,
        active,
        listener,
    });
};

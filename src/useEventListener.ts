import { useEffect } from "react";

interface UseEventListener {
    <
        Elem extends MediaQueryList,
        K extends keyof MediaQueryListEventMap
    >(args: {
        eventName: K;
        listener: (e: MediaQueryListEventMap[K]) => void;
        element: Elem;
        active?: boolean;
    }): void;
    <Elem extends HTMLElement, K extends keyof HTMLElementEventMap>(args: {
        eventName: K;
        listener: (e: HTMLElementEventMap[K]) => void;
        element: Elem;
        active?: boolean;
    }): void;
    <Elem extends Window, K extends keyof WindowEventMap>(args: {
        eventName: K;
        listener: (e: WindowEventMap[K]) => void;
        element: Elem;
        active?: boolean;
    }): void;
    <K extends keyof WindowEventMap>(args: {
        eventName: K;
        listener: (e: WindowEventMap[K]) => void;
        active?: boolean;
    }): void;
}

export const useEventListener: UseEventListener = ({
    eventName,
    listener,
    element = window,
    active = true,
}: {
    eventName: string;
    listener: (e: Event) => void;
    element?: MediaQueryList | Window | HTMLElement;
    active?: boolean;
}) => {
    useEffect(() => {
        if (active) {
            if ("addListener" in element) {
                element.addListener(listener);

                return () => {
                    element.removeListener(listener);
                };
            }

            element.addEventListener(eventName, listener);

            return () => {
                element.removeEventListener(eventName, listener);
            };
        }

        return;
    }, [eventName, listener, element, active]);
};

import { useEffect } from 'react';
import { useEventHandler } from './useEventHandler';
import type { EventMapFor } from './utils/EventMapFor';

/**
 * Never call addEventListener again, just let this hook handle it
 * @example
 * ```tsx
 * const MyComponent = () => {
 *   useEventListener({
 *     eventName: "keydown",
 *     listener: event => console.log(event.key),
 *   });
 *
 *   return <div />;
 * }
 * ```
 */
export const useEventListener = <
    EventName extends keyof EventMapFor<Target>,
    Event extends EventMapFor<Target>[EventName],
    Target extends Window | HTMLElement | MediaQueryList = Window,
>({
    target,
    eventName,
    listener,
    active = true,
    passive = true,
}: {
    target?: Target;
    eventName: EventName;
    listener: (event: Event) => void;
    active?: boolean;
    passive?: boolean;
}) => {
    const handleEvent = useEventHandler(listener);

    useEffect(() => {
        if (!active) return undefined;

        const element = target ?? window;

        if ("addListener" in element) {
            element.addListener(handleEvent as (event: MediaQueryListEvent) => void);

            return () => {
                element.removeListener(handleEvent as (event: MediaQueryListEvent) => void);
            };
        }

        element.addEventListener(
            eventName as string,
            handleEvent as EventListener,
            { passive },
        );

        return () => {
            element.removeEventListener(
                eventName as string,
                handleEvent as EventListener,
            );
        };
    }, [eventName, target, active, handleEvent, passive]);
};

import { useEffect } from 'react';
import { useGetter } from './useGetter';
import type { EventMapFor } from './utils/EventMapFor';

/**
 * Never call addEventListener again, just let this hook handle it
 * @example
 * ```
 * const MyComponent = () => {
 *   useEventListener({
 *     eventName: "keydown",
 *     listener: event => console.log(event.key),
 *   });
 *
 *   return <div>Last used key was {key}</div>;
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
    const getListener = useGetter(listener);

    useEffect(() => {
        if (!active) return undefined;

        const element = target ?? window;

        const handleEvent = (event: Event) => {
            getListener()(event);
        };

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
    }, [eventName, target, active, getListener, passive]);
};

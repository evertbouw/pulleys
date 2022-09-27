import { useCallback, useState } from 'react';
import { useEventListener } from './useEventListener';
import type { EventMapFor } from './utils/EventMapFor';

/**
 * Pick a value from an event
 * @example
 * ```tsx
 * const MyComponent = () => {
 *   const key = useEvent({
 *     eventName: "keydown",
 *     getValue: event => event.key,
 *     initialState: ""
 *   });
 *
 *   return <div>Last used key was {key}</div>;
 * }
 * ```
 */
export const useEvent = <
    EventName extends keyof EventMapFor<Target>,
    Event extends EventMapFor<Target>[EventName],
    Value,
    Target extends Window | HTMLElement | MediaQueryList = Window,
>({
    target,
    eventName,
    getValue,
    initialState,
}: {
    /** event target, defaults to window */
    target?: Target;
    /** name of the event */
    eventName: EventName;
    /** function that receives the event and should return the value you are interested in */
    getValue: (event: Event) => Value;
    /** initial state or function that returns initial state */
    initialState: Value | (() => Value);
}): Value => {
    const [state, setState] = useState(initialState);

    const listener = useCallback(
        (event: Event) => {
            setState(getValue(event));
        },
        [getValue],
    );

    useEventListener({ eventName, listener, target });

    return state;
};

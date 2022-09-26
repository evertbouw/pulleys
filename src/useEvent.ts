import { useCallback, useState } from 'react';
import { useEventListener } from './useEventListener';
import type { EventMapFor } from './utils/EventMapFor';

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
    target?: Target;
    eventName: EventName;
    getValue: (event: Event) => Value;
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

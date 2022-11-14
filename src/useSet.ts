import { useMemo, useState } from 'react';
import { StateInitializer } from './utils';
import { callOrReturn } from './utils/callOrReturn';

/**
 * State preconfigured to do everything you could want with a Set.
 * @param initialState - Iterable or function that returns an iterable of items
 * @returns tuple with the Set and an object with immutable update handlers add/remove/clear
 */
export const useSet = <Value>(
    initialState?: StateInitializer<Iterable<Value>>,
) => {
    const [state, setState] = useState(
        () => new Set<Value>(callOrReturn(initialState)),
    );

    const handlers = useMemo(
        () => ({
            add: (item: Value) => {
                setState((current) => {
                    const newState = new Set(current);
                    newState.add(item);
                    return newState;
                });
            },
            remove: (item: Value) => {
                setState((current) => {
                    const newState = new Set(current);
                    newState.delete(item);
                    return newState;
                });
            },
            clear: () => {
                setState(new Set<Value>());
            },
        }),
        [],
    );

    return [state, handlers] as const;
};

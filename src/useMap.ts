import { useMemo, useState } from 'react';
import { StateInitializer } from './utils';
import { callOrReturn } from './utils/callOrReturn';
import { isDefined } from './utils/isDefined';

/**
 * State preconfigured to do everything you could want with a Map.
 * @param initialState - Object or function that returns an object
 * @returns tuple with the Map and an object with immutable update handlers set/delete/clear
 */
export const useMap = <Key extends string, Value>(
    initialState?: StateInitializer<Record<Key, Value>>,
) => {
    const [state, setState] = useState(
        () =>
            new Map<Key, Value>(
                isDefined(initialState)
                    ? (Object.entries(callOrReturn(initialState)) as [
                          Key,
                          Value,
                      ][])
                    : undefined,
            ),
    );

    const handlers = useMemo(
        () => ({
            replace: (value: Record<Key, Value>) => {
                setState(new Map(Object.entries(value) as [
                    Key,
                    Value,
                ][]))
            },
            set: (key: Key, value: Value) => {
                setState((current) => {
                    const newState = new Map(current);
                    newState.set(key, value);
                    return newState;
                });
            },
            delete: (key: Key) => {
                setState((current) => {
                    const newState = new Map(current);
                    newState.delete(key);
                    return newState;
                });
            },
            clear: () => {
                setState(new Map<Key, Value>());
            },
        }),
        [],
    );

    return [state, handlers] as const;
};

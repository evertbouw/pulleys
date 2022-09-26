import { useRef, useLayoutEffect, useCallback } from 'react';

/**
 * When you have a form and a bunch of handlers,
 * instead of closing over all the values and recreating the handlers too often,
 * pass the form state to this hook to get a referentially stable getter function.
 * Then call this getter in your handlers.
 *
 * @param value - whatever value you want
 * @returns stable reference to a function that will return the value
 */
export const useGetter = <Value>(value: Value): (() => Value) => {
    const ref = useRef(value);

    useLayoutEffect(() => {
        ref.current = value;
    }, [value]);

    return useCallback(() => ref.current, []);
};

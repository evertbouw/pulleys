import { useEffect, useRef } from 'react';

/**
 * Keep a reference to the previous value of a variable
 * @param value - the variable to return the next time this hook is called
 * @returns what the value was before the current render
 */
export const usePrevious = <Value>(value: Value): Value => {
    const valueRef = useRef(value);

    useEffect(() => {
        valueRef.current = value;
    }, [value]);

    return valueRef.current;
};

import { useCallback, useLayoutEffect, useRef } from 'react';
import { Fn } from './utils/Fn';

/**
 * Like the [useEvent RFC](https://github.com/reactjs/rfcs/blob/useevent/text/0000-useevent.md) but implemented in userland as well as it goes.
 * @param func - unstable function
 * @returns stable function reference that will call the input function
 */
export const useEventHandler = <In extends unknown[], Out>(
    func: Fn<In, Out>,
): Fn<In, Out> => {
    const funcRef = useRef(func);

    useLayoutEffect(() => {
        funcRef.current = func;
    }, [func]);

    return useCallback((...args) => funcRef.current(...args), []);
};

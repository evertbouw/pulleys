import { useCallback, useLayoutEffect, useRef } from 'react';
import { useIsRendering } from './useIsRendering';

type Fn<In extends unknown[], Out> = (...data: In) => Out;

/**
 * Like the [useEvent RFC](https://github.com/reactjs/rfcs/blob/useevent/text/0000-useevent.md) but implemented in userland as well as it goes.
 * @param func - unstable function
 * @returns stable function reference that will call the input function
 */
export const useEventHandler = <In extends unknown[], Out>(
    func: Fn<In, Out>,
): Fn<In, Out> => {
    const funcRef = useRef(func);
    const isRenderingRef = useIsRendering();

    useLayoutEffect(() => {
        funcRef.current = func;
    }, [func]);

    return useCallback(
        (...args) => {
            if (isRenderingRef.current)
                throw new Error(
                    'Do not call event handlers during render!',
                );
            return funcRef.current(...args);
        },
        [isRenderingRef],
    );
};

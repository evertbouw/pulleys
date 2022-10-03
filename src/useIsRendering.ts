import { useLayoutEffect, useRef } from 'react';

/**
 * Hacky way to check if React is currently in the rendering phase
 * @returns ref object
 */
export const useIsRendering = () => {
    const ref = useRef(true);
    ref.current = true;

    useLayoutEffect(() => {
        ref.current = false;
    });

    return ref;
};

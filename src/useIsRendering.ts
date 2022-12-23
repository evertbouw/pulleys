import { useLayoutEffect, useRef } from 'react';

/**
 * Hacky way to check if React is currently in the rendering phase
 * @returns ref object
 * @deprecated doesn't work if React bails out of rendering
 */
export const useIsRendering = () => {
    const ref = useRef(true);
    ref.current = true;

    useLayoutEffect(() => {
        ref.current = false;
    });

    return ref;
};

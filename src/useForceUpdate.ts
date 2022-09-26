import { useReducer, type Reducer, useCallback } from 'react';

const reducer: Reducer<number, void> = (x) => (x += 1);

/**
 * Create a function you can call to force the component to update
 *
 * @returns {function} forceUpdate
 */
export const useForceUpdate = (): (() => void) => {
    const [, dispatch] = useReducer(reducer, 0);

    return useCallback(() => {
        dispatch();
    }, []);
};

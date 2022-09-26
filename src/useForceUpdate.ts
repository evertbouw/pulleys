import { useReducer, type Reducer } from 'react';

const reducer: Reducer<number, void> = (x) => (x += 1);

/**
 * Create a function you can call to force the component to update
 *
 * @returns Function that will cause your component to rerender
 */
export const useForceUpdate = (): (() => void) => {
    const [, dispatch] = useReducer(reducer, 0);

    return dispatch;
};

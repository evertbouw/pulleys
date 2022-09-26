import { useMemo, useState } from 'react';

/**
 *
 * @param {bool|function} initializer
 * @returns
 */
export const useBoolean = (initializer: boolean | (() => boolean) = false) => {
    const [state, setState] = useState(initializer);

    const setters = useMemo(
        () => ({
            set: (value: boolean) => {
                setState(value);
            },
            on: () => {
                setState(true);
            },
            off: () => {
                setState(false);
            },
            toggle: () => {
                setState((current) => !current);
            },
        }),
        [],
    );

    return [state, setters] as const;
};

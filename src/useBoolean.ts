import { useMemo, useState } from 'react';
import { StateInitializer } from './utils';

/**
 * State preconfigured to do everything you could want with a boolean value.
 *
 * @param initializer - boolean or function that returns a boolean
 * @returns tuple with current state and an object with state setters
 * @example
 * ```tsx
 * const MyComponent = () => {
 *   const [open, handlers] = useBoolean(false);
 *
 *   return (
 *     <>
 *       <Button onClick={handlers.toggle}>Toggle</Button>
 *       <Button onClick={handlers.on}>Open</Button>
 *       <Button onClick={() => { handlers.set(Math.random() < 0.5); }}>Random</Button>
 *       {open && <Button onClick={handlers.off}>Close</Button>}
 *     </>
 *   );
 * }
 * ```
 */
export const useBoolean = (initializer: StateInitializer<boolean> = false) => {
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

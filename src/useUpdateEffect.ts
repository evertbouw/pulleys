import { useEffect, useRef } from 'react';

/**
 * its the useEffect hook but it skips the first render, making this work like componentDidUpdate
 * taken from the FAQ https://reactjs.org/docs/hooks-faq.html#can-i-run-an-effect-only-on-updates
 *
 * @param effect - the callback
 * @param inputs - array of inputs. Rerun the effect if any of them change
 */
export const useUpdateEffect: typeof useEffect = (
    effect,
    inputs = [],
): void => {
    const ref = useRef(false);

    useEffect(() => {
        if (ref.current) {
            return effect();
        } else {
            ref.current = true;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, inputs.concat(ref.current));
};

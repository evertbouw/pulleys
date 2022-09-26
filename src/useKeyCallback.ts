import { useCallback } from 'react';
import { useEventListener } from './useEventListener';

/**
 * Add a listener for a keydown event on a specific key.
 *
 * @param {string} keyCode the specific key you want to listen to
 * @param {function} callback the function that will be called when the key has been pressed. Receives the keydown event
 * @returns {void}
 * @example
 * useKeyCallback("d", console.log);
 */
export const useKeyCallback = (
    keyCode: string,
    callback: (event: KeyboardEvent) => void,
) => {
    const listener = useCallback(
        (event: KeyboardEvent) => {
            if (event.key === keyCode) {
                callback(event);
            }
        },
        [callback, keyCode],
    );

    useEventListener({
        eventName: 'keydown',
        listener,
    });
};

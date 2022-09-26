import { useEvent } from './useEvent';

const getWindowSize = (): [number, number] =>
    [window.innerWidth, window.innerHeight] as [number, number];

/**
 * Get the width and height of the viewport
 *
 * @returns {Array} dimensions
 */
export const useWindowSize = (): [number, number] =>
    useEvent({
        eventName: 'resize',
        getValue: getWindowSize,
        initialState: getWindowSize,
    });

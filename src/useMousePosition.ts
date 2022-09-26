import { useEvent } from './useEvent';

const getValue = ({ clientX, clientY }: MouseEvent) =>
    [clientX, clientY] as [number, number];

const initialState = () =>
    [window.innerWidth / 2, window.innerHeight / 2] as [number, number];

/**
 * Get the X and Y coordinates of the mouse cursor
 *
 * @returns {Array} coordinates
 */
export const useMousePosition = (): [number, number] =>
    useEvent({
        eventName: 'mousemove',
        getValue,
        initialState,
    });

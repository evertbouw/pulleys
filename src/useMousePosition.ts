import { useEvent } from './useEvent';

const getValue = ({ clientX, clientY }: MouseEvent) =>
    [clientX, clientY] as [number, number];

const initialState = () =>
    [window.innerWidth / 2, window.innerHeight / 2] as [number, number];

/**
 * Get the X and Y coordinates of the mouse cursor
 *
 * @returns Tuple with X and Y coordinates
 * @example
 * ```tsx
 * const MyComponent = () => {
 *   const [x, y] = useMousePosition();
 *   return <div>Mouse is at [{x}, {y}]</div>
 * }
 * ```
 */
export const useMousePosition = (): [number, number] =>
    useEvent({
        eventName: 'mousemove',
        getValue,
        initialState,
    });

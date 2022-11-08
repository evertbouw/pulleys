import { useEvent } from './useEvent';

type Coordinates = readonly [number, number];

const getValue = ({ clientX, clientY }: MouseEvent) =>
    [clientX, clientY] as Coordinates;

const initialState = () =>
    [window.innerWidth / 2, window.innerHeight / 2] as Coordinates;

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
export const useMousePosition = (): Coordinates =>
    useEvent({
        eventName: 'mousemove',
        getValue,
        initialState,
    });

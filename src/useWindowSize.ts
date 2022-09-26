import { useEvent } from './useEvent';

const getWindowSize = (): [number, number] =>
    [window.innerWidth, window.innerHeight] as [number, number];

/**
 * Get the width and height of the viewport
 *
 * @returns Tuple with width and height integers
 * @example
 * ```tsx
 * const MyComponent = () => {
 *   const [width, height] = useWindowSize();
 *   return <div>Window is {width} by {height}</div>
 * }
 * ```
 */
export const useWindowSize = (): [number, number] =>
    useEvent({
        eventName: 'resize',
        getValue: getWindowSize,
        initialState: getWindowSize,
    });

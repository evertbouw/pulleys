import { useEvent } from './useEvent';

/** an array with X and Y dimensions */
export type Dimensions = readonly [number, number];

const getWindowSize = () =>
    [window.innerWidth, window.innerHeight] as Dimensions;

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
export const useWindowSize = (): Dimensions =>
    useEvent({
        eventName: 'resize',
        getValue: getWindowSize,
        initialState: getWindowSize,
    });

import { useEvent } from './useEvent';

type WindowSize = readonly [number, number];

const getWindowSize = () => [window.innerWidth, window.innerHeight] as WindowSize;

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
export const useWindowSize = (): WindowSize =>
    useEvent({
        eventName: 'resize',
        getValue: getWindowSize,
        initialState: getWindowSize,
    });

import { useEffect } from 'react';
import { useGetter } from './useGetter';

/**
 * Call the provided function on every animation frame.
 *
 * @param tick - function to be called every tick
 * @param running - pause the loop by passing `false`
 * @example
 * ```tsx
 * import { useAnimationFrame } from "@evertbouw/pulleys";
 *
 * const SomeComponent = () => {
 *   const [number, setNumber] = useState(0);
 *
 *   // no need to memoize
 *   const animate = () => {
 *     setNumber(cur => cur + 1);
 *   };
 *
 *   useAnimationFrame(
 *     animate,        // call this function every frame
 *     number < 100,   // until number is 100
 *   );
 *
 *   return <div>{number}</div>;
 * };
 * ```
 */
export const useAnimationFrame = (tick: () => void, running = true): void => {
    const getTick = useGetter(tick);

    useEffect(() => {
        let frameId: number;

        const loop = () => {
            if (running) {
                getTick()();
                frameId = requestAnimationFrame(loop);
            }
        };

        frameId = requestAnimationFrame(loop);

        return () => {
            cancelAnimationFrame(frameId);
        };
    }, [getTick, running]);
};

import { useEffect } from "react";

/**
 * Call the provided function on every animation frame.
 * Can be paused or stopped by passing `false` as a second parameter.
 *
 * @param {function} tick
 * @param {boolean} [running=true]
 * @returns {void}
 * @example
 * import { useAnimationFrame } from " @evertbouw/pulleys";
 *
 * const SomeComponent = () => {
 *   const [number, setNumber] = useState(0);
 *
 *   const animate = useCallback(() => {
 *     setNumber(cur => cur + 1);
 *   }, []);
 *
 *   useAnimationFrame(
 *     animate,        // call this function every frame
 *     number < 100,   // until number is 100 or higher
 *   );
 *
 *   return <div>{number}</div>;
 * };
 */
export const useAnimationFrame = (
  tick: () => void,
  running: boolean = true
): void => {
  useEffect(() => {
    let frameId: number;

    const loop = () => {
      if (running) {
        tick();
        frameId = requestAnimationFrame(loop);
      }
    };

    frameId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [tick, running]);
};

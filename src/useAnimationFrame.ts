import { useEffect } from "react";

export const useAnimationFrame = (tick: () => void, running: boolean) => {
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

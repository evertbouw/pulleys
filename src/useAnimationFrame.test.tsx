import { renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useAnimationFrame } from './useAnimationFrame';

describe('useAnimationFrame', () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('works', () => {
        const callback = vi.fn();
        renderHook(() => useAnimationFrame(callback));

        vi.advanceTimersByTime(100);

        expect(callback).toHaveBeenCalledTimes(6);
    });

    it('cancels', () => {
        const callback = vi.fn();
        let running = true;
        const { rerender } = renderHook(() =>
            useAnimationFrame(callback, running),
        );

        running = false;
        rerender();
        vi.advanceTimersByTime(100);

        expect(callback).not.toHaveBeenCalled();
    });
});

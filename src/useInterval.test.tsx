import { renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useInterval } from './useInterval';

describe('useInterval', () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('works', () => {
        expect.assertions(1);
        const callback = vi.fn();
        renderHook(() => useInterval(callback, 1));

        vi.advanceTimersByTime(5);

        expect(callback).toBeCalledTimes(5);
    });

    it('handles no delay correctly', () => {
        expect.assertions(1);
        const callback = vi.fn();
        renderHook(() => useInterval(callback, null));

        vi.advanceTimersByTime(5);

        expect(callback).toBeCalledTimes(0);
    });

    it('handles rerendering', () => {
        expect.assertions(2);
        let delay = 1;
        const callback = vi.fn();
        const { rerender } = renderHook(() => useInterval(callback, delay));

        vi.advanceTimersByTime(5);
        delay++;
        rerender();

        expect(callback).toBeCalledTimes(5);

        vi.advanceTimersByTime(5);

        expect(callback).toBeCalledTimes(7);
    });

    it('handles cleanup', () => {
        expect.assertions(1);
        let delay = 1;
        const cleanup = vi.fn();
        const callback = vi.fn().mockImplementation(() => cleanup);
        const { rerender } = renderHook(() => useInterval(callback, delay));

        vi.advanceTimersByTime(5);
        delay++;
        rerender();

        expect(cleanup).toBeCalledTimes(1);
    });
});

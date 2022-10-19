import { renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useThrottle } from './useThrottle';

describe('useThrottle', () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('works', () => {
        const fn = vi.fn();
        const {
            result: { current },
        } = renderHook(() => useThrottle(fn, 500));

        current();

        vi.advanceTimersByTime(50);

        current();

        vi.advanceTimersByTime(50);

        current();

        vi.advanceTimersByTime(500);

        current();

        vi.advanceTimersByTime(50);

        current();

        vi.advanceTimersByTime(500);

        current();

        expect(fn).toHaveBeenCalledTimes(3);
    });
});

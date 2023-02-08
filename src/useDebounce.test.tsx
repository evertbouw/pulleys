import { renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useDebounce } from './useDebounce';

describe('useDebounce', () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('works', () => {
        expect.assertions(4);
        const fn = vi.fn();
        const {
            result: { current },
        } = renderHook(() => useDebounce(fn, 100));

        current(1);

        vi.advanceTimersByTime(50);

        current(2);

        vi.advanceTimersByTime(50);

        current(3);

        vi.advanceTimersByTime(100);

        expect(fn).toHaveBeenCalledWith(3);
        expect(fn).toHaveBeenCalledTimes(1);

        current(4);

        vi.advanceTimersByTime(50);

        current(5);

        vi.advanceTimersByTime(100);

        current(6);

        expect(fn).toHaveBeenCalledWith(5);
        expect(fn).toHaveBeenCalledTimes(2);
    });
});

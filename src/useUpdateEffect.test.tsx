import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useUpdateEffect } from './useUpdateEffect';

describe('useUpdateEffect', () => {
    it('works', () => {
        expect.assertions(3);
        const effect = vi.fn();

        const { rerender } = renderHook(() => useUpdateEffect(effect));
        expect(effect).not.toHaveBeenCalled();
        rerender();
        expect(effect).toHaveBeenCalledOnce();
        rerender();
        expect(effect).toHaveBeenCalledOnce();
    });

    it('works with cleanup', () => {
        expect.assertions(4);
        const cleanup = vi.fn();
        const effect = vi.fn().mockImplementation(() => cleanup);
        let count = 0;
        const { rerender } = renderHook(() => useUpdateEffect(effect, [count]));
        expect(effect).not.toHaveBeenCalled();
        rerender();
        expect(effect).toHaveBeenCalledOnce();
        count++;
        rerender();
        expect(effect).toHaveBeenCalledTimes(2);
        expect(cleanup).toHaveBeenCalledOnce();
    });
});

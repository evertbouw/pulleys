import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useUpdateEffect } from './useUpdateEffect';

describe('useUpdateEffect', () => {
    it('works', () => {
        const cleanup = vi.fn();
        const effect = vi.fn().mockImplementation(() => cleanup);
        let count = 0;
        const { rerender } = renderHook(() => useUpdateEffect(effect, [count]));
        expect(effect).not.toHaveBeenCalled();
        rerender();
        expect(effect).toHaveBeenCalledOnce();
        count++;
        rerender();
        expect(cleanup).toHaveBeenCalledOnce();
    });
});

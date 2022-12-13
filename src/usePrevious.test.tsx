import { describe, expect, it } from 'vitest';
import { renderHook } from '@testing-library/react';
import { usePrevious } from './usePrevious';

describe('usePrevious', () => {
    it('works', () => {
        const { rerender, result } = renderHook(usePrevious, {
            initialProps: 5,
        });

        expect(result.current).toBe(5);

        rerender(10);

        expect(result.current).toBe(5);

        rerender(15);

        expect(result.current).toBe(10);
    });
});

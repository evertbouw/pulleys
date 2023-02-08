import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useCache } from './useCache';

describe('useCache', () => {
    it('returns the same object in multiple calls', () => {
        expect.assertions(1);

        const { result: firstResult } = renderHook(() =>
            useCache(() => ({ foo: 'bar' }), ['foo']),
        );

        const { result: secondResult } = renderHook(() =>
            useCache(() => ({ foo: 'bar' }), ['foo']),
        );

        expect(firstResult.current).toBe(secondResult.current);
    });
});

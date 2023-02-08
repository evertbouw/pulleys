import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useGetter } from './useGetter';

describe('useGetter', () => {
    it('works', () => {
        expect.assertions(1);
        const foo = Symbol('foo');

        const { result } = renderHook(() => useGetter(foo));

        expect(result.current()).toBe(foo);
    });
});

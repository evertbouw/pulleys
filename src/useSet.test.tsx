import { renderHook } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { describe, expect, it } from 'vitest';
import { useSet } from './useSet';

describe('useSet', () => {
    it('works', () => {
        expect.assertions(8);
        const { result } = renderHook(() => useSet());

        let [value, handlers] = result.current;
        expect(value).toBeInstanceOf(Set);

        act(() => handlers.add('foo'));
        [value, handlers] = result.current;
        expect(value.has('foo')).toBe(true);
        expect(value.size).toBe(1);

        act(() => handlers.remove('foo'));
        [value, handlers] = result.current;
        expect(value.has('foo')).toBe(false);
        expect(value.size).toBe(0);

        act(() => handlers.add('foo'));
        act(() => handlers.add('bar'));
        [value, handlers] = result.current;
        expect(value.size).toBe(2);

        act(() => handlers.replace(['asdf', 'ghjk', 'zxcv']));
        [value, handlers] = result.current;
        expect(value.size).toBe(3);

        act(() => handlers.clear());
        [value, handlers] = result.current;
        expect(value.size).toBe(0);
    });

    it('defaults', () => {
        expect.assertions(2);
        const { result } = renderHook(() => useSet(() => ['foo']));

        const [value] = result.current;

        expect(value.size).toBe(1);
        expect(value.has('foo')).toBe(true);
    });
});

import { renderHook } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { describe, expect, it } from 'vitest';
import { useMap } from './useMap';

describe('useMap', () => {
    it('works', () => {
        expect.assertions(8);
        const { result } = renderHook(() => useMap());

        let [value, handlers] = result.current;
        expect(value).toBeInstanceOf(Map);

        act(() => handlers.set('foo', 'bar'));
        [value, handlers] = result.current;
        expect(value.get('foo')).toBe('bar');
        expect(value.size).toBe(1);

        act(() => handlers.delete('foo'));
        [value, handlers] = result.current;
        expect(value.has('foo')).toBe(false);
        expect(value.size).toBe(0);

        act(() => handlers.set('foo', 1));
        act(() => handlers.set('bar', 2));
        [value, handlers] = result.current;
        expect(value.size).toBe(2);

        act(() => handlers.replace({ asdf: 'ghji' }));
        [value, handlers] = result.current;
        expect(value.size).toBe(1);

        act(() => handlers.clear());
        [value, handlers] = result.current;
        expect(value.size).toBe(0);
    });

    it('defaults', () => {
        expect.assertions(2);
        const { result } = renderHook(() => useMap(() => ({ foo: 1 })));

        const [value] = result.current;

        expect(value.size).toBe(1);
        expect(value.has('foo')).toBe(true);
    });
});

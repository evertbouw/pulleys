import { renderHook, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useWindowSize } from './useWindowSize';

describe('useWindowSize', () => {
    it('works', () => {
        const { result } = renderHook(() => useWindowSize());

        expect(result.current).toEqual([1024, 768]);

        fireEvent.resize(
            Object.assign(window, {
                innerWidth: 800,
                innerHeight: 600,
            }),
        );

        expect(result.current).toEqual([800, 600]);
    });
});

import { renderHook, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useMousePosition } from './useMousePosition';

describe('useMousePosition', () => {
    it('works', async () => {
        const { result } = renderHook(() => useMousePosition());

        expect(result.current).toEqual([512, 384]);

        fireEvent.mouseMove(window, { clientX: 200, clientY: 100 });

        expect(result.current).toEqual([200, 100]);
    });
});

import { renderHook } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { describe, it, expect, vi } from 'vitest';
import { useMediaQuery } from './useMediaQuery';

describe('useMediaQuery', () => {
    it('works', () => {
        expect.assertions(2);
        let eventListener: (data: Record<string, unknown>) => void;
        window.matchMedia = vi.fn().mockImplementation(() => ({
            addEventListener: vi
                .fn()
                .mockImplementation((_eventName, listener) => {
                    eventListener = listener;
                }),
            removeEventListener: vi.fn(),
            matches: false,
        }));

        const { result } = renderHook(() =>
            useMediaQuery('(max-width: 1250px)'),
        );
        expect(result.current).toBe(false);

        act(() => {
            eventListener({ matches: true });
        });

        expect(result.current).toBe(true);
    });
});

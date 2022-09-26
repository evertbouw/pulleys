import { renderHook } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { describe, expect, it, vi } from 'vitest';
import { usePrompt, listener } from './usePrompt';

describe('usePrompt', () => {
    it('works', () => {
        renderHook(() => usePrompt(true));

        act(() => {
            window.close();
        });

        expect(window).toBeDefined();
    });

    it('calls prevent default and sets empty message', () => {
        const mockPreventDefault = vi.fn();
        const mockEvent = {
            preventDefault: mockPreventDefault,
            returnValue: 'foo',
        } as never as BeforeUnloadEvent;
        listener(mockEvent);
        expect(mockPreventDefault).toHaveBeenCalledOnce();
        expect(mockEvent.returnValue).toBe('');
    });
});

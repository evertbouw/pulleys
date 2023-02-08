import { renderHook } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { useEvent } from './useEvent';

describe('useEvent', () => {
    it('works', async () => {
        expect.assertions(3);
        const user = userEvent.setup();
        const eventName = 'click';
        const getValue = vi.fn((e: MouseEvent) => e.clientX);
        const initialState = 0;

        const { result } = renderHook(() =>
            useEvent({
                eventName,
                getValue,
                initialState,
            }),
        );

        expect(result.current).toBe(initialState);

        user.pointer([{ coords: { clientX: 50 } }]);

        await user.click(document.body);

        expect(getValue).toHaveBeenCalledTimes(1);

        expect(result.current).toBe(50);
    });

    it('accepts elements', async () => {
        expect.assertions(3);
        const user = userEvent.setup();
        const eventName = 'click';
        const getValue = vi.fn(
            (e: MouseEvent) => (e.target as HTMLButtonElement).name,
        );
        const initialState = 'foo';
        const target = document.createElement('button');
        target.name = 'bar';

        const { result } = renderHook(() =>
            useEvent({
                target,
                eventName,
                getValue,
                initialState,
            }),
        );

        expect(result.current).toBe(initialState);

        await user.click(target);

        expect(getValue).toHaveBeenCalledTimes(1);

        expect(result.current).toBe(target.name);
    });
});

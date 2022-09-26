import userEvent from '@testing-library/user-event';
import { renderHook } from '@testing-library/react';
import { useEventListener } from './useEventListener';
import { describe, it, expect, vi } from 'vitest';

describe('useEventListener', () => {
    it('works', async () => {
        const user = userEvent.setup();
        const listener = vi.fn();

        renderHook(() =>
            useEventListener({
                eventName: 'click',
                listener,
            }),
        );

        await user.click(document.body);

        expect(listener).toHaveBeenCalledTimes(1);
    });

    it('can be toggled', async () => {
        const user = userEvent.setup();
        const listener = vi.fn();

        const { rerender } = renderHook(
            (active: boolean) =>
                useEventListener({
                    eventName: 'click',
                    listener,
                    active,
                }),
            { initialProps: false },
        );
        await user.click(document.body);
        expect(listener).toHaveBeenCalledTimes(0);

        rerender(true);
        await user.click(document.body);
        expect(listener).toHaveBeenCalledTimes(1);

        rerender(false);
        await user.click(document.body);
        expect(listener).toHaveBeenCalledTimes(1);
    });

    it('accepts elements', async () => {
        const user = userEvent.setup();
        const listener = vi.fn((e: MouseEvent) => {
            expect((e.currentTarget as Element).tagName).toBe('BUTTON');
        });

        const target = document.createElement('button');

        renderHook(() =>
            useEventListener({
                target,
                eventName: 'click',
                listener,
            }),
        );

        await user.click(target);

        expect(listener).toHaveBeenCalledOnce();
    });
});

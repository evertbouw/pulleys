import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { useEventHandler } from './useEventHandler';

describe('useEventHandler', () => {
    it('should throw error during render', () => {
        const MockComponent = () => {
            const foo = useEventHandler(vi.fn());
            try {
                foo();
            } catch (error: unknown) {
                expect((error as Error).message).toBe(
                    'Do not call event handlers during render!',
                );
            }
            return null;
        };

        render(<MockComponent />);
    });

    it('should not throw error when used as callback', async () => {
        const user = userEvent.setup();
        const handler = vi.fn();
        const MockComponent = () => {
            const foo = useEventHandler<never, void>(handler);

            return (
                <button type="button" onClick={foo}>
                    foo
                </button>
            );
        };

        render(<MockComponent />);

        await user.click(screen.getByText('foo'));

        expect(handler).toHaveBeenCalledOnce();
    });
});

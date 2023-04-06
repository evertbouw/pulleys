import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRef } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { useClickOutside } from './useClickOutside';

describe('useClickOutside', () => {
    afterEach(cleanup);

    it('should work', async () => {
        const user = userEvent.setup();
        expect.assertions(2);
        const callback = vi.fn();

        const MockComponent = () => {
            const innerElementRef = useClickOutside<HTMLDivElement>(callback);

            return (
                <div ref={innerElementRef}>
                    <span>foo</span>
                </div>
            );
        };

        render(<MockComponent />);

        await user.click(screen.getByText('foo'));

        expect(callback).toHaveBeenCalledTimes(0);

        await user.click(document.body);

        expect(callback).toHaveBeenCalledTimes(1);
    });

    it('should accept outer boundary', async () => {
        const user = userEvent.setup();
        expect.assertions(3);
        const callback = vi.fn();

        const MockComponent = () => {
            const innerElementRef = useRef<HTMLDivElement>(null);
            const outerElementRef = useRef<HTMLDivElement>(null);

            useClickOutside(callback, {
                innerElementRef,
                outerElementRef,
            });

            return (
                <div ref={outerElementRef}>
                    <span>bar</span>
                    <div ref={innerElementRef}>
                        <span>foo</span>
                    </div>
                </div>
            );
        };

        const { rerender } = render(<MockComponent />);

        rerender(<MockComponent />);

        await user.click(screen.getByText('foo'));

        expect(callback).toHaveBeenCalledTimes(0);

        await user.click(document.body);

        expect(callback).toHaveBeenCalledTimes(0);

        await user.click(screen.getByText('bar'));

        expect(callback).toHaveBeenCalledTimes(1);
    });
});

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRef } from 'react';
import { describe, expect, it } from 'vitest';
import { useForceUpdate } from './useForceUpdate';

describe('useForceUpdate', () => {
    it('works', async () => {
        expect.assertions(4);
        const user = userEvent.setup();
        const MockComponent = () => {
            const state = useRef(0);
            const forceUpdate = useForceUpdate();

            return (
                <button
                    type="button"
                    onClick={() => {
                        state.current++;
                        forceUpdate();
                    }}
                >
                    {state.current}
                </button>
            );
        };
        render(<MockComponent />);

        expect(screen.getByText('0')).toBeDefined();
        await user.click(screen.getByText('0'));
        expect(screen.getByText('1')).toBeDefined();
        await user.click(screen.getByText('1'));
        expect(screen.getByText('2')).toBeDefined();
        await user.click(screen.getByText('2'));
        expect(screen.getByText('3')).toBeDefined();
    });
});

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRef } from 'react';
import { describe, it } from 'vitest';
import { useForceUpdate } from './useForceUpdate';

describe('useForceUpdate', () => {
    it('works', async () => {
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

        await user.click(screen.getByText('0'));
        await user.click(screen.getByText('1'));
        await user.click(screen.getByText('2'));
    });
});

import { renderHook } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { useKeyCallback } from './useKeyCallback';

describe('useKeyCallback', () => {
    it('works', async () => {
        const user = userEvent.setup();
        const callback = vi.fn();
        renderHook(() => useKeyCallback('f', callback));

        await user.keyboard('f');
        await user.keyboard('e');

        expect(callback).toHaveBeenCalledOnce();
    });
});

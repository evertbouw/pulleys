import { renderHook } from '@testing-library/react';
import { createContext } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { createSafeContextHook } from './createSafeContextHook';

describe('createSafeContextHook', () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('works', () => {
        vi.spyOn(console, 'error').mockImplementation(() => {
            // not empty
        });

        const myContext = createContext(undefined);
        const useMyContext = createSafeContextHook(myContext);

        expect(() => {
            renderHook(() => useMyContext());
        }).toThrowError('Context was used without a provider');
    });

    it('works', () => {
        const myContext = createContext<string | undefined>(undefined);
        const useMyContext = createSafeContextHook(myContext);

        expect(() => {
            renderHook(() => useMyContext(), {
                wrapper: ({ children }) => (
                    <myContext.Provider value="foo">
                        {children}
                    </myContext.Provider>
                ),
            });
        }).not.toThrowError('Context was used without a provider');
    });
});

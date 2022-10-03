import { renderHook } from '@testing-library/react';
import { createContext } from 'react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { createSafeContextHook } from './createSafeContextHook';

let _console_error: typeof console.error;

describe('createSafeContextHook', () => {
    beforeEach(() => {
        _console_error = console.error;
        console.error = () => {
            // not empty
        };
    });

    afterEach(() => {
        console.error = _console_error;
    });

    it('works', () => {
        const myContext = createContext(undefined);
        const useMyContext = createSafeContextHook(myContext);

        expect(() => {
            renderHook(() => useMyContext());
        }).toThrowError('Context was used without a provider');
    });

    it('works', () => {
        const myContext = createContext<string|undefined>(undefined);
        const useMyContext = createSafeContextHook(myContext);

        expect(() => {
            renderHook(() => useMyContext(), { wrapper: ({ children }) => <myContext.Provider value="foo">{ children }</myContext.Provider> });
        }).not.toThrowError('Context was used without a provider');
    });
});

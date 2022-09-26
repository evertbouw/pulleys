import { useMemo } from 'react';
import { useEvent } from './useEvent';

const getValue = (event: MediaQueryListEvent): boolean => event.matches;

/**
 * Test a media query
 *
 * @param {string} query
 * @returns {boolean} matches
 */
export const useMediaQuery = (query: string): boolean => {
    const target = useMemo(() => window.matchMedia(query), [query]);

    return useEvent({
        target,
        eventName: 'change',
        getValue,
        initialState: target.matches,
    });
};

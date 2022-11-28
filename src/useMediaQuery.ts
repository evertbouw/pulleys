import { useCache } from './useCache';
import { useEvent } from './useEvent';

const getValue = (event: MediaQueryListEvent): boolean => event.matches;

/**
 * Test a media query
 *
 * @param query - The media query to test
 * @returns Boolean indicating if the query currently matches
 * @example
 * ```tsx
 * const MyComponent = () => {
 *   const screenIsSmall = useMediaQuery('(max-width: 800px)');
 *   return <div>{screenIsSmall ? "small screen" : "big screen"}</div>
 * }
 * ```
 */
export const useMediaQuery = (query: string): boolean => {
    const target = useCache(() => window.matchMedia(query), ['useMediaQuery', query]);

    return useEvent({
        target,
        eventName: 'change',
        getValue,
        initialState: target.matches,
    });
};

import { useContext } from 'react';
import { invariant } from './invariant';
import { isDefined } from './isDefined';

/**
 * Create a context consumer hook for contexts that are nullish by default
 * @param context - what you get by calling React.createContext
 * @param displayName - override the displayName for use in dev tools and the thrown error message
 * @returns the context value with the nullish type removed
 */
export const createSafeContextHook =
    <Value>(
        context: React.Context<Value | undefined>,
        displayName = context.displayName ?? 'Context',
    ) =>
    (): Value => {
        const value = useContext(context);

        invariant(
            isDefined(value),
            `${displayName} was used without a provider`,
        );

        return value;
    };

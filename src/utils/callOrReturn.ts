import { StateInitializer } from './StateInitializer';

export const callOrReturn = <Value>(
    stateInitializer: StateInitializer<Value>,
): Value =>
    {
        return typeof stateInitializer === 'function'
            // @ts-expect-error ignore this
            ? stateInitializer()
            : stateInitializer;
    };


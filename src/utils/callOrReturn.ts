import { StateInitializer } from './StateInitializer';

const isCallable = <Value>(
    stateInitializer: StateInitializer<Value>,
): stateInitializer is () => Value => typeof stateInitializer === 'function';

export const callOrReturn = <Value>(
    stateInitializer: StateInitializer<Value>,
): Value =>
    isCallable(stateInitializer) ? stateInitializer() : stateInitializer;

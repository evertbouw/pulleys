
/**
 * States can be initialized with a value or function that returns a value
 */
export type StateInitializer<Value> = Value | (() => Value);

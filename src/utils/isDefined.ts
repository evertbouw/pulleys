export const isDefined = <Value>(value: Value): value is NonNullable<Value> => value != null;

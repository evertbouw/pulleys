export function invariant(
    condition: boolean,
    message = 'Invariant violation',
): asserts condition {
    if (!condition) throw new Error(message);
}

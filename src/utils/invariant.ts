type Invariant = (condition: unknown, message: string) => asserts condition;

export const invariant: Invariant = (condition, message = 'Invariant violation') => {
    if (!condition) throw new Error(message);
}

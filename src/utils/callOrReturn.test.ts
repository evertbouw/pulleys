import { expect, test } from 'vitest';
import { callOrReturn } from './callOrReturn';

test('callOrReturn', () => {
  expect(callOrReturn(42)).toBe(42);

  expect(callOrReturn(() => 42)).toBe(42);
});

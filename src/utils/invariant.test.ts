import { expect, test } from 'vitest';
import { invariant } from './invariant';

test('invariant', () => {
  expect(() => {
    invariant(false);
  }).toThrowError('Invariant Violation');

  expect(() => {
    invariant(false, 'wrong');
  }).toThrowError('wrong');

  expect(() => {
    invariant(true);
  }).not.toThrowError();
});

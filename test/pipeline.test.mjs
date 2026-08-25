import assert from 'node:assert/strict';
import test from 'node:test';

import {
  filter,
  map,
  pipe,
  pipeAsync,
  tap,
  tapAsync,
} from '../src/index.mjs';

test('composes synchronous transformations from left to right', () => {
  const observed = [];
  const result = pipe(
    [1, 2, 3, 4],
    filter((value) => value % 2 === 0),
    tap((values) => observed.push([...values])),
    map((value) => value * 10),
  );
  assert.deepEqual(result, [20, 40]);
  assert.deepEqual(observed, [[2, 4]]);
});

test('awaits values, steps, and side effects in order', async () => {
  const observed = [];
  const result = await pipeAsync(
    Promise.resolve(3),
    async (value) => value + 2,
    tapAsync(async (value) => observed.push(value)),
    (value) => value * 4,
  );
  assert.equal(result, 20);
  assert.deepEqual(observed, [5]);
});

test('identifies the invalid pipeline step', async () => {
  assert.throws(() => pipe('value', (value) => value, null), /step 2/);
  await assert.rejects(pipeAsync('value', undefined), /step 1/);
});

test('propagates exceptions without fallback or mutation', () => {
  const input = Object.freeze({ count: 1 });
  assert.throws(
    () => pipe(input, () => { throw new Error('stop'); }),
    /stop/,
  );
  assert.deepEqual(input, { count: 1 });
});

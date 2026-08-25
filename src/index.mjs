function assertStep(step, index) {
  if (typeof step !== 'function') {
    throw new TypeError(`pipeline step ${index + 1} must be a function`);
  }
}

export function pipe(value, ...steps) {
  return steps.reduce((current, step, index) => {
    assertStep(step, index);
    return step(current);
  }, value);
}

export async function pipeAsync(value, ...steps) {
  let current = await value;
  for (const [index, step] of steps.entries()) {
    assertStep(step, index);
    current = await step(current);
  }
  return current;
}

export function tap(effect) {
  assertStep(effect, 0);
  return (value) => {
    effect(value);
    return value;
  };
}

export function tapAsync(effect) {
  assertStep(effect, 0);
  return async (value) => {
    await effect(value);
    return value;
  };
}

export function map(transform) {
  assertStep(transform, 0);
  return (values) => values.map(transform);
}

export function filter(predicate) {
  assertStep(predicate, 0);
  return (values) => values.filter(predicate);
}

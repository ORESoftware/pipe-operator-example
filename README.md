# pipe-operator-example

A dependency-free, executable explanation of left-to-right JavaScript data
pipelines. It provides synchronous and asynchronous composition, reusable
`map`/`filter` transforms, and transparent `tap` side effects.

```js
import { filter, map, pipe } from '@oresoftware/pipe-operator-example';

const result = pipe(
  [1, 2, 3, 4],
  filter((value) => value % 2 === 0),
  map((value) => value * 10),
);
// [20, 40]
```

The TC39 `|>` operator remains proposal syntax and requires parser/toolchain
support. This repository deliberately keeps its runnable contract on standard
JavaScript functions while showing the same evaluation order. There is no
implicit retry, fallback, or error recovery: a failing step stops the pipeline.

## Run

```sh
npm test
npm run example
npm pack --dry-run --json
```

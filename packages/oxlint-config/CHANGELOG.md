# @ithinku/oxlint-config

## 0.0.3

### Patch Changes

- e3b090c: Fix type declarations to use `Required<...>` so config fields are non-optional (e.g. `ignorePatterns: string[]` instead of `string[] | undefined`). Resolves TS2488 when iterating or spreading config arrays in `*.config.ts`.

## 0.0.2

### Patch Changes

- 45e931d: Add a JS (ESM) entry (`index.mjs`) and type declarations (`index.d.ts`) to both config packages. Consumers can now `import ithinku from '@ithinku/oxlint-config'` / `'@ithinku/oxfmt-config'` inside `oxlint.config.ts` / `oxfmt.config.ts`, resolved by Node's module resolution — no more hardcoded `node_modules/...` paths. The existing `index.json` and `-c` / `extends` consumption paths are unchanged (backward compatible).

## 0.0.1

### Patch Changes

- 562f65b: Add new package `@ithinku/oxlint-config` — a standalone, ESLint-free Oxlint configuration built on Oxlint's built-in plugins (`oxc`, `typescript`, `unicorn`), with `correctness` as errors and `suspicious`/`perf` as warnings, test-file overrides for `jest`/`vitest`, and `reportUnusedDisableDirectives` enabled.

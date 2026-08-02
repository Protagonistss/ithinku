# @ithinku/oxfmt-config

## 0.1.2

### Patch Changes

- e3b090c: Fix type declarations to use `Required<...>` so config fields are non-optional (e.g. `ignorePatterns: string[]` instead of `string[] | undefined`). Resolves TS2488 when iterating or spreading config arrays in `*.config.ts`.

## 0.1.1

### Patch Changes

- 45e931d: Add a JS (ESM) entry (`index.mjs`) and type declarations (`index.d.ts`) to both config packages. Consumers can now `import ithinku from '@ithinku/oxlint-config'` / `'@ithinku/oxfmt-config'` inside `oxlint.config.ts` / `oxfmt.config.ts`, resolved by Node's module resolution — no more hardcoded `node_modules/...` paths. The existing `index.json` and `-c` / `extends` consumption paths are unchanged (backward compatible).

## 0.1.0

### Minor Changes

- 776a940: Breaking: change default formatting style to no semicolons and no trailing commas (`semi: false`, `trailingComma: "none"`), single quotes kept. This changes formatter output.

## 0.0.1

### Patch Changes

- 1c9505d: Add new package `@ithinku/oxfmt-config` — a standalone oxfmt formatter configuration built on oxfmt's own capabilities (printWidth 100, single quotes, trailing commas, etc.), with oxfmt-exclusive `sortImports` and `sortPackageJson` enabled. Note: oxfmt does not support `extends`, so the package is consumed via `oxfmt -c`.

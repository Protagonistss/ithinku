---
"@ithinku/oxlint-config": patch
"@ithinku/oxfmt-config": patch
---

Fix type declarations to use `Required<...>` so config fields are non-optional (e.g. `ignorePatterns: string[]` instead of `string[] | undefined`). Resolves TS2488 when iterating or spreading config arrays in `*.config.ts`.

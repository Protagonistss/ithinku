---
"@ithinku/oxlint-config": patch
"@ithinku/oxfmt-config": patch
---

Add a JS (ESM) entry (`index.mjs`) and type declarations (`index.d.ts`) to both config packages. Consumers can now `import ithinku from '@ithinku/oxlint-config'` / `'@ithinku/oxfmt-config'` inside `oxlint.config.ts` / `oxfmt.config.ts`, resolved by Node's module resolution — no more hardcoded `node_modules/...` paths. Type declarations use `Required<...>` so every field the JSON provides is non-optional (e.g. `ignorePatterns: string[]`, not `string[] | undefined`), avoiding spurious undefined errors when iterating or spreading. The existing `index.json` and `-c` / `extends` consumption paths are unchanged (backward compatible).

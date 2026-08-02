# @ithinku/oxlint-config

A shareable [Oxlint](https://oxc.rs/) configuration for modern JavaScript / TypeScript projects.

Built purely on Oxlint's own capabilities — it does **not** depend on ESLint or any ESLint plugin. Use it standalone, or as a fast first-pass linter alongside `@ithinku/eslint-config-*` for deeper (type-aware / framework-specific) rules.

> ℹ️ Oxlint's `.oxlintrc.json` `extends` only resolves **file paths**, not npm package names (ESLint-style shareable configs are not supported there). To consume this package by name — the way you would an ESLint config — use `oxlint.config.ts` with `import` (recommended below). The JSON + `extends` path form is kept as a fallback for projects that don't use a TS config.

## Requirements

- [`oxlint`](https://www.npmjs.com/package/oxlint) `>=1.0.0` (latest recommended)
- Oxlint itself requires Node.js `^20.19.0 || >=22.12.0`. If your project pins an older Node (e.g. via `.nvmrc`), bump it to `v20.19+` or `v22+` before running Oxlint.

## Install

```bash
# pnpm
pnpm add -D oxlint @ithinku/oxlint-config

# npm
npm install -D oxlint @ithinku/oxlint-config
```

## Usage

Pick **one** of the following. Option 1 is recommended.

### 1. `oxlint.config.ts` with `import` (recommended)

The modern, idiomatic way. Oxlint auto-discovers `oxlint.config.ts`, so no `-c` flag is needed. The config is imported by package name (resolved by Node), fully typed, and easy to override.

```ts
// oxlint.config.ts
import { defineConfig } from 'oxlint'
import ithinku from '@ithinku/oxlint-config'

export default defineConfig({
  extends: [ithinku],
  // rules: { 'no-console': 'warn' } // your overrides
})
```

Then run:

```bash
oxlint .
```

### 2. `.oxlintrc.json` with `extends` (fallback — no TS config)

If you prefer a static JSON config (or don't want a `.ts` file), reference the package's JSON entry by path:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "extends": ["./node_modules/@ithinku/oxlint-config/index.json"]
}
```

```bash
oxlint .
```

### 3. `package.json` script with `-c` (no config file at all)

```json
{
  "scripts": {
    "lint": "oxlint -c node_modules/@ithinku/oxlint-config/index.json ."
  }
}
```

## What's included

| Section | Value | Why |
|---|---|---|
| `plugins` | `oxc`, `typescript`, `unicorn` | Oxlint's built-in set enabled by `--init`; framework plugins stay opt-in |
| `categories.correctness` | `error` | Code that is outright wrong — Oxlint's default, kept as hard errors |
| `categories.suspicious` | `warn` | Likely-wrong code, high signal with tolerable noise |
| `categories.perf` | `warn` | Performance hints, a natural fit for Oxlint's focus |
| `categories.pedantic / style / restriction / nursery` | _off_ | Too noisy or experimental; opt in per-rule if you want them |
| `options.reportUnusedDisableDirectives` | `true` | Surfaces stale `oxlint-disable` / `eslint-disable` comments |
| `env.builtin` | `true` | Built-in globals (e.g. `console`) |
| `overrides` (test files) | sets `jest` + `vitest` test globals | Test files (`*.test.*`, `*.spec.*`, `*.bench.*`, `__tests__/**`, `__mocks__/**`, `tests/**`, `test/**`) get the right globals automatically. No test-specific rules are enabled here — add them in your own `rules` if needed (e.g. `vitest/no-focused-tests`). |

`rules` is intentionally left empty — the category presets drive everything. Add your own rule overrides in your `oxlint.config.ts` / `.oxlintrc.json` `rules` block.

## Extending / overriding

In `oxlint.config.ts`, later `extends` entries win, and top-level `rules` / `plugins` override:

```ts
import { defineConfig } from 'oxlint'
import ithinku from '@ithinku/oxlint-config'

export default defineConfig({
  extends: [ithinku],
  plugins: ['oxc', 'typescript', 'unicorn', 'import', 'react', 'jsx-a11y'],
  rules: {
    'typescript/no-explicit-any': 'warn',
    'no-console': 'warn'
  }
})
```

> Note: Oxlint's `plugins` array **replaces** (not merges) the base plugin set, so re-list the base plugins when adding new ones.

## Relationship with `@ithinku/eslint-config-*`

Oxlint is fast but covers a subset of what ESLint + plugins offer (limited type-aware rules, partial Vue/React/import rule coverage). A common setup is:

1. **Oxlint** (this package) — runs first, in the editor / on save / pre-commit, for instant feedback.
2. **ESLint** (`@ithinku/eslint-config-ts` / `-vue` / `-react`) — runs in CI for type-aware and framework-specific rules Oxlint doesn't cover.

They are complementary, not mutually exclusive.

## License

MIT © [Protagonistss](https://github.com/Protagonistss)

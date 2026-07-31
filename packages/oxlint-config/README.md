# @ithinku/oxlint-config

A shareable [Oxlint](https://oxc.rs/) configuration for modern JavaScript / TypeScript projects.

Built purely on Oxlint's own capabilities — it does **not** depend on ESLint or any ESLint plugin. Use it standalone, or as a fast first-pass linter alongside `@ithinku/eslint-config-*` for deeper (type-aware / framework-specific) rules.

> ℹ️ Oxlint's `extends` only resolves **file paths**, not npm package names (ESLint-style "shareable configs" are not supported). See the usage section for the supported ways to consume this package.

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

Pick **one** of the following. All three are equivalent in effect.

### 1. `.oxlintrc.json` with `extends` (recommended)

Create `.oxlintrc.json` in your project root:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "extends": ["./node_modules/@ithinku/oxlint-config/index.json"]
}
```

Then run:

```bash
oxlint .
```

### 2. `package.json` script with `-c`

No config file needed — point Oxlint straight at the package:

```json
{
  "scripts": {
    "lint": "oxlint -c node_modules/@ithinku/oxlint-config/index.json ."
  }
}
```

### 3. `oxlint.config.ts` with `import`

For ESM projects that prefer a programmatic config (experimental Oxlint feature, runs via Node.js):

```ts
// oxlint.config.ts
import { defineConfig } from 'oxlint'
// Note: importing JSON requires `resolveJsonModule` / a JS wrapper.
// Simplest: re-export from a tiny local file, or inline the object.
import ithinku from './node_modules/@ithinku/oxlint-config/index.json' with { type: 'json' }

export default defineConfig({
  extends: [ithinku]
})
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
| `overrides` (test files) | enables `jest` + `vitest` plugins & globals | Test files get the right globals automatically |

`rules` is intentionally left empty — the category presets drive everything. Add your own rule overrides in your local `.oxlintrc.json` / `rules` block.

## Extending / overriding

Layer your own config on top — later entries win:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "extends": ["./node_modules/@ithinku/oxlint-config/index.json"],
  "plugins": ["oxc", "typescript", "unicorn", "import", "react", "jsx-a11y"],
  "rules": {
    "typescript/no-explicit-any": "warn",
    "no-console": "warn"
  }
}
```

> Note: Oxlint's `plugins` array **replaces** (not merges) the base plugin set, so re-list the base plugins when adding new ones.

## Relationship with `@ithinku/eslint-config-*`

Oxlint is fast but covers a subset of what ESLint + plugins offer (limited type-aware rules, partial Vue/React/import rule coverage). A common setup is:

1. **Oxlint** (this package) — runs first, in the editor / on save / pre-commit, for instant feedback.
2. **ESLint** (`@ithinku/eslint-config-ts` / `-vue` / `-react`) — runs in CI for type-aware and framework-specific rules Oxlint doesn't cover.

They are complementary, not mutually exclusive.

## License

MIT © [Protagonistss](https://github.com/Protagonistss)

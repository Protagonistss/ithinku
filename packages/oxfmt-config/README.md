# @ithinku/oxfmt-config

A shareable [oxfmt](https://oxc.rs/) formatter configuration for modern JavaScript / TypeScript projects.

Built purely on oxfmt's own capabilities. oxfmt is the high-performance (Rust) formatter from the oxc project — a fast alternative to Prettier.

> ⚠️ **Experimental — oxfmt is still `0.x`.** Its configuration schema may change between versions. This package tracks the latest oxfmt; pin a version if you need stability.
>
> ℹ️ **`extends` is not supported by oxfmt** (unlike oxlint). The recommended way to consume this package by name is via `oxfmt.config.ts` with `import`. A `-c <path>` fallback is also available for projects without a TS config.

## Requirements

- [`oxfmt`](https://www.npmjs.com/package/oxfmt) `>= 0.60.0`

## Install

```bash
pnpm add -D oxfmt @ithinku/oxfmt-config
# or
npm install -D oxfmt @ithinku/oxfmt-config
```

## Usage

Pick **one** of the following. Option 1 is recommended.

### 1. `oxfmt.config.ts` with `import` (recommended)

The modern, idiomatic way. oxfmt auto-discovers `oxfmt.config.ts`, so no `-c` flag is needed. The config is imported by package name (resolved by Node) and is fully typed.

```ts
// oxfmt.config.ts
import { defineConfig } from 'oxfmt'
import ithinku from '@ithinku/oxfmt-config'

export default defineConfig(ithinku)
```

```bash
oxfmt .          # format in place
oxfmt --check .  # check without writing (for CI)
```

### 2. `package.json` script with `-c` (no TS config)

Point oxfmt at the package's JSON entry by path:

```json
{
  "scripts": {
    "format": "oxfmt -c node_modules/@ithinku/oxfmt-config/index.json .",
    "format:check": "oxfmt -c node_modules/@ithinku/oxfmt-config/index.json --check ."
  }
}
```

```bash
pnpm format        # format in place
pnpm format:check  # check without writing (for CI)
```

## What's included

| Option | Value | Rationale |
| :--- | :--- | :--- |
| `printWidth` | `100` | Comfortable on modern displays (wider than the classic 80) |
| `tabWidth` | `2` | JS/TS community default |
| `useTabs` | `false` | Spaces |
| `semi` | `false` | No semicolons — leaner, modern style |
| `singleQuote` | `true` | JS mainstream preference; JSX stays double (`jsxSingleQuote: false`) |
| `trailingComma` | `"none"` | No trailing commas — minimal output |
| `bracketSpacing` | `true` | `{ foo }` over `{foo}` |
| `arrowParens` | `"always"` | `(x) => x` consistency |
| `quoteProps` | `"as-needed"` | Only quote object keys when required |
| `endOfLine` | `"lf"` | Consistent line endings across platforms |
| `insertFinalNewline` | `true` | POSIX convention |
| `embeddedLanguageFormatting` | `"auto"` | Format CSS-in-JS / markdown code blocks |
| `sortImports` | `true` | **oxfmt-exclusive.** Auto-sort import statements |
| `sortPackageJson` | `true` | **oxfmt-exclusive.** Auto-sort `package.json` keys |
| `ignorePatterns` | dist/build/coverage/locks… | Skip generated & vendored files |

> `sortImports` / `sortPackageJson` are oxfmt exclusives (Prettier needs plugins for these). They reorder code — if your project relies on a specific order, set them to `false` in a local override.

## Overriding

In `oxfmt.config.ts`, spread the base config and tweak:

```ts
import { defineConfig } from 'oxfmt'
import ithinku from '@ithinku/oxfmt-config'

export default defineConfig({
  ...ithinku,
  ignorePatterns: [
    ...ithinku.ignorePatterns, // keep the built-in ignores
    '**/*.d.ts'                // add your own
  ]
})
```

## Relationship with `@ithinku/prettier-config`

These two are **independent** — pick one formatter per project:

- `@ithinku/prettier-config` → for projects on Prettier
- `@ithinku/oxfmt-config` → for projects migrating to / adopting oxfmt

They are not kept in sync by design; each follows its own tool's conventions.

## License

MIT © [Protagonistss](https://github.com/Protagonistss)

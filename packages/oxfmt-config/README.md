# @ithinku/oxfmt-config

A shareable [oxfmt](https://oxc.rs/) formatter configuration for modern JavaScript / TypeScript projects.

Built purely on oxfmt's own capabilities. oxfmt is the high-performance (Rust) formatter from the oxc project — a fast alternative to Prettier.

> ⚠️ **Experimental — oxfmt is still `0.x`.** Its configuration schema may change between versions. This package tracks the latest oxfmt; pin a version if you need stability.
>
> ℹ️ **`extends` is not supported by oxfmt** (unlike oxlint). Consume this package by pointing oxfmt at it via `-c` (see Usage). You **cannot** reference it from `.oxfmtrc.json`'s `extends` field.

## Requirements

- [`oxfmt`](https://www.npmjs.com/package/oxfmt) `>= 0.60.0`

## Install

```bash
pnpm add -D oxfmt @ithinku/oxfmt-config
# or
npm install -D oxfmt @ithinku/oxfmt-config
```

## Usage

### 1. `package.json` script (recommended)

No `.oxfmtrc.json` needed — point oxfmt straight at the package:

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

### 2. `.oxfmtrc.json` + `-c` at the root

If you keep a root `.oxfmtrc.json` for editor integration, you still run oxfmt with `-c` pointing at this package (because `extends` doesn't work):

```bash
oxfmt -c node_modules/@ithinku/oxfmt-config/index.json .
```

## What's included

| Option | Value | Rationale |
| :--- | :--- | :--- |
| `printWidth` | `100` | Comfortable on modern displays (wider than the classic 80) |
| `tabWidth` | `2` | JS/TS community default |
| `useTabs` | `false` | Spaces |
| `semi` | `true` | Avoid ASI pitfalls |
| `singleQuote` | `true` | JS mainstream preference; JSX stays double (`jsxSingleQuote: false`) |
| `trailingComma` | `"all"` | Diff/merge-friendly multi-line trailing commas |
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

Layer your own settings on top with a local config that re-declares options (oxfmt merges `-c` config with CLI args). Simplest: copy what you need from this package into your `.oxfmtrc.json` and tweak.

## Relationship with `@ithinku/prettier-config`

These two are **independent** — pick one formatter per project:

- `@ithinku/prettier-config` → for projects on Prettier
- `@ithinku/oxfmt-config` → for projects migrating to / adopting oxfmt

They are not kept in sync by design; each follows its own tool's conventions.

## License

MIT © [Protagonistss](https://github.com/Protagonistss)

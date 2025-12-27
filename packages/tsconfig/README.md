# @ithinku/tsconfig

Shared [TypeScript configuration](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html) bases for iThinkU projects.

Provides a set of composable `tsconfig.json` files to ensure consistent compiler options across the monorepo.

## 📦 Available Configs

| Config | Extends | Purpose |
|--------|---------|---------|
| `base.json` | - | The minimal base configuration (ES2022, Strict). |
| `strict.json` | `base.json` | Enables maximum strictness (noImplicitAny, etc.). |
| `node.json` | `base.json` | Optimized for Node.js environments. |
| `dom.json` | `base.json` | Optimized for Browser environments (DOM lib). |
| `bundler.json` | `base.json` | Optimized for Bundlers (Vite/Rollup) with `moduleResolution: "Bundler"`. |

> Note: All specific configs also have a `-strict` variant (e.g., `bundler-strict.json`) which extends `strict.json`.

## 🚀 Usage

Install the package:

```bash
npm install -D @ithinku/tsconfig
```

Extend it in your `tsconfig.json`:

```json
{
  "extends": "@ithinku/tsconfig/bundler-strict",
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "src"
  },
  "include": ["src"]
}
```

## 📄 License

MIT
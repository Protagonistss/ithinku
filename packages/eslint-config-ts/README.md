# @ithinku/eslint-config-ts

**Flat Config** ESLint configuration for TypeScript projects.

Extends `@ithinku/eslint-config-base` with TypeScript-specific rules using `typescript-eslint`.

## ✨ Features

- **TypeScript v5+**: Optimized for modern TypeScript.
- **Type-Aware Linting**: Supports rules that require type information (optional).
- **Strict Rules**: Enforces type safety (e.g., `no-explicit-any` warning).

## 📦 Installation

```bash
npm install -D eslint @ithinku/eslint-config-ts globals typescript-eslint
```

## 🚀 Usage

Create `eslint.config.js`:

```javascript
import tsConfig from '@ithinku/eslint-config-ts'

export default [
  ...tsConfig,
  {
    // Optional: Enable type-aware linting
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.json'],
        tsconfigRootDir: import.meta.dirname
      }
    }
  }
]
```

## 📄 License

MIT
# @ithinku/eslint-config-base

**Flat Config** base configuration for JavaScript projects.

This package provides the foundational ESLint rules for all `@ithinku` ESLint configurations. It targets pure JavaScript projects running in modern environments (ES2022+).

## ✨ Features

- **ESLint v9 Ready**: Fully supports the new Flat Config system.
- **Best Practices**: Includes standard rules for code quality and error prevention.
- **Unicorn**: Integrated `eslint-plugin-unicorn` for more powerful rules.
- **Prettier**: Built-in compatibility with Prettier (formatting rules disabled).
- **Import Sorting**: Auto-sort imports for cleaner code.

## 📦 Installation

```bash
npm install -D eslint @ithinku/eslint-config-base globals
```

## 🚀 Usage

Create `eslint.config.js` in your project root:

```javascript
import baseConfig from '@ithinku/eslint-config-base'
import globals from 'globals'

export default [
  ...baseConfig,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      }
    }
  }
]
```

## 📄 License

MIT

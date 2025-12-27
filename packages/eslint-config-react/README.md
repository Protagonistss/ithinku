# @ithinku/eslint-config-react

**Flat Config** ESLint configuration for React + TypeScript projects.

Extends `@ithinku/eslint-config-ts` with React hooks and accessibility rules.

## ✨ Features

- **React 18+**: Modern React patterns (Hooks).
- **Accessibility**: Includes `jsx-a11y` rules.
- **JSX/TSX**: Optimized for JSX in TypeScript.

## 📦 Installation

```bash
npm install -D eslint @ithinku/eslint-config-react globals
```

## 🚀 Usage

Create `eslint.config.js`:

```javascript
import reactConfig from '@ithinku/eslint-config-react'

export default [
  ...reactConfig,
  {
    settings: {
      react: {
        version: 'detect'
      }
    }
  }
]
```

## 📄 License

MIT
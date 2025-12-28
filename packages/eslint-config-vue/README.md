# @ithinku/eslint-config-vue

**Flat Config** ESLint configuration for Vue 3 + TypeScript projects.

Extends `@ithinku/eslint-config-ts` and includes `eslint-plugin-vue` recommendations.

## ✨ Features

- **Vue 3**: Supports Composition API and `<script setup>`.
- **TypeScript**: Full TypeScript support in `.vue` files.
- **Auto Ordering**: Enforces consistent order for component tags and imports.

## 📦 Installation

```bash
npm install -D eslint @ithinku/eslint-config-vue globals
```

## 🚀 Usage

Create `eslint.config.js`:

```javascript
import vueConfig from '@ithinku/eslint-config-vue'

export default [
  ...vueConfig,
  {
    // Custom overrides
    rules: {
      'vue/multi-word-component-names': 'off'
    }
  }
]
```

## 📄 License

MIT

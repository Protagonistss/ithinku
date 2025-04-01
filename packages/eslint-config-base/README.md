# @ithinku/eslint-config-base

Base ESLint configuration for iThinkU projects.

## Features

- Modern JavaScript support (ES2022+)
- Import/export rules
- Code style rules
- Best practices
- Error prevention
- Unicorn rules
- Prettier integration

## Installation

```bash
pnpm add -D @ithinku/eslint-config-base
```

## Usage

### Basic Usage

Add this to your `.eslintrc.js`:

```js
module.exports = {
  extends: ['@ithinku/eslint-config-base']
}
```

This configuration already includes Prettier integration through `eslint-config-prettier`, so you don't need to add Prettier configuration separately.

### With Additional Rules

```js
module.exports = {
  extends: ['@ithinku/eslint-config-base'],
  rules: {
    // Your custom rules here
  }
}
```

### VS Code Setup

Add to `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

### NPM Scripts

Add to your `package.json`:

```json
{
  "scripts": {
    "lint": "eslint . --ext .js,.jsx",
    "lint:fix": "eslint . --ext .js,.jsx --fix",
    "format": "prettier --write \"**/*.{js,jsx,json,md}\""
  }
}
```

### Using Prettier

#### 1. Install Dependencies

```bash
pnpm add -D prettier
```

#### 2. Override Prettier Configuration

Create `.prettierrc.js` in your project root to override the default Prettier settings:

```js
module.exports = {
  // 继承基础配置
  ...require('@ithinku/eslint-config-base/.prettierrc.js'),
  // 覆盖特定设置
  printWidth: 120, // 修改行宽
  tabWidth: 4, // 修改缩进宽度
  semi: true, // 修改分号设置
  singleQuote: false, // 修改引号设置
  trailingComma: 'es5', // 修改尾逗号设置
  bracketSpacing: false, // 修改对象括号空格
  arrowParens: 'always', // 修改箭头函数括号
  endOfLine: 'crlf' // 修改换行符
}
```

#### 3. Format Files

```bash
# Format all files
pnpm prettier --write .

# Format specific files
pnpm prettier --write src/**/*.js

# Check formatting
pnpm prettier --check .

# Format specific file
pnpm prettier --write src/index.js
```

#### 4. Git Hooks

Add to your `package.json`:

```json
{
  "scripts": {
    "prepare": "husky install"
  },
  "devDependencies": {
    "husky": "^8.0.0",
    "lint-staged": "^15.0.0"
  }
}
```

Create `.lintstagedrc.js`:

```js
module.exports = {
  '*.{js,jsx,json,md}': ['prettier --write']
}
```

Add pre-commit hook:

```bash
pnpm husky add .husky/pre-commit 'pnpm lint-staged'
```

#### 5. CI/CD Integration

Add to your CI workflow:

```yaml
steps:
  - name: Check formatting
    run: pnpm prettier --check .
```

## Configuration Details

### JavaScript Support

This configuration supports modern JavaScript features including:
- Arrow functions
- Destructuring
- Template literals
- Classes
- Modules
- Promises
- Async/await
- Optional chaining
- Nullish coalescing
- And more...

### Import Rules

- Enforces import order with grouping:
  - builtin
  - external
  - internal
  - parent
  - sibling
  - index
  - object
- Prevents mutable exports
- Requires imports at the top
- Configurable import grouping

### Code Style

- Semicolons (configurable)
- Quotes (configurable)
- Indentation (configurable)
- Spacing rules
- Line breaks
- And more...

### Best Practices

- Prefer const over let
- Arrow functions
- Object shorthand
- Template literals
- Rest parameters
- Spread operator
- And more...

### Error Prevention

- No debugger statements
- Console warnings (except warn and error)
- Return await prevention
- Case declarations
- Multi-line strings
- With statements
- And more...

### Unicorn Rules

- Array method preferences
- Modern JavaScript features
- Code style improvements
- Performance optimizations
- And more...

### JSON and YAML Support

- JSON files use `jsonc-eslint-parser`
- YAML files use `yaml-eslint-parser`
- Special rules for JSON and YAML files

## Dependencies

- eslint
- eslint-config-prettier
- eslint-plugin-eslint-comments
- eslint-plugin-import
- eslint-plugin-promise
- eslint-plugin-unicorn
- prettier

## License

MIT
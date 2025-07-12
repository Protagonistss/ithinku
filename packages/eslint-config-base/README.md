# @ithinku/eslint-config-base

JavaScript项目的基础ESLint配置，为现代JavaScript开发提供统一的代码规范。

## ✨ 特性

- 现代JavaScript支持 (ES2022+)
- 导入/导出规则优化
- 代码风格统一
- 最佳实践建议
- 错误预防
- Unicorn规则集成
- Prettier集成
- JSON和YAML文件支持

## 📦 安装

```bash
npm install -D @ithinku/eslint-config-base
```

或使用其他包管理器：

```bash
# 使用yarn
yarn add -D @ithinku/eslint-config-base

# 使用pnpm
pnpm add -D @ithinku/eslint-config-base
```

## 🚀 使用方法

### 基础用法

在项目根目录创建 `.eslintrc.js` 文件：

```javascript
module.exports = {
  extends: ['@ithinku/eslint-config-base']
}
```

### 与其他配置组合

```javascript
module.exports = {
  extends: [
    '@ithinku/eslint-config-base',
    // 可以添加其他配置
  ],
  rules: {
    // 自定义规则
  }
}
```

## 🛠️ 配置详情

### 支持的环境

```javascript
{
  env: {
    es2022: true,
    browser: true,
    node: true
  }
}
```

### 继承的配置

- `eslint:recommended`: ESLint推荐规则
- `plugin:import/recommended`: 导入模块规则
- `plugin:eslint-comments/recommended`: ESLint注释规则
- `plugin:promise/recommended`: Promise规则
- `plugin:unicorn/recommended`: Unicorn规则
- `prettier`: Prettier集成

### 核心规则

#### 导入/导出规则
- `import/order`: 强制导入顺序分组
- `import/first`: 要求导入在文件顶部
- `import/no-mutable-exports`: 禁止可变导出
- `import/no-unresolved`: 关闭未解析模块检查

#### 代码风格 (由Prettier处理)
禁用与Prettier冲突的规则：
- `semi`, `quotes`, `indent`
- `comma-spacing`, `comma-style`, `comma-dangle`
- `array-bracket-spacing`, `brace-style`
- `space-before-function-paren`

#### 最佳实践
- `no-param-reassign`: 禁止参数重新赋值
- `no-var`: 禁止使用var
- `prefer-const`: 优先使用const
- `prefer-arrow-callback`: 优先使用箭头函数
- `object-shorthand`: 使用对象简写
- `prefer-template`: 优先使用模板字符串

#### 错误预防
- `no-debugger`: 禁止debugger语句
- `no-console`: 限制console使用 (允许warn和error)
- `no-return-await`: 禁止不必要的return await
- `require-await`: 要求async函数包含await
- `eqeqeq`: 强制使用严格相等

#### 复杂度控制
- `complexity`: 限制圈复杂度 (最大10)

#### Unicorn规则
优化的Unicorn规则集，禁用了一些过于严格的规则：
- `unicorn/prevent-abbreviations`: 关闭
- `unicorn/no-null`: 关闭
- `unicorn/no-array-reduce`: 关闭
- 以及其他数组方法相关规则

### 文件类型支持

#### JSON文件
- 使用 `jsonc-eslint-parser` 解析器
- 支持JSON with Comments
- 专门的JSON规则集

#### YAML文件
- 使用 `yaml-eslint-parser` 解析器
- 支持YAML语法检查

## 📋 依赖要求

| 依赖 | 版本要求 |
|------|----------|
| ESLint | ^8.57.0 |
| eslint-config-prettier | ^9.1.0 |
| eslint-plugin-eslint-comments | ^3.2.0 |
| eslint-plugin-import | ^2.29.1 |
| eslint-plugin-promise | ^6.1.1 |
| eslint-plugin-unicorn | ^50.0.1 |
| prettier | ^3.2.5 |

## 🔧 推荐配置

### VS Code设置

创建 `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

### npm脚本

在 `package.json` 中添加：

```json
{
  "scripts": {
    "lint": "eslint . --ext .js,.jsx",
    "lint:fix": "eslint . --ext .js,.jsx --fix",
    "format": "prettier --write \"**/*.{js,jsx,json,md}\""
  }
}
```

### Prettier配置

该配置已内置Prettier集成。如需自定义Prettier配置，创建 `.prettierrc.js`:

```javascript
module.exports = {
  semi: false,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'none',
  printWidth: 100,
  bracketSpacing: true,
  arrowParens: 'avoid',
  endOfLine: 'auto'
}
```

## 🎯 使用示例

### 模块导入

```javascript
// good - 符合规范
import fs from 'node:fs'
import path from 'node:path'

import express from 'express'
import lodash from 'lodash'

import { utils } from '../utils'
import { config } from './config'

export { app }

// bad - 不符合规范
import { config } from './config'
import express from 'express'
import { utils } from '../utils'
import fs from 'fs'
```

### 现代JavaScript特性

```javascript
// good - 符合规范
const users = [
  { name: 'John', active: true },
  { name: 'Jane', active: false }
]

const activeUsers = users
  .filter(user => user.active)
  .map(user => user.name)

const getMessage = (name = 'World') => `Hello, ${name}!`

export { activeUsers, getMessage }

// bad - 不符合规范
var users = [
  { name: 'John', active: true },
  { name: 'Jane', active: false }
]

function getMessage(name) {
  if (!name) {
    name = 'World'
  }
  return 'Hello, ' + name + '!'
}
```

## 🔄 自定义配置

你可以通过覆盖规则来自定义配置：

```javascript
module.exports = {
  extends: ['@ithinku/eslint-config-base'],
  rules: {
    // 允许console.log
    'no-console': 'off',
    
    // 调整复杂度限制
    'complexity': ['warn', 15],
    
    // 自定义导入顺序
    'import/order': ['error', {
      'groups': [
        'builtin',
        'external',
        'internal',
        'parent',
        'sibling',
        'index'
      ],
      'newlines-between': 'always'
    }]
  }
}
```

## 🐛 常见问题

### Q: 如何处理全局变量？

A: 在配置中声明全局变量：

```javascript
module.exports = {
  extends: ['@ithinku/eslint-config-base'],
  globals: {
    '$': 'readonly',
    'jQuery': 'readonly',
    'process': 'readonly'
  }
}
```

### Q: 如何忽略特定文件？

A: 创建 `.eslintignore` 文件：

```
dist/
build/
node_modules/
*.min.js
```

### Q: 如何在CI/CD中使用？

A: 在CI脚本中添加：

```bash
npm run lint
```

或者更严格的检查：

```bash
npx eslint . --ext .js,.jsx --max-warnings 0
```

## 📚 相关配置

如果你在使用特定的框架或库，可以组合使用其他配置：

- TypeScript: `@ithinku/eslint-config-ts`
- Vue 3: `@ithinku/eslint-config-vue`
- React: `@ithinku/eslint-config-react`

## 📄 许可证

MIT

## 🤝 贡献

欢迎提交Issue和Pull Request！

如果你发现问题或有改进建议，请：
1. 创建Issue描述问题
2. Fork项目并创建功能分支
3. 提交Pull Request
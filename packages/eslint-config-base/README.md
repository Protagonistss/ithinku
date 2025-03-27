# @ithinku/eslint-config-base

iThinkU 项目的 ESLint 基础配置，支持 JavaScript、TypeScript、Prettier 和现代 JavaScript 特性。

## 特性

- 🎯 支持 JavaScript 和 TypeScript
- 💅 集成 Prettier
- �� 现代 JavaScript 特性支持（ES6+）
- 📦 模块化配置
- 🔍 严格的代码质量检查
- 🛠 开发工具友好

## 安装

```bash
# 使用 npm
npm install --save-dev @ithinku/eslint-config-base

# 使用 yarn
yarn add -D @ithinku/eslint-config-base

# 使用 pnpm
pnpm add -D @ithinku/eslint-config-base
```

## 使用方法

### 1. 基础配置

在项目根目录创建 `.eslintrc.js`：

```javascript
module.exports = {
  root: true,
  extends: ['@ithinku/eslint-config-base']
}
```

### 2. 配置 Prettier

在项目根目录创建 `.prettierrc.js`：

```javascript
module.exports = require('@ithinku/eslint-config-base/.prettierrc.js')
```

### 3. VS Code 配置

在 `.vscode/settings.json` 中添加：

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

### 4. 添加 npm 脚本

在 `package.json` 中添加：

```json
{
  "scripts": {
    "lint": "eslint . --ext .js,.jsx,.ts,.tsx",
    "lint:fix": "eslint . --ext .js,.jsx,.ts,.tsx --fix",
    "format": "prettier --write \"**/*.{js,jsx,ts,tsx,json,md}\""
  }
}
```

## 配置说明

### JavaScript 支持

- 支持 ES6+ 特性：
  - 箭头函数
  - 解构赋值
  - 模板字符串
  - 类
  - 模块化 (import/export)
  - Promise
  - async/await
  - 可选链操作符 (?.)
  - 空值合并操作符 (??)
  - 展开运算符 (...)
  - 剩余参数 (...)
  - 默认参数
  - 对象简写
  - 计算属性名
  - Symbol
  - Map/Set
  - Proxy/Reflect
  - Generator/Iterator
  - 装饰器
- 支持浏览器和 Node.js 环境
- 支持 JSX 语法
- 支持模块化导入导出

### ESLint 规则

- 使用单引号
- 不使用分号
- 使用 2 空格缩进
- 最大行宽 100 字符
- 箭头函数参数括号按需使用
- 对象属性引号按需使用
- 禁止使用 var
- 优先使用 const
- 优先使用箭头函数
- 优先使用模板字符串
- 优先使用对象简写
- 优先使用展开运算符
- 优先使用剩余参数
- 禁止使用 with 语句
- 禁止使用 void 运算符
- 禁止使用 alert
- 禁止使用 console（除了 warn 和 error）

### TypeScript 规则（仅对 .ts 和 .tsx 文件生效）

- 要求函数返回类型声明
- 警告使用 any 类型
- 未使用变量报错（忽略以 _ 开头的变量）

### 导入规则

- 按类型分组导入
- 导入之间空行
- 按字母顺序排序
- 禁止可变导出

## 依赖要求

- Node.js >= 14
- ESLint >= 8.0.0
- TypeScript >= 5.3.3（仅当使用 TypeScript 时需要）

## 常见问题

### 1. 与 Prettier 冲突

确保安装了 `eslint-config-prettier` 并将其放在 extends 数组的最后：

```javascript
module.exports = {
  extends: [
    '@ithinku/eslint-config-base',
    'prettier' // 必须放在最后
  ]
}
```

### 2. TypeScript 配置（仅当使用 TypeScript 时需要）

确保 `tsconfig.json` 中启用了严格模式：

```json
{
  "compilerOptions": {
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  }
}
```

### 3. 忽略文件

创建 `.eslintignore` 文件：

```
node_modules
dist
build
coverage
```

### 4. 纯 JavaScript 项目配置

如果您的项目只使用 JavaScript，可以这样配置：

```javascript
module.exports = {
  root: true,
  extends: ['@ithinku/eslint-config-base'],
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module'
  }
}
```

## 贡献

欢迎提交 Issue 和 Pull Request！

## 许可证

MIT
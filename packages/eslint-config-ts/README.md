# @ithinku/eslint-config-ts

TypeScript项目的ESLint配置，基于 `@ithinku/eslint-config-base` 并集成了现代TypeScript最佳实践。

## ✨ 特性

- 基于 `@ithinku/eslint-config-base` 的TypeScript配置
- TypeScript ESLint v7.x支持 (兼容ESLint 8.57+)
- 类型安全检查
- 现代TypeScript特性支持
- 严格类型检查规则
- 导入/导出优化
- 代码风格统一
- 性能优化建议

## 📦 安装

```bash
npm install -D @ithinku/eslint-config-ts
```

或使用其他包管理器：

```bash
# 使用yarn
yarn add -D @ithinku/eslint-config-ts

# 使用pnpm
pnpm add -D @ithinku/eslint-config-ts
```

## 🚀 使用方法

在项目根目录创建 `.eslintrc.js` 文件：

```javascript
module.exports = {
  extends: ['@ithinku/eslint-config-ts']
}
```

### 与其他配置组合

```javascript
module.exports = {
  extends: [
    '@ithinku/eslint-config-ts',
    // 可以添加其他配置
  ],
  rules: {
    // 自定义规则
  }
}
```

## 🛠️ 配置详情

### 继承的配置

该配置继承自：
- `@ithinku/eslint-config-base`: 基础JavaScript配置
- `@typescript-eslint/recommended`: TypeScript推荐规则

### Parser配置

```javascript
{
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module'
  }
}
```

### 核心规则

#### 类型安全
- `@typescript-eslint/no-explicit-any`: 禁止使用any类型
- `@typescript-eslint/prefer-as-const`: 优先使用as const断言
- `@typescript-eslint/no-non-null-assertion`: 禁止非空断言
- `@typescript-eslint/strict-boolean-expressions`: 严格布尔表达式

#### 代码风格
- `@typescript-eslint/explicit-function-return-type`: 要求函数返回类型
- `@typescript-eslint/consistent-type-definitions`: 统一类型定义方式
- `@typescript-eslint/member-ordering`: 成员排序规则
- `@typescript-eslint/prefer-function-type`: 优先使用函数类型

#### 最佳实践
- `@typescript-eslint/no-unused-vars`: 检查未使用的变量
- `@typescript-eslint/prefer-optional-chain`: 优先使用可选链
- `@typescript-eslint/prefer-nullish-coalescing`: 优先使用空值合并
- `@typescript-eslint/no-floating-promises`: 检查浮动Promise

## 📋 依赖要求

| 依赖 | 版本要求 |
|------|----------|
| ESLint | ^8.57.0 |
| TypeScript | ^4.8.0 \|\| ^5.0.0 |
| @typescript-eslint/eslint-plugin | ^7.18.0 |
| @typescript-eslint/parser | ^7.18.0 |

## 🔧 推荐配置

### TypeScript配置

创建 `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext", 
    "lib": ["ES2022", "DOM"],
    "moduleResolution": "bundler",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "skipLibCheck": true,
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### VS Code设置

创建 `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.preferences.importModuleSpecifier": "relative",
  "typescript.suggest.autoImports": true
}
```

### npm脚本

在 `package.json` 中添加：

```json
{
  "scripts": {
    "lint": "eslint \"src/**/*.{js,ts}\"",
    "lint:fix": "eslint \"src/**/*.{js,ts}\" --fix",
    "type-check": "tsc --noEmit",
    "format": "prettier --write \"src/**/*.{js,ts,json,md}\""
  }
}
```

## 🎯 使用示例

### 基本TypeScript文件

```typescript
// good - 符合规范
interface User {
  readonly id: number
  name: string
  email?: string
}

const createUser = (name: string, email?: string): User => {
  return {
    id: Math.random(),
    name,
    email
  }
}

export { createUser, type User }

// bad - 不符合规范
function createUser(name: any, email: any) {
  return {
    id: Math.random(),
    name: name,
    email: email
  }
}
```

### 类定义

```typescript
// good - 符合规范
class UserService {
  private readonly apiUrl: string

  constructor(apiUrl: string) {
    this.apiUrl = apiUrl
  }

  async getUser(id: number): Promise<User | null> {
    try {
      const response = await fetch(`${this.apiUrl}/users/${id}`)
      return await response.json()
    } catch {
      return null
    }
  }
}

export { UserService }
```

## 🔄 自定义配置

你可以通过覆盖规则来自定义配置：

```javascript
module.exports = {
  extends: ['@ithinku/eslint-config-ts'],
  rules: {
    // 允许使用any类型
    '@typescript-eslint/no-explicit-any': 'off',
    
    // 自定义命名规范
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'interface',
        format: ['PascalCase'],
        prefix: ['I']
      }
    ],
    
    // 要求所有函数都有返回类型
    '@typescript-eslint/explicit-function-return-type': 'error'
  }
}
```

## 🐛 常见问题

### Q: 如何处理第三方库的类型问题？

A: 使用类型声明文件或配置忽略：

```javascript
// 在.eslintrc.js中
module.exports = {
  extends: ['@ithinku/eslint-config-ts'],
  rules: {
    '@typescript-eslint/no-explicit-any': ['error', {
      ignoreRestArgs: true
    }]
  }
}
```

### Q: 如何在特定文件中禁用某些规则？

A: 使用ESLint注释：

```typescript
/* eslint-disable @typescript-eslint/no-explicit-any */
const legacyCode: any = getLegacyData()
/* eslint-enable @typescript-eslint/no-explicit-any */
```

### Q: 如何配置路径别名？

A: 在tsconfig.json中配置paths，ESLint会自动识别：

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/components/*"]
    }
  }
}
```

## 📚 相关链接

- [TypeScript ESLint官方文档](https://typescript-eslint.io/)
- [TypeScript官方文档](https://www.typescriptlang.org/)
- [ESLint官方文档](https://eslint.org/)

## 📄 许可证

MIT

## 🤝 贡献

欢迎提交Issue和Pull Request！

如果你发现问题或有改进建议，请：
1. 创建Issue描述问题
2. Fork项目并创建功能分支
3. 提交Pull Request 
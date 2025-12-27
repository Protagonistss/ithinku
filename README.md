# iThinkU

现代化、高性能的 JavaScript/TypeScript 工具库与配置集合。

本项目采用 Monorepo 架构管理，旨在为现代前端开发提供统一的基础设施，包含 ESLint 配置、TypeScript 配置以及常用的工具函数库。

> 🎉 **v1.0.0 Update**: 全面升级至 **ESLint v9 (Flat Config)**，拥抱未来标准。

## 📦 核心包列表

### 🛠️ 工具库 (Libraries)

| 包名 | 描述 | 版本 |
|------|------|------|
| [`@ithinku/shared`](./packages/shared) | 高性能、类型安全的通用工具函数库 (Array, Type, Time 等) | ![npm](https://img.shields.io/npm/v/@ithinku/shared) |
| [`@ithinku/expr`](./packages/expr) | 强大的 TypeScript 表达式解析与求值引擎 | ![npm](https://img.shields.io/npm/v/@ithinku/expr) |

### ⚙️ 规范配置 (Configurations)

| 包名 | 描述 | 适用场景 |
|------|------|----------|
| [`@ithinku/eslint-config-base`](./packages/eslint-config-base) | 基础 Flat Config 配置 | 纯 JavaScript 项目 |
| [`@ithinku/eslint-config-ts`](./packages/eslint-config-ts) | TypeScript 增强配置 | TypeScript 项目 |
| [`@ithinku/eslint-config-vue`](./packages/eslint-config-vue) | Vue 3 + TS 专用配置 | Vue 3 项目 |
| [`@ithinku/eslint-config-react`](./packages/eslint-config-react) | React + TS 专用配置 | React 项目 |
| [`@ithinku/tsconfig`](./packages/tsconfig) | 可复用的 TSConfig 基座 | 所有 TS 项目 |

## 🚀 快速开始

### 安装 ESLint 配置

```bash
# JavaScript 项目
npm install -D @ithinku/eslint-config-base eslint

# TypeScript 项目
npm install -D @ithinku/eslint-config-ts eslint

# Vue 3 项目
npm install -D @ithinku/eslint-config-vue eslint

# React 项目
npm install -D @ithinku/eslint-config-react eslint
```

### 使用 (eslint.config.js)

ESLint v9 不再支持 `.eslintrc`，请在根目录创建 `eslint.config.js`：

```javascript
// eslint.config.js
import ithinkuConfig from '@ithinku/eslint-config-vue' // 或其他包

export default [
  ...ithinkuConfig,
  {
    // 你的自定义覆盖配置
    rules: {
      'no-console': 'warn'
    }
  }
]
```

## 🛠️ 开发指南

本项目使用 [pnpm](https://pnpm.io/) workspace 进行管理。

### 环境要求
- Node.js >= 18
- pnpm >= 8

### 常用命令

```bash
# 安装依赖
pnpm install

# 构建所有包
pnpm run build

# 运行所有测试
pnpm run test

# 代码风格检查
pnpm run lint

# 自动修复代码风格
pnpm run format
```

### 提交规范

本项目遵循 [Conventional Commits](https://www.conventionalcommits.org/) 规范。

- `feat`: 新功能
- `fix`: 修复 bug
- `docs`: 文档变更
- `style`: 代码格式修改（不影响逻辑）
- `refactor`: 代码重构
- `test`: 测试用例修改
- `chore`: 构建过程或辅助工具变动

## 📄 许可证

MIT License © 2024 [Protagonistss](https://github.com/Protagonistss)

<div align="center">

# iThinkU

🚀 现代化的 JavaScript / TypeScript 工程基础设施

Lint · 构建 · 工具函数 —— 一个 monorepo 全覆盖

[![CI](https://github.com/Protagonistss/ithinku/actions/workflows/ci.yml/badge.svg?branch=dev)](https://github.com/Protagonistss/ithinku/actions/workflows/ci.yml)
[![Release](https://github.com/Protagonistss/ithinku/actions/workflows/release.yml/badge.svg)](https://github.com/Protagonistss/ithinku/actions/workflows/release.yml)
[![License](https://img.shields.io/github/license/Protagonistss/ithinku?color=blue)](./LICENSE)
[![Node](https://img.shields.io/badge/node-%E2%89%A520.19-339933?logo=nodedotjs&logoColor=white)](#️-开发)
[![pnpm](https://img.shields.io/badge/pnpm-11-f69220?logo=pnpm&logoColor=white)](#️-开发)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

</div>

---

## ✨ 特性

- ⚡ **双 Lint 引擎** — Oxlint（Rust，极速首道筛查）+ ESLint v9 Flat Config（深度、类型感知），渐进式采用
- 🎯 **类型安全** — 全量 TypeScript，严格类型约束，含 `.d.ts` 声明
- 🧩 **框架齐全** — Vue 3 / React / TypeScript / Node 多场景预设
- 📦 **开箱即用** — 零配置，安装即用；插件随包走，无需手动安装
- 🔧 **自动化** — pnpm workspace + Changesets，版本与发布全自动

## 📦 包总览

### 🛠️ 工具库

| 包 | 版本 | 描述 |
| :--- | :---: | :--- |
| [`@ithinku/shared`](./packages/shared) | [![npm](https://img.shields.io/npm/v/@ithinku/shared?color=cb3837)](https://www.npmjs.com/package/@ithinku/shared) | 类型安全的通用工具函数库（Array / Object / String / Time / Type …） |
| [`@ithinku/expr`](./packages/expr) | [![npm](https://img.shields.io/npm/v/@ithinku/expr?color=cb3837)](https://www.npmjs.com/package/@ithinku/expr) | 表达式解析与求值引擎（词法分析 + AST + 求值） |

### 🎨 Lint 配置

| 包 | 版本 | 描述 |
| :--- | :---: | :--- |
| [`@ithinku/eslint-config-base`](./packages/eslint-config-base) | [![npm](https://img.shields.io/npm/v/@ithinku/eslint-config-base?color=cb3837)](https://www.npmjs.com/package/@ithinku/eslint-config-base) | ESLint v9 基础 Flat Config（纯 JS） |
| [`@ithinku/eslint-config-ts`](./packages/eslint-config-ts) | [![npm](https://img.shields.io/npm/v/@ithinku/eslint-config-ts?color=cb3837)](https://www.npmjs.com/package/@ithinku/eslint-config-ts) | TypeScript 增强配置 |
| [`@ithinku/eslint-config-vue`](./packages/eslint-config-vue) | [![npm](https://img.shields.io/npm/v/@ithinku/eslint-config-vue?color=cb3837)](https://www.npmjs.com/package/@ithinku/eslint-config-vue) | Vue 3 + TS 专用配置 |
| [`@ithinku/eslint-config-react`](./packages/eslint-config-react) | [![npm](https://img.shields.io/npm/v/@ithinku/eslint-config-react?color=cb3837)](https://www.npmjs.com/package/@ithinku/eslint-config-react) | React + TS 专用配置 |
| [`@ithinku/oxlint-config`](./packages/oxlint-config) | [![npm](https://img.shields.io/npm/v/@ithinku/oxlint-config?color=cb3837)](https://www.npmjs.com/package/@ithinku/oxlint-config) | Oxlint 极速配置（独立于 ESLint） |

### 📐 格式化配置

| 包 | 版本 | 描述 |
| :--- | :---: | :--- |
| [`@ithinku/prettier-config`](./packages/prettier-config) | [![npm](https://img.shields.io/npm/v/@ithinku/prettier-config?color=cb3837)](https://www.npmjs.com/package/@ithinku/prettier-config) | 共享 Prettier 配置 |
| [`@ithinku/oxfmt-config`](./packages/oxfmt-config) | [![npm](https://img.shields.io/npm/v/@ithinku/oxfmt-config?color=cb3837)](https://www.npmjs.com/package/@ithinku/oxfmt-config) | oxfmt 极速格式化配置（Prettier 的 Rust 替代，独立设计） |

### ⚙️ 工程配置

| 包 | 版本 | 描述 |
| :--- | :---: | :--- |
| [`@ithinku/tsconfig`](./packages/tsconfig) | [![npm](https://img.shields.io/npm/v/@ithinku/tsconfig?color=cb3837)](https://www.npmjs.com/package/@ithinku/tsconfig) | 可复用的 TSConfig 预设（base / dom / node / bundler，含 strict 变体） |

## 🚀 快速开始

### ESLint（深度 Lint）

按技术栈选择一个配置包：

```bash
# 纯 JavaScript
pnpm add -D @ithinku/eslint-config-base eslint
# TypeScript
pnpm add -D @ithinku/eslint-config-ts eslint
# Vue 3
pnpm add -D @ithinku/eslint-config-vue eslint
# React
pnpm add -D @ithinku/eslint-config-react eslint
```

```js
// eslint.config.js
import ithinku from '@ithinku/eslint-config-ts' // 替换为你选的包

export default [
  ...ithinku,
  {
    // 你的自定义覆盖
    rules: { 'no-console': 'warn' }
  }
]
```

### Oxlint（极速 Lint）

作为 ESLint 之前的「秒级首道筛查」，或 IDE 实时检查：

```bash
pnpm add -D oxlint @ithinku/oxlint-config
```

```ts
// oxlint.config.ts
import { defineConfig } from 'oxlint'
import ithinku from '@ithinku/oxlint-config'

export default defineConfig({ extends: [ithinku] })
```

> 💡 Oxlint 与 ESLint 互补：Oxlint 负责速度（IDE / pre-commit），ESLint 负责深度（类型感知、框架规则）。
>
> 不想用 TS 配置？也可用 `.oxlintrc.json` 的 `extends` 指向包内 JSON：`"extends": ["./node_modules/@ithinku/oxlint-config/index.json"]`。

### Oxfmt（极速格式化）

Prettier 的 Rust 替代，秒级格式化：

```bash
pnpm add -D oxfmt @ithinku/oxfmt-config
```

```ts
// oxfmt.config.ts
import { defineConfig } from 'oxfmt'
import ithinku from '@ithinku/oxfmt-config'

export default defineConfig(ithinku)
```

不想用 TS 配置？也可在 `package.json` 里 `-c` 指向包内 JSON：`oxfmt -c node_modules/@ithinku/oxfmt-config/index.json .`。

> ⚠️ oxfmt 仍为 `0.x`，配置可能随版本调整。

### TypeScript

```jsonc
// tsconfig.json
{
  "extends": "@ithinku/tsconfig/node-strict" // 或 dom-strict / bundler / base ...
}
```

### Prettier

```jsonc
// package.json
{
  "prettier": "@ithinku/prettier-config"
}
```

### 工具库

```bash
pnpm add @ithinku/shared   # 通用工具函数
pnpm add @ithinku/expr     # 表达式引擎
```

## 🏗️ 架构与发布

本项目采用 **dev 开发 / main 发布** 的双分支工作流：

```
dev  ──push/PR──▶  CI（lint + test + build）   质量门禁，不发布
main ◀──合并── dev
main ──push──▶  Release（Changesets）
                 ├─ 有 pending changeset → 自动开 release PR（version + CHANGELOG）
                 └─ 合并 release PR → publish 到 npm
```

- 写变更时执行 `pnpm changeset` 生成变更记录
- 版本号与发布完全由 [Changesets](https://github.com/changesets/changesets) 自动管理

## 🛠️ 开发

**环境要求**

- Node.js `>= 20.19`
- pnpm `>= 11`

**常用命令**

```bash
pnpm install            # 安装依赖
pnpm -r build           # 构建所有包
pnpm -r test            # 运行测试（vitest）
pnpm lint               # ESLint 检查
pnpm lint:oxlint        # Oxlint 检查
pnpm format             # Prettier 格式化
pnpm format:oxfmt       # oxfmt 格式化（极速）
pnpm changeset          # 添加变更记录
```

**提交规范** — 遵循 [Conventional Commits](https://www.conventionalcommits.org/)：

`feat` · `fix` · `docs` · `style` · `refactor` · `test` · `chore` · `perf`

## 📁 项目结构

```
ithinku/
├── .github/workflows/   ci.yml · release.yml
├── .changeset/          变更记录
└── packages/
    ├── shared/          通用工具库
    ├── expr/            表达式引擎
    ├── eslint-config-base/  ┐
    ├── eslint-config-ts/    ├ ESLint 配置
    ├── eslint-config-vue/   │
    ├── eslint-config-react/ ┘
    ├── oxlint-config/   Oxlint 配置
    ├── oxfmt-config/    oxfmt 格式化
    ├── prettier-config/ Prettier 配置
    └── tsconfig/        TSConfig 预设
```

## 📄 License

[MIT](./LICENSE) © 2024–present [Protagonistss](https://github.com/Protagonistss)

# @ithinku/tsconfig

共享的 TypeScript 配置文件。

## 安装

```bash
pnpm add -D @ithinku/tsconfig
```

## 使用方法

该包提供多种可复用的基础配置，按场景选择继承：

基础（默认）

```json
{
  "extends": "@ithinku/tsconfig/base",
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "src"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

浏览器/DOM

```json
{
  "extends": "@ithinku/tsconfig/dom"
}
```

Node.js

```json
{
  "extends": "@ithinku/tsconfig/node"
}
```

Bundler（Vite/Rollup/Webpack 等）

```json
{
  "extends": "@ithinku/tsconfig/bundler"
}
```

更严格的检查（分阶段启用时可选）

```json
{
  "extends": "@ithinku/tsconfig/strict"
}
```

对应场景的严格版本：

```json
{
  "extends": "@ithinku/tsconfig/dom-strict"
}
```

```json
{
  "extends": "@ithinku/tsconfig/node-strict"
}
```

```json
{
  "extends": "@ithinku/tsconfig/bundler-strict"
}
```

兼容旧用法：`@ithinku/tsconfig/tsconfig.json` 等同于 `@ithinku/tsconfig/base`。

## 使用场景与建议

- `base`：通用基础（工具库、共享包、无特定运行时要求的项目），按项目覆盖 `outDir`/`rootDir`/`declaration`/`jsx` 等输出相关选项。
- `dom`：浏览器 SDK、Web 组件、React/Vue 应用或库，需要 DOM 类型时使用；纯 Node 场景不建议用。
- `node`：CLI、后端服务、脚本类项目；当使用 ESM 时优先保持 `NodeNext` 解析与运行时一致。
- `bundler`：Vite/Rollup/Webpack 构建的库或应用，强调与 bundler 的解析一致性。
- `strict`：用于渐进增强的类型安全，建议先从新模块或依赖较少的包试点，再推广全量。
- `dom-strict`/`node-strict`/`bundler-strict`：在对应场景稳定后启用，能尽早暴露边界与空值问题。

实践建议：

- 构建与测试拆分：为测试单独建 `tsconfig.test.json`，避免测试文件影响生产构建。
- 解析策略统一：运行时是 Node 就选 `node` 系列；由 bundler 驱动就选 `bundler` 系列。
- 不在基础配置中设置 `outDir`/`rootDir`/`declaration`，避免对不同项目产生隐式影响。

## 配置说明

基础配置主要包含：

- 严格类型检查：`strict: true`
- 未使用检查：`noUnusedLocals` / `noUnusedParameters`
- 模块与 JSON 处理：`esModuleInterop` / `resolveJsonModule`
- 构建体验：`skipLibCheck` / `isolatedModules`

DOM、Node、Bundler 配置在基础上补充了 `target` / `module` / `lib` / `moduleResolution` / `types` 等环境相关选项。
Strict 配置在基础上补充了更严格的安全检查选项，建议先在小范围项目启用验证后再推广。

## 注意事项

1. 确保你的项目中已安装 `typescript` 作为开发依赖
2. 输出目录、声明文件、JSX 等项目级选项请在各自项目中覆盖
3. 建议在项目配置中明确指定 `include` 和 `exclude` 范围

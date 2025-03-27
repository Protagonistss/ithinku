# @ithinku/tsconfig

共享的 TypeScript 配置文件。

## 安装

```bash
pnpm add -D @ithinku/tsconfig
```

## 使用方法

在你的项目的 `tsconfig.json` 中继承这个配置：

```json
{
  "extends": "@ithinku/tsconfig/tsconfig.json",
  "compilerOptions": {
    // 你可以在这里覆盖或添加额外的编译选项
    "outDir": "dist",
    "rootDir": "src"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

## 配置说明

这个配置包含以下主要特性：

- 目标 ECMAScript 版本：ES2022
- 模块系统：Node16/ESM
- 严格的类型检查
  - `strict: true`
  - `noImplicitAny: true`
  - `strictNullChecks: true`
  - `strictFunctionTypes: true`
- 源码映射支持
  - `sourceMap: true`
- 装饰器支持
  - `experimentalDecorators: true`
- 其他优化选项
  - `skipLibCheck: true`
  - `esModuleInterop: true`

## 注意事项

1. 确保你的项目中已安装 `typescript` 作为开发依赖
2. 如果你需要修改编译输出目录，请在你的项目配置中设置 `outDir`
3. 建议在你的项目配置中明确指定 `include` 和 `exclude` 范围 
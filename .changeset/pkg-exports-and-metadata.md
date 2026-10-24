---
'@ithinku/shared': minor
'@ithinku/expr': patch
'@ithinku/eslint-config-base': minor
'@ithinku/eslint-config-ts': minor
'@ithinku/eslint-config-vue': minor
'@ithinku/eslint-config-react': minor
'@ithinku/prettier-config': patch
'@ithinku/tsconfig': patch
---

`@ithinku/shared` 增加 `exports` 与 `sideEffects: false`，并移除空的 `route` 导出。

`@ithinku/expr` 的类型产物改为由入口统一打包的单个 `dist/index.d.ts`。

ESLint 配置包的 `engines.node` 提高到 `>=20.19.0`。`eslint-config-base` 不再把 `prettier` 声明为 peer。`eslint-config-react` 的 `react` peer 覆盖 18 与 19。

`prettier-config` 与 `tsconfig` 补齐 `repository`、`homepage`、`bugs`，供发布 provenance 使用。

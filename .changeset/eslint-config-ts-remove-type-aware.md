---
'@ithinku/eslint-config-ts': patch
---

移除两条 type-aware 规则（`no-unnecessary-type-assertion`、`prefer-optional-chain`）：它们要求 `parserOptions.project`，任何未配置 typed-linting 的使用方（包括全部 `.vue` 项目）在 lint `.ts`/`.vue` 时会直接崩溃报错。已配置 project 的项目可自行重新启用。

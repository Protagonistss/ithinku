# @ithinku/eslint-config-vue

## 0.2.0

### Minor Changes

- df83991: 升级 eslint-plugin-vue 至 ^10.11.1、vue-eslint-parser 至 ^10.4.1，并修复若干配置缺陷（经真实 .vue 冒烟测试验证）：

  - **安全**：v9 已停维护，其传递依赖含已知漏洞（postcss-selector-parser@6.1.2；vue-eslint-parser@9 拖入 lodash@4.17.21）。升级后旧链全部移除。
  - **安全/体积**：`vue` peer 标记为 optional——eslint-plugin-vue 运行时并不需要 vue 包，此前 pnpm auto-install-peers 会把整棵 vue 树（含 @vue/server-renderer 等带漏洞组件）拖进 lint 依赖。
  - **修复**：末尾追加 eslint-config-prettier。plugin-vue 的 `flat/recommended` 会重新启用模板格式化规则，此前它排在 prettier 收尾配置之后，导致 eslint 与 Prettier/oxfmt 在模板格式上互相打架。
  - **修复**：移除自定义规则块中的三条格式化规则（`max-attributes-per-line` / `html-self-closing` / `html-closing-bracket-newline`），格式化统一交给格式化器。
  - eslint peer 放宽为 `^9.0.0 || ^10.0.0`；`files` glob 去重。

### Patch Changes

- Updated dependencies [df83991]
  - @ithinku/eslint-config-ts@0.1.2

## 0.1.1

### Patch Changes

- 8f70b76: Republish the ESLint config packages as `0.1.1` because npm permanently rejects reusing the previously published `0.1.0` version.
- Updated dependencies [8f70b76]
  - @ithinku/eslint-config-ts@0.1.1

## 0.1.0

### Minor Changes

- b8b346a: Upgrade `eslint-plugin-import-x` to a current ESLint 9-compatible release and align Node.js engine requirements to `>=18.18` across the ESLint config packages.

### Patch Changes

- Updated dependencies [b8b346a]
  - @ithinku/eslint-config-ts@0.1.0

## 0.0.8

### Patch Changes

- eb0e062: release the version
- Updated dependencies [eb0e062]
  - @ithinku/eslint-config-ts@0.0.8

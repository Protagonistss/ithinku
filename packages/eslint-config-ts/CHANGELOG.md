# @ithinku/eslint-config-ts

## 0.1.2

### Patch Changes

- df83991: 移除两条 type-aware 规则（`no-unnecessary-type-assertion`、`prefer-optional-chain`）：它们要求 `parserOptions.project`，任何未配置 typed-linting 的使用方（包括全部 `.vue` 项目）在 lint `.ts`/`.vue` 时会直接崩溃报错。已配置 project 的项目可自行重新启用。
- Updated dependencies [df83991]
  - @ithinku/eslint-config-base@0.1.2

## 0.1.1

### Patch Changes

- 8f70b76: Republish the ESLint config packages as `0.1.1` because npm permanently rejects reusing the previously published `0.1.0` version.
- Updated dependencies [8f70b76]
  - @ithinku/eslint-config-base@0.1.1

## 0.1.0

### Minor Changes

- b8b346a: Upgrade `eslint-plugin-import-x` to a current ESLint 9-compatible release and align Node.js engine requirements to `>=18.18` across the ESLint config packages.

### Patch Changes

- Updated dependencies [b8b346a]
  - @ithinku/eslint-config-base@0.1.0

## 0.0.8

### Patch Changes

- eb0e062: release the version
- Updated dependencies [eb0e062]
  - @ithinku/eslint-config-base@0.0.8

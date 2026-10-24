---
'@ithinku/eslint-config-base': minor
'@ithinku/eslint-config-ts': minor
'@ithinku/eslint-config-vue': minor
'@ithinku/eslint-config-react': minor
---

`eslint-plugin-eslint-comments` 换成仍在维护的 `@eslint-community/eslint-plugin-eslint-comments`，规则前缀改为 `@eslint-community/eslint-comments/`。

`eslint-plugin-unicorn` 升到 65（仍支持 ESLint 9 的最新版）。66 及以上要求 ESLint 10 和 Node 22，而 `eslint-plugin-react`、`eslint-plugin-jsx-a11y` 还不支持 ESLint 10，因此这套配置的 peer 收紧为 `eslint@^9.38.0`，不声明 ESLint 10。`eslint-plugin-promise` 升到 7。`eslint-plugin-react-hooks` 升到 7，并改用 flat 的 `recommended-latest`。

JSON / YAML 的 `files` 改为匹配子目录。删掉已废弃的 `no-return-await`、`spaced-comment`，以及本就会被格式化工具关掉的格式类规则。`ecmaVersion` 改为 `latest`。

关闭 `unicorn/no-array-sort`：`toSorted()` 需要 ES2023，而这套 tsconfig 的 `lib` 仍是 ES2022。

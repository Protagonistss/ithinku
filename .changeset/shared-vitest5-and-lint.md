---
'@ithinku/shared': patch
---

- 升级 vitest ^1 → ^5.0.5、@vitest/coverage-v8 / @vitest/ui 同步升级（并新增 vite ^8 peer 供给），清除 vite/tinypool/esbuild 一串 critical/high 级 dev 依赖漏洞；@types/node 升至 ^24
- 修复 lint 存量问题：去除非空断言（`!`），索引循环改为 `slice(0, -1)` 迭代；`toString` / `toBoolean` / `toArray` / `isEmptyDeep` 参数改为可选（与运行时对 undefined 的处理一致）

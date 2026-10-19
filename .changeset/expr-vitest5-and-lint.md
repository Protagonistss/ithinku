---
'@ithinku/expr': patch
---

- 升级 vitest ^1.6 → ^5.0.5（并新增 vite ^8 peer 供给），清除 vite@5.4.16 / tinypool / esbuild 一串 critical/high 级 dev 依赖漏洞；@types/node 升至 ^24
- 修复 lint 存量问题：AST switch 增加 never 穷尽性 default 分支；比较运算符映射表外提为模块常量（原每轮循环重建）；`throwFn` 外提至模块作用域；ParserError 补齐 position/input 参数
- tsconfig.test.json 补充 `rootDir: "."`（原 vitest.config.ts 不在 rootDir 下导致 typecheck 失败）

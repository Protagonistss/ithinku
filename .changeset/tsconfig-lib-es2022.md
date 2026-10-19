---
'@ithinku/tsconfig': patch
---

`lib` 从 ES2020 升至 ES2022（全部预设），支持 `.at()` / `String#replaceAll()` / `Object.hasOwn` 等新 API 的类型。仅影响类型检查，`target` 与产物不变。

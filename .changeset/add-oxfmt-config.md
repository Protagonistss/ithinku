---
"@ithinku/oxfmt-config": patch
---

Add new package `@ithinku/oxfmt-config` — a standalone oxfmt formatter configuration built on oxfmt's own capabilities (printWidth 100, single quotes, trailing commas, etc.), with oxfmt-exclusive `sortImports` and `sortPackageJson` enabled. Note: oxfmt does not support `extends`, so the package is consumed via `oxfmt -c`.

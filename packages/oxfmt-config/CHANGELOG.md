# @ithinku/oxfmt-config

## 0.1.0

### Minor Changes

- 776a940: Breaking: change default formatting style to no semicolons and no trailing commas (`semi: false`, `trailingComma: "none"`), single quotes kept. This changes formatter output.

## 0.0.1

### Patch Changes

- 1c9505d: Add new package `@ithinku/oxfmt-config` — a standalone oxfmt formatter configuration built on oxfmt's own capabilities (printWidth 100, single quotes, trailing commas, etc.), with oxfmt-exclusive `sortImports` and `sortPackageJson` enabled. Note: oxfmt does not support `extends`, so the package is consumed via `oxfmt -c`.

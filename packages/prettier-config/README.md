# @ithinku/prettier-config

Shared Prettier configuration for iThinkU projects.

## Install

```bash
pnpm add -D @ithinku/prettier-config
```

## Usage

Package.json:

```json
{
  "prettier": "@ithinku/prettier-config"
}
```

Or a config file:

```js
// .prettierrc.cjs
module.exports = require('@ithinku/prettier-config')
```

## Customize

Override in your local config as needed:

```js
// .prettierrc.cjs
module.exports = {
  ...require('@ithinku/prettier-config'),
  printWidth: 100
}
```

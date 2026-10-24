const tsConfig = require('@ithinku/eslint-config-ts')

module.exports = [
  ...tsConfig,
  {
    ignores: ['**/dist/**', '**/node_modules/**', '**/coverage/**', '**/.cursor/**']
  },
  // import 排序交给 oxfmt 的 sortImports，避免和 ESLint 互相改写
  {
    rules: {
      'import/order': 'off'
    }
  },
  // CommonJS Config Files & Rollup Configs
  {
    files: ['packages/eslint-config-*/**/*.js', 'eslint.config.js', '**/*.mjs'],
    rules: {
      'unicorn/prefer-module': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      'import/order': 'off'
    }
  },
  // TypeScript Packages
  {
    files: ['packages/expr/**/*.ts', 'packages/shared/**/*.ts'],
    languageOptions: {
      parserOptions: {
        project: [
          'packages/expr/tsconfig.json',
          'packages/expr/tsconfig.test.json',
          'packages/shared/tsconfig.json',
          'packages/shared/tsconfig.test.json'
        ],
        tsconfigRootDir: __dirname
      }
    },
    // 本仓库已配置 project，这里显式启用 type-aware 规则
    // （config-ts 为了对无 project 的使用方安全，默认不含这些规则）
    rules: {
      '@typescript-eslint/no-unnecessary-type-assertion': 'error',
      '@typescript-eslint/prefer-optional-chain': 'error'
    }
  }
]

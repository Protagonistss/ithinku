const baseConfig = require('@ithinku/eslint-config-base')
const tseslint = require('typescript-eslint')

module.exports = [
  ...baseConfig,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts', '**/*.vue'],
    rules: {
      'import/named': 'off',
      '@typescript-eslint/ban-ts-comment': [
        'error',
        { 'ts-ignore': 'allow-with-description' }
      ],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', disallowTypeAnnotations: false }
      ],
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
      '@typescript-eslint/consistent-indexed-object-style': ['error', 'record'],
      '@typescript-eslint/prefer-ts-expect-error': 'error',
      'no-use-before-define': 'off',
      '@typescript-eslint/no-use-before-define': [
        'error',
        {
          functions: false,
          classes: false,
          variables: true,
          typedefs: false
        }
      ],
      'no-caller': 'error',
      'no-iterator': 'error',
      'no-proto': 'error',
      'no-warning-comments': 'warn',
      'prefer-promise-reject-errors': 'error',
      'require-yield': 'error',
      'no-self-assign': 'error',
      'no-self-compare': 'error',
      'no-unsafe-optional-chaining': 'error',
      'no-useless-call': 'error',
      'no-useless-computed-key': 'error',
      'no-useless-concat': 'error',
      'no-useless-constructor': 'error',
      'no-useless-escape': 'error',
      'no-useless-rename': 'error',
      'no-useless-return': 'error',

      // TypeScript 代码质量规则
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_'
        }
      ],
      '@typescript-eslint/prefer-as-const': 'error',
      // Note: type-aware 规则（no-unnecessary-type-assertion / prefer-optional-chain）
      // 未在此启用：它们要求 parserOptions.project，否则对未配置 typed-linting 的
      // 使用方会直接报错崩溃。需要时请自行配置 project 后启用。
      '@typescript-eslint/explicit-function-return-type': [
        'warn',
        {
          allowExpressions: true,
          allowTypedFunctionExpressions: true,
          allowHigherOrderFunctions: true,
          allowDirectConstAssertionInArrowFunctions: true
        }
      ],
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/no-empty-interface': 'error',
      '@typescript-eslint/no-inferrable-types': 'error',
      '@typescript-eslint/unified-signatures': 'error'
    }
  }
]

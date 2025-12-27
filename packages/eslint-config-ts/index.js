const baseConfig = require('@ithinku/eslint-config-base');
const tseslint = require('typescript-eslint');

module.exports = [
  ...baseConfig,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts', '**/*.vue'],
    rules: {
      'import/named': 'off',
      '@typescript-eslint/ban-ts-comment': ['error', { 'ts-ignore': 'allow-with-description' }],
      '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports', disallowTypeAnnotations: false }],
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
      '@typescript-eslint/consistent-indexed-object-style': ['error', 'record'],
      '@typescript-eslint/prefer-ts-expect-error': 'error',
      'no-use-before-define': 'off',
      '@typescript-eslint/no-use-before-define': ['error', {
        functions: false,
        classes: false,
        variables: true,
        typedefs: false
      }],
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
      '@typescript-eslint/no-unused-vars': ['error', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_'
      }],
      '@typescript-eslint/prefer-as-const': 'error',
      // Note: explicit-function-return-type requires type information (project service)
      // Users should configure languageOptions.parserOptions.project in their own config if they want type-aware rules enabled globally
      '@typescript-eslint/explicit-function-return-type': ['warn', {
        allowExpressions: true,
        allowTypedFunctionExpressions: true,
        allowHigherOrderFunctions: true,
        allowDirectConstAssertionInArrowFunctions: true
      }],
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/no-empty-interface': 'error',
      '@typescript-eslint/no-inferrable-types': 'error',
      '@typescript-eslint/no-unnecessary-type-assertion': 'error',
      '@typescript-eslint/prefer-optional-chain': 'error',
      '@typescript-eslint/unified-signatures': 'error'
    }
  }
];
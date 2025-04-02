module.exports = {
  extends: [
    '@ithinku/eslint-config-base',
    'plugin:@typescript-eslint/recommended'
  ],
  rules: {
    'import/named': 'off',
    '@typescript-eslint/semi': ['error', 'never'],
    '@typescript-eslint/ban-ts-comment': ['error', { 'ts-ignore': 'allow-with-description' }],
    '@typescript-eslint/member-delimiter-style': ['error', { multiline: { delimiter: 'none' } }],
    '@typescript-eslint/type-annotation-spacing': ['error', {}],
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
    'require-await': 'error',
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
     // 代码质量规则
    'no-console': 'warn',
    'no-debugger': 'warn',
    'no-alert': 'warn',
    'no-eval': 'warn',
    'no-implied-eval': 'warn',
    'no-new-func': 'warn',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-vars': ['error', {
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_'
    }],
    '@typescript-eslint/prefer-as-const': 'error',
    '@typescript-eslint/explicit-function-return-type': ['error', {
      allowExpressions: true,
      allowTypedFunctionExpressions: true
    }],
    '@typescript-eslint/no-non-null-assertion': 'error',
    '@typescript-eslint/no-empty-interface': 'error',
    '@typescript-eslint/no-inferrable-types': 'error',
    '@typescript-eslint/no-unnecessary-type-assertion': 'error',
    '@typescript-eslint/prefer-optional-chain': 'error',
    '@typescript-eslint/unified-signatures': 'error'
  }
}

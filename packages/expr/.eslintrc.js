module.exports = {
  extends: ['@ithinku/eslint-config-base'],
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname
  },
  rules: {
    // 表达式解析相关规则
    'no-constant-condition': 'off', // 允许在表达式解析中使用常量条件
    'no-unused-expressions': 'off', // 关闭未使用表达式的警告
    'no-sequences': 'off', // 允许使用逗号运算符
    'no-void': 'off', // 允许使用 void 运算符
    'no-cond-assign': 'off', // 允许在条件语句中使用赋值
    'no-return-assign': 'off', // 允许在 return 语句中使用赋值
    
    // 运算符相关规则
    'operator-linebreak': ['error', 'before'], // 运算符换行规则
    'operator-assignment': ['error', 'always'], // 使用简写运算符
    
    // 代码风格规则
    'no-mixed-operators': ['error', {
      groups: [
        ['+', '-', '*', '/', '%', '**'],
        ['&', '|', '^', '~', '<<', '>>', '>>>'],
        ['==', '!=', '===', '!==', '>', '>=', '<', '<='],
        ['&&', '||'],
        ['in', 'instanceof']
      ],
      allowSamePrecedence: true
    }],
    
    // TypeScript 特定规则
    '@typescript-eslint/explicit-function-return-type': ['error', {
      allowExpressions: true,
      allowTypedFunctionExpressions: true
    }],
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-unused-vars': ['error', {
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_'
    }],
    '@typescript-eslint/no-non-null-assertion': 'error',
    '@typescript-eslint/no-empty-interface': 'error',
    '@typescript-eslint/no-inferrable-types': 'error',
    '@typescript-eslint/no-unnecessary-type-assertion': 'error',
    '@typescript-eslint/prefer-as-const': 'error',
    '@typescript-eslint/prefer-optional-chain': 'error',
    '@typescript-eslint/unified-signatures': 'error',
    
    // 代码质量规则
    'no-console': 'warn',
    'no-debugger': 'warn',
    'no-alert': 'warn',
    'no-eval': 'warn',
    'no-implied-eval': 'warn',
    'no-new-func': 'warn',
    
    // 最佳实践规则
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
    'no-useless-assignment': 'error',
    'no-useless-call': 'error',
    'no-useless-computed-key': 'error',
    'no-useless-concat': 'error',
    'no-useless-constructor': 'error',
    'no-useless-escape': 'error',
    'no-useless-rename': 'error',
    'no-useless-return': 'error',
    'no-useless-spread': 'error',
    'no-useless-undefined': 'error'
  }
} 
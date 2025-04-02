module.exports = {
  extends: ['@ithinku/eslint-config-ts', "prettier"],
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
    }]
  }
} 
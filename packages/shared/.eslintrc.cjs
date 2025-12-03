module.exports = {
  extends: ['@ithinku/eslint-config-ts'],
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname
  },
  rules: {},
  ignorePatterns: ['**/__tests__/**']
} 
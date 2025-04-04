module.exports = {
  extends: ['@ithinku/eslint-config-ts', "prettier"],
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname
  },
  rules: {},
  ignorePatterns: ['**/__tests__/**']
} 
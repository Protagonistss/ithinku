const tsConfig = require('@ithinku/eslint-config-ts');

module.exports = [
  ...tsConfig,
  {
    ignores: ['**/dist/**', '**/node_modules/**', '**/coverage/**', '**/.cursor/**']
  },
  // CommonJS Config Files & Rollup Configs
  {
    files: [
      'packages/eslint-config-*/**/*.js', 
      'eslint.config.js', 
      '**/.prettierrc.js',
      '**/*.mjs' // Rollup configs often use ESM syntax but might trigger some CJS rules if misidentified, but mainly for 'no-require-imports' if they use require.
    ],
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
    }
  },
  // Disable type-aware rules for files not in tsconfig (like vitest.config.ts if strictly not included)
  // Or simpler: just ensure they are included or ignored. 
  // For now, let's assume tsconfig.test.json includes them or we accept the error if not (and user fixes tsconfig).
];
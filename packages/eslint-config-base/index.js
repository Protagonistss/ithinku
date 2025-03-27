module.exports = {
  env: {
    es2022: true,
    browser: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:eslint-comments/recommended',
    'plugin:promise/recommended',
    'prettier'
  ],
  plugins: [
    '@typescript-eslint',
    'import',
    'eslint-comments',
    'promise',
    'prettier'
  ],
  ignorePatterns: [
    '*.min.*',
    'CHANGELOG.md',
    'dist',
    'LICENSE*',
    'output',
    'coverage',
    'public',
    'temp',
    'packages-lock.json',
    'pnpm-lock.yaml',
    'yarn.lock',
    '__snapshots__',
    '!.github',
    '!.vitepress',
    '!.vscode'
  ],
  overrides: [
    {
      files: ['*.json', '*.json5'],
      parser: 'jsonc-eslint-parser',
      rules: {
        'quotes': ['error', 'double'],
        'quote-props': ['error', 'always'],
        'comma-dangle': ['error', 'never']
      }
    },
    {
      files: ['*.yaml', '*.yml'],
      parser: 'yaml-eslint-parser',
      rules: {
        'spaced-comment': 'off'
      }
    },
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/explicit-function-return-type': ['error', {
          allowExpressions: true,
          allowTypedFunctionExpressions: true
        }],
        '@typescript-eslint/no-explicit-any': 'warn',
        '@typescript-eslint/no-unused-vars': ['error', {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_'
        }]
      }
    }
  ],
  rules: {
    // Import rules
    'import/order': ['error', {
      'groups': [
        'builtin',
        'external',
        'internal',
        'parent',
        'sibling',
        'index',
        'object',
        'type'
      ],
      'newlines-between': 'always',
      'alphabetize': { order: 'asc' }
    }],
    'import/first': 'error',
    'import/no-mutable-exports': 'error',
    'import/no-unresolved': 'off',
    'import/no-absolute-path': 'off',

    // Style rules
    'semi': 'off',
    'quotes': 'off',
    'quote-props': 'off',
    'indent': 'off',
    'comma-spacing': 'off',
    'comma-style': 'off',
    'comma-dangle': 'off',
    'no-multi-spaces': 'off',
    'array-bracket-spacing': 'off',
    'brace-style': 'off',
    'block-spacing': 'off',
    'space-before-function-paren': 'off',
    'template-curly-spacing': 'off',
    'arrow-parens': 'off',

    // Best practices
    'no-unused-vars': 'off',
    'no-param-reassign': 'error',
    'no-var': 'error',
    'prefer-const': ['error', {
      destructuring: 'any',
      ignoreReadBeforeAssign: true
    }],
    'prefer-arrow-callback': ['error', {
      allowNamedFunctions: false,
      allowUnboundThis: true
    }],
    'object-shorthand': ['error', 'always', {
      ignoreConstructors: false,
      avoidQuotes: true
    }],
    'prefer-rest-params': 'error',
    'prefer-spread': 'error',
    'prefer-template': 'error',

    // Error prevention
    'no-debugger': 'error',
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'no-constant-condition': 'warn',
    'no-return-await': 'error',
    'require-await': 'error',
    'no-return-assign': 'error',
    'no-case-declarations': 'error',
    'no-multi-str': 'error',
    'no-with': 'error',
    'no-void': 'error',
    'no-useless-escape': 'off',
    'vars-on-top': 'error',
    'block-scoped-var': 'error',
    'consistent-return': 'error',
    'complexity': ['warn', 10],
    'eqeqeq': ['error', 'always'],
    'no-alert': 'warn',

    // Comments
    'spaced-comment': ['error', 'always', {
      line: {
        markers: ['/'],
        exceptions: ['/', '#']
      },
      block: {
        markers: ['!'],
        exceptions: ['*'],
        balanced: true
      }
    }],

    'operator-linebreak': 'off',

    'prettier/prettier': 'error'
  }
}

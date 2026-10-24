const globals = require('globals')
const pluginUnicornModule = require('eslint-plugin-unicorn')
const pluginPromise = require('eslint-plugin-promise')
const pluginImportModule = require('eslint-plugin-import-x')
const pluginComments = require('@eslint-community/eslint-plugin-eslint-comments')
const configPrettier = require('eslint-config-prettier')
const parserJsonc = require('jsonc-eslint-parser')
const parserYaml = require('yaml-eslint-parser')

// unicorn 65 起只提供 ESM，Node 20.19+ 的 require(esm) 会包一层 default
const pluginUnicorn = pluginUnicornModule.default ?? pluginUnicornModule
const pluginImport = pluginImportModule.importX ?? pluginImportModule.default ?? pluginImportModule

module.exports = [
  {
    ignores: [
      '*.min.*',
      'CHANGELOG.md',
      'dist',
      'LICENSE*',
      'output',
      'coverage',
      'public',
      'temp',
      'package-lock.json',
      'pnpm-lock.yaml',
      'yarn.lock',
      '__snapshots__'
    ]
  },

  // 插件自带的 flat recommended。规则名已随主版本变化，直接采用其导出。
  pluginUnicorn.configs.recommended,
  pluginPromise.configs['flat/recommended'],

  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2025
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    plugins: {
      import: pluginImport,
      // recommended 仍是 eslintrc 形态（plugins 为字符串数组），这里按 flat config 自行注册
      '@eslint-community/eslint-comments': pluginComments
    },
    rules: {
      ...pluginComments.configs.recommended.rules,
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object'],
          'newlines-between': 'always',
          alphabetize: { order: 'asc' }
        }
      ],
      'import/first': 'error',
      'import/no-mutable-exports': 'error',
      'import/no-unresolved': 'off',
      'import/no-absolute-path': 'off',
      'import/no-duplicates': 'error',
      'import/no-cycle': 'warn',
      'import/no-self-import': 'error',

      'no-unused-vars': 'off',
      'no-param-reassign': 'error',
      'no-var': 'error',
      'prefer-const': [
        'error',
        {
          destructuring: 'any',
          ignoreReadBeforeAssign: true
        }
      ],
      'prefer-arrow-callback': [
        'error',
        {
          allowNamedFunctions: false,
          allowUnboundThis: true
        }
      ],
      'object-shorthand': [
        'error',
        'always',
        {
          ignoreConstructors: false,
          avoidQuotes: true
        }
      ],
      'prefer-rest-params': 'error',
      'prefer-spread': 'error',
      'prefer-template': 'error',

      'no-debugger': 'error',
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'no-constant-condition': 'warn',
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
      complexity: ['warn', 10],
      eqeqeq: ['error', 'always'],
      'no-alert': 'warn',

      // 与本配置既有宽松策略保持一致，避免 unicorn 新推荐规则突然改写存量代码风格
      'unicorn/prevent-abbreviations': 'off',
      'unicorn/no-null': 'off',
      'unicorn/no-array-reduce': 'off',
      'unicorn/no-array-callback-reference': 'off',
      'unicorn/no-array-for-each': 'off',
      'unicorn/filename-case': 'off',
      // toSorted 需要 ES2023，本套配置的 tsconfig 仍以 ES2022 为 lib
      'unicorn/no-array-sort': 'off'
    }
  },

  // JSON / YAML 只切换 parser。格式交给 oxfmt，核心格式规则作用不到这些 AST。
  {
    files: ['**/*.json', '**/*.json5'],
    languageOptions: {
      parser: parserJsonc
    }
  },
  {
    files: ['**/*.{yaml,yml}'],
    languageOptions: {
      parser: parserYaml
    }
  },

  configPrettier
]

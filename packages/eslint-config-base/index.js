const globals = require('globals');
const pluginUnicorn = require('eslint-plugin-unicorn');
const pluginPromise = require('eslint-plugin-promise');
const pluginImport = require('eslint-plugin-import-x');
const pluginComments = require('eslint-plugin-eslint-comments');
const configPrettier = require('eslint-config-prettier');
const parserJsonc = require('jsonc-eslint-parser');
const parserYaml = require('yaml-eslint-parser');

module.exports = [
  // 1. 全局忽略 (对应原 ignorePatterns)
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
      'packages-lock.json',
      'pnpm-lock.yaml',
      'yarn.lock',
      '__snapshots__',
      '!.github',
      '!.vitepress',
      '!.vscode'
    ]
  },

  // 2. JavaScript 基础配置
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    plugins: {
      'unicorn': pluginUnicorn,
      'promise': pluginPromise,
      'import': pluginImport, // 映射为 import，保持规则兼容
      'eslint-comments': pluginComments
    },
    rules: {
      // 引入推荐规则
      ...pluginUnicorn.configs['flat/recommended'].rules,
      ...pluginPromise.configs['flat/recommended'].rules,
      ...pluginComments.configs.recommended.rules,
      // import-x 暂无官方 flat recommended 导出，手动复用或配置
      // 这里手动配置原有的 import 规则
      
      // Import rules
      'import/order': ['error', {
        'groups': [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
          'object'
        ],
        'newlines-between': 'always',
        'alphabetize': { order: 'asc' }
      }],
      'import/first': 'error',
      'import/no-mutable-exports': 'error',
      'import/no-unresolved': 'off',
      'import/no-absolute-path': 'off',
      'import/no-duplicates': 'error',
      'import/no-cycle': 'warn',
      'import/no-self-import': 'error',

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

      // Unicorn rules overrides
      'unicorn/prevent-abbreviations': 'off',
      'unicorn/no-null': 'off',
      'unicorn/no-array-reduce': 'off',
      'unicorn/no-array-callback-reference': 'off',
      'unicorn/no-array-for-each': 'off',
      'unicorn/filename-case': 'off'
    }
  },

  // 3. JSON 文件配置
  {
    files: ['*.json', '*.json5'],
    languageOptions: {
      parser: parserJsonc
    },
    rules: {
      'quotes': ['error', 'double'],
      'quote-props': ['error', 'always'],
      'comma-dangle': ['error', 'never']
    }
  },

  // 4. YAML 文件配置
  {
    files: ['*.yaml', '*.yml'],
    languageOptions: {
      parser: parserYaml
    },
    rules: {
      'spaced-comment': 'off'
    }
  },

  // 5. Prettier 配置 (最后加载以覆盖冲突规则)
  configPrettier
];

const tsConfig = require('@ithinku/eslint-config-ts')
const pluginVue = require('eslint-plugin-vue')
const tseslint = require('typescript-eslint')
const configPrettier = require('eslint-config-prettier')

module.exports = [
  ...tsConfig,
  ...pluginVue.configs['flat/recommended'],
  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
        extraFileExtensions: ['.vue'],
        ecmaVersion: 2022,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    rules: {
      // Vue 3 最佳实践规则
      'vue/multi-word-component-names': 'off',
      'vue/no-v-html': 'warn',
      'vue/require-default-prop': 'off',
      'vue/require-prop-types': 'off',
      // 模板格式化（max-attributes-per-line / html-self-closing /
      // html-closing-bracket-newline）交给 Prettier / oxfmt 处理，
      // 不在此重复开启（eslint-config-prettier 已关闭这些规则，
      // 再开启会与格式化器互相打架）
      'vue/component-name-in-template-casing': [
        'error',
        'PascalCase',
        {
          registeredComponentsOnly: true,
          ignores: []
        }
      ],
      'vue/block-order': [
        'error',
        {
          order: [['script', 'template'], 'style']
        }
      ],
      'vue/no-unused-vars': 'error',
      'vue/no-v-text': 'error',
      'vue/no-v-text-v-html-on-component': 'error',
      'vue/no-v-for-template-key-on-child': 'error',

      // Vue 3 组合式 API 相关规则
      'vue/define-macros-order': [
        'error',
        {
          order: ['defineProps', 'defineEmits', 'defineExpose', 'defineOptions']
        }
      ],
      'vue/no-undef-components': 'error',
      'vue/no-undef-properties': 'error',
      'vue/no-unused-refs': 'error',
      'vue/no-unused-properties': 'error',
      'vue/no-unused-components': 'error',

      // Vue 3 性能相关规则
      'vue/no-async-in-computed-properties': 'error',
      'vue/no-side-effects-in-computed-properties': 'error',
      'vue/no-watch-after-await': 'error',
      'vue/no-mutating-props': 'error'
    }
  },
  // 收尾再加载一次 eslint-config-prettier：
  // plugin-vue 的 flat/recommended 会重新启用模板格式化规则，
  // 若不最后关闭，会与 Prettier / oxfmt 互相打架
  configPrettier
]

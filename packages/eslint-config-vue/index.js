module.exports = {
  extends: [
    '@ithinku/eslint-config-base',
    '@ithinku/eslint-config-ts',
    'plugin:vue/vue3-recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier'
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 2022,
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  env: {
    'vue/setup-compiler-macros': true
  },
  rules: {
    // Vue 3 最佳实践规则
    'vue/multi-word-component-names': 'off',
    'vue/no-v-html': 'warn',
    'vue/require-default-prop': 'off',
    'vue/require-prop-types': 'off',
    'vue/max-attributes-per-line': ['error', {
      singleline: 3,
      multiline: 1
    }],
    'vue/html-self-closing': ['error', {
      html: {
        void: 'always',
        normal: 'always',
        component: 'always'
      }
    }],
    'vue/html-closing-bracket-newline': ['error', {
      singleline: 'never',
      multiline: 'always'
    }],
    'vue/component-name-in-template-casing': ['error', 'PascalCase', {
      registeredComponentsOnly: true,
      ignores: []
    }],
    'vue/component-tags-order': ['error', {
      order: ['script', 'template', 'style']
    }],
    'vue/no-unused-vars': 'error',
    'vue/no-v-text': 'error',
    'vue/no-v-text-v-html-on-component': 'error',
    'vue/no-v-for-template-key-on-child': 'error',
    
    // Vue 3 组合式 API 相关规则
    'vue/define-macros-order': ['error', {
      order: ['defineProps', 'defineEmits', 'defineExpose', 'defineOptions']
    }],
    'vue/no-undef-components': 'error',
    'vue/no-undef-properties': 'error',
    'vue/no-unused-refs': 'error',
    'vue/no-unused-properties': 'error',
    'vue/no-unused-components': 'error',
    
    // Vue 3 性能相关规则
    'vue/no-async-in-computed-properties': 'error',
    'vue/no-side-effects-in-computed-properties': 'error',
    'vue/no-watch-after-await': 'error',
    'vue/no-mutating-props': 'error',
    
    // Vue 3 模板语法规则
    'vue/valid-template-root': 'error',
    'vue/valid-v-bind': 'error',
    'vue/valid-v-cloak': 'error',
    'vue/valid-v-else': 'error',
    'vue/valid-v-else-if': 'error',
    'vue/valid-v-for': 'error',
    'vue/valid-v-html': 'error',
    'vue/valid-v-if': 'error',
    'vue/valid-v-model': 'error',
    'vue/valid-v-on': 'error',
    'vue/valid-v-once': 'error',
    'vue/valid-v-pre': 'error',
    'vue/valid-v-show': 'error',
    'vue/valid-v-slot': 'error',
    'vue/valid-v-text': 'error'
  }
}

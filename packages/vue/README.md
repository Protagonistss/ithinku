# @ithinku/eslint-config-vue

Vue 3 项目的 ESLint 配置，基于 `@ithinku/eslint-config-base`。提供了一套完整的 Vue 3 + TypeScript + Prettier 代码规范配置。

## 特性

- 基于 `@ithinku/eslint-config-base` 的 Vue 3 配置
- 支持 TypeScript
- 集成 Prettier 格式化
- Vue 3 特定的代码规范
- 组合式 API 最佳实践
- 性能优化建议
- 组件命名规范
- 模板语法检查
- 属性排序和格式化

## 安装

```bash
npm install --save-dev @ithinku/eslint-config-vue
```

## 使用方法

在你的项目根目录创建 `.eslintrc.js` 文件：

```js
module.exports = {
  extends: ['@ithinku/eslint-config-vue']
}
```

## 配置说明

### 基础配置

该配置继承自以下配置：
- `@ithinku/eslint-config-base`: 基础 JavaScript/TypeScript 配置
- `plugin:vue/vue3-recommended`: Vue 3 推荐规则
- `@vue/eslint-config-typescript`: Vue 3 + TypeScript 支持
- `@vue/eslint-config-prettier`: Prettier 集成

### Vue 3 最佳实践规则

#### 组件规范
- `vue/multi-word-component-names`: 关闭组件名必须多单词的限制
- `vue/component-name-in-template-casing`: 强制组件名使用 PascalCase
- `vue/component-tags-order`: 强制组件标签顺序为 script、template、style

#### 属性规范
- `vue/no-v-html`: 警告使用 v-html 指令
- `vue/require-default-prop`: 关闭 props 必须设置默认值的限制
- `vue/require-prop-types`: 关闭 props 必须设置类型的限制
- `vue/max-attributes-per-line`: 限制每行属性的最大数量

#### 模板规范
- `vue/html-self-closing`: 强制使用自闭合标签
- `vue/html-closing-bracket-newline`: 控制结束标签的换行
- `vue/no-v-text`: 禁止使用 v-text 指令
- `vue/no-v-text-v-html-on-component`: 禁止在组件上使用 v-text 和 v-html

### 组合式 API 相关规则

- `vue/define-macros-order`: 定义宏的顺序规范
- `vue/no-undef-components`: 检查未定义的组件
- `vue/no-undef-properties`: 检查未定义的属性
- `vue/no-unused-refs`: 检查未使用的 ref
- `vue/no-unused-properties`: 检查未使用的属性
- `vue/no-unused-components`: 检查未使用的组件
- `vue/no-unused-imports`: 检查未使用的导入
- `vue/no-unused-macros`: 检查未使用的宏

### 性能相关规则

- `vue/no-async-in-computed-properties`: 禁止在计算属性中使用异步操作
- `vue/no-side-effects-in-computed-properties`: 禁止在计算属性中产生副作用
- `vue/no-watch-after-await`: 禁止在 watch 后使用 await
- `vue/no-mutating-props`: 禁止直接修改 props

### 模板语法规则

包含所有 Vue 指令的有效性检查：
- `vue/valid-template-root`
- `vue/valid-v-bind`
- `vue/valid-v-cloak`
- `vue/valid-v-else`
- `vue/valid-v-else-if`
- `vue/valid-v-for`
- `vue/valid-v-html`
- `vue/valid-v-if`
- `vue/valid-v-model`
- `vue/valid-v-on`
- `vue/valid-v-once`
- `vue/valid-v-pre`
- `vue/valid-v-show`
- `vue/valid-v-slot`
- `vue/valid-v-text`

### Prettier 配置

默认的 Prettier 配置：
```js
{
  semi: false,          // 不使用分号
  singleQuote: true,    // 使用单引号
  tabWidth: 2,          // 缩进宽度
  trailingComma: 'none', // 不使用尾随逗号
  printWidth: 100,      // 每行最大长度
  bracketSpacing: true, // 对象字面量中的括号空格
  arrowParens: 'avoid', // 箭头函数参数括号
  endOfLine: 'auto'     // 自动识别换行符
}
```

## 自定义配置

你可以通过创建自己的 `.eslintrc.js` 来覆盖默认配置：

```js
module.exports = {
  extends: ['@ithinku/eslint-config-vue'],
  rules: {
    // 覆盖 Prettier 规则
    'prettier/prettier': ['error', {
      semi: true,
      singleQuote: false,
      // ... 其他自定义规则
    }],
    // 覆盖 Vue 规则
    'vue/multi-word-component-names': 'error',
    // ... 其他自定义规则
  }
}
```

## 依赖要求

- ESLint >= 8.0.0
- TypeScript >= 4.0.0
- Vue >= 3.0.0
- Prettier >= 2.0.0

## 推荐的项目配置

### package.json

```json
{
  "scripts": {
    "lint": "eslint \"src/**/*.{js,ts,vue}\" --fix",
    "format": "prettier --write \"src/**/*.{js,ts,vue}\""
  }
}
```

### .prettierrc

```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "none",
  "printWidth": 100,
  "bracketSpacing": true,
  "arrowParens": "avoid",
  "endOfLine": "auto"
}
```

## 许可证

MIT 
# @ithinku/eslint-config-vue

Vue 3项目的ESLint配置，基于 `@ithinku/eslint-config-base` 并集成了Vue 3 + TypeScript最佳实践。

## ✨ 特性

- 基于 `@ithinku/eslint-config-base` 的Vue 3配置
- Vue 3专用规则和最佳实践
- TypeScript支持 (ESLint 8.x兼容)
- 组合式API最佳实践
- 模板语法检查
- 组件命名规范
- 性能优化建议
- 代码风格统一

## 📦 安装

```bash
npm install -D @ithinku/eslint-config-vue
```

或使用其他包管理器：

```bash
# 使用yarn
yarn add -D @ithinku/eslint-config-vue

# 使用pnpm
pnpm add -D @ithinku/eslint-config-vue
```

## 🚀 使用方法

在项目根目录创建 `.eslintrc.js` 文件：

```javascript
module.exports = {
  extends: ['@ithinku/eslint-config-vue']
}
```

### 与其他配置组合

```javascript
module.exports = {
  extends: [
    '@ithinku/eslint-config-vue',
    // 可以添加其他配置
  ],
  rules: {
    // 自定义规则
  }
}
```

## 🛠️ 配置详情

### 继承的配置

该配置继承自：
- `@ithinku/eslint-config-base`: 基础JavaScript配置
- `plugin:vue/vue3-recommended`: Vue 3推荐规则
- `@vue/eslint-config-typescript`: Vue 3 + TypeScript支持
- `@vue/eslint-config-prettier`: Prettier集成

### Parser配置

```javascript
{
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
  }
}
```

### 核心规则

#### 组件规范
- `vue/multi-word-component-names`: 关闭组件名必须多单词的限制
- `vue/component-name-in-template-casing`: 强制组件名使用PascalCase
- `vue/component-tags-order`: 强制组件标签顺序为 script、template、style

#### 属性规范
- `vue/no-v-html`: 警告使用v-html指令
- `vue/require-default-prop`: 关闭props必须设置默认值的限制
- `vue/require-prop-types`: 关闭props必须设置类型的限制
- `vue/max-attributes-per-line`: 限制每行属性的最大数量

#### 模板规范
- `vue/html-self-closing`: 强制使用自闭合标签
- `vue/html-closing-bracket-newline`: 控制结束标签的换行
- `vue/no-v-text`: 禁止使用v-text指令
- `vue/no-v-text-v-html-on-component`: 禁止在组件上使用v-text和v-html

#### 组合式API规则
- `vue/define-macros-order`: 定义宏的顺序规范
- `vue/no-undef-components`: 检查未定义的组件
- `vue/no-undef-properties`: 检查未定义的属性
- `vue/no-unused-refs`: 检查未使用的ref
- `vue/no-unused-properties`: 检查未使用的属性
- `vue/no-unused-components`: 检查未使用的组件

#### 性能相关规则
- `vue/no-async-in-computed-properties`: 禁止在计算属性中使用异步操作
- `vue/no-side-effects-in-computed-properties`: 禁止在计算属性中产生副作用
- `vue/no-watch-after-await`: 禁止在watch后使用await
- `vue/no-mutating-props`: 禁止直接修改props

#### 模板语法规则
包含所有Vue指令的有效性检查：
- `vue/valid-template-root`、`vue/valid-v-bind`
- `vue/valid-v-for`、`vue/valid-v-if`
- `vue/valid-v-model`、`vue/valid-v-on`
- 以及其他所有Vue指令验证规则

## 📋 依赖要求

| 依赖 | 版本要求 |
|------|----------|
| ESLint | ^8.57.0 |
| TypeScript | ^4.8.0 \|\| ^5.0.0 |
| Vue | ^3.0.0 |
| eslint-plugin-vue | ^10.3.0 |
| @vue/eslint-config-typescript | ^13.0.0 |
| @vue/eslint-config-prettier | ^9.0.0 |

## 🔧 推荐配置

### Vite配置

如果使用Vite，确保vite.config.ts正确配置：

```typescript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
```

### TypeScript配置

创建 `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowJs": true,
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "forceConsistentCasingInFileNames": true,
    "isolatedModules": true,
    "preserveValueImports": true,
    "resolveJsonModule": true,
    "jsx": "preserve"
  },
  "include": ["src/**/*.ts", "src/**/*.tsx", "src/**/*.vue"],
  "exclude": ["node_modules"]
}
```

### VS Code设置

创建 `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact",
    "vue"
  ],
  "vetur.validation.template": false,
  "vetur.validation.script": false,
  "vetur.validation.style": false
}
```

### npm脚本

在 `package.json` 中添加：

```json
{
  "scripts": {
    "lint": "eslint . --ext .vue,.js,.ts,.jsx,.tsx --ignore-path .gitignore",
    "lint:fix": "eslint . --ext .vue,.js,.ts,.jsx,.tsx --ignore-path .gitignore --fix",
    "type-check": "vue-tsc --noEmit",
    "format": "prettier --write \"src/**/*.{js,ts,vue,json,css,md}\""
  }
}
```

## 🎯 使用示例

### 单文件组件

```vue
<!-- good - 符合规范 -->
<script setup lang="ts">
interface Props {
  readonly title: string
  readonly count?: number
}

interface Emits {
  update: [value: number]
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const localCount = ref(props.count ?? 0)

const increment = () => {
  localCount.value++
  emit('update', localCount.value)
}

const message = computed(() => 
  `${props.title}: ${localCount.value}`
)
</script>

<template>
  <div class="counter">
    <h2>{{ message }}</h2>
    <button 
      type="button" 
      @click="increment"
    >
      增加
    </button>
  </div>
</template>

<style scoped>
.counter {
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>
```

### Composables

```typescript
// good - 符合规范
export function useCounter(initialValue = 0) {
  const count = ref(initialValue)

  const increment = () => {
    count.value++
  }

  const decrement = () => {
    count.value--
  }

  const reset = () => {
    count.value = initialValue
  }

  return {
    count: readonly(count),
    increment,
    decrement,
    reset
  }
}

// 使用
function MyComponent() {
  const { count, increment, decrement } = useCounter(10)

  return {
    count,
    increment,
    decrement
  }
}
```

### 组件通信

```vue
<!-- ParentComponent.vue -->
<script setup lang="ts">
const items = ref<string[]>(['Vue', 'React', 'Angular'])

const handleItemSelect = (item: string) => {
  console.log('Selected:', item)
}
</script>

<template>
  <div>
    <ItemList 
      :items="items"
      @item-select="handleItemSelect"
    />
  </div>
</template>

<!-- ItemList.vue -->
<script setup lang="ts">
interface Props {
  readonly items: string[]
}

interface Emits {
  itemSelect: [item: string]
}

defineProps<Props>()
const emit = defineEmits<Emits>()

const selectItem = (item: string) => {
  emit('itemSelect', item)
}
</script>

<template>
  <ul class="item-list">
    <li 
      v-for="item in items"
      :key="item"
      class="item"
      @click="selectItem(item)"
    >
      {{ item }}
    </li>
  </ul>
</template>
```

## 🔄 自定义配置

你可以通过覆盖规则来自定义配置：

```javascript
module.exports = {
  extends: ['@ithinku/eslint-config-vue'],
  rules: {
    // 启用组件名多单词要求
    'vue/multi-word-component-names': 'error',
    
    // 自定义属性排序
    'vue/attributes-order': ['error', {
      order: [
        'DEFINITION',
        'LIST_RENDERING',
        'CONDITIONALS',
        'RENDER_MODIFIERS',
        'GLOBAL',
        'UNIQUE',
        'TWO_WAY_BINDING',
        'OTHER_DIRECTIVES',
        'OTHER_ATTR',
        'EVENTS',
        'CONTENT'
      ]
    }],
    
    // 自定义标签顺序
    'vue/component-tags-order': ['error', {
      order: ['template', 'script', 'style']
    }]
  }
}
```

## 🐛 常见问题

### Q: 如何处理全局组件？

A: 在配置中声明全局组件：

```javascript
module.exports = {
  extends: ['@ithinku/eslint-config-vue'],
  rules: {
    'vue/no-undef-components': ['error', {
      ignorePatterns: ['router-link', 'router-view', 'el-*']
    }]
  }
}
```

### Q: 如何禁用某些Vue规则？

A: 在特定文件中使用ESLint注释：

```vue
<template>
  <!-- eslint-disable-next-line vue/no-v-html -->
  <div v-html="trustedHtml" />
</template>
```

### Q: 如何配置路径别名？

A: 在vite.config.ts和tsconfig.json中同时配置：

```typescript
// vite.config.ts
export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@components': fileURLToPath(new URL('./src/components', import.meta.url))
    }
  }
})

// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/components/*"]
    }
  }
}
```

## 📚 相关链接

- [Vue 3官方文档](https://vuejs.org/)
- [Vue 3组合式API](https://vuejs.org/guide/composition-api-introduction.html)
- [eslint-plugin-vue](https://eslint.vuejs.org/)
- [@vue/eslint-config-typescript](https://github.com/vuejs/eslint-config-typescript)

## 📄 许可证

MIT

## 🤝 贡献

欢迎提交Issue和Pull Request！

如果你发现问题或有改进建议，请：
1. 创建Issue描述问题
2. Fork项目并创建功能分支
3. 提交Pull Request 
# @ithinku/eslint-config-vue

🎨 现代化的 Vue 3 ESLint 配置，完整支持 TypeScript

## ✨ 特性

- 🎯 **Vue 3 专用**：针对 Vue 3 + Composition API 优化
- 📘 **完整 TypeScript 支持**：集成 `@ithinku/eslint-config-ts` 配置
- 🔧 **单文件组件 (SFC)**：完整的 `.vue` 文件支持
- 🎨 **Prettier 集成**：开箱即用的代码格式化
- 📦 **零配置**：安装即用，无需复杂配置

## 📦 安装

```bash
# npm
npm install -D @ithinku/eslint-config-vue

# yarn
yarn add -D @ithinku/eslint-config-vue

# pnpm
pnpm add -D @ithinku/eslint-config-vue
```

## 🚀 使用方法

### 基础配置

在项目根目录创建 `.eslintrc.js`：

```javascript
module.exports = {
  extends: ['@ithinku/eslint-config-vue'],
  // 如果使用 TypeScript，无需额外配置
  // 已自动集成 TypeScript 支持
}
```

### Vue 3 + TypeScript 项目

```javascript
// .eslintrc.js
module.exports = {
  extends: ['@ithinku/eslint-config-vue']
}
```

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "Node",
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "jsx": "preserve"
  }
}
```

### package.json 脚本

```json
{
  "scripts": {
    "lint": "eslint . --ext .vue,.js,.jsx,.ts,.tsx",
    "lint:fix": "eslint . --ext .vue,.js,.jsx,.ts,.tsx --fix"
  }
}
```

## 🎯 规则说明

### Vue 3 最佳实践

```vue
<!-- ✅ 推荐 -->
<template>
  <div>
    <MyComponent 
      :prop-name="value"
      @event-name="handler"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import MyComponent from './MyComponent.vue'

// 推荐的 macro 顺序
const props = defineProps<{
  title: string
}>()

const emit = defineEmits<{
  update: [value: string]
}>()

defineExpose({
  someMethod
})

// 组合式 API
const count = ref(0)
const doubled = computed(() => count.value * 2)

function someMethod() {
  // 方法实现
}
</script>
```

### 组件命名和结构

```vue
<!-- ✅ 推荐的组件标签顺序 -->
<script setup lang="ts">
// 脚本内容
</script>

<template>
  <!-- 模板内容 -->
</template>

<style scoped>
/* 样式内容 */
</style>
```

## 🔧 配置细节

### 继承的配置
- `@ithinku/eslint-config-base` - 基础 JavaScript 规则
- `@ithinku/eslint-config-ts` - TypeScript 规则
- `plugin:vue/vue3-recommended` - Vue 3 推荐规则
- `@vue/eslint-config-typescript` - Vue + TypeScript 集成
- `@vue/eslint-config-prettier` - Prettier 集成

### 自定义规则
- Vue 3 组合式 API 优化规则
- 单文件组件最佳实践
- 性能相关规则
- 无障碍访问规则

## 🔍 故障排除

### TypeScript 支持问题

如果遇到 TypeScript 相关的 ESLint 错误：

1. **确保安装了 TypeScript**：
   ```bash
   npm install -D typescript
   ```

2. **检查 tsconfig.json**：
   ```json
   {
     "compilerOptions": {
       "strict": true,
       "noImplicitAny": true
     }
   }
   ```

3. **VSCode 设置**：
   ```json
   {
     "eslint.validate": [
       "javascript",
       "javascriptreact",
       "typescript",
       "typescriptreact",
       "vue"
     ]
   }
   ```

### 常见错误

1. **组件命名错误**：
   ```javascript
   // ❌ 错误
   'vue/multi-word-component-names': 'error'
   
   // ✅ 已关闭，支持单词组件名
   'vue/multi-word-component-names': 'off'
   ```

2. **Props 类型检查**：
   ```typescript
   // ✅ 推荐使用 TypeScript 类型
   defineProps<{
     title: string
     count?: number
   }>()
   ```

## 📝 许可证

MIT

---

**需要帮助？** 请查看 [issues](https://github.com/ithinku/eslint-config/issues) 或提交新的问题。 
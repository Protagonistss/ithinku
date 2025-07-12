# iThinkU

现代化的ESLint配置包集合，为JavaScript、TypeScript、Vue和React项目提供统一的代码规范。

## 📦 包列表

### ESLint 配置包

- `@ithinku/eslint-config-base`: JavaScript项目的基础ESLint配置
- `@ithinku/eslint-config-ts`: TypeScript项目的ESLint配置  
- `@ithinku/eslint-config-vue`: Vue 3 + TypeScript项目的ESLint配置
- `@ithinku/eslint-config-react`: React + TypeScript项目的ESLint配置

### 工具包

- `@ithinku/expr`: TypeScript表达式解析器库
- `@ithinku/shared`: 共享工具函数库
- `@ithinku/tsconfig`: 通用TypeScript配置

## 🚀 快速开始

### 安装

```bash
# JavaScript项目
npm install -D @ithinku/eslint-config-base

# TypeScript项目  
npm install -D @ithinku/eslint-config-ts

# Vue 3 + TypeScript项目
npm install -D @ithinku/eslint-config-vue

# React + TypeScript项目
npm install -D @ithinku/eslint-config-react
```

### 使用

在项目根目录创建 `.eslintrc.js` 文件：

```javascript
// JavaScript项目
module.exports = {
  extends: ['@ithinku/eslint-config-base']
}

// TypeScript项目
module.exports = {
  extends: ['@ithinku/eslint-config-ts']
}

// Vue 3 项目
module.exports = {
  extends: ['@ithinku/eslint-config-vue']
}

// React 项目
module.exports = {
  extends: ['@ithinku/eslint-config-react']
}
```

## 🛠️ 功能特性

### @ithinku/eslint-config-base
- 现代JavaScript支持 (ES2022+)
- 导入/导出规则优化
- 代码风格统一
- 最佳实践建议
- 错误预防
- Unicorn规则集成
- Prettier集成

### @ithinku/eslint-config-ts
- 基于base配置
- TypeScript ESLint v7.x支持
- 类型安全检查
- 现代TypeScript特性
- 与ESLint 8.57+兼容

### @ithinku/eslint-config-vue
- 基于base配置
- Vue 3专用规则
- 组合式API最佳实践
- 模板语法检查
- 组件命名规范
- 性能优化建议
- TypeScript支持

### @ithinku/eslint-config-react
- 基于base配置
- React 17+新特性支持
- React Hooks规则
- JSX最佳实践
- 可访问性检查
- 组件开发规范
- TypeScript支持

## 📋 版本兼容性

| 工具 | 版本要求 |
|------|----------|
| ESLint | ^8.57.0 |
| TypeScript | ^4.8.0 \|\| ^5.0.0 |
| Vue | ^3.0.0 |
| React | ^17.0.0 \|\| ^18.0.0 |
| Node.js | >= 14 |

## 🔧 推荐配置

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
  ]
}
```

### 推荐的npm脚本

```json
{
  "scripts": {
    "lint": "eslint . --ext .js,.jsx,.ts,.tsx,.vue",
    "lint:fix": "eslint . --ext .js,.jsx,.ts,.tsx,.vue --fix",
    "format": "prettier --write \"**/*.{js,jsx,ts,tsx,vue,json,md}\""
  }
}
```

## 🏗️ 开发环境

### 环境要求

- Node.js >= 14
- pnpm
- npm账户访问权限

### 项目设置

```bash
# 安装依赖
pnpm install

# 构建包
pnpm run build

# 运行测试
pnpm run test

# 代码检查
pnpm run lint
```

## 📝 发布流程

### 发布所有包

```bash
pnpm run release
```

这将会：
1. 检查需要更新的包
2. 提示输入版本号
3. 创建git标签
4. 发布到npm

### 发布特定包

```bash
# 发布base配置
lerna publish --scope=@ithinku/eslint-config-base

# 发布TypeScript配置
lerna publish --scope=@ithinku/eslint-config-ts

# 发布Vue配置  
lerna publish --scope=@ithinku/eslint-config-vue

# 发布React配置
lerna publish --scope=@ithinku/eslint-config-react
```

### 版本管理

- 每个包可以独立版本控制
- 遵循语义化版本控制
- 版本类型由提交信息决定：
  - `feat:` - 新功能 (minor)
  - `fix:` - 错误修复 (patch)  
  - `BREAKING CHANGE:` - 破坏性变更 (major)

## 🔍 故障排除

发布失败时的检查项：
1. 检查npm权限
2. 确保所有测试通过
3. 验证package.json版本
4. 检查git状态
5. 尝试使用 `--skip-npm` 进行测试

## 📄 许可证

MIT

## 🤝 贡献

欢迎提交Issue和Pull Request！请确保：
- 遵循现有的代码风格
- 添加适当的测试
- 更新相关文档
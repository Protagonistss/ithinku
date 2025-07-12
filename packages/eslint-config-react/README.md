# @ithinku/eslint-config-react

React项目的ESLint配置，基于 `@ithinku/eslint-config-base` 并集成了React 17+、React Hooks和JSX可访问性最佳实践。

## ✨ 特性

- 基于 `@ithinku/eslint-config-base` 的React配置
- React 17+ 新特性支持 (不需要导入React)
- React Hooks 规则检查
- JSX 最佳实践规则
- 可访问性 (a11y) 检查
- TypeScript 友好配置
- 现代React开发模式支持
- 组件开发规范

## 📦 安装

```bash
npm install -D @ithinku/eslint-config-react
```

或使用其他包管理器：

```bash
# 使用yarn
yarn add -D @ithinku/eslint-config-react

# 使用pnpm  
pnpm add -D @ithinku/eslint-config-react
```

## 🚀 使用方法

在项目根目录创建 `.eslintrc.js` 文件：

```javascript
module.exports = {
  extends: ['@ithinku/eslint-config-react']
}
```

### 与TypeScript结合

```javascript
module.exports = {
  extends: [
    '@ithinku/eslint-config-base',
    '@ithinku/eslint-config-react'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    }
  }
}
```

## 🛠️ 配置详情

### 继承的配置

该配置继承自：
- `@ithinku/eslint-config-base`: 基础JavaScript配置
- `plugin:react/recommended`: React推荐规则
- `plugin:react-hooks/recommended`: React Hooks规则
- `plugin:jsx-a11y/recommended`: JSX可访问性规则

### 环境配置

```javascript
{
  env: {
    browser: true,
    es2022: true
  },
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
}
```

### 核心规则

#### React 17+ 规则
- `react/jsx-uses-react`: 关闭 (React 17+不需要导入React)
- `react/react-in-jsx-scope`: 关闭 (React 17+不需要导入React)
- `react/prop-types`: 关闭 (使用TypeScript时不需要PropTypes)

#### JSX规范
- `react/jsx-filename-extension`: 允许.jsx和.tsx文件
- `react/jsx-boolean-value`: 强制简写布尔属性
- `react/jsx-fragments`: 使用短语法Fragment
- `react/jsx-pascal-case`: 强制组件名使用PascalCase
- `react/jsx-sort-props`: 属性排序规则

#### 组件规范
- `react/function-component-definition`: 函数组件定义规范
- `react/jsx-no-useless-fragment`: 禁止无用的Fragment
- `react/jsx-props-no-spreading`: 允许props展开
- `react/require-default-props`: 关闭默认props要求

#### React Hooks规则
- `react-hooks/rules-of-hooks`: 强制Hooks使用规则
- `react-hooks/exhaustive-deps`: 检查Hooks依赖项

#### 可访问性规则
- `jsx-a11y/anchor-is-valid`: 检查链接有效性
- `jsx-a11y/alt-text`: 要求图片alt属性
- `jsx-a11y/aria-role`: 检查ARIA角色
- `jsx-a11y/click-events-have-key-events`: 点击事件键盘支持

## 📋 依赖要求

| 依赖 | 版本要求 |
|------|----------|
| ESLint | ^8.57.0 |
| React | ^17.0.0 \|\| ^18.0.0 |
| eslint-plugin-react | ^7.37.5 |
| eslint-plugin-react-hooks | ^5.2.0 |
| eslint-plugin-jsx-a11y | ^6.10.2 |

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
  "emmet.includeLanguages": {
    "javascriptreact": "html",
    "typescriptreact": "html"
  },
  "emmet.triggerExpansionOnTab": true
}
```

### npm脚本

在 `package.json` 中添加：

```json
{
  "scripts": {
    "lint": "eslint \"src/**/*.{js,jsx,ts,tsx}\"",
    "lint:fix": "eslint \"src/**/*.{js,jsx,ts,tsx}\" --fix",
    "format": "prettier --write \"src/**/*.{js,jsx,ts,tsx,json,css,md}\""
  }
}
```

### TypeScript配置

如果使用TypeScript，创建 `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": ["src"]
}
```

## 🎯 使用示例

### 函数组件

```tsx
// good - 符合规范
interface Props {
  readonly name: string
  readonly age?: number
  readonly onUpdate?: () => void
}

function UserCard({ name, age, onUpdate }: Props) {
  const handleClick = () => {
    onUpdate?.()
  }

  return (
    <div className="user-card">
      <h2>{name}</h2>
      {age && <p>Age: {age}</p>}
      <button type="button" onClick={handleClick}>
        Update
      </button>
    </div>
  )
}

export { UserCard }

// bad - 不符合规范
const UserCard = ({ name, age, onUpdate, ...rest }) => (
  <div className="user-card" {...rest}>
    <h2>{name}</h2>
    <p>Age: {age}</p>
    <div onClick={onUpdate}>Update</div>
  </div>
)
```

### Hooks使用

```tsx
// good - 符合规范
function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue)

  const increment = useCallback(() => {
    setCount(prev => prev + 1)
  }, [])

  const decrement = useCallback(() => {
    setCount(prev => prev - 1)
  }, [])

  return { count, increment, decrement }
}

function Counter() {
  const { count, increment, decrement } = useCounter()

  useEffect(() => {
    document.title = `Count: ${count}`
  }, [count])

  return (
    <div>
      <span>{count}</span>
      <button type="button" onClick={increment}>+</button>
      <button type="button" onClick={decrement}>-</button>
    </div>
  )
}

// bad - 不符合规范
function Counter() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    document.title = `Count: ${count}`
  }) // 缺少依赖项数组

  return (
    <div>
      <span>{count}</span>
      <div onClick={() => setCount(count + 1)}>+</div>
    </div>
  )
}
```

### 可访问性示例

```tsx
// good - 符合规范
function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">邮箱</label>
      <input
        id="email"
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        aria-describedby="email-error"
      />
      
      <label htmlFor="password">密码</label>
      <input
        id="password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
        aria-describedby="password-error"
      />
      
      <button type="submit" aria-label="登录">
        登录
      </button>
    </form>
  )
}

// bad - 不符合规范
function LoginForm() {
  return (
    <div>
      <input placeholder="邮箱" />
      <input type="password" placeholder="密码" />
      <div onClick={handleLogin}>登录</div>
    </div>
  )
}
```

## 🔄 自定义配置

你可以通过覆盖规则来自定义配置：

```javascript
module.exports = {
  extends: ['@ithinku/eslint-config-react'],
  rules: {
    // 允许props展开
    'react/jsx-props-no-spreading': 'off',
    
    // 自定义JSX缩进
    'react/jsx-indent': ['error', 4],
    
    // 要求PropTypes
    'react/prop-types': 'error',
    
    // 自定义组件命名
    'react/jsx-pascal-case': ['error', {
      allowAllCaps: true,
      ignore: ['div', 'span']
    }]
  },
  settings: {
    react: {
      version: '18.0'
    }
  }
}
```

## 🐛 常见问题

### Q: 如何处理React 17之前的项目？

A: 启用React导入检查：

```javascript
module.exports = {
  extends: ['@ithinku/eslint-config-react'],
  rules: {
    'react/jsx-uses-react': 'error',
    'react/react-in-jsx-scope': 'error'
  }
}
```

### Q: 如何禁用某些可访问性规则？

A: 在配置中覆盖：

```javascript
module.exports = {
  extends: ['@ithinku/eslint-config-react'],
  rules: {
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off'
  }
}
```

### Q: 如何配置路径别名？

A: 使用eslint-plugin-import设置：

```javascript
module.exports = {
  extends: ['@ithinku/eslint-config-react'],
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@', './src'],
          ['@components', './src/components']
        ],
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }
    }
  }
}
```

## 📚 相关链接

- [React官方文档](https://react.dev/)
- [React Hooks官方文档](https://react.dev/reference/react)
- [eslint-plugin-react](https://github.com/yannickcr/eslint-plugin-react)
- [eslint-plugin-jsx-a11y](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y)

## 📄 许可证

MIT

## 🤝 贡献

欢迎提交Issue和Pull Request！

如果你发现问题或有改进建议，请：
1. 创建Issue描述问题
2. Fork项目并创建功能分支  
3. 提交Pull Request 
# @ithinku/shared

高性能、零依赖、类型安全的 TypeScript 通用工具函数库。

旨在提供日常开发中最常用的数组、对象、类型判断和时间处理函数，所有函数均支持 Tree-shaking。

## ✨ 特性

- **轻量级**: 零外部依赖，打包体积极小。
- **Type-Safe**: 完备的 TypeScript 类型定义。
- **Immutable**: 数组操作默认不修改原数组（如 `sort`）。
- **Modular**: 支持按需导入。

## 📦 安装

```bash
npm install @ithinku/shared
# or
pnpm add @ithinku/shared
```

## 📚 API 文档

### 类型判断 (`Type`)

提供比 `typeof` 更精准的类型判断。

```typescript
import { isArray, isObject, isEmpty, isType } from '@ithinku/shared'

isArray([]) // true
isObject({}) // true
isObject(null) // false (注意：原生 typeof null === 'object')

// 智能判空 (支持 Array, Object, Map, Set, String)
isEmpty([]) // true
isEmpty({}) // true
isEmpty('') // true
isEmpty(0) // false (0 是有效值)
isEmpty(undefined) // true

// 获取真实类型字符串
isType(new Date()) // 'Date'
isType(/regex/) // 'RegExp'
```

### 数组工具 (`Array`)

**注意**：所有修改操作均返回新数组，不影响原数组。

```typescript
import { sort, unique, avg, max, min, mode, median } from '@ithinku/shared'

const arr = [3, 1, 2, 2]

// 排序 (返回新副本)
sort(arr) // [1, 2, 2, 3]
console.log(arr) // [3, 1, 2, 2] (原数组未变)

// 去重
unique(arr) // [3, 1, 2]

// 统计计算
avg([1, 2, 3]) // 2
max([1, 5, 2]) // 5 (空数组返回 undefined)
min([1, 5, 2]) // 1 (空数组返回 undefined)

// 众数
mode([1, 2, 2, 3]) // [2]

// 中位数
median([1, 3, 2]) // 2
```

### 时间处理 (`Time`)

轻量级的日期格式化工具。

```typescript
import { format } from '@ithinku/shared'

const date = new Date('2024-01-01 13:00:00')

// 默认格式: YYYY-MM-DD HH:mm:ss
format(date) // "2024-01-01 13:00:00"

// 自定义格式 (支持 YYYY, MM, DD, HH, mm, ss, SSS)
format(date, { format: 'YYYY/MM/DD' }) // "2024/01/01"
```

### 转换工具

```typescript
import { objToArr, arrToObj } from '@ithinku/shared'

const obj = { a: 1, b: 2 }
objToArr(obj) // [['a', 1], ['b', 2]]

const entries = [
  ['a', 1],
  ['b', 2]
]
arrToObj(entries) // { a: 1, b: 2 }
```

## 📄 License

MIT

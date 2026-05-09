# @ithinku/expr

[![npm version](https://img.shields.io/npm/v/@ithinku/expr.svg)](https://www.npmjs.com/package/@ithinku/expr)
[![license](https://img.shields.io/npm/l/@ithinku/expr.svg)](https://github.com/Protagonisths/ithinku/blob/main/LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue.svg)](https://www.typescriptlang.org/)

[English](./README.md) | **简体中文**

**现代化、高性能、类型安全的 TypeScript 表达式引擎**

`@ithinku/expr` 是一个零依赖的表达式解析与求值库，专为需要安全执行动态逻辑的场景而设计。它不仅支持丰富的数学运算、逻辑判断和函数调用，更提供了「原生函数编译」技术，让动态表达式拥有接近原生 JavaScript 的运行性能。

---

## ✨ 核心优势

- **🔒 极度安全**: 完全自研的词法与语法分析器，不使用 `eval()` 或 `new Function()`，杜绝注入风险。
- **🚀 顶尖性能**: 支持将 AST 预编译为原生 JS 函数（JIT），性能较传统树遍历提升 10-100 倍。
- **🛠️ 场景导向**: 内置对点号深层访问（`a.b.c`）、三元运算、字符串模板拼接的完美支持。
- **💪 类型安全**: 由 TypeScript 编写，提供完整的类型提示与 AST 访问者（Visitor）模式接口。

---

## 📖 典型应用场景

### 1. 🧩 低代码 / 无代码平台
在低代码场景中，用户经常需要通过公式配置组件属性或进行数据推导。
```typescript
// 配置：当库存小于安全水位时，背景变红
const formula = 'stock < safetyLevel ? "red" : "white"';
const style = {
  backgroundColor: Expression.evaluate(formula, { stock: 5, safetyLevel: 10 })
};
```

### 2. 🛡️ 规则引擎与表单校验
根据复杂的业务逻辑动态生成校验结果。
```typescript
// 规则：年龄大于18且已签署协议，或者拥有家长授权
const rule = '(age >= 18 && hasSigned) || hasParentalConsent';
const canAccess = Expression.evaluate(rule, {
  age: 16,
  hasSigned: false,
  hasParentalConsent: true
});
```

### 3. 📝 模板插值解析
实现类似 Vue/React 模板中的轻量级表达式计算。
```typescript
// 解析模板中的变量
const template = 'Hello, ${upper(user.name)}! You have ${count + 1} messages.';
```

### 4. ⚡ 高性能数据清洗
利用 `compileToFunction` 在大数据量遍历中保持极致性能。
```typescript
const filterFn = Expression.compileToFunction('item.price * item.tax > 100');
const expensiveItems = largeArray.filter(item => filterFn({ item }));
```

---

## 🚀 快速上手

### 安装
```bash
pnpm add @ithinku/expr
```

### 基础用法
```typescript
import { Expression } from '@ithinku/expr';

// 1. 简单计算
Expression.evaluate('1 + 2 * 3'); // 7

// 2. 使用变量与深层访问
const context = { user: { score: 95 }, base: 10 };
Expression.evaluate('user.score + base', context); // 105

// 3. 逻辑与三元运算
Expression.evaluate('score >= 60 ? "及格" : "不及格"', { score: 80 }); // "及格"
```

---

## 🎨 特性一览

| 类别 | 支持特性 | 示例 |
| :--- | :--- | :--- |
| **算术运算** | `+`, `-`, `*`, `/`, `%` (取模), `**` (幂) | `2 ** 10 === 1024` |
| **比较运算** | `<`, `>`, `<=`, `>=`, `==`, `!=` | `age >= 18` |
| **逻辑运算** | `&&` (与), `||` (或), `!` (非) | `!isValid && hasError` |
| **数值格式** | 整数、小数、科学计数法 | `1.2e3`, `.5`, `1e-5` |
| **字符串** | 单/双引号、转义、拼接 | `'Hello ' + name` |
| **内置函数** | 数学(sin/cos/max...)、字符串(len/trim...) | `max(a, b, c)`, `len(str)` |

---

## ⚡ 性能优化进阶

`@ithinku/expr` 提供了两种编译模式以应对不同频率的执行需求：

### 模式 A：预解析 (Pre-parse)
**适用场景**：同一个表达式需要执行多次，但环境较复杂。
```typescript
const compiled = Expression.compile('x * y'); 
compiled({ x: 10, y: 2 }); // 复用 AST，避免重复解析字符串
```

### 模式 B：原生函数编译 (Native Compilation) 🚀
**适用场景**：在循环、大数据处理中追求极致速度。
```typescript
const fastFn = Expression.compileToFunction('a + b'); 
// 内部通过 AST 生成原生 JS 代码，速度接近手写代码
fastFn({ a: 1, b: 2 });
```

---

## 🧩 扩展性

### 自定义函数
你可以向引擎注入自定义的业务函数：
```typescript
const functions = {
  isVip: (user) => user.level > 5,
  format: (val) => val.toFixed(2)
};
Expression.evaluate('isVip(user) ? format(price) : price', context, functions);
```

### AST 访问者模式 (Visitor Pattern)
通过暴露的 `ASTVisitor` 接口，你可以自定义 AST 的遍历行为（如实现静态分析、代码格式化等）。

---

## 📄 License

MIT © [Protagonisths](https://github.com/Protagonisths)

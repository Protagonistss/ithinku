# @ithinku/expr

[![npm version](https://img.shields.io/npm/v/@ithinku/expr.svg)](https://www.npmjs.com/package/@ithinku/expr)
[![license](https://img.shields.io/npm/l/@ithinku/expr.svg)](https://github.com/Protagonisths/ithinku/blob/main/LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue.svg)](https://www.typescriptlang.org/)

[English](./README.md) | **简体中文**

**现代化、高性能、类型安全的 TypeScript 表达式引擎**

`@ithinku/expr` 是一个零依赖的表达式解析与求值库。它将安全与性能完美结合，既能作为沙箱引擎执行动态逻辑，也能通过 JIT 编译提供原生级别的执行速度。

---

## ✨ 核心特性

- **🔒 双模式运行**: 提供极度安全的树遍历模式（沙箱）和极致性能的原生代码生成模式（JIT）。
- **🚀 顶尖性能**: JIT 预编译性能较传统解释器提升 10-100 倍处理。
- **🛠️ 场景导向**: 内置对点号深层访问（`a.b.c`）、三元运算、字符串模板拼接的完美支持。
- **💪 类型安全**: 由严格 TypeScript 编写，提供完整的类型提示与 AST 访问者（Visitor）模式接口。

---

## 🚀 快速上手

### 安装
```bash
pnpm add @ithinku/expr
```

### 基础用法
```typescript
import { Expression } from '@ithinku/expr';

// 1. 简单求值 (默认安全沙箱模式)
Expression.evaluate('score >= 60 ? "及格" : "不及格"', { score: 85 }); // "及格"

// 2. 变量与深层访问
const context = { user: { profile: { name: 'Alice' } } };
Expression.evaluate('user.profile.name', context); // "Alice"

// 3. 预编译 (适合重复执行)
const runner = Expression.compile('a + b * c');
runner({ a: 1, b: 2, c: 3 }); // 7
```

---

## 🔒 运行模式与安全说明

为了平衡安全与性能，引擎提供了两种求值路径：

| 模式 | 方法 | 实现原理 | 安全性 | 建议场景 |
| :--- | :--- | :--- | :--- | :--- |
| **沙箱模式** | `.evaluate()` | 纯 AST 树遍历 | **最高** (无 `eval/new Function`) | 处理不可信的用户输入 |
| **JIT 编译** | `.compileToFunction()` | AST 转原生代码 | **高** (受控的代码生成) | 在高性能循环或大数据处理中使用 |

> **安全提示**：`compileToFunction` 在内部通过 `new Function` 生成代码以获取极致性能，但其代码是由经过验证的 AST 生成，依然比直接调用 `eval` 安全得多。

---

## 🎨 特性一览

### 支持的运算符
- **算术**: `+`, `-`, `*`, `/`, `%` (取模), `**` (幂)
- **比较**: `<`, `>`, `<=`, `>=`, `==`, `!=`
- **逻辑**: `&&` (与), `||` (或), `!` (非) — *支持短路求值*
- **条件**: 三元运算符 `a ? b : c`
- **分组**: 括号 `( )` 改变优先级

### 内置函数清单
| 类别 | 函数列表 |
| :--- | :--- |
| **数学** | `abs`, `ceil`, `floor`, `round`, `sqrt`, `max`, `min`, `sin`, `cos`, `tan`, `log`, `pow` |
| **字符串** | `len(s)`, `upper(s)`, `lower(s)`, `trim(s)` |

---

## 🧩 进阶扩展

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

### 调试工具
使用 `AST.stringify()` 可视化 AST 结构：
```typescript
import { AST, Expression } from '@ithinku/expr';
const ast = Expression.parse('x + y * 2');
console.log(AST.stringify(ast));
```

---

## 🚨 错误处理

引擎提供三种结构化错误类，每种都携带清晰的上下文信息：

| 错误类 | 触发场景 | 特殊方法 |
| :--- | :--- | :--- |
| `LexerError` | 非法字符、未闭合字符串 | `getContext()` |
| `ParserError` | 语法错误（缺少操作数等） | `getContext()` |
| `EvaluationError` | 运行时错误（除零、未定义变量等） | — |

```typescript
try {
  Expression.evaluate('1 + * 2');
} catch (e) {
  if (e instanceof ParserError) {
    console.log(e.getContext()); // 带行号、列号和箭头指向的上下文
  }
}
```

---

## 📄 License

MIT © [Protagonisths](https://github.com/Protagonisths)

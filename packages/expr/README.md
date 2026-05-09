# @ithinku/expr

[![npm version](https://img.shields.io/npm/v/@ithinku/expr.svg)](https://www.npmjs.com/package/@ithinku/expr)
[![license](https://img.shields.io/npm/l/@ithinku/expr.svg)](https://github.com/Protagonisths/ithinku/blob/main/LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue.svg)](https://www.typescriptlang.org/)

**English** | [简体中文](./README.zh-CN.md)

**Modern, High-performance, and Type-safe Expression Engine for TypeScript**

`@ithinku/expr` is a zero-dependency expression parsing and evaluation library designed for secure dynamic logic execution. It supports extensive mathematical operations, logical reasoning, and function calls, while offering "Native Function Compilation" to achieve near-native JavaScript performance.

---

## ✨ Key Features

- **🔒 Ultra Secure**: Custom-built lexer and parser. No `eval()` or `new Function()`, completely eliminating injection risks.
- **🚀 Top Performance**: Supports pre-compiling AST into native JS functions (JIT), boosting performance by 10-100x compared to traditional tree traversal.
- **🛠️ Scenario Oriented**: Built-in support for deep property access (`a.b.c`), ternary operators, and string template concatenation.
- **💪 Type Safe**: Written in strict TypeScript, providing full type definitions and an AST Visitor pattern interface.

---

## 📖 Typical Use Cases

### 1. 🧩 Low-Code / No-Code Platforms
Used for configuring component properties or deriving data via formulas.
```typescript
// Config: Background turns red when stock is below safety level
const formula = 'stock < safetyLevel ? "red" : "white"';
const style = {
  backgroundColor: Expression.evaluate(formula, { stock: 5, safetyLevel: 10 })
};
```

### 2. 🛡️ Rule Engines & Form Validation
Dynamically generate business logic validation results.
```typescript
// Rule: Adult and signed agreement, OR has parental consent
const rule = '(age >= 18 && hasSigned) || hasParentalConsent';
const canAccess = Expression.evaluate(rule, {
  age: 16,
  hasSigned: false,
  hasParentalConsent: true
});
```

### 3. 📝 Template Interpolation
Lightweight expression calculation for template engines (like Vue/React).
```typescript
// Parse variables in templates
const template = 'Hello, ${upper(user.name)}! You have ${count + 1} messages.';
```

### 4. ⚡ High-Performance Data Processing
Maintain peak performance when iterating over massive datasets using `compileToFunction`.
```typescript
const filterFn = Expression.compileToFunction('item.price * item.tax > 100');
const expensiveItems = largeArray.filter(item => filterFn({ item }));
```

---

## 🚀 Quick Start

### Installation
```bash
pnpm add @ithinku/expr
```

### Basic Usage
```typescript
import { Expression } from '@ithinku/expr';

// 1. Simple Evaluation
Expression.evaluate('1 + 2 * 3'); // 7

// 2. Variables & Deep Access
const context = { user: { score: 95 }, base: 10 };
Expression.evaluate('user.score + base', context); // 105

// 3. Logic & Ternary Operators
Expression.evaluate('score >= 60 ? "Pass" : "Fail"', { score: 80 }); // "Pass"
```

---

## 🎨 Feature Overview

| Category | Supported Features | Example |
| :--- | :--- | :--- |
| **Arithmetic** | `+`, `-`, `*`, `/`, `%` (modulo), `**` (power) | `2 ** 10 === 1024` |
| **Comparison** | `<`, `>`, `<=`, `>=`, `==`, `!=` | `age >= 18` |
| **Logical** | `&&` (AND), `||` (OR), `!` (NOT) | `!isValid && hasError` |
| **Numeric** | Integer, Decimal, Scientific Notation | `1.2e3`, `.5`, `1e-5` |
| **String** | Single/Double quotes, Escaping, Concatenation | `'Hello ' + name` |
| **Functions** | Math (sin/cos/max...), String (len/trim...) | `max(a, b, c)`, `len(str)` |

---

## ⚡ Performance Optimization

`@ithinku/expr` provides two compilation modes for different execution frequencies:

### Mode A: Pre-parse
**Use Case**: Same expression executed multiple times in a complex environment.
```typescript
const compiled = Expression.compile('x * y'); 
compiled({ x: 10, y: 2 }); // Reuses AST, avoids re-parsing string
```

### Mode B: Native Compilation 🚀
**Use Case**: Extreme speed for hot loops or big data processing.
```typescript
const fastFn = Expression.compileToFunction('a + b'); 
// Generates native JS code from AST, near-native speed
fastFn({ a: 1, b: 2 });
```

---

## 🧩 Extensibility

### Custom Functions
Inject your own business functions into the engine:
```typescript
const functions = {
  isVip: (user) => user.level > 5,
  format: (val) => val.toFixed(2)
};
Expression.evaluate('isVip(user) ? format(price) : price', context, functions);
```

### AST Visitor Pattern
Use the `ASTVisitor` interface to customize AST traversal behavior (e.g., static analysis, formatting).

---

## 📄 License

MIT © [Protagonisths](https://github.com/Protagonisths)

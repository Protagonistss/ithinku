# @ithinku/expr

[![npm version](https://img.shields.io/npm/v/@ithinku/expr.svg)](https://www.npmjs.com/package/@ithinku/expr)
[![license](https://img.shields.io/npm/l/@ithinku/expr.svg)](https://github.com/Protagonisths/ithinku/blob/main/LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue.svg)](https://www.typescriptlang.org/)

**English** | [简体中文](./README.zh-CN.md)

**Modern, High-performance, and Type-safe Expression Engine for TypeScript**

`@ithinku/expr` is a zero-dependency expression parsing and evaluation library. It perfectly combines security with performance, serving both as a secure sandbox engine and a high-speed JIT-compiled evaluator.

---

## ✨ Key Features

- **🔒 Dual Modes**: Choose between ultra-secure tree-traversal (Sandbox) or extreme-speed native code generation (JIT).
- **🚀 Top Performance**: JIT compilation boosts performance by 10-100x compared to traditional interpreters.
- **🛠️ Scenario Oriented**: Built-in support for deep property access (`a.b.c`), ternary operators, and string template concatenation.
- **💪 Type Safe**: Written in strict TypeScript, providing full type definitions and an AST Visitor interface.

---

## 🚀 Quick Start

### Installation
```bash
pnpm add @ithinku/expr
```

### Basic Usage
```typescript
import { Expression } from '@ithinku/expr';

// 1. Simple Evaluation (Default Sandbox Mode)
Expression.evaluate('score >= 60 ? "Pass" : "Fail"', { score: 85 }); // "Pass"

// 2. Variables & Deep Access
const context = { user: { profile: { name: 'Alice' } } };
Expression.evaluate('user.profile.name', context); // "Alice"

// 3. Pre-compile (For repeated execution)
const runner = Expression.compile('a + b * c');
runner({ a: 1, b: 2, c: 3 }); // 7
```

---

## 🔒 Execution Modes & Security

The engine provides different execution paths to balance security and performance:

| Mode | Method | Implementation | Security | Use Case |
| :--- | :--- | :--- | :--- | :--- |
| **Sandbox** | `.evaluate()` | AST Tree Traversal | **Highest** (No `eval`/`new Function`) | Untrusted user input |
| **JIT** | `.compileToFunction()` | AST to Native Code | **High** (Controlled CodeGen) | Hot loops, Big data processing |

> **Security Note**: `compileToFunction` uses `new Function` internally for peak performance. However, the code is generated from a validated AST, making it significantly safer than raw `eval()`.

---

## 🎨 Feature Overview

### Supported Operators
- **Arithmetic**: `+`, `-`, `*`, `/`, `%` (modulo), `**` (power)
- **Comparison**: `<`, `>`, `<=`, `>=`, `==`, `!=`
- **Logical**: `&&` (AND), `||` (OR), `!` (NOT) — *Supports short-circuiting*
- **Conditional**: Ternary operator `a ? b : c`
- **Group**: Parentheses `( )` for precedence

### Built-in Functions
| Category | Functions |
| :--- | :--- |
| **Math** | `abs`, `ceil`, `floor`, `round`, `sqrt`, `max`, `min`, `sin`, `cos`, `tan`, `log`, `pow` |
| **String** | `len(s)`, `upper(s)`, `lower(s)`, `trim(s)` |

---

## 🧩 Advanced Usage

### Custom Functions
Inject business logic directly into the engine:
```typescript
const functions = {
  isVip: (user) => user.level > 5,
  format: (val) => val.toFixed(2)
};
Expression.evaluate('isVip(user) ? format(price) : price', context, functions);
```

### AST Visitor Pattern
Use the `ASTVisitor` interface to customize traversal (e.g., for static analysis or linting).

### Debugging Tools
Visualize the AST structure using `AST.stringify()`:
```typescript
import { AST, Expression } from '@ithinku/expr';
const ast = Expression.parse('x + y * 2');
console.log(AST.stringify(ast));
```

---

## 🚨 Error Handling

The engine provides structured error classes for precise debugging:

| Error Class | Trigger | Special Method |
| :--- | :--- | :--- |
| `LexerError` | Invalid characters, unterminated strings | `getContext()` |
| `ParserError` | Syntax errors (missing operands, etc.) | `getContext()` |
| `EvaluationError` | Runtime errors (division by zero, undefined variable) | — |

```typescript
try {
  Expression.evaluate('2 +');
} catch (e) {
  if (e instanceof ParserError) {
    console.log(e.getContext()); // Shows line/column with arrow pointer
  }
}
```

---

## 📄 License

MIT © [Protagonisths](https://github.com/Protagonisths)

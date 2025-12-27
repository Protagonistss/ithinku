# @ithinku/expr

A powerful and type-safe TypeScript expression parser and evaluator.

Capable of parsing mathematical expressions, handling variables, and executing safe evaluations.

## ✨ Features

- **Safe Evaluation**: Does not use `eval()` or `Function()`.
- **Variable Support**: Supports dynamic variable injection.
- **Arithmetic Operations**: `+`, `-`, `*`, `/`, unary `-`.
- **Scientific Notation**: Supports `1.2e3`, `1e-5`.
- **Error Handling**: Detailed error messages for syntax errors or runtime issues (e.g., division by zero).
- **TypeScript**: Written in strict TypeScript.

## 📦 Installation

```bash
npm install @ithinku/expr
```

## 🚀 Usage

### Simple Evaluation

```typescript
import { Expression } from '@ithinku/expr';

// Basic math
const result = Expression.evaluate('2 * (3 + 4)');
console.log(result); // 14

// Scientific notation
console.log(Expression.evaluate('1e2 * 3')); // 300
```

### Using Variables (Context)

```typescript
import { Expression } from '@ithinku/expr';

const context = { 
  x: 10, 
  y: 5,
  user: {
    age: 18
  }
};

// Access variables including nested properties
const result = Expression.evaluate('x * y + user.age', context);
console.log(result); // 10 * 5 + 18 = 68
```

### Advanced: Parser & Evaluator Separation

For better performance when evaluating the same expression multiple times with different variables.

```typescript
import { Parser, Evaluator } from '@ithinku/expr';

// 1. Parse once (Build AST)
const parser = new Parser('x * 2 + y');
const ast = parser.parse();

// 2. Create Evaluator
const evaluator = new Evaluator({ x: 10, y: 1 });

// 3. Evaluate multiple times
console.log(evaluator.evaluate(ast)); // 21

// Update variable
evaluator.setVariable('x', 20);
console.log(evaluator.evaluate(ast)); // 41
```

## ⚠️ Error Handling

```typescript
try {
  Expression.evaluate('1 / 0');
} catch (error) {
  // Error: Division by zero
}

try {
  Expression.evaluate('unknown_var * 2');
} catch (error) {
  // Error: Undefined variable: unknown_var
}
```

## 📄 License

MIT
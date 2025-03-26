# @ithinku/expr

A TypeScript expression parser library that can evaluate mathematical expressions with variables.

## Features

- Parse and evaluate mathematical expressions
- Support for basic arithmetic operations (+, -, *, /)
- Variable support
- Parentheses for grouping
- Error handling for undefined variables and division by zero

## Installation

```bash
npm install @ithinku/expr
# or
yarn add @ithinku/expr
# or
pnpm add @ithinku/expr
```

## Usage

### Basic Usage

```typescript
import { Expression } from '@ithinku/expr';

// Simple arithmetic
const result1 = Expression.evaluate('2 * (3 + 4)');
console.log(result1); // 14

// Using variables
const context = { x: 10, y: 5 };
const result2 = Expression.evaluate('x * y + 2', context);
console.log(result2); // 52
```

### Advanced Usage

```typescript
import { Parser, Evaluator } from '@ithinku/expr';

// Create a parser and evaluator instance for reuse
const parser = new Parser('2 * x + y');
const evaluator = new Evaluator({ x: 10, y: 5 });

// Parse the expression once
const ast = parser.parse();

// Evaluate with different contexts
console.log(evaluator.evaluate(ast)); // 25

// Update variables
evaluator.setVariable('x', 20);
console.log(evaluator.evaluate(ast)); // 45
```

## Error Handling

The library throws errors for various cases:

```typescript
// Division by zero
try {
  Expression.evaluate('1 / 0');
} catch (error) {
  console.error(error.message); // "Division by zero"
}

// Undefined variable
try {
  Expression.evaluate('x + 1');
} catch (error) {
  console.error(error.message); // "Undefined variable: x"
}

// Invalid syntax
try {
  Expression.evaluate('2 + * 3');
} catch (error) {
  console.error(error.message); // "Unexpected token: ..."
}
```

## License

MIT 
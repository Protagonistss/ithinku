# @ithinku/expr

A TypeScript expression parser library that can evaluate mathematical expressions with variables.

## Features

- Parse and evaluate mathematical expressions
- Support for basic arithmetic operations (+, -, *, /)
- Support unary operators and scientific notation numbers
- Variable support
- Parentheses for grouping
- Error handling for undefined variables and division by zero
- Strict TypeScript support
- Comprehensive ESLint configuration

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

### Compile and Parse

```typescript
import { Expression } from '@ithinku/expr';

const ast = Expression.parse('x * 2');
const compiled = Expression.compile('x * 2');

console.log(compiled({ x: 10 })); // 20
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

## Development

### ESLint Configuration

This project uses a custom ESLint configuration based on `@ithinku/eslint-config-base`. The configuration includes:

- TypeScript-specific rules
- Expression parsing specific rules
- Code quality rules
- Best practices

Key rules include:
- Strict TypeScript type checking
- Expression parsing specific allowances
- Operator precedence and formatting
- Code quality and best practices

To run the linter:
```bash
pnpm run lint
```

### Building

```bash
pnpm run build
```

### Testing

```bash
pnpm run test
```

## License

MIT 

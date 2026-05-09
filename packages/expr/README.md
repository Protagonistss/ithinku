# @ithinku/expr

A powerful and type-safe TypeScript expression parser and evaluator.

Capable of parsing mathematical expressions, handling variables, executing safe evaluations, supporting comparisons, logical operators, conditional expressions, function calls, and string operations.

## Features

- **Safe Evaluation**: Does not use `eval()` or `Function()`.
- **Variable Support**: Supports dynamic variable injection with dot notation.
- **Arithmetic Operations**: `+`, `-`, `*`, `/`, `%` (modulo), `**` (power).
- **Comparison Operators**: `<`, `>`, `<=`, `>=`, `==`, `!=`.
- **Logical Operators**: `&&`, `||`, `!`.
- **Conditional Expression**: `condition ? a : b` (ternary).
- **Function Calls**: Built-in math and string functions, plus custom functions.
- **String Literals**: Double-quoted `"hello"` and single-quoted `'world'` with escape sequences.
- **Scientific Notation**: Supports `1.2e3`, `1e-5`.
- **Error Handling**: Detailed error messages for syntax errors or runtime issues.
- **TypeScript**: Written in strict TypeScript.
- **Visitor Pattern**: Extensible `ASTVisitor` interface for custom AST traversal.
- **Native Compilation**: `compileToFunction()` compiles expressions to native JS functions for maximum performance.

## Installation

```bash
npm install @ithinku/expr
```

## Usage

### Simple Evaluation

```typescript
import { Expression } from '@ithinku/expr'

// Basic math
Expression.evaluate('2 * (3 + 4)') // 14

// Modulo and power
Expression.evaluate('10 % 3')  // 1
Expression.evaluate('2 ** 10') // 1024

// Scientific notation
Expression.evaluate('1e2 * 3') // 300
```

### Using Variables (Context)

```typescript
const context = {
  x: 10,
  y: 5,
  user: {
    age: 18
  }
}

Expression.evaluate('x * y + user.age', context) // 68
```

### Comparison and Logic

```typescript
Expression.evaluate('3 > 2')               // true
Expression.evaluate('x > y && x < 100', { x: 10, y: 5 }) // true
Expression.evaluate('!(3 > 5)')            // true
```

### Conditional Expression

```typescript
Expression.evaluate('score >= 60 ? "pass" : "fail"', { score: 85 }) // "pass"

// Nested ternary
Expression.evaluate('x > y ? x : y', { x: 3, y: 7 }) // 7
```

### Function Calls

Built-in math functions: `abs`, `ceil`, `floor`, `round`, `sqrt`, `max`, `min`, `sin`, `cos`, `tan`, `log`, `pow`.

Built-in string functions: `len`, `upper`, `lower`, `trim`.

```typescript
Expression.evaluate('abs(-5)')        // 5
Expression.evaluate('max(1, 3, 2)')   // 3
Expression.evaluate('sqrt(16)')       // 4
Expression.evaluate('len("hello")')   // 5
Expression.evaluate('upper("hi")')    // "HI"
```

### Custom Functions

```typescript
const functions = {
  double: (x: number) => x * 2,
  greet: (name: string) => 'Hello, ' + name
}

Expression.evaluate('double(5)', {}, functions)              // 10
Expression.evaluate('greet("World")', {}, functions)        // "Hello, World"
```

### Strings

```typescript
Expression.evaluate('"hello" + " " + "world"') // "hello world"
Expression.evaluate('"count: " + 5')           // "count: 5"
Expression.evaluate('"abc" == "abc"')          // true
```

### Advanced: Compile for Performance

**Tree-walking compile** — parse once, reuse Evaluator, evaluate many times:

```typescript
const compiled = Expression.compile('x * 2 + y')

compiled({ x: 10, y: 1 }) // 21
compiled({ x: 20, y: 3 }) // 43
```

**Native compile** — compiles AST to a native JavaScript function (10-100x faster for hot loops):

```typescript
const fn = Expression.compileToFunction('x * 2 + y')

fn({ x: 10, y: 1 }) // 21
fn({ x: 20, y: 3 }) // 43
```

### Advanced: Visitor Pattern

Implement `ASTVisitor<T>` for custom AST traversal (serialization, analysis, optimization):

```typescript
import { ASTVisitor, walk } from '@ithinku/expr'

class Serializer implements ASTVisitor<string> {
  visitNumber(node) { return String(node.value) }
  visitBinary(node) {
    return `(${this.visit(node.left)} ${node.operator} ${this.visit(node.right)})`
  }
  // ... implement other visit methods
}

const serializer = new Serializer()
walk(ast, serializer) // returns string representation
```

Parse once, evaluate many times with different contexts.

### Advanced: Parser & Evaluator Separation

```typescript
import { Parser, Evaluator } from '@ithinku/expr'

const parser = new Parser('x * 2 + y')
const ast = parser.parse()

const evaluator = new Evaluator({ x: 10, y: 1 })
evaluator.evaluate(ast) // 21

evaluator.setVariable('x', 20)
evaluator.evaluate(ast) // 41
```

## Error Handling

```typescript
try {
  Expression.evaluate('1 / 0')
} catch (error) {
  // Error: Division by zero
}

try {
  Expression.evaluate('unknown_var * 2')
} catch (error) {
  // Error: Undefined variable: unknown_var
}

try {
  Expression.evaluate('unknown_fn(1)')
} catch (error) {
  // Error: Unknown function: unknown_fn
}
```

## License

MIT

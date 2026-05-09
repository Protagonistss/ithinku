import { describe, expect, it } from 'vitest'

import { Expression } from '../index'

describe('Expression', () => {
  it('should evaluate simple arithmetic', () => {
    expect(Expression.evaluate('2 + 3')).toBe(5)
    expect(Expression.evaluate('2 * 3')).toBe(6)
    expect(Expression.evaluate('10 - 4')).toBe(6)
    expect(Expression.evaluate('15 / 3')).toBe(5)
  })

  it('should evaluate expressions with variables', () => {
    const context = { x: 10, y: 5 }
    expect(Expression.evaluate('x + y', context)).toBe(15)
    expect(Expression.evaluate('x * y', context)).toBe(50)
    expect(Expression.evaluate('x - y', context)).toBe(5)
    expect(Expression.evaluate('x / y', context)).toBe(2)
  })

  it('should evaluate nested expressions', () => {
    expect(Expression.evaluate('2 * (3 + 4)')).toBe(14)
    expect(Expression.evaluate('(2 + 3) * (4 - 1)')).toBe(15)
  })

  it('should evaluate expressions with nested object properties', () => {
    const context = {
      user: {
        score: 100,
        stats: {
          multiplier: 2
        }
      }
    }

    expect(
      Expression.evaluate('user.score * user.stats.multiplier', context)
    ).toBe(200)
  })

  it('should handle operator precedence', () => {
    expect(Expression.evaluate('2 + 3 * 4')).toBe(14)
    expect(Expression.evaluate('(2 + 3) * 4')).toBe(20)
    expect(Expression.evaluate('10 - 2 * 3')).toBe(4)
  })

  it('should evaluate unary and exponent numbers', () => {
    expect(Expression.evaluate('-1 + .5')).toBe(-0.5)
    expect(Expression.evaluate('1e3 + 2')).toBe(1002)
  })

  it('should parse and compile expressions', () => {
    const ast = Expression.parse('x * 2')
    const compiled = Expression.compile('x * 2')
    expect(Expression.evaluate('x * 2', { x: 3 })).toBe(6)
    expect(compiled({ x: 3 })).toBe(6)
    expect(ast).toBeDefined()
  })

  it('should throw error for invalid expressions', () => {
    expect(() => Expression.evaluate('2 +')).toThrow()
    expect(() => Expression.evaluate('* 2')).toThrow()
  })

  it('should throw error for undefined variables', () => {
    expect(() => Expression.evaluate('x + 1')).toThrow('Undefined variable: x')
  })

  it('should throw error for invalid property access', () => {
    const context = { x: 10 }
    expect(() => Expression.evaluate('x.y', context)).toThrow(
      'Cannot access property y of number'
    )
  })

  it('should evaluate modulo operator', () => {
    expect(Expression.evaluate('10 % 3')).toBe(1)
    expect(Expression.evaluate('7 % 2')).toBe(1)
    expect(Expression.evaluate('9 % 3')).toBe(0)
  })

  it('should evaluate power operator', () => {
    expect(Expression.evaluate('2 ** 3')).toBe(8)
    expect(Expression.evaluate('3 ** 2')).toBe(9)
    expect(Expression.evaluate('2 ** 0')).toBe(1)
  })

  it('should evaluate power operator as right-associative', () => {
    // 2 ** 3 ** 2 = 2 ** 9 = 512
    expect(Expression.evaluate('2 ** 3 ** 2')).toBe(512)
  })

  it('should handle modulo division by zero', () => {
    expect(() => Expression.evaluate('10 % 0')).toThrow('Division by zero')
  })

  it('should evaluate comparison operators', () => {
    expect(Expression.evaluate('3 > 2')).toBe(true)
    expect(Expression.evaluate('2 > 3')).toBe(false)
    expect(Expression.evaluate('3 < 2')).toBe(false)
    expect(Expression.evaluate('2 < 3')).toBe(true)
    expect(Expression.evaluate('3 >= 3')).toBe(true)
    expect(Expression.evaluate('3 <= 2')).toBe(false)
    expect(Expression.evaluate('3 == 3')).toBe(true)
    expect(Expression.evaluate('3 == 2')).toBe(false)
    expect(Expression.evaluate('3 != 2')).toBe(true)
    expect(Expression.evaluate('3 != 3')).toBe(false)
  })

  it('should evaluate logical operators', () => {
    expect(Expression.evaluate('1 > 0 && 2 > 1')).toBe(true)
    expect(Expression.evaluate('1 > 0 && 2 < 1')).toBe(false)
    expect(Expression.evaluate('1 > 0 || 2 < 1')).toBe(true)
    expect(Expression.evaluate('1 < 0 || 2 < 1')).toBe(false)
  })

  it('should evaluate not operator', () => {
    expect(Expression.evaluate('!(1 > 2)')).toBe(true)
    expect(Expression.evaluate('!(2 > 1)')).toBe(false)
  })

  it('should evaluate complex boolean expressions', () => {
    // (a > b) && (c < d) || (e == f)
    expect(Expression.evaluate('(3 > 2) && (1 < 5)')).toBe(true)
    expect(Expression.evaluate('(3 > 2) && (1 > 5) || (2 == 2)')).toBe(true)
  })

  it('should respect operator precedence: comparison before logical', () => {
    // 1 > 0 && 2 > 1 should be (1 > 0) && (2 > 1)
    expect(Expression.evaluate('1 > 0 && 2 > 1')).toBe(true)
    // arithmetic before comparison
    expect(Expression.evaluate('1 + 2 > 2')).toBe(true)
    expect(Expression.evaluate('1 + 2 == 3')).toBe(true)
  })

  it('should evaluate comparison with variables', () => {
    const context = { x: 10, y: 5 }
    expect(Expression.evaluate('x > y', context)).toBe(true)
    expect(Expression.evaluate('x < y', context)).toBe(false)
    expect(Expression.evaluate('x == 10', context)).toBe(true)
    expect(Expression.evaluate('x != y', context)).toBe(true)
  })

  it('should evaluate built-in functions', () => {
    expect(Expression.evaluate('abs(-5)')).toBe(5)
    expect(Expression.evaluate('ceil(1.2)')).toBe(2)
    expect(Expression.evaluate('floor(1.8)')).toBe(1)
    expect(Expression.evaluate('round(1.5)')).toBe(2)
    expect(Expression.evaluate('sqrt(16)')).toBe(4)
    expect(Expression.evaluate('max(1, 3, 2)')).toBe(3)
    expect(Expression.evaluate('min(1, 3, 2)')).toBe(1)
    expect(Expression.evaluate('pow(2, 3)')).toBe(8)
  })

  it('should evaluate functions with expressions as arguments', () => {
    expect(Expression.evaluate('max(1 + 2, 3 * 2)')).toBe(6)
    expect(Expression.evaluate('abs(3 - 10)')).toBe(7)
  })

  it('should evaluate functions with variables', () => {
    expect(Expression.evaluate('abs(x)', { x: -10 })).toBe(10)
    expect(Expression.evaluate('max(x, y)', { x: 3, y: 7 })).toBe(7)
  })

  it('should support custom functions', () => {
    const customFunctions = {
      double: (x: number) => x * 2,
      add: (a: number, b: number) => a + b
    }
    expect(Expression.evaluate('double(5)', {}, customFunctions)).toBe(10)
    expect(Expression.evaluate('add(3, 4)', {}, customFunctions)).toBe(7)
    expect(Expression.evaluate('double(x)', { x: 10 }, customFunctions)).toBe(20)
  })

  it('should throw error for unknown functions', () => {
    expect(() => Expression.evaluate('unknown(1)')).toThrow(
      'Unknown function: unknown'
    )
  })

  it('should throw error for sqrt of negative number', () => {
    expect(() => Expression.evaluate('sqrt(-1)')).toThrow(
      'Square root of negative number'
    )
  })

  it('should support no-argument function calls', () => {
    const customFunctions = {
      pi: () => Math.PI
    }
    expect(Expression.evaluate('pi()', {}, customFunctions)).toBeCloseTo(Math.PI)
  })

  it('should evaluate string literals', () => {
    expect(Expression.evaluate('"hello"')).toBe('hello')
    expect(Expression.evaluate("'world'")).toBe('world')
  })

  it('should concatenate strings with +', () => {
    expect(Expression.evaluate('"hello" + " " + "world"')).toBe('hello world')
  })

  it('should concatenate string and number', () => {
    expect(Expression.evaluate('"count: " + 5')).toBe('count: 5')
  })

  it('should compare strings', () => {
    expect(Expression.evaluate('"abc" == "abc"')).toBe(true)
    expect(Expression.evaluate('"abc" != "def"')).toBe(true)
    expect(Expression.evaluate('"abc" < "def"')).toBe(true)
    expect(Expression.evaluate('"def" > "abc"')).toBe(true)
  })

  it('should support escape sequences in strings', () => {
    expect(Expression.evaluate('"hello\\nworld"')).toBe('hello\nworld')
    expect(Expression.evaluate('"tab\\there"')).toBe('tab\there')
  })

  it('should use string functions', () => {
    expect(Expression.evaluate('len("hello")')).toBe(5)
    expect(Expression.evaluate('upper("hello")')).toBe('HELLO')
    expect(Expression.evaluate('lower("HELLO")')).toBe('hello')
    expect(Expression.evaluate('trim("  hi  ")')).toBe('hi')
  })

  it('should support strings in context', () => {
    expect(Expression.evaluate('name', { name: 'Alice' })).toBe('Alice')
    expect(Expression.evaluate('"Hello, " + name', { name: 'Alice' })).toBe(
      'Hello, Alice'
    )
  })

  it('should throw error for unterminated strings', () => {
    expect(() => Expression.evaluate('"hello')).toThrow('Unterminated string')
    expect(() => Expression.evaluate("'hello")).toThrow('Unterminated string')
  })

  it('should evaluate ternary conditional', () => {
    expect(Expression.evaluate('1 > 0 ? 10 : 20')).toBe(10)
    expect(Expression.evaluate('1 < 0 ? 10 : 20')).toBe(20)
  })

  it('should evaluate nested ternary', () => {
    // a > b ? a : b > c ? b : c  =>  max of three
    expect(Expression.evaluate('3 > 5 ? 3 : 5 > 2 ? 5 : 2')).toBe(5)
    expect(Expression.evaluate('7 > 5 ? 7 : 5 > 2 ? 5 : 2')).toBe(7)
  })

  it('should evaluate ternary with strings', () => {
    expect(Expression.evaluate('1 > 0 ? "yes" : "no"')).toBe('yes')
    expect(Expression.evaluate('1 < 0 ? "yes" : "no"')).toBe('no')
  })

  it('should evaluate ternary with variables', () => {
    const context = { score: 85 }
    expect(
      Expression.evaluate('score >= 60 ? "pass" : "fail"', context)
    ).toBe('pass')
    expect(
      Expression.evaluate('score >= 90 ? "A" : score >= 60 ? "B" : "C"', context)
    ).toBe('B')
  })

  it('should handle ternary with truthy numbers', () => {
    expect(Expression.evaluate('1 ? "truthy" : "falsy"')).toBe('truthy')
    expect(Expression.evaluate('0 ? "truthy" : "falsy"')).toBe('falsy')
  })

  it('should compile to native function', () => {
    const fn = Expression.compileToFunction('x * 2 + 1')
    expect(fn({ x: 5 })).toBe(11)
    expect(fn({ x: 10 })).toBe(21)
  })

  it('should compile complex expression to native function', () => {
    const fn = Expression.compileToFunction('(a + b) * c')
    expect(fn({ a: 1, b: 2, c: 3 })).toBe(9)
  })

  it('should compile with built-in functions', () => {
    const fn = Expression.compileToFunction('abs(x) + max(a, b)')
    expect(fn({ x: -5, a: 3, b: 7 })).toBe(12)
  })

  it('should compile with custom functions', () => {
    const fn = Expression.compileToFunction('double(x)', {
      double: (x: number) => x * 2
    })
    expect(fn({ x: 5 })).toBe(10)
  })

  it('should compile conditional expression', () => {
    const fn = Expression.compileToFunction('x > 0 ? "positive" : "negative"')
    expect(fn({ x: 5 })).toBe('positive')
    expect(fn({ x: -1 })).toBe('negative')
  })

  it('should compile nested property access', () => {
    const fn = Expression.compileToFunction('user.score * 2')
    expect(fn({ user: { score: 50 } })).toBe(100)
  })

  it('should handle division by zero in compiled function', () => {
    const fn = Expression.compileToFunction('1 / 0')
    expect(() => fn()).toThrow('Division by zero')
  })
})

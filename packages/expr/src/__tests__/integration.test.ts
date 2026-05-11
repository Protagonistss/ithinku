import { describe, it, expect, beforeEach } from 'vitest'
import { Expression, ParserError, LexerError, EvaluationError, Parser } from '../index'

describe('Expression Integration', () => {
  beforeEach(() => {
    // Clear cache before each test
    Expression.configureCache({ maxSize: 128 })
  })

  describe('Caching', () => {
    it('should cache parsed AST', () => {
      const expr = 'x * 2 + y'

      // First parse - cache miss
      const ast1 = Expression.parse(expr)
      // Second parse - cache hit
      const ast2 = Expression.parse(expr)

      expect(ast1).toBe(ast2) // Same reference
    })

    it('should cache with configureCache', () => {
      Expression.configureCache({ maxSize: 2 })

      Expression.parse('a')
      Expression.parse('b')
      Expression.parse('c') // Evicts 'a'

      const ast1 = Expression.parse('b') // Cache hit
      const ast2 = Expression.parse('c') // Cache hit

      expect(ast1).toBeDefined()
      expect(ast2).toBeDefined()
    })

    it('should disable cache when configured', () => {
      Expression.configureCache({ enabled: false })

      const expr = 'x + y'
      // First parse
      const ast1 = Expression.parse(expr)
      // Clear and create new cache
      Expression.configureCache({ enabled: false })
      const ast2 = Expression.parse(expr)

      // With cache disabled, we get a fresh parse each time
      // But the parse result is structurally identical
      expect(ast1).toEqual(ast2)
    })
  })

  describe('Error Messages', () => {
    it('should provide helpful lexer error for invalid character', () => {
      expect(() => Expression.evaluate('2 @ 3')).toThrow(LexerError)
      try {
        Expression.evaluate('2 @ 3')
      } catch (e) {
        expect((e as LexerError).getContext()).toContain('line 1')
      }
    })

    it('should provide helpful parser error for incomplete expression', () => {
      expect(() => Expression.evaluate('2 +')).toThrow(ParserError)
      try {
        Expression.evaluate('2 +')
      } catch (e) {
        const error = e as ParserError
        expect(error.message).toBeDefined()
        expect(error.getContext()).toBeDefined()
      }
    })

    it('should provide helpful error for undefined variable', () => {
      expect(() => Expression.evaluate('undefined_var')).toThrow(EvaluationError)
      try {
        Expression.evaluate('undefined_var')
      } catch (e) {
        expect((e as EvaluationError).message).toContain('Undefined variable')
      }
    })

    it('should provide helpful error for division by zero', () => {
      expect(() => Expression.evaluate('1 / 0')).toThrow(EvaluationError)
      try {
        Expression.evaluate('1 / 0')
      } catch (e) {
        expect((e as EvaluationError).message).toContain('Division by zero')
      }
    })
  })

  describe('Evaluator with Options', () => {
    it('should work with new EvaluatorOptions style', async () => {
      const { Evaluator } = await import('../evaluator')
      const evaluator = new Evaluator({
        context: { x: 5 },
        functions: { double: (n) => (n as number) * 2 },
        enableBuiltinFunctions: true
      })

      const ast = new Parser('x + double(x)').parse()
      const result = evaluator.evaluate(ast)
      expect(result).toBe(15)
    })

    it('should work with old-style constructor', async () => {
      const { Evaluator } = await import('../evaluator')
      const evaluator = new Evaluator({ x: 5 }, { double: (n) => (n as number) * 2 })

      const ast = new Parser('x + double(x)').parse()
      const result = evaluator.evaluate(ast)
      expect(result).toBe(15)
    })

    it('should support disabling builtin functions', async () => {
      const { Evaluator } = await import('../evaluator')
      const evaluator = new Evaluator({
        context: {},
        enableBuiltinFunctions: false,
        functions: { custom: () => 'custom' }
      })

      const ast = new Parser('custom()').parse()
      const result = evaluator.evaluate(ast)
      expect(result).toBe('custom')

      // Builtin should not work
      const ast2 = new Parser('abs(-1)').parse()
      expect(() => evaluator.evaluate(ast2)).toThrow(EvaluationError)
    })
  })

  describe('Backward Compatibility', () => {
    it('should support old API', () => {
      // evaluate
      expect(Expression.evaluate('2 + 3')).toBe(5)

      // parse
      const ast = Expression.parse('x + y')
      expect(ast.type).toBe('binary')

      // compile
      const fn = Expression.compile('a * b')
      expect(fn({ a: 2, b: 3 })).toBe(6)

      // compileToFunction
      const nativeFn = Expression.compileToFunction('a - b')
      expect(nativeFn({ a: 5, b: 2 })).toBe(3)
    })
  })
})
